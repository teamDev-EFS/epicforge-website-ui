import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  business_type?: string;
  budget: string;
  project_type: string;
  timeline?: string;
  problem: string;
  language: string;
  source: 'ai_chat' | 'form';
  qualified: boolean;
  created_at?: string;
}

export const saveLead = async (lead: Omit<Lead, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('leads')
    .insert([lead])
    .select()
    .single();

  if (error) {
    console.error('Error saving lead:', error);
    throw error;
  }

  return data;
};