// Conexão com Supabase
const supabaseUrl = 'https://vhwhjnghtmlrfieiwssi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZod2hqbmdodG1scmZpZWl3c3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTM4OTUsImV4cCI6MjA4MTU2OTg5NX0.XV6vxBeRtIcDNEGsJuDU_wPcnm2qmK8ZoHEuHQR2TMU';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Função logout genérica
async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'login.html';
}

// Função para pegar perfil logado
async function getPerfil() {
  const user = supabase.auth.user?.id || supabase.auth.session()?.user?.id;
  if (!user) {
    window.location.href = 'login.html';
    return null;
  }

  const { data, error } = await supabase.from('profiles').select('*').eq('id', user).single();
  if (error || !data) {
    alert("Erro ao carregar perfil: " + (error ? error.message : "Perfil não encontrado"));
    return null;
  }
  return data;
}
