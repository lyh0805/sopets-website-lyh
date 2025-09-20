'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/sopets_official_/',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/V3YneV4Wzs',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@sopets_nft',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@sopets_nft',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    href: 'https://t.me/sopets_nft',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/sopets_nft',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

// Download links for different platforms
const downloadLinks = [
  {
    name: 'SoPets Windows',
    href: '/downloads/SoPets Desktop Windows v0.1.2.zip',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M0 3.41l8.77-1.2v8.68H0V3.41zM0 12.83h8.77v8.68L0 20.31V12.83zM9.75 2.07L24 0v11.25H9.75V2.07zM24 12.75v11.25l-14.25-2.07V12.75H24z" />
      </svg>
    ),
  },
  {
    name: 'SoPets MacOS',
    href: '/downloads/SoPets Desktop MacOS v0.1.2.dmg',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const pathname = usePathname();

  const isActivePage = (path: string) => pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect mobile devices
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkDevice();
  }, []);

  // Check if email was already submitted (localStorage)
  useEffect(() => {
    const submitted = localStorage.getItem('sopets_email_submitted');
    if (submitted === 'true') {
      setEmailSubmitted(true);
    }
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
  
    setIsSubmitting(true);
    setEmailError('');
  
    try {
      const response = await fetch('/api/submit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Store in localStorage that email was submitted
        localStorage.setItem('sopets_email_submitted', 'true');
        localStorage.setItem('sopets_user_email', email);
        
        setEmailSubmitted(true);
        
        // Close dropdown after a short delay to show success
        setTimeout(() => {
          setIsDownloadOpen(false);
        }, 2000);
        
      } else {
        setEmailError(data.message || 'Something went wrong. Please try again.');
      }
      
    } catch (error) {
      console.error('Error submitting email:', error);
      setEmailError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = (href: string) => {
    if (!emailSubmitted) {
      return;
    }

    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = href;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloadOpen(false);
  };

  return (
    <header 
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        hasScrolled ? 'bg-black/50 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 sm:px-8 lg:px-12">
        {/* Logo - Made Bigger */}
        <Link href="/" className="flex items-center">
          <Image
            src="/sopets_logo.png"
            alt="SoPets Logo"
            width={180}
            height={60}
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation - Moved to Right & Made Bigger */}
        <div className="hidden items-center gap-10 md:flex ml-auto">
          <Link
            href="/lore"
            className={`text-lg font-medium transition-all duration-300 ${
              isActivePage('/lore') 
                ? 'font-bold text-white' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            Lore
          </Link>
          
          {/* Socials Dropdown - Hover Based */}
          <div 
            className="relative socials-dropdown"
            onMouseEnter={() => setIsSocialsOpen(true)}
            onMouseLeave={() => setIsSocialsOpen(false)}
          >
            <div
              className={`flex items-center gap-2 text-lg font-medium transition-all duration-300 cursor-pointer ${
                isSocialsOpen ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Socials
              <svg
                className={`h-5 w-5 transition-transform ${isSocialsOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <AnimatePresence>
              {isSocialsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-56 rounded-lg bg-black/95 p-3 backdrop-blur-lg"
                >
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 rounded-lg px-5 py-3 text-base text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                      whileHover={{ x: 4 }}
                    >
                      <social.icon className="h-6 w-6" />
                      {social.name}
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Download Beta Button or Available on Desktop - Conditional */}
          {isMobile ? (
            // Mobile: Show "Available on Desktop" message
            <motion.div
              className="relative overflow-hidden rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 flex items-center gap-2 cursor-default"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth={2}/>
                <line x1="8" y1="21" x2="16" y2="21" strokeWidth={2}/>
                <line x1="12" y1="17" x2="12" y2="21" strokeWidth={2}/>
              </svg>
              <span className="relative z-10">Available only on Desktop</span>
            </motion.div>
          ) : (
            // Desktop: Show download dropdown
            <div 
              className="relative download-dropdown"
              onMouseEnter={() => setIsDownloadOpen(true)}
              onMouseLeave={() => setIsDownloadOpen(false)}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 cursor-pointer"
              >
                <span className="relative z-10">Download Beta Here</span>
                <svg
                  className={`h-4 w-4 transition-transform ${isDownloadOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-opacity duration-300 hover:opacity-100" />
              </motion.div>
              
              <AnimatePresence>
                {isDownloadOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-80 rounded-lg bg-black/95 p-4 backdrop-blur-lg"
                  >
                    {!emailSubmitted ? (
                      // Email collection form
                      <div>
                        <h3 className="text-white font-semibold mb-3 text-center">
                          Get Early Access to SoPets Beta
                        </h3>
                        <p className="text-white/70 text-sm mb-4 text-center">
                          Enter your email to unlock the download links
                        </p>
                        
                        <form onSubmit={handleEmailSubmit} className="space-y-3">
                          <div>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError('');
                              }}
                              placeholder="Enter your email address"
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/15 transition-all"
                              required
                              disabled={isSubmitting}
                            />
                            {emailError && (
                              <p className="text-red-400 text-xs mt-1">{emailError}</p>
                            )}
                          </div>
                          
                          <motion.button
                            type="submit"
                            disabled={isSubmitting || !email}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                          >
                            {isSubmitting ? (
                              <>
                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                              </>
                            ) : (
                              'Unlock Downloads'
                            )}
                          </motion.button>
                        </form>
                        
                        <p className="text-white/50 text-xs text-center mt-3">
                          We'll only use your email for SoPets updates and beta access
                        </p>
                      </div>
                    ) : (
                      // Download links (unlocked)
                      <div>
                        <div className="text-center mb-4">
                          <div className="inline-flex items-center gap-2 text-green-400 font-semibold mb-2">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Access Unlocked!
                          </div>
                          <p className="text-white/70 text-sm">
                            Choose your platform to download SoPets Beta
                          </p>
                        </div>
                        
                        {downloadLinks.map((download) => (
                          <motion.button
                            key={download.name}
                            onClick={() => handleDownload(download.href)}
                            className="flex w-full items-center gap-4 rounded-lg px-5 py-3 text-base text-white/70 transition-colors hover:bg-white/10 hover:text-white mb-2 last:mb-0"
                            whileHover={{ x: 4 }}
                          >
                            <download.icon className="h-6 w-6" />
                            {download.name}
                            <svg className="h-4 w-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Menu Button - Made Bigger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-3 text-white/90 hover:bg-white/10 md:hidden"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Mobile Menu - Made Bigger */}
        <div
          className={`absolute left-0 right-0 top-full ${
            isMenuOpen ? 'block' : 'hidden'
          } bg-black/95 p-6 backdrop-blur-lg md:hidden`}
        >
          <div className="flex flex-col gap-6">
            <Link
              href="/lore"
              className={`text-lg font-medium transition-all duration-300 ${
                isActivePage('/lore') 
                  ? 'font-bold text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Lore
            </Link>
            
            {/* Mobile: Show "Available on Desktop" message */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex items-center gap-4 py-3 text-base text-white/70">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth={2}/>
                  <line x1="8" y1="21" x2="16" y2="21" strokeWidth={2}/>
                  <line x1="12" y1="17" x2="12" y2="21" strokeWidth={2}/>
                </svg>
                Available only on Desktop
              </div>
            </div>
            
            {/* Mobile Social Links */}
            <div className="border-t border-white/10 pt-6">
              <p className="mb-4 text-base font-medium text-white/70">Socials</p>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 py-3 text-base text-white/70 transition-colors hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <social.icon className="h-6 w-6" />
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;