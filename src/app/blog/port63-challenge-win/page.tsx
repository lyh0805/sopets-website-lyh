'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Port63WinBlogPost() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-purple-900/20 via-black to-black pb-24 pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="mb-2 inline-block rounded-full bg-purple-500 px-3 py-1 text-sm font-medium text-white">
            Awards
          </span>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            SoPets Wins 1st Place in Port 63 Challenge! 🏆
          </h1>
          <time className="text-gray-400">March 22, 2025</time>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-12 aspect-video overflow-hidden rounded-xl"
        >
          <Image
            src="/Port63_4.webp"
            alt="SoPets team winning Port 63 Challenge"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="prose prose-invert mx-auto max-w-none prose-headings:text-white prose-a:text-purple-400"
        >
          <p className="text-lg leading-relaxed text-gray-300">
            We're thrilled to announce that SoPets has secured first place in the Innovation category at the NTU Port63 Challenge! Our vision of creating a social-driven pet ecosystem where digital companions evolve through real-world interactions captured the judges' imagination and earned us the top spot. 🎉
          </p>

          <h2 className="mt-12 text-2xl font-bold text-white">Meet the Team Behind SoPets</h2>
          <br></br>
          <ul className="list-disc space-y-4 pl-6 text-gray-300">
            <li><strong className="text-white">Lee Yue Hang</strong> - NTU Undergraduate, College of Computing and Data Science</li>
            <li><strong className="text-white">Soong Jun Shen (Bryan)</strong> - NTU Undergraduate, College of Computing and Data Science</li>
            <li><strong className="text-white">Jani Lim Hui</strong> - NTU Undergraduate, School of Art Design and Media</li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-white">The Port63 Challenge Journey</h2>
          <br></br>
          <p className="text-gray-300">
            The Final Pitch Day on March 14, 2025, marked the culmination of an intensive six-month journey. Competing against 14 finalist teams across three themes - Innovation, Social Impact, and Public Safety and Security - our team showcased how SoPets is revolutionizing the way people connect through digital companionship.
          </p>
          <br></br>
          <p className="text-gray-300">
            Throughout the challenge, we benefited from invaluable workshops, mentorship sessions, and exclusive site tours provided by NTU I&E and industry partners, including HackQuest, SG Enable, and Hatch. These experiences were instrumental in refining our vision for SoPets.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src="/Port63_1.webp"
                alt="Port 63 Challenge Event"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src="/Port63_2.jpg"
                alt="Port 63 Challenge Presentation"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src="/Port63_3.jpg"
                alt="Port 63 Challenge Team"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src="/Port63_4.webp"
                alt="Port 63 Challenge Award Ceremony"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <h2 className="mt-12 text-2xl font-bold text-white">Impact and Innovation</h2>
          <p className="text-gray-300">
            The Port63 Challenge exemplifies the transformative power of innovation challenges in providing students with hands-on, immersive learning experiences. As a flagship program of NTU Innovation and Entrepreneurship, it goes beyond conventional education, enabling participants to apply their knowledge and tackle real-world challenges head-on.
          </p>
          <br></br>
          <p className="text-gray-300">
            Our success in the Innovation category validates our vision for SoPets and motivates us to continue pushing boundaries in digital pet companionship. We're excited to bring this vision to life and create meaningful connections in the digital world.
          </p>

          <div className="mt-12 rounded-xl bg-purple-900/20 p-6">
            <h3 className="text-xl font-bold text-white">What's Next for SoPets?</h3>
            <p className="mt-4 text-gray-300">
              This victory is just the beginning! We're working hard to bring SoPets to life, and we can't wait to share our progress with you. Want to know what's coming next? Check out our <Link href="/blog/sopets-roadmap" className="text-purple-400 hover:text-purple-300">detailed roadmap</Link> to see our exciting plans for the future!
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/"
            className="inline-block rounded-full bg-purple-500 px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-purple-600"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </article>
  );
} 