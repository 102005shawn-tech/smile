// config.js
const SUPABASE_URL = "https://xvvnuhdlwyofquobqrmr.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_gtD0qZwDgDSuK1zLrZeFGw_yZaGWcSI";

// 初始化 Supabase
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);