// Cliente Supabase usando CDN (SEM import, SEM module)

const supabaseUrl = "https://vhwhjnghtmlrfieiwssi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZod2hqbmdodG1scmZpZWl3c3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTM4OTUsImV4cCI6MjA4MTU2OTg5NX0.XV6vxBeRtIcDNEGsJuDU_wPcnm2qmK8ZoHEuHQR2TMU";

// 🔴 VALIDA SE A CDN CARREGOU
if (!window.supabase) {
  console.error("❌ Supabase CDN não carregou.");
} else {
  // ✅ cria o client de forma segura
  window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

  console.log("✅ Supabase inicializado com sucesso");
}
