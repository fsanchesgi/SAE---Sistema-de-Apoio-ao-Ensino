// Conexão com Supabase
const supabaseUrl = 'https://vhwhjnghtmlrfieiwssi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZod2hqbmdodG1scmZpZWl3c3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTM4OTUsImV4cCI6MjA4MTU2OTg5NX0.XV6vxBeRtIcDNEGsJuDU_wPcnm2qmK8ZoHEuHQR2TMU';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// -------- FUNÇÕES GERAIS -------- //

// Obter perfil do usuário logado
async function getPerfil() {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) {
    window.location.href = 'login.html';
    return null;
  }
  const userId = sessionData.session.user.id;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) {
    alert(error.message);
    return null;
  }
  return data;
}

// Logout
async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'login.html';
}

// -------- ADMIN -------- //
// Listar usuários (exemplo para validação)
async function listarUsuariosPendentes() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'professor'); // exemplo: listar professores
  if (error) { alert(error.message); return; }
  const container = document.getElementById('listaUsuarios');
  container.innerHTML = '';
  data.forEach(u => {
    container.innerHTML += `
      <div>
        <strong>${u.nome}</strong> - ${u.role}
        <button onclick="validarUsuario('${u.id}')">Validar</button>
      </div>
    `;
  });
}

async function validarUsuario(userId) {
  // Aqui você pode atualizar status ou role se necessário
  alert('Usuário validado: ' + userId);
}

// -------- PROFESSORES -------- //
// Criar aula
async function criarAula(modulo_id, materia, conteudo) {
  const { data, error } = await supabase
    .from('aulas')
    .insert([{ modulo_id, materia, conteudo }]);
  if (error) { alert(error.message); return; }
  alert('Aula criada!');
}

// Criar prova
async function criarProva(modulo_id, titulo, dataProva) {
  const { data, error } = await supabase
    .from('provas')
    .insert([{ modulo_id, titulo, data: dataProva }]);
  if (error) { alert(error.message); return; }
  alert('Prova criada!');
}

// Listar aulas de um módulo
async function listarAulas(modulo_id) {
  const { data, error } = await supabase
    .from('aulas')
    .select('*')
    .eq('modulo_id', modulo_id);
  if (error) { alert(error.message); return; }
  return data;
}

// Exportar resultados em CSV
async function exportarResultados(prova_id) {
  const { data, error } = await supabase
    .from('resultados')
    .select('aluno_id, nota')
    .eq('prova_id', prova_id);
  if (error) { alert(error.message); return; }

  let csv = 'Aluno,Nota\n';
  data.forEach(r => {
    csv += `${r.aluno_id},${r.nota}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resultados.csv';
  a.click();
  URL.revokeObjectURL(url);
}

// -------- ALUNOS E PAIS -------- //
// Listar aulas de um aluno
async function listarAulasAluno(aluno_id) {
  const { data: modulos } = await supabase
    .from('modulos')
    .select('*');
  const aulas = [];
  for (let m of modulos) {
    const { data: aulasModulo } = await supabase
      .from('aulas')
      .select('*')
      .eq('modulo_id', m.id);
    aulas.push(...aulasModulo);
  }
  return aulas;
}

// Listar notas de um aluno
async function listarNotasAluno(aluno_id) {
  const { data, error } = await supabase
    .from('resultados')
    .select('nota, prova_id')
    .eq('aluno_id', aluno_id);
  if (error) { alert(error.message); return []; }
  return data;
}

// -------- DASHBOARD -------- //
// Carregar dashboard personalizado
async function carregarDashboard() {
  const perfil = await getPerfil();
  if (!perfil) return;

  const container = document.getElementById('conteudo');
  container.innerHTML = `<h2>Bem-vindo(a) ${perfil.nome} - ${perfil.role}</h2>`;

  if (perfil.role === 'admin') {
    container.innerHTML += `<div id="listaUsuarios"></div>`;
    listarUsuariosPendentes();
  } else if (perfil.role === 'professor') {
    container.innerHTML += `
      <p>Use funções de professor no console: criarAula, criarProva, exportarResultados</p>
    `;
  } else if (perfil.role === 'aluno' || perfil.role === 'pai') {
    container.innerHTML += `<p>Use funções no console: listarAulasAluno(aluno_id), listarNotasAluno(aluno_id)</p>`;
  }
}

// Inicializa dashboard
carregarDashboard();
