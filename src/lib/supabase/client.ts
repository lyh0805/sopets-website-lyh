import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { supabaseConfig } from './config';

export const supabase = createClient<Database>(
  supabaseConfig.url,
  supabaseConfig.anonKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: true,
      detectSessionInUrl: false
    },
    global: {
      headers: {
        'x-application-name': 'sopets-beta'
      }
    },
    db: {
      schema: 'public'
    }
  }
);

// Test the connection and table access
export async function testSupabaseConnection(): Promise<{ success: boolean; data?: any; error?: any }> {
  try {
    console.log('Testing Supabase connection...');
    console.log('URL:', supabaseConfig.url);
    
    // Test basic connection
    const { data: registrations, error: registrationsError } = await supabase
      .from('beta_registrations')
      .select('*')
      .limit(1);

    if (registrationsError) {
      console.error('Error accessing beta_registrations:', registrationsError);
      return { 
        success: false, 
        error: registrationsError 
      };
    }

    // Count total registrations
    const { count, error: countError } = await supabase
      .from('beta_registrations')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Error counting registrations:', countError);
      return { 
        success: false, 
        error: countError 
      };
    }

    console.log('Supabase connection test successful');
    console.log('Total registrations:', count);
    console.log('Sample registration:', registrations?.[0]);

    return { 
      success: true, 
      data: { 
        totalRegistrations: count, 
        sampleRegistration: registrations?.[0] 
      } 
    };
  } catch (error) {
    console.error('Unexpected error during connection test:', error);
    return { 
      success: false, 
      error 
    };
  }
} 