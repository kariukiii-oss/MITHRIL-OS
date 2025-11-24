import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase URL or Key is missing in .env');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');

export interface Report {
    reporter_hash: string;
    message_text: string;
    image_url?: string;
    latitude: number;
    longitude: number;
    ndvi: number;
    mi: number;
    ndmi: number;
    status: 'CRITICAL' | 'BAD' | 'OKAY';
    category?: string;
}

export const saveReport = async (report: Report) => {
    const { data, error } = await supabase
        .from('reports')
        .insert([report])
        .select();

    if (error) {
        console.error('Error saving report to Supabase:', error);
        throw error;
    }
    return data;
};
