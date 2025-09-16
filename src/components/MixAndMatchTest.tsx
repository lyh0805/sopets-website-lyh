import { useEffect, useRef, useState } from 'react';
import { SpinePlayer } from '@esotericsoftware/spine-player';
import '@esotericsoftware/spine-player/dist/spine-player.css';
import type { GUI } from 'dat.gui';

interface MixAndMatchTestProps {
  className?: string;
}

// Define the body parts and their variations
const BODY_PARTS = {
  eyes: [0, 1, 2, 3],
  lower: [0, 1, 2, 3],
  upper: [0, 1, 2, 3],
  wings: [0, 1, 2, 3]
};

export const MixAndMatchTest = ({ className = '' }: MixAndMatchTestProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<SpinePlayer | null>(null);
  const guiRef = useRef<GUI | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  // Add debug info to state for display
  const addDebugInfo = (info: string) => {
    setDebugInfo(prev => [...prev, info]);
    console.log(info);
  };

  // Helper function to apply skin combination
  const applySkinCombination = (player: SpinePlayer, parts: Record<string, number>) => {
    try {
      if (!player.skeleton) {
        throw new Error('Skeleton not initialized');
      }

      // Get the default skin
      const defaultSkin = player.skeleton.data.skins[0];
      
      // Log available skins for debugging
      const availableSkins = player.skeleton.data.skins.map(skin => skin.name);
      addDebugInfo(`Available skins: ${JSON.stringify(availableSkins)}`);
      
      // Add each selected part variation to the skeleton
      Object.entries(parts).forEach(([part, variation]) => {
        const skinName = `${part}/${variation}`;
        const partSkin = player.skeleton?.data.findSkin(skinName);
        if (partSkin) {
          player.skeleton?.setSkin(partSkin);
          addDebugInfo(`Applied skin part: ${skinName}`);
        } else {
          addDebugInfo(`Warning: Skin not found - ${skinName}`);
        }
      });

      // Reset to setup pose to apply changes
      player.skeleton.setSlotsToSetupPose();
      addDebugInfo(`Applied skin combination: ${JSON.stringify(parts)}`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError(`Failed to apply skin combination: ${errorMsg}`);
      console.error('Skin combination error:', err);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set visibility after a small delay to ensure only one instance is shown
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
      // Position the container at the top of the viewport
      if (container) {
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.zIndex = '50';
      }
    }, 100);

    const initializeSpine = async () => {
      try {
        // Create SpinePlayer
        const player = new SpinePlayer(container, {
          jsonUrl: "/spine/dragon_mixed.json",
          atlasUrl: "/spine/dragon_mixed.atlas",
          alpha: true,
          backgroundColor: "#2c3e50",
          showControls: false,
          preserveDrawingBuffer: true,
          premultipliedAlpha: true,
          animation: "idle",
          success: () => {
            addDebugInfo('Player initialized successfully');
            if (!player.animationState) {
              console.error('Animation state not initialized');
              return;
          }

          // Log available animations
            const animations = player.skeleton?.data.animations.map(a => a.name);
            addDebugInfo(`Available animations: ${animations?.join(', ')}`);

          // Apply initial skin combination
          const initialParts = {
            eyes: 0,
            lower: 0,
            upper: 0,
            wings: 0
          };
            applySkinCombination(player, initialParts);

          // Setup GUI
            setupGui(player, initialParts);
          },
          error: (error) => {
            console.error('Spine player error:', error);
            setError(`Failed to initialize: ${error}`);
        }
        });

        playerRef.current = player;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.error('Error initializing Spine:', err);
        setError(`Failed to initialize: ${errorMsg}`);
      }
    };

    const setupGui = async (player: SpinePlayer, initialParts: Record<string, number>) => {
      try {
        // Dynamically import dat.gui
        const dat = await import('dat.gui');
        
        // Create GUI controls
        const gui = new dat.GUI({ autoPlace: false });
        guiRef.current = gui;
        container.appendChild(gui.domElement);
        gui.domElement.style.position = 'absolute';
        gui.domElement.style.top = '10px';
        gui.domElement.style.right = '10px';

        // Animation controls
        const animations = player.skeleton?.data.animations.map(a => a.name) || [];
        const animationFolder = gui.addFolder('Animation');
        const animationControls = {
          current: 'idle',
          speed: 1.0,
          mix: 0.2
        };

        animationFolder.add(animationControls, 'current', animations).onChange((value: string) => {
          try {
            if (player.animationState) {
              player.animationState.setAnimation(0, value, true);
            addDebugInfo(`Changed animation to: ${value}`);
            }
          } catch (err) {
            const errorMsg = err instanceof Error ? err.message : String(err);
            setError(`Failed to change animation: ${errorMsg}`);
          }
        });

        animationFolder.add(animationControls, 'speed', 0.1, 2.0).onChange((value: number) => {
          try {
            if (player.animationState) {
              const tracks = player.animationState.tracks;
            if (tracks && tracks.length > 0) {
              tracks.forEach(track => {
                if (track) track.timeScale = value;
              });
            }
            addDebugInfo(`Changed animation speed to: ${value}`);
            }
          } catch (err) {
            const errorMsg = err instanceof Error ? err.message : String(err);
            setError(`Failed to change animation speed: ${errorMsg}`);
          }
        });

        animationFolder.add(animationControls, 'mix', 0.0, 1.0).onChange((value: number) => {
          try {
            if (player.animationState) {
              player.animationState.data.defaultMix = value;
            addDebugInfo(`Changed animation mix to: ${value}`);
            }
          } catch (err) {
            const errorMsg = err instanceof Error ? err.message : String(err);
            setError(`Failed to change animation mix: ${errorMsg}`);
          }
        });

        animationFolder.open();

        // Parts controls
        const partsFolder = gui.addFolder('Body Parts');
        const partsControls = { ...initialParts };

        Object.entries(BODY_PARTS).forEach(([part, variations]) => {
          partsFolder.add(partsControls, part, variations).onChange(() => {
            applySkinCombination(player, partsControls);
          });
        });

        partsFolder.open();

      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.error('Error setting up GUI:', err);
        setError(`Failed to setup GUI: ${errorMsg}`);
      }
    };

    initializeSpine();

    // Cleanup
    return () => {
      clearTimeout(visibilityTimer);
      if (guiRef.current) {
        guiRef.current.destroy();
        guiRef.current = null;
      }
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
      const canvasElements = container.querySelectorAll('canvas');
      canvasElements.forEach(canvas => canvas.remove());
    };
  }, []);

  return (
    <div className="relative w-full h-full" style={{ 
      opacity: isVisible ? 1 : 0, 
      transition: 'opacity 0.3s ease-in-out',
      position: 'relative',
      zIndex: isVisible ? 50 : 1 // Higher z-index for visible instance
    }}>
      <div 
        ref={containerRef} 
        className={`spine-player-container w-full h-full ${className}`}
        style={{ 
          position: 'relative',
          overflow: 'hidden',
          background: '#2c3e50' // Match canvas background color
        }}
      />
      {error && (
        <div className="absolute top-0 left-0 right-0 p-4 bg-red-500 text-white z-[60]">
          {error}
        </div>
      )}
    </div>
  );
}; 