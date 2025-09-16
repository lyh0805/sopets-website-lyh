const SUPABASE_URL = 'https://ekulmttermsssufmrutp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrdWxtdHRlcm1zc3N1Zm1ydXRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMDU3MjEsImV4cCI6MjA2OTY4MTcyMX0.vcKxujWGiOZ8LqQDZv7yDge3Oxz7DbXPa4Tx-YcLMIY';

// Verify URL format
try {
  new URL(SUPABASE_URL);
} catch (error) {
  throw new Error(
    `Invalid SUPABASE_URL: ${SUPABASE_URL}. Must be a valid URL.`
  );
}

export const supabaseConfig = {
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY,
} as const; 