import { supabase } from '../lib/supabase';
import type { Writing, Ranking, RoundtableSession, ContentStatus, ContentCategory, MediaType, Database } from '@/types/database.types';

// Re-export types for backward compatibility
export type { ContentStatus, ContentCategory, MediaType, Writing, Ranking, RoundtableSession };
export type RankingTier = 's_tier' | 'a_tier' | 'b_tier' | 'c_tier' | 'd_tier' | 'f_tier';
export type MediaItem = Database['public']['Tables']['media_items']['Row'];

export interface ContentStats {
  total_writings: number;
  total_rankings: number;
  total_roundtables: number;
  total_media: number;
  published_content: number;
  draft_content: number;
}

// Writings Service
export const writingsService = {
  async getAll(filters?: { status?: ContentStatus; category?: ContentCategory; search?: string }) {
    try {
      let query = supabase.from('writings').select('*').order('created_at', { ascending: false });

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.category) {
        query = query.eq('category', filters.category);
      }
      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Writing[];
    } catch (error) {
      console.error('Error fetching writings:', error);
      throw error;
    }
  },

  async getById(id: string) {
    try {
      const { data, error } = await supabase.from('writings').select('*').eq('id', id).single();
      if (error) throw error;
      return data as Writing;
    } catch (error) {
      console.error('Error fetching writing:', error);
      throw error;
    }
  },

  async create(writing: Partial<Writing>) {
    try {
      const { data, error } = await (supabase as any).from('writings').insert([writing]).select().single();
      if (error) throw error;
      return data as Writing;
    } catch (error) {
      console.error('Error creating writing:', error);
      throw error;
    }
  },

  async update(id: string, updates: Partial<Writing>) {
    try {
      const { data, error } = await (supabase as any).from('writings').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data as Writing;
    } catch (error) {
      console.error('Error updating writing:', error);
      throw error;
    }
  },

  async delete(id: string) {
    try {
      const { error } = await supabase.from('writings').delete().eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting writing:', error);
      throw error;
    }
  },
};

// Rankings Service
export const rankingsService = {
  async getAll(filters?: { status?: ContentStatus; category?: ContentCategory; tier?: RankingTier }) {
    try {
      let query = supabase.from('rankings').select('*').order('ranking_position', { ascending: true });

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.category) {
        query = query.eq('category', filters.category);
      }
      if (filters?.tier) {
        query = query.eq('tier', filters.tier);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Ranking[];
    } catch (error) {
      console.error('Error fetching rankings:', error);
      throw error;
    }
  },

  async getById(id: string) {
    try {
      const { data, error } = await supabase.from('rankings').select('*').eq('id', id).single();
      if (error) throw error;
      return data as Ranking;
    } catch (error) {
      console.error('Error fetching ranking:', error);
      throw error;
    }
  },

  async create(ranking: Partial<Ranking>) {
    try {
      const { data, error } = await (supabase as any).from('rankings').insert([ranking]).select().single();
      if (error) throw error;
      return data as Ranking;
    } catch (error) {
      console.error('Error creating ranking:', error);
      throw error;
    }
  },

  async update(id: string, updates: Partial<Ranking>) {
    try {
      const { data, error } = await (supabase as any).from('rankings').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data as Ranking;
    } catch (error) {
      console.error('Error updating ranking:', error);
      throw error;
    }
  },

  async delete(id: string) {
    try {
      const { error } = await supabase.from('rankings').delete().eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting ranking:', error);
      throw error;
    }
  },
};

// Roundtable Sessions Service
export const roundtableService = {
  async getAll(filters?: { status?: ContentStatus; category?: ContentCategory }) {
    try {
      let query = supabase.from('roundtable_sessions').select('*').order('session_date', { ascending: false });

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as RoundtableSession[];
    } catch (error) {
      console.error('Error fetching roundtable sessions:', error);
      throw error;
    }
  },

  async getById(id: string) {
    try {
      const { data, error } = await supabase.from('roundtable_sessions').select('*').eq('id', id).single();
      if (error) throw error;
      return data as RoundtableSession;
    } catch (error) {
      console.error('Error fetching roundtable session:', error);
      throw error;
    }
  },

  async create(session: Partial<RoundtableSession>) {
    try {
      const { data, error } = await (supabase as any).from('roundtable_sessions').insert([session]).select().single();
      if (error) throw error;
      return data as RoundtableSession;
    } catch (error) {
      console.error('Error creating roundtable session:', error);
      throw error;
    }
  },

  async update(id: string, updates: Partial<RoundtableSession>) {
    try {
      const { data, error } = await (supabase as any).from('roundtable_sessions').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data as RoundtableSession;
    } catch (error) {
      console.error('Error updating roundtable session:', error);
      throw error;
    }
  },

  async delete(id: string) {
    try {
      const { error } = await supabase.from('roundtable_sessions').delete().eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting roundtable session:', error);
      throw error;
    }
  },
};

// Media Items Service
export const mediaService = {
  async getAll(filters?: { status?: ContentStatus; media_type?: MediaType; category?: ContentCategory }) {
    try {
      let query = supabase.from('media_items').select('*').order('created_at', { ascending: false });

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.media_type) {
        query = query.eq('media_type', filters.media_type);
      }
      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as MediaItem[];
    } catch (error) {
      console.error('Error fetching media items:', error);
      throw error;
    }
  },

  async getById(id: string) {
    try {
      const { data, error } = await supabase.from('media_items').select('*').eq('id', id).single();
      if (error) throw error;
      return data as MediaItem;
    } catch (error) {
      console.error('Error fetching media item:', error);
      throw error;
    }
  },

  async create(item: Partial<MediaItem>) {
    try {
      const { data, error } = await (supabase as any).from('media_items').insert([item]).select().single();
      if (error) throw error;
      return data as MediaItem;
    } catch (error) {
      console.error('Error creating media item:', error);
      throw error;
    }
  },

  async update(id: string, updates: Partial<MediaItem>) {
    try {
      const { data, error } = await (supabase as any).from('media_items').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data as MediaItem;
    } catch (error) {
      console.error('Error updating media item:', error);
      throw error;
    }
  },

  async delete(id: string) {
    try {
      const { error } = await supabase.from('media_items').delete().eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting media item:', error);
      throw error;
    }
  },
};

// Content Statistics Service
export const contentStatsService = {
  async getStats(): Promise<ContentStats> {
    try {
      const { data, error } = await supabase.rpc('get_content_stats');
      if (error) throw error;
      return data as ContentStats;
    } catch (error) {
      console.error('Error fetching content stats:', error);
      throw error;
    }
  },
};