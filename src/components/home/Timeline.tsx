'use client';

import React from 'react';
import { motion } from 'framer-motion';

const phases = [
  {
    id: 1,
    date: "Now",
    title: "SoPets Desktop Open Beta V1",
    badge: "Live",
    color: "bg-green-500",
    summary: "✨ Start your cozy adventure on desktop today.",
    points: [
      "Adopt your free random starter SoPet",
      "Pet, feed, and share gentle moments together",
      "Designed for calm, non-distracting companionship"
    ],
    cta: { label: "Join our community!", href: "https://discord.com/invite/V3YneV4Wzs" },
    helper: "Come and and interact with other SoPets players from all around the world!"
  },
  {
    id: 2,
    date: "Late Sep 2025",
    title: "SoPets Desktop Open Beta V2",
    badge: "Incoming",
    color: "bg-amber-500",
    summary: "Your SoPets world gets a little livelier.",
    points: [
      "Hatch your first SoPet egg on desktop",
      "Enjoy new idle and playful animations",
      "Switch between different pets in your collection",
    ],
    cta: { label: "Coming Soon" }
  },
  {
    id: 3,
    date: "Late Sep 2025",
    title: "SoPets Mobile Closed Beta",
    badge: "In Prep",
    color: "bg-blue-500",
    summary: "A sneak peek on mobile.",
    points: [
      "Tap to connect with friends and discover new SoPets",
      "Breed eggs together for gentle surprises",
    ],
    cta: { label: "Coming soon" }
  },
  {
    id: 4,
    date: "Late Oct 2025",
    title: "SoPets Mobile Open Beta",
    badge: "Target",
    color: "bg-purple-500",
    summary: "Bring SoPets anywhere.",
    points: [
      "Public sign-ups for all players",
      "Tap phones with friends to collect, breed, and share SoPets",
      "Grow your island with unique companions",
      "Cross-platform login with Apple/Google"
    ],
    cta: { label: "Coming Soon" }
  },
  {
    id: 5,
    date: "Late December 2025",
    title: "Mobile Open Beta",
    badge: "Planned",
    color: "bg-slate-500",
    summary: "Your SoPet, wherever you are.",
    points: [
      "Seamless presence across desktop and mobile",
      "Collect on mobile, relax with companionship on desktop"
    ],
    cta: { label: "Coming soon" }
  },
  {
    id: 6,
    date: "2026+",
    title: "Official Launch — A Growing Cozy World",
    badge: "Planned",
    color: "bg-slate-500",
    summary: "The SoPets universe expands.",
    points: [
      "Multi-player island gatherings",
      "Seasonal events",
      "New pet natures and behaviors",
      "Nearby connections with friends on desktop"
    ],
    cta: { label: "Coming soon" }
  }
];

export default function Timeline() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-purple-900/20 to-black">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-purple-500 px-4 py-2 text-sm font-medium text-white">
            Roadmap
          </span>
          <h2 className="mb-6 text-4xl font-extrabold text-white sm:text-5xl">
          The SoPets Journey
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          We’re crafting SoPets with care — focusing on companionship and gentle ways to connect. The timeline may shift as we polish things to enable the best possible experience.
          </p>
        </motion.div>

        {/* Current Phase - Highlighted */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="mb-8 text-2xl font-bold text-white text-center">Current Phase</h3>
          
          <div className="rounded-2xl border-2 border-green-500 bg-gradient-to-r from-green-500/10 to-green-400/10 backdrop-blur p-6 shadow-lg">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="text-sm font-semibold tracking-wide uppercase text-green-400">
                {phases[0].date}
              </div>
              <span className="inline-flex items-center rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-white">
                {phases[0].badge}
              </span>
            </div>

            <h4 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {phases[0].title}
            </h4>

            <p className="text-gray-300 mb-6">{phases[0].summary}</p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-200 mb-6">
              {phases[0].points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-2 w-2 rounded-full bg-green-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={phases[0].cta.href}
                className="inline-flex items-center rounded-xl bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition-colors"
              >
                {phases[0].cta.label}
              </a>
              {phases[0].helper && (
                <span className="text-sm text-gray-400">
                  {phases[0].helper}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="mb-8 text-2xl font-bold text-white text-center">What's Next</h3>
          
          <ol className="relative border-s border-gray-700">
            {phases.slice(1).map((phase, idx) => (
              <motion.li 
                key={phase.id} 
                className="ms-6 pb-10 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
              >
                {/* Timeline Node */}
                <span className={`absolute -start-2.5 mt-2 h-5 w-5 rounded-full ring-4 ring-black ${phase.color}`} />

                {/* Card */}
                <div className="rounded-2xl border border-gray-700 bg-gray-900/60 backdrop-blur p-5 shadow-sm hover:shadow-md hover:bg-gray-900/80 transition-all">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-semibold tracking-wide uppercase text-gray-400">
                      {phase.date}
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white ${phase.color}`}>
                      {phase.badge}
                    </span>
                  </div>

                  <h4 className="mt-2 text-xl sm:text-2xl font-bold text-white">
                    {phase.title}
                  </h4>

                  <p className="mt-2 text-sm text-gray-300">{phase.summary}</p>

                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-200">
                    {phase.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-gray-400" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <a
                      href={phase.cta.href}
                      className="inline-flex items-center rounded-xl border border-gray-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                    >
                      {phase.cta.label}
                    </a>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="rounded-2xl border border-dashed border-gray-600 p-6 text-center text-sm text-gray-400"
        >
          Subject to change. Features may roll out gradually by region/device. Join Discord for announcements and early access opportunities.
        </motion.div>
      </div>
    </section>
  );
}