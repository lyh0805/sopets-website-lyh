'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import PetLoreContainer from "@/components/lore/PetLoreContainer";
import LoreSnippetCard from "@/components/lore/LoreSnippetCard";

export default function LorePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/tropicalisland_bg.png"
            alt="SoPets World"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </div>

        <div className="container relative z-10 mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-6 text-5xl font-bold text-white sm:text-7xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              The Chronicles of SoPets
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-300 leading-relaxed">
              From unity to shattering, from loss to restoration — discover the epic saga that shaped the world of SoPets
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hunter Bloodlines Section - Enhanced with Interactive Cards */}
      <section id="hunters-bloodlines" className="py-24">        
        <div className="container mx-auto max-w-7xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center text-4xl font-bold text-white"
          >
            🏹 The Hunter Bloodlines
          </motion.h2>
          
          <div className="grid gap-y-8 gap-x-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {/* Pawling - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <PetLoreContainer 
                petName="Pawling"
                petSubtitle="The Firstborn"
                petImage="/pets/Pawling.png"
                petDescription="Pawling's lineage reaches back to the earliest days of SoPets' unified island, carrying the spark that ignited the first bonds between all Hunters. Long before the meteor shattered the world, its ancestors were curious explorers, discovering hidden glades, secret streams, and gathering spots where SoPets would meet and play. Pawling survived the cataclysm as one of the first reborn Hunters, a living reminder of the island's unity and innocence."
                accentColor="purple"
                rarity="Common"
                imageSize="large"
                imageTranslate={{x:0, y:-10}}
              />
            </motion.div>

            {/* Camo - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <PetLoreContainer 
                petName="Camo"
                petSubtitle="The Hidden Shadow"
                petImage="/pets/Camo.png"
                petDescription="Camo's ancestors were survivalists, creatures that thrived through stealth and patience, avoiding predators and navigating a world of dangers. It carried the instinct to hide, observe, and move undetected, preserving knowledge and secrets. After the meteor, this trait became even more vital; Camo quietly learned the new island's terrain, ensuring its survival and quietly guiding younger Hunters."
                accentColor="blue"
                rarity="Common"
              />
            </motion.div>

            {/* Snug - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <PetLoreContainer 
                petName="Snug"
                petSubtitle="The Cupid of Bonds"
                petImage="/pets/Snug.png"
                petDescription="Snug's lineage can be traced to ancient SoPets who ensured that social bonds endured even during crises, acting as peacemakers and mediators. When the meteor struck, it was this instinct that allowed some SoPets to survive as cohesive groups rather than lone survivors. Snug today continues this tradition, quietly nudging others into meaningful connections, ensuring the fractured island can once again thrive."
                accentColor="pink"
                rarity="Common"
              />
            </motion.div>

            {/* Beat - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <PetLoreContainer 
                petName="Beat"
                petSubtitle="The Howling Rhythm"
                petImage="/pets/Beat.png"
                petDescription="Beat's ancestors were the performers and communicators of SoPets, creating rhythm and music to mark events, coordinate activities, and strengthen bonds. Even as the island fell, the need for rhythm persisted, and Beat emerged carrying this ancient pulse. Today, it turns everyday movement into music, energizing others and subtly orchestrating harmony across the island. Beat reminds caretakers that life is not merely survival—it is celebration, creativity, and shared energy."
                accentColor="emerald"
                rarity="Common"
              />
            </motion.div>

            {/* Scoops - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <PetLoreContainer 
                petName="Scoops"
                petSubtitle="The Festival Spirit"
                petImage="/pets/Scoops.png"
                petDescription="Scoops' ancestors are remembered as founders of the SoPets Festival, a tradition celebrating community, laughter, and togetherness. Even as the Great Island fell, fragments of this joyful spirit endured, preserving the culture of connection. Scoops today continues this legacy, its bouncing and dancing a living thread from ancient festivals to the present. It spreads happiness effortlessly, turning empty glades into lively arenas of play."
                accentColor="pink"
                rarity="Rare"
              />
            </motion.div>

            {/* Scaley - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <PetLoreContainer 
                petName="Scaley"
                petSubtitle="The Heir of Smoke"
                petImage="/pets/Scaley.png"
                petDescription="Scaley's ancestors were said to be dragon-like hunters, guardians of mountain peaks and fire-lit forests, feared and admired for their power. When the meteor struck, those legends were nearly lost; Scaley emerged as a descendant carrying fragments of these tales. Though it cannot breathe true fire, its smoky exhalations hint at a deep, forgotten legacy. Scaley is dramatic, ambitious, and ever-seeking ways to emulate the grandeur of its forebears."
                accentColor="emerald"
                rarity="Rare"
              />
            </motion.div>

            {/* Cosmo - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <PetLoreContainer 
                petName="Cosmo"
                petSubtitle="The Fallen Light"
                petImage="/pets/Cosmo.png"
                petDescription="Cosmo was born from fragments of the meteor's celestial impact, carrying a fragment of the cosmos itself. Even before the catastrophe, its ancestors were watchers, guiding Hunters with the faint glow of their fur in dark forests and silent nights. After the meteor, Cosmo became a beacon, illuminating the shattered lands and offering guidance and calm to those who survived."
                accentColor="purple"
                rarity="Rare"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Age of One Island - Using LoreSnippetCard with Image */}
      <section className="py-24">
        <div className="container mx-auto max-w-5xl px-6">
          <LoreSnippetCard
            title="🏝️ The Age of One Island"
            mediaSrc="/lore/idle_animated_splash_art.mp4"
            mediaType="video"
            accentColor="purple"
            content={
              <div className="text-left space-y-6">
                <p className="text-gray-200 text-lg leading-relaxed">
                  Long ago, there was only <span className="text-purple-300 font-bold">one land</span>—a boundless isle where all SoPets dwelled. Each Nature had its place, and within each Nature, seven subvariants lived as kin. Some bore keen eyes that saw far beyond the treetops, others strong limbs that guarded the trails, still others nimble forms that carried the harvest home.
                </p>
                
                <p className="text-gray-200 text-lg leading-relaxed">
                  On this vast island, no one stood alone. The hunters provided, the gatherers sustained, the healers mended, and the guardians defended. <span className="text-emerald-300 font-bold">Differences were not divisions</span>; they were threads woven into one great harmony. Songs carried across the winds spoke of unity so perfect that the land itself glowed with quiet brilliance, pulsing in rhythm with every living creature.
                </p>
              </div>
            }
          />
        </div>
      </section>

      {/* The Great Shattering - Using LoreSnippetCard with Video */}
      <section className="py-24">
        <div className="container mx-auto max-w-5xl px-6">
          <LoreSnippetCard
            title="☄️ The Great Shattering"
            mediaSrc="/lore/meteor_striking.mp4"
            mediaType="video"
            accentColor="red"
            content={
              <div className="text-left space-y-6">
                <p className="text-gray-200 text-lg leading-relaxed">
                  But harmony is fragile. One night, the sky split open with a roar. 🌠 A star descended—a burning stone that tore across the heavens. It struck the island with fury so great that mountains sank, seas rose, and the great isle was scattered into countless fragments.
                </p>
                
                <p className="text-gray-200 text-lg leading-relaxed">
                  Countless SoPets were lost to fire and waves. Unity shattered, and silence replaced the songs of harmony. Yet one did not falter. <span className="text-gold-300 font-bold">Aurelion, Guardian of the Skies</span>, stretched his wings across the storm. With immense effort, he gathered what remained—eggs, spirits, fragments of life—and shielded them. But he could not mend the sundered island alone.
                </p>
              </div>
            }
          />
        </div>
      </section>

      {/* The Caretakers' Calling - Using LoreSnippetCard with Image */}
      <section className="py-24">
        <div className="container mx-auto max-w-5xl px-6">
          <LoreSnippetCard
            title="🌱 The Caretakers' Calling"
            mediaSrc="/lore/the_caretakers_calling.mp4"
            mediaType="video"
            accentColor="emerald"
            content={
              <div className="text-left space-y-6">
                <p className="text-gray-200 text-lg leading-relaxed">
                  So Aurelion turned his gaze outward. He sought those who could nurture, guide, and rebuild what was lost. These chosen ones became <span className="text-emerald-300 font-bold">Caretakers</span>, entrusted with fragments of land—tiny islands born from ruin. Each is a seed of restoration, awaiting those who would fill it with life again.
                </p>
                
                <div className="bg-black/40 rounded-lg p-6 border-l-4 border-emerald-400">
                  <p className="text-emerald-200 text-lg italic font-medium">
                    To each Caretaker he whispered:<br/>
                    <span className="text-emerald-100">"Collect them. Protect them. Restore the harmony that was broken. For when all seven stand together, the land will remember."</span>
                  </p>
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* The Path to Harmony - Using LoreSnippetCard with Video */}
      <section className="py-24">
        <div className="container mx-auto max-w-5xl px-6">
          <LoreSnippetCard
            title="✨ The Path to Harmony"
            mediaSrc="/lore/harmony_pets.mp4"
            mediaType="video"
            accentColor="purple"
            content={
              <div className="text-left space-y-6">
                <p className="text-gray-200 text-lg leading-relaxed">
                  Within every lineage lie <span className="text-purple-300 font-bold">seven subvariants</span>—seven faces of a single essence. To gather them is to restore what was lost. When all seven dwell together on one island, the ground hums, the air glows, and light blooms across the land. This awakening is called <span className="text-purple-300 font-bold">The Harmony Effect</span>.
                </p>
                
                <p className="text-gray-200 text-lg leading-relaxed">
                  The Harmony Effect is not just spectacle—it is a sign of balance. Flowers bloom in unseen colors, winds carry music, and soil grows fertile again. Guardians who achieve this are said to be honored by Aurelion himself, his wings folded across the stars as he blesses their effort.
                </p>
              </div>
            }
          />
        </div>
      </section>

      {/* The Rite of Connection - Using LoreSnippetCard with Image */}
      <section className="py-24">
        <div className="container mx-auto max-w-5xl px-6">
          <LoreSnippetCard
            title="🤝 The Rite of Connection"
            mediaSrc="/lore/tap_to_collect.mp4"
            mediaType="video"
            accentColor="pink"
            content={
              <div className="text-left space-y-6">
                <p className="text-gray-200 text-lg leading-relaxed">
                  But harmony cannot be rebuilt by one alone. Caretakers were given a gift: the ability to <span className="text-pink-300 font-bold">Tap to Connect</span>.
                </p>
                
                <p className="text-gray-200 text-lg leading-relaxed">
                  When two Caretakers meet and tap, their islands resonate. Their SoPets step forward, bonds form, and sometimes new eggs are born—offspring carrying traits from both parents. These young are neither entirely one subvariant nor the other, but fresh blends of spirit and form.
                </p>
                
                <p className="text-gray-200 text-lg leading-relaxed">
                  SoPets of different lineages may never bear young together, yet they still forge bonds. They spar in play, travel between islands, and strengthen ties between Caretakers. <span className="text-pink-300 font-bold">Connection, not solitude, drives restoration.</span>
                </p>
              </div>
            }
          />
        </div>
      </section>

      {/* The Great Mystery Ahead - Using LoreSnippetCard with Video */}
      <section className="py-24">
        <div className="container mx-auto max-w-5xl px-6">
          <LoreSnippetCard
            title="🌌 The Great Mystery Ahead"
            mediaSrc="/lore/the_great_mystery_ahead.mp4"
            mediaType="video"
            accentColor="indigo"
            content={
              <div className="text-left space-y-6">
                <p className="text-gray-200 text-lg leading-relaxed">
                  Yet questions remain. Why did the star fall? Was it chance—or design? Some whisper it was no stone, but a seed of something vast and hungry. Others believe the <span className="text-purple-300 font-bold">Harmony Effect</span> is not just restoration, but a door—an awakening to truths buried deep in the world.
                </p>
                
                <p className="text-gray-200 text-lg leading-relaxed">
                  Aurelion does not answer. He only watches, guiding in silence, testing those who rise as Caretakers.
                </p>
                
                <p className="text-gray-200 text-lg leading-relaxed">
                  The journey has only begun. Each island restored, each SoPet collected, brings the world one step closer to what was lost—and perhaps toward something greater. And still, ancient tales whisper: <span className="text-indigo-300 font-bold">Hunters were not the only ones to endure the strike.</span> Other lineages may yet survive—unknown, undiscovered, and waiting.
                </p>
              </div>
            }
          />
        </div>
      </section>
    </main>
  );
}