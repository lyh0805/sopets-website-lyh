'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';

const QRScanner = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
  const mintingUrl = `${baseUrl}/mint`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-900 to-black px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="mb-8 text-4xl font-bold text-white">
          Start Your SoPet Journey
        </h1>
        <p className="mb-12 text-lg text-gray-300">
          Scan the QR code with your mobile device to begin your adventure
        </p>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="inline-block overflow-hidden rounded-2xl bg-white p-6 shadow-2xl"
        >
          <QRCodeSVG
            value={mintingUrl}
            size={256}
            level="H"
            includeMargin={true}
            className="rounded-xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <p className="text-sm text-gray-400">
            Or visit directly at:
            <br />
            <span className="font-mono text-purple-400">
              {mintingUrl}
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default QRScanner; 