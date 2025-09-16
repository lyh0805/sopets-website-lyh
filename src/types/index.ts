export interface Pet {
  id: string;
  name: string;
  description: string;
  image: string;
  traits: string[];
}

export interface Trait {
  category: string;
  name: string;
  description: string;
  preview: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

export type MintingStep = 'auth' | 'hatch' | 'customize' | 'minting';
export type MintingStatus = 'idle' | 'processing' | 'success' | 'error'; 