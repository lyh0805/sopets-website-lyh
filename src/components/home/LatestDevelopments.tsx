'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  slug: string;
  link: string;
}

const articles: Article[] = [
  // {
  //   id: "2",
  //   title: "SoPets Roadmap: What's Next? 🎉",
  //   excerpt: "Exciting updates ahead! From island customization to real-world roaming, discover our three-phase beta rollout starting June 22nd. Experience furniture interactions, global socialization, and location-based pet visits!",
  //   date: "2025-06-13",
  //   image: "/community_spotlight.jpg",
  //   category: "Updates",
  //   slug: "sopets-roadmap",
  //   link: "/blog/sopets-roadmap"
  // },
  {
    id: "1",
    title: "SoPets Wins 1st Place in Port 63 Challenge! 🏆",
    excerpt: "The final theme of the Port 63 Challenge, Web3, was secured by Team GEEK AND JEEK with SoPets, a social-driven pet ecosystem where NFT pets evolve through real-world interactions. 🏆",
    date: "2025-03-22",
    image: "/Port63_4.webp",
    category: "Awards",
    slug: "port63-challenge-win",
    link: "/blog/port63-challenge-win"
  },
  {
    id: '3',
    title: "SoPets Alpha Test: What We Learned & How It's Shaping Our Future 🚀",
    excerpt: "Discover the insights from our Alpha Test and get a sneak peek at what's coming next, including the new Presence System and exciting beta tests!",
    date: '2024-03-10',
    image: '/tips_tricks.jpg',
    category: 'Development',
    slug: 'alpha-test-learnings',
    link: '/blog/alpha-test-learnings'
  }
];

const ArticleCard = ({ article }: { article: Article }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      className="group overflow-hidden rounded-xl bg-white/5 backdrop-blur-lg"
    >
      <Link href={article.link} className="block focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded-xl">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="rounded-full bg-purple-500 px-3 py-1 text-xs font-medium text-white">
              {article.category}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <time className="text-sm text-gray-400">
            {new Date(article.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
          <h3 className="mt-2 text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
            {article.title}
          </h3>
          <p className="mt-3 text-gray-300">
            {article.excerpt}
          </p>
        </div>
      </Link>
    </motion.article>
  );
};

const LatestDevelopments = () => {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-purple-900/20" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Latest Developments
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-lg text-gray-300">
            Stay up to date with the latest news, updates, and community highlights
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestDevelopments; 