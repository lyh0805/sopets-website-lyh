export type PlayStyle = 'Pet Collector' | 'Cozy Observer' | 'Tap To Connect' | 'Other';
export type DiscoverySource = 'Instagram' | 'Tiktok' | 'Reddit' | 'X' | 'Word of Mouth' | 'Friends of Development Team Members' | 'Other';
export type GameGenre = 
  | 'Collections / Gacha Games'
  | 'Casual mobile games'
  | 'Competitive Mobile Games'
  | 'PC Competitive games'
  | 'PC Role Playing Games'
  | 'PC Cozy games'
  | 'Web3 Games'
  | 'Aesthetical Games'
  | 'I don\'t play games'
  | 'Other';

export interface BetaRegistration {
  id: string;
  email: string;
  discord_username: string;
  telegram_handle: string;
  playstyle: PlayStyle;
  playstyle_other?: string;
  discovery_source: DiscoverySource;
  discovery_source_other?: string;
  game_genres: GameGenre[];
  game_genres_other?: string;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
  welcome_email_sent: boolean;
} 