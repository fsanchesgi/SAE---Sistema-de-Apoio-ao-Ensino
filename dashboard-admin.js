<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Dashboard Admin - SAE</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">

  <link rel="stylesheet" href="style.css">
  <link rel="icon" href="images/logo.png" type="image/png">

  <style>
    /* ===== AJUSTES EXCLUSIVOS DO DASHBOARD ===== */
    body {
      padding-top: 90px;
    }

    .dashboard-container {
      max-width: 1200px;
      margin: auto;
      padding: 40px 10%;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
    }

    .dashboard-header h1 {
      font-size: 2rem;
    }

    .user-email {
      font-size: 0.95rem;
      color: #475569;
      margin-top: 6px;
    }

    .btn-logout {
      background: #dc2626;
      color: #fff;
      border: none;
      padding: 10px 18px;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.3s;
    }

    .btn-logout:hover {
      background: #b91c1c;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
    }

    .dashboard-card {
      background: #fff;
      padding: 25px;
      border-radius: 14px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
    }

    .dashboard-card h2 {
      margin-bottom: 15px;
    }

    .dashboard-card p {
      font-size: 0.95rem;
      margin-bottom: 15px;
      line-height: 1.6;
    }
  </style>
</head>

<body>

<!-- HEADER PADRÃO -->
<header class="header">
  <div class="container-header">
    <div class="logo">
      <img src="images/logo.png" alt="SAE" height="40">
    </div>

    <nav class="nav-left">
      <a href="dashboard-admin.html">Dashboard</a>
      <a href="#">Usuários</a>
      <a href="#">Relatórios</a>
    </nav>

    <div class="nav-right">
      <button class="btn-logout" id="btnLogout">Sair</button>
    </div>
  </div>
</header>

<!-- CONTEÚDO -->
<main class="dashboard-container">

  <div class="dashboard-header">
    <div>
      <h1>Bem-vindo, Administrador</h1>
      <div class="user-email" id="userEmail">Carregando usuário...</div>
    </div>
  </div>

  <section class="dashboard-grid">

    <!-- CARD 1 -->
    <div class="dashboard-card">
      <h2>Cadastro de Usuários</h2>
      <p>Crie novos usuários no sistema e defina seus perfis de acesso.</p>

      <form id="formCreateUser" class="contact-form">
        <input type="email" id="newEmail" placeholder="Email do usuário" required>

        <select id="newRole" required>
          <option value="">Selecione o perfil</option>
          <option value="admin">Administrador</option>
          <option value="professor">Professor</option>
          <option value="aluno">Aluno</option>
        </select>

        <button type="submit" class="btn">Cadastrar Usuário</button>
      </form>
    </div>

    <!-- CARD 2 -->
    <div class="dashboard-card">
      <h2>Status do Sistema</h2>
      <p>Monitoramento básico do ambiente.</p>
      <ul>
        <li>✔ Supabase conectado</li>
        <li>✔ Sessão ativa</li>
        <li>✔ Dashboard protegido</li>
      </ul>
    </div>

  </section>

</main>

<!-- SUPABASE CDN -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- CLIENTE SUPABASE -->
<script src="./supabase_cliente.js"></script>

<!-- SCRIPT DO DASHBOARD -->
<script>
document.addEventListener("DOMContentLoaded", async () => {

  if (!window.supabase) {
    alert("Supabase não inicializado");
    return;
  }

  // 🔐 Proteção de rota
  const { data: { session } } = await window.supabase.auth.getSession();

  if (!session) {
    window.location.href = "login.html";
    return;
  }

  // Exibe email
  document.getElementById("userEmail").textContent =
    "Usuário autenticado: " + session.user.email;

  // Logout
  document.getElementById("btnLogout").addEventListener("click", async () => {
    await window.supabase.auth.signOut();
    window.location.href = "login.html";
  });

  // Cadastro de usuário (visual por enquanto)
  document.getElementById("formCreateUser").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("newEmail").value;
    const role = document.getElementById("newRole").value;

    alert(
      "Usuário a ser criado:\n\n" +
      "Email: " + email + "\n" +
      "Perfil: " + role + "\n\n" +
      "(Backend será conectado no próximo passo)"
    );
  });

});
</script>

</body>
</html>
