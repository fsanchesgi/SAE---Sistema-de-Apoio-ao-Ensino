// supabase_client.js
// Atenção: deve ser incluído APÓS a biblioteca Supabase
var supabaseUrl = 'https://vhwhjnghtmlrfieiwssi.supabase.co';
var supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZod2hqbmdodG1scmZpZWl3c3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTM4OTUsImV4cCI6MjA4MTU2OTg5NX0.XV6vxBeRtIcDNEGsJuDU_wPcnm2qmK8ZoHEuHQR2TMU';

if (typeof supabase !== 'undefined') {
    var supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
} else {
    console.error("Supabase JS não carregada! Verifique a ordem dos scripts.");
}
