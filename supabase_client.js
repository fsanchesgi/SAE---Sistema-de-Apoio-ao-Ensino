// supabase_client.js
// Inicialização do Supabase v2
const supabaseUrl = "https://vhwhjnghtmlrfieiwssi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZod2hqbmdodG1scmZpZWl3c3NpIiwicm9sZSI6ImFub3QiLCJpYXQiOjE3NjU5OTM4OTUsImV4cCI6MjA4MTU2OTg5NX0.XV6vxBeRtIcDNEGsJuDU_wPcnm2qmK8ZoHEuHQR2TMU";

// CORRETO: usar 'supabaseJs.createClient'
const supabase = supabaseJs.createClient(supabaseUrl, supabaseKey);
