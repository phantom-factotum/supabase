import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://tbggzjwbghonkkfrwiiv.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiZ2d6andiZ2hvbmtrZnJ3aWl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYyMzY0ODQsImV4cCI6MTk5MTgxMjQ4NH0.nIsij5sgM5vFKNGVD4EAIcUkuEhDPGbUeRcSXgPbZS4';

type Database = {
  public:{
    tables:{
      clients:{
        rows:{
          
        }
      }
    }
  }
}
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

