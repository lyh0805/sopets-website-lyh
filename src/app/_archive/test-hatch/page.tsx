'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const TestEggHatch = dynamic(() => import('@/components/test/TestEggHatch'), { ssr: false });

export default function TestHatchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900/20 via-black to-black flex items-center justify-center p-4">
      <TestEggHatch />
    </div>
  );
} 