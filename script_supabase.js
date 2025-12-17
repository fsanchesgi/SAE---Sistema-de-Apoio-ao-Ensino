// Funções genéricas que usam supabase
async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'login.html';
}

async function getPerfil() {
  const user = supabase.auth.user()?.id || supabase.auth.session()?.user?.id;
  if (!user) {
    window.location.href = 'login.html';
    return null;
  }
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user)
    .single();
  if (error || !data) {
    alert("Erro ao carregar perfil: " + (error ? error.message : "Perfil não encontrado"));
    return null;
  }
  return data;
}
