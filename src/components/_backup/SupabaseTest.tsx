'use client';

import { useEffect, useState } from 'react';
import { testSupabaseConnection } from '@/lib/supabase/client';
import { supabaseConfig } from '@/lib/supabase/config';

export default function SupabaseTest() {
  const [status, setStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        const isConnected = await testSupabaseConnection();
        setStatus(isConnected ? 'success' : 'error');
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }

    testConnection();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg bg-white/10 backdrop-blur-sm text-white">
      <h3 className="text-lg font-semibold mb-2">Supabase Connection Status</h3>
      <div className="space-y-2">
        <p>
          <strong>URL:</strong> {supabaseConfig.url}
        </p>
        <p>
          <strong>Status:</strong>{' '}
          <span
            className={
              status === 'testing'
                ? 'text-yellow-400'
                : status === 'success'
                ? 'text-green-400'
                : 'text-red-400'
            }
          >
            {status === 'testing' ? 'Testing...' : status === 'success' ? 'Connected' : 'Error'}
          </span>
        </p>
        {error && (
          <p className="text-red-400">
            <strong>Error:</strong> {error}
          </p>
        )}
      </div>
    </div>
  );
} 