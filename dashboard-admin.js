<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>SAE | Dashboard Administrador</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Supabase CDN -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

  <style>
    * {
      box-sizing: border-box;
      font-family: Arial, Helvetica, sans-serif;
    }

    body {
      margin: 0;
      background: #f4f6f9;
      color: #333;
    }

    header {
      background: #0a2a66;
      color: #fff;
      padding: 15px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    header nav a {
      color: #fff;
      margin-right: 20px;
      text-decoration: none;
      font-weight: bold;
    }

    header button {
      background: #c62828;
      border: none;
      color: #fff;
      padding: 8px 15px;
      border-radius: 4px;
      cursor: pointer;
    }

    main {
      max-width: 1100px;
      margin: 30px auto;
      padding: 0 20px;
    }

    h1 {
      margin-bottom: 5px;
    }

    .user-info {
      margin-bottom: 25px;
      font-size: 14px;
      color: #555;
    }

    section {
      background: #fff;
      padding: 25px;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,.08);
      margin-bottom: 30px;
    }

    form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 15px;
      margin-top: 15px;
    }

    form input,
    form select,
    form button {
      padding: 10px;
      font-size: 14px;
    }

    form button {
      background: #0a2a66;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      grid-column: 1 / -1;
      max-width: 250px;
    }

    .msg {
      margin-top: 15px;
      font-weight: bold;
    }

    footer {
      text-align: center;
      padding: 15px;
      background: #0a2a66;
      color: #fff;
      margin-top: 40px;
    }
  </style>
</head>

<body>

<header>
  <nav>
    <a href="#">Início</a>
    <a href="#">Usuários</a>
    <a href="#">Configurações</a>
  </nav>
  <button id="btnLogout">Sair</button>
</header>

<main>
  <h1>Dashboard do Administrador</h1>
  <div class="user-info" id="userEmail">Carregando usuário...</div>

  <section>
    <h2>Cadastrar novo usuário</h2>

    <form id="formCreateUser">
      <input type="text" id="nome" placeholder="Nome completo" required />
      <input type="email" id="email" placeholder="E-mail" required />
      <input type="password" id="senha" placeholder="Senha" required />

      <select id="perfil" required>
        <option value="">Selecione o perfil</option>
        <option value="admin">Administrador</option>
        <option value="professor">Professor</option>
        <option value="aluno">Aluno</option>
      </select>

      <button type="submit">Cadastrar usuário</button>
    </form>

    <div class="msg" id="userCreateMsg"></div>
  </section>
</main>

<footer>
  SAE — Sistema de Apoio ao Ensino © <span id="ano-atual"></span>
</footer>

<!-- Cliente Supabase -->
<script>
const supabaseUrl = "https://vhwhjnghtmlrfieiwssi.supabase.co";
const supabaseKey = "SUA_ANON_KEY_AQUI";

window.supabase = supabase.createClient(supabaseUrl, supabaseKey);
</script>

<!-- Script Dashboard -->
<script>
document.getElementById("ano-atual").textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", async () => {

  // 🔐 Verifica sessão
  const { data: { session } } = await window.supabase.auth.getSession();

  if (!session) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("userEmail").textContent =
    "Usuário autenticado: " + session.user.email;

  // 🚪 Logout
  document.getElementById("btnLogout").addEventListener("click", async () => {
    await window.supabase.auth.signOut();
    window.location.href = "login.html";
  });

  // 👤 Cadastro de usuário
  const form = document.getElementById("formCreateUser");
  const msg = document.getElementById("userCreateMsg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    msg.textContent = "Criando usuário...";

    const nome = nomeInput = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const perfil = document.getElementById("perfil").value;

    // Cria usuário no Auth
    const { data: authData, error: authError } =
      await window.supabase.auth.signUp({
        email,
        password: senha
      });

    if (authError) {
      msg.textContent = "Erro: " + authError.message;
      return;
    }

    // Salva perfil
    const { error: profileError } = await window.supabase
      .from("profiles")
      .insert({
        id: authData.user.id,
        nome,
        perfil
      });

    if (profileError) {
      msg.textContent =
        "Usuário criado, mas erro ao salvar perfil.";
      return;
    }

    msg.textContent = "Usuário cadastrado com sucesso!";
    form.reset();
  });

});
</script>

</body>
</html>
