<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Dashboard Admin - SAE | Sistema de Apoio ao Ensino</title>
  <meta name="description" content="Painel administrativo do SAE para gestão de usuários, turmas e estrutura escolar.">
  <meta name="robots" content="noindex, nofollow">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- CSS PADRÃO -->
  <link rel="stylesheet" href="style.css">

  <!-- FAVICON -->
  <link rel="icon" href="images/logo.png" type="image/png">
</head>
<body>

<!-- HEADER PADRÃO -->
<header class="header">
  <div class="container-header">
    <div class="logo">
      <a href="index.html">
        <img src="images/logo.png" alt="SAE - Sistema de Apoio ao Ensino" height="40">
      </a>
    </div>

    <nav class="nav-left">
      <a href="#">Dashboard</a>
      <a href="#">Usuários</a>
      <a href="#">Relatórios</a>
    </nav>

    <div class="nav-right">
      <button id="btnLogout" class="btn-header">Sair</button>
    </div>
  </div>
</header>

<!-- HERO -->
<header class="hero hero-dashboard">
  <div class="hero-text">
    <h1>Dashboard Administrativo</h1>
    <p>
      Painel de controle do <strong>Sistema de Apoio ao Ensino (SAE)</strong>
      para administração escolar e gestão institucional.
    </p>
  </div>
</header>

<!-- CONTEÚDO PRINCIPAL -->
<section class="features">

  <!-- STATUS DA SESSÃO -->
  <div class="card show">
    <h3>Status da Sessão</h3>
    <p id="userEmail">Carregando informações do usuário...</p>
  </div>

  <!-- GESTÃO DE USUÁRIOS -->
  <div class="card show">
    <h3>Gestão de Usuários</h3>
    <p>
      Cadastre e administre usuários do sistema, definindo perfis como
      <strong>Administrador, Professor, Aluno ou Responsável</strong>.
    </p>
    <button class="btn">Cadastrar novo usuário</button>
  </div>

  <!-- GESTÃO ACADÊMICA -->
  <div class="card show">
    <h3>Gestão Acadêmica</h3>
    <p>
      Controle turmas, disciplinas, professores e organização pedagógica
      da instituição.
    </p>
    <button class="btn">Gerenciar turmas</button>
  </div>

  <!-- RELATÓRIOS -->
  <div class="card show">
    <h3>Relatórios e Indicadores</h3>
    <p>
      Acompanhe métricas educacionais, desempenho acadêmico
      e relatórios institucionais.
    </p>
    <button class="btn">Visualizar relatórios</button>
  </div>

</section>

<!-- FOOTER PADRÃO -->
<footer class="footer">
  <div class="footer-container">

    <div class="footer-brand">
      <h3>SAE</h3>
      <p>
        Sistema de Apoio Educacional desenvolvido para otimizar
        a gestão escolar e fortalecer o acompanhamento pedagógico.
      </p>
    </div>

    <div class="footer-links">
      <h4>Institucional</h4>
      <a href="institucional.html">Sobre o SAE</a>
      <a href="planos.html">Planos</a>
      <a href="contato.html">Contato</a>
    </div>

    <div class="footer-links">
      <h4>Documentos</h4>
      <a href="lgpd.html">LGPD e Segurança</a>
      <a href="politica-privacidade.html">Política de Privacidade</a>
      <a href="termos.html">Termos de Uso</a>
    </div>

  </div>

  <div class="footer-bottom">
    <p>© <span id="ano-atual"></span> SAE – Sistema de Apoio Educacional. Todos os direitos reservados.</p>
  </div>
</footer>

<!-- SCRIPTS -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/supabase.min.js"></script>
<script src="supabase_client.js"></script>
<script src="dashboard-admin.js"></script>

<script>
  document.getElementById("ano-atual").textContent = new Date().getFullYear();

  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
</script>

</body>
</html>
