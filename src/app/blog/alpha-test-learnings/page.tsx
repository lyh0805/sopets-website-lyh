'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AlphaTestBlogPost() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-purple-900/20 via-black to-black pb-24 pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="mb-2 inline-block rounded-full bg-purple-500 px-3 py-1 text-sm font-medium text-white">
            Development
          </span>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            SoPets Alpha Test: What We Learned & How It's Shaping Our Future 🚀
          </h1>
          <time className="text-gray-400">March 10, 2025</time>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-12 aspect-video overflow-hidden rounded-xl"
        >
          <Image
            src="/tips_tricks.jpg"
            alt="SoPets Alpha Test"
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
            On January 4, 2025, we launched the first-ever Alpha Test for SoPets, inviting our earliest supporters to try out the platform. This phase was a massive learning experience, and as it comes to an end, we're excited to share what we've learned and how it's shaping the next version of SoPets.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-white">What We Tested</h2>
          <p className="text-gray-300">
            The Alpha Test focused on cross-platform functionality, allowing SoPets to move between devices. However, we quickly learned that setting this up was too tedious for most testers, making it difficult for them to experience the feature as intended.
          </p>
          <br></br>
          <p className="text-gray-300">
            We also introduced Tap to Deploy, a way to manually send your SoPet between devices. While innovative, it didn't align with the seamless experience we envisioned. This led us to create the Presence System, which will be a game-changer—stay tuned for more details!
          </p>

          <h2 className="mt-12 text-2xl font-bold text-white">Key Insights</h2>
          <br></br>
          <ul className="list-disc space-y-4 pl-6 text-gray-300">
            <li><strong className="text-white">Feature Expectations:</strong> Many users expected more of a game-like experience, especially since they primarily used SoPets on mobile. However, our focus was on a desktop companion.</li>
            <li><strong className="text-white">User Friction:</strong> Cross-platform functionality had too many setup steps, leading us to rethink how SoPets should travel between devices.</li>
            <li><strong className="text-white">Refining Our Vision:</strong> We realized that at its core, SoPets is a 24/7 digital companion—not just a game. The next beta test will focus on companionship on desktop to bring that vision to life.</li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-white">What's Next?</h2>
          <p className="text-gray-300">
            We've learned a lot from this Alpha Test, and it's helped shape our vision for the future of SoPets. Want to know what's coming next? Check out our detailed roadmap in our latest post: <Link href="/blog/sopets-roadmap" className="text-purple-400 hover:text-purple-300">SoPets Roadmap: What's Next? </Link>
          </p>
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