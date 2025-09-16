'use client';

import { Dialog } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { createBetaRegistration } from '@/lib/services/beta-registration';
import { PlayStyle, DiscoverySource, GameGenre } from '@/types/beta-registration';
import { FaDiscord, FaTelegram, FaGamepad, FaSearch, FaCheckCircle } from 'react-icons/fa';
import { IoGameController } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export default function BetaSurveyModal({ isOpen, onClose, email }: Props) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    discord_username: '',
    telegram_handle: '',
    playstyle: '' as PlayStyle,
    playstyle_other: '',
    discovery_source: '' as DiscoverySource,
    discovery_source_other: '',
    game_genres: [] as GameGenre[],
    game_genres_other: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isConnectionTested, setIsConnectionTested] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Test connection when modal opens
  useEffect(() => {
    if (isOpen && !isConnectionTested) {
      // testSupabaseConnection().then(isConnected => {
      //   setIsConnectionTested(true);
      //   if (!isConnected) {
      //     setError('Unable to connect to our servers. Please try again later.');
      //   }
      // });
    }
  }, [isOpen, isConnectionTested]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Test connection before submitting
    // const isConnected = await testSupabaseConnection();
    // if (!isConnected) {
    //   setError('Unable to connect to our servers. Please try again later.');
    //   setIsSubmitting(false);
    //   return;
    // }

    // Validate required fields
    if (!formData.game_genres.length) {
      setError('Please select at least one game genre');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Submitting beta registration form...');
      
      // Validate form data
      if (!formData.discord_username.trim()) {
        throw new Error('Discord username is required');
      }
      if (!formData.telegram_handle.trim()) {
        throw new Error('Telegram handle is required');
      }
      if (!formData.playstyle) {
        throw new Error('Please select a playstyle');
      }
      if (!formData.discovery_source) {
        throw new Error('Please select how you heard about us');
      }

      // Create registration
      await createBetaRegistration({
        email,
        discord_username: formData.discord_username.trim(),
        telegram_handle: formData.telegram_handle.trim(),
        playstyle: formData.playstyle,
        discovery_source: formData.discovery_source,
        game_genres: formData.game_genres,
        // Optional fields
        playstyle_other: formData.playstyle === 'Other' ? formData.playstyle_other?.trim() || undefined : undefined,
        discovery_source_other: formData.discovery_source === 'Other' ? formData.discovery_source_other?.trim() || undefined : undefined,
        game_genres_other: formData.game_genres.includes('Other') ? formData.game_genres_other?.trim() || undefined : undefined,
      });

      console.log('Registration successful');
      setIsSubmitted(true);
      // Don't close the modal immediately - show the thank you message
    } catch (err) {
      console.error('Error submitting form:', err);
      // if (err instanceof BetaRegistrationError) {
      //   if (err.message.includes('Failed to fetch')) {
      //     setError('Unable to connect to our servers. Please check your internet connection and try again.');
      //   } else {
      //     setError(err.message);
      //   }
      // } else if (err instanceof Error) {
      //   setError(err.message);
      // } else {
      //   setError('An unexpected error occurred. Please try again.');
      // }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ 
              opacity: 1, 
              backdropFilter: 'blur(8px)',
              transition: { duration: 0.2 }
            }}
            exit={{ 
              opacity: 0, 
              backdropFilter: 'blur(0px)',
              transition: { duration: 0.2 }
            }}
            className="fixed inset-0 bg-black/60"
            aria-hidden="true"
          />

          {/* Modal container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
            <Dialog.Panel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                transition: { 
                  type: "spring",
                  duration: 0.5,
                  bounce: 0.3 
                }
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.95, 
                y: 20,
                transition: { 
                  duration: 0.2 
                }
              }}
              className="relative mx-auto max-w-xl w-full rounded-2xl bg-gradient-to-b from-gray-900 to-black p-6 shadow-xl border border-gray-800 overflow-hidden"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />

              {/* Content */}
              <div className="relative">
                <Dialog.Title className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                  {isSubmitted ? (
                    <div className="flex items-center justify-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>Thank You! 🎉</span>
                    </div>
                  ) : (
                    'Join the SoPets Beta!'
                  )}
                </Dialog.Title>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="w-12 h-12 text-white" />
                      </div>
                      <p className="text-gray-300 text-lg">
                        Thank you for registering for the SoPets beta program! We're excited to have you join our community.
                      </p>
                      <p className="text-gray-400">
                        We'll be sending you an email shortly with more information about the next steps.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <p className="text-gray-300 text-center">Join our community:</p>
                      <div className="flex justify-center space-x-6">
                        <a
                          href="https://discord.gg/V3YneV4Wzs"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-[#5865F2] rounded-lg hover:bg-[#4752C4] transition-colors"
                        >
                          <FaDiscord className="w-5 h-5" />
                          <span>Discord</span>
                        </a>
                        <a
                          href="https://t.me/sopets_nft"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-[#0088cc] rounded-lg hover:bg-[#0077b5] transition-colors"
                        >
                          <FaTelegram className="w-5 h-5" />
                          <span>Telegram</span>
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors font-medium"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-purple-400 mb-2">
                        <FaDiscord className="w-5 h-5" />
                        <label className="block text-sm font-medium">
                          Discord Username*
                        </label>
                      </div>
                      <input
                        type="text"
                        value={formData.discord_username}
                        onChange={(e) => setFormData({ ...formData, discord_username: e.target.value })}
                        required
                        className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-400"
                        placeholder="e.g., username#1234"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-blue-400 mb-2">
                        <FaTelegram className="w-5 h-5" />
                        <label className="block text-sm font-medium">
                          Telegram Handle*
                        </label>
                      </div>
                      <input
                        type="text"
                        value={formData.telegram_handle}
                        onChange={(e) => setFormData({ ...formData, telegram_handle: e.target.value })}
                        required
                        className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400"
                        placeholder="e.g., @username"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-pink-400 mb-2">
                        <IoGameController className="w-5 h-5" />
                        <label className="block text-sm font-medium">
                          Your Play Style*
                        </label>
                      </div>
                      <select
                        value={formData.playstyle}
                        onChange={(e) => setFormData({ ...formData, playstyle: e.target.value as PlayStyle })}
                        required
                        className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-white"
                      >
                        <option value="">Select your play style</option>
                        <option value="Pet Collector">Pet Collector</option>
                        <option value="Cozy Observer">Cozy Observer</option>
                        <option value="Tap To Connect">Tap To Connect</option>
                        <option value="Other">Other</option>
                      </select>
                      {formData.playstyle === 'Other' && (
                        <input
                          type="text"
                          value={formData.playstyle_other}
                          onChange={(e) => setFormData({ ...formData, playstyle_other: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-white placeholder-gray-400"
                          placeholder="Describe your play style"
                          required
                        />
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-yellow-400 mb-2">
                        <FaSearch className="w-5 h-5" />
                        <label className="block text-sm font-medium">
                          How did you find us?*
                        </label>
                      </div>
                      <select
                        value={formData.discovery_source}
                        onChange={(e) => setFormData({ ...formData, discovery_source: e.target.value as DiscoverySource })}
                        required
                        className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-white"
                      >
                        <option value="">Select how you found us</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Tiktok">TikTok</option>
                        <option value="Reddit">Reddit</option>
                        <option value="X">X (Twitter)</option>
                        <option value="Word of Mouth">Word of Mouth</option>
                        <option value="Friends of Development Team Members">Friends of Development Team Members</option>
                        <option value="Other">Other</option>
                      </select>
                      {formData.discovery_source === 'Other' && (
                        <input
                          type="text"
                          value={formData.discovery_source_other}
                          onChange={(e) => setFormData({ ...formData, discovery_source_other: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-white placeholder-gray-400"
                          placeholder="Tell us how you found us"
                          required
                        />
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-green-400 mb-2">
                        <FaGamepad className="w-5 h-5" />
                        <label className="block text-sm font-medium">
                          What genre(s) of games do you play regularly?*
                        </label>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          'Collections / Gacha Games',
                          'Casual mobile games',
                          'Competitive Mobile Games',
                          'PC Competitive games',
                          'PC Role Playing Games',
                          'PC Cozy games',
                          'Web3 Games',
                          'Aesthetical Games',
                          "I don't play games",
                          'Other'
                        ].map((genre) => (
                          <label key={genre} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.game_genres.includes(genre as GameGenre)}
                              onChange={(e) => {
                                const newGenres = e.target.checked
                                  ? [...formData.game_genres, genre as GameGenre]
                                  : formData.game_genres.filter((g) => g !== genre);
                                setFormData({ ...formData, game_genres: newGenres });
                              }}
                              className="form-checkbox h-4 w-4 text-green-500 rounded bg-gray-700 border-gray-600"
                            />
                            <span className="text-sm text-gray-300">{genre}</span>
                          </label>
                        ))}
                      </div>
                      {formData.game_genres.includes('Other') && (
                        <input
                          type="text"
                          value={formData.game_genres_other}
                          onChange={(e) => setFormData({ ...formData, game_genres_other: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 text-white placeholder-gray-400"
                          placeholder="Tell us what other games you play"
                          required
                        />
                      )}
                    </div>

                    {error && (
                      <div className="text-red-500 text-sm p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
} 