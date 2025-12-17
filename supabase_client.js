// Espera a janela carregar completamente, garantindo que supabase esteja definido
window.addEventListener('load', () => {
    if (typeof supabase === 'undefined') {
        console.error("Supabase JS não carregada! Verifique a ordem dos scripts.");
        return;
    }

    const supabaseUrl = 'https://vhwhjnghtmlrfieiwssi.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZod2hqbmdodG1scmZpZWl3c3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTM4OTUsImV4cCI6MjA4MTU2OTg5NX0.XV6vxBeRtIcDNEGsJuDU_wPcnm2qmK8ZoHEuHQR2TMU';

    // Cliente global
    window.supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
    console.log("SupabaseClient carregado com sucesso!");
});
