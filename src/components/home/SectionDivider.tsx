import React from 'react';

interface SectionDividerProps {
  from?: string;
  via?: string;
  to?: string;
  height?: string;
}

const SectionDivider = ({
  from = 'from-purple-900/30',
  via = 'via-purple-600/20',
  to = 'to-black',
  height = 'h-32'
}: SectionDividerProps) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className={`absolute inset-x-0 ${height} bg-gradient-to-b ${from} ${via} ${to}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(88,28,135,0.1),transparent_70%)] animate-pulse" />
    </div>
  );
};

export default SectionDivider; 