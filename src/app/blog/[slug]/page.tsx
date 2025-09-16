'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Blog post data
const blogPosts = {
  'breeding-update': {
    title: 'Breeding System Update',
    date: '2024-03-10',
    category: 'Development',
    image: '/breeding_update.jpg',
    content: `
      <h2>Introducing SoPets Breeding System</h2>
      <p>We're excited to announce our upcoming breeding system, a groundbreaking feature that will allow your SoPets to create unique offspring with inherited traits and characteristics.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Genetic Trait Inheritance: Offspring inherit a combination of traits from both parent pets</li>
        <li>Rarity System: Certain trait combinations can result in rare or legendary pets</li>
        <li>Cooldown Periods: Strategic breeding timing for balanced gameplay</li>
        <li>Breeding Tokens: Special tokens required for breeding, adding value to the ecosystem</li>
      </ul>

      <h3>How It Works</h3>
      <p>The breeding system uses a sophisticated algorithm that combines the genetic traits of both parent pets. Each trait has a probability of being passed down, with some rare combinations potentially resulting in unique characteristics.</p>

      <h3>Launch Timeline</h3>
      <p>The breeding system will be launched in phases:</p>
      <ol>
        <li>Beta Testing (Q2 2024)</li>
        <li>Community Feedback Period</li>
        <li>System Refinement</li>
        <li>Full Launch (Q3 2024)</li>
      </ol>

      <h3>Community Impact</h3>
      <p>This update will create new opportunities for pet collectors and enhance the overall gaming experience. Stay tuned for more details and join our beta testing program!</p>
    `,
  },
  'community-spotlight': {
    title: 'Community Spotlight: March 2024',
    date: '2024-03-10',
    category: 'Community',
    image: '/community_spotlight.jpg',
    content: `
      <h2>Celebrating Our Amazing Community</h2>
      <p>This month, we're highlighting the incredible achievements and contributions of our SoPets community members.</p>

      <h3>Featured Creator: @PetMaster</h3>
      <p>@PetMaster has created an impressive collection of themed SoPets, showcasing the versatility of our customization system. Their "Celestial Collection" has inspired many other creators in our community.</p>

      <h3>Community Events</h3>
      <ul>
        <li>Weekly Pet Showcases</li>
        <li>Virtual Pet Meetups</li>
        <li>Art Contests</li>
        <li>Trading Events</li>
      </ul>

      <h3>Community Achievements</h3>
      <p>Our community has reached several milestones this month:</p>
      <ul>
        <li>Over 10,000 active members</li>
        <li>5,000+ unique SoPets created</li>
        <li>1,000+ daily active users</li>
        <li>100+ community events organized</li>
      </ul>

      <h3>Looking Forward</h3>
      <p>We're planning even more community events and features based on your feedback. Stay tuned for exciting announcements!</p>
    `,
  },
  'tips-tricks': {
    title: 'Essential Tips & Tricks for New Players',
    date: '2024-03-10',
    category: 'Guide',
    image: '/tips_tricks.jpg',
    content: `
      <h2>Getting Started with SoPets</h2>
      <p>Whether you're new to SoPets or looking to improve your pet care skills, these tips will help you make the most of your experience.</p>

      <h3>1. Choosing Your First Pet</h3>
      <p>Consider these factors when selecting your starter pet:</p>
      <ul>
        <li>Personality traits that match your play style</li>
        <li>Care requirements that fit your schedule</li>
        <li>Special abilities that interest you</li>
        <li>Rarity and potential value</li>
      </ul>

      <h3>2. Daily Care Routine</h3>
      <p>Establish a consistent care routine:</p>
      <ul>
        <li>Morning: Feed and exercise your pet</li>
        <li>Afternoon: Training and social activities</li>
        <li>Evening: Grooming and bonding time</li>
      </ul>

      <h3>3. Advanced Tips</h3>
      <ul>
        <li>Participate in daily events for bonus rewards</li>
        <li>Join a community group for trading and tips</li>
        <li>Save rare items for special occasions</li>
        <li>Track your pet's progress with the journal feature</li>
      </ul>

      <h3>4. Common Mistakes to Avoid</h3>
      <p>Learn from experienced players and avoid these common pitfalls:</p>
      <ul>
        <li>Neglecting daily care tasks</li>
        <li>Rushing through training sessions</li>
        <li>Ignoring community events</li>
        <li>Forgetting to update your pet's environment</li>
      </ul>
    `,
  },
};

const BlogPost = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-900/20 via-black to-black">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Post Not Found</h1>
          <Link href="/" className="mt-4 inline-block text-purple-400 hover:text-purple-300">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gradient-to-b from-purple-900/20 via-black to-black pb-24 pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="mb-2 inline-block rounded-full bg-purple-500 px-3 py-1 text-sm font-medium text-white">
            {post.category}
          </span>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            {post.title}
          </h1>
          <time className="text-gray-400">
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-12 aspect-video overflow-hidden rounded-xl"
        >
          <Image
            src={post.image}
            alt={post.title}
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
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

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
};

export default BlogPost; 