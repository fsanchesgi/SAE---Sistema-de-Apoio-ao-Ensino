// supabase_client.js
document.addEventListener("DOMContentLoaded", function() {
    if (typeof supabase === 'undefined') {
        console.error("Supabase JS não carregada! Verifique a ordem dos scripts.");
        return;
    }

    var supabaseUrl = 'https://vhwhjnghtmlrfieiwssi.supabase.co';
    var supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZod2hqbmdodG1scmZpZWl3c3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTM4OTUsImV4cCI6MjA4MTU2OTg5NX0.XV6vxBeRtIcDNEGsJuDU_wPcnm2qmK8ZoHEuHQR2TMU';

    window.supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
});
