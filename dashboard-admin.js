document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCreateUser");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const role = document.getElementById("role").value;

    try {
      const response = await fetch("https://vhwhjnghtmlrfieiwssi.functions.supabase.co/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, role })
      });

      const data = await response.json();

      if (data.error) {
        alert("Erro ao criar usuário: " + data.error);
      } else {
        alert(`Usuário ${data.user.email} criado com sucesso!`);
        form.reset();
      }
    } catch (err) {
      alert("Erro na conexão: " + err.message);
    }
  });
});
