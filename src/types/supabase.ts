export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      beta_registrations: {
        Row: {
          id: string
          email: string
          discord_username: string
          telegram_handle: string
          playstyle: string
          playstyle_other: string | null
          discovery_source: string
          discovery_source_other: string | null
          game_genres: string[]
          game_genres_other: string | null
          created_at: string
          status: 'pending' | 'approved' | 'rejected'
          welcome_email_sent: boolean
        }
        Insert: {
          id?: string
          email: string
          discord_username: string
          telegram_handle: string
          playstyle: string
          playstyle_other?: string | null
          discovery_source: string
          discovery_source_other?: string | null
          game_genres: string[]
          game_genres_other?: string | null
          created_at?: string
          status?: 'pending' | 'approved' | 'rejected'
          welcome_email_sent?: boolean
        }
        Update: {
          id?: string
          email?: string
          discord_username?: string
          telegram_handle?: string
          playstyle?: string
          playstyle_other?: string | null
          discovery_source?: string
          discovery_source_other?: string | null
          game_genres?: string[]
          game_genres_other?: string | null
          created_at?: string
          status?: 'pending' | 'approved' | 'rejected'
          welcome_email_sent?: boolean
        }
      }
    }
    Views: {
      decrypted_beta_registrations: {
        Row: {
          id: string
          email: string
          discord_username: string
          telegram_handle: string
          playstyle: string
          playstyle_other: string | null
          discovery_source: string
          discovery_source_other: string | null
          game_genres: string[]
          game_genres_other: string | null
          created_at: string
          status: 'pending' | 'approved' | 'rejected'
          welcome_email_sent: boolean
        }
      }
    }
    Functions: {
      decrypt_beta_registration: {
        Args: {
          registration: Database['public']['Tables']['beta_registrations']['Row']
        }
        Returns: Database['public']['Tables']['beta_registrations']['Row']
      }
      encrypt_beta_registration: {
        Args: Record<string, never>
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
