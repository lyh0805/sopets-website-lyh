import dynamic from 'next/dynamic';

const MixAndMatchTest = dynamic(() => import('@/components/MixAndMatchTest').then(mod => mod.MixAndMatchTest), {
  ssr: false
});

export default function MixedPage() {
  return (
    <div className="w-full h-screen bg-gray-900">
      <MixAndMatchTest />
    </div>
  );
} 