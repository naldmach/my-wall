import { NextResponse } from 'next/server';
import { supabase } from '../../supabaseClient';

export async function GET() {
  const { error } = await supabase.from('posts').select('id').limit(1);
  if (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
  return NextResponse.json({ success: true });
} 