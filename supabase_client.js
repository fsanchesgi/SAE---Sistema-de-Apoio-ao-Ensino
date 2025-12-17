// supabase_client.js
// Este arquivo será executado APÓS a biblioteca Supabase carregar
if (typeof supabase === 'undefined') {
    console.error("Supabase JS não carregada! Verifique a ordem dos scripts.");
} else {
    const supabaseUrl = 'https://vhwhjnghtmlrfieiwssi.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZod2hqbmdodG1scmZpZWl3c3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTM4OTUsImV4cCI6MjA4MTU2OTg5NX0.XV6vxBeRtIcDNEGsJuDU_wPcnm2qmK8ZoHEuHQR2TMU';

    // Cria o cliente global
    window.supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
}
