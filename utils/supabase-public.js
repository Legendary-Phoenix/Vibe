import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnbXVkbXhkZ3R1ZHNncG1wYWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2NzQzMjMsImV4cCI6MjA2MjI1MDMyM30.Q8Bq1yqoLrVALoxotA-n68F93W6TDYpQ-WAcf5Vym9s";
const SUPABASE_URL="https://rgmudmxdgtudsgpmpabn.supabase.co";

const supabase=createClient(SUPABASE_URL,SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;
