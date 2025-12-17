// cadastro.js
// Espera o carregamento completo da página
document.addEventListener("DOMContentLoaded", function() {
    const formCadastro = document.getElementById('formCadastro');

    formCadastro.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const role = document.getElementById('role').value;

        if (!nome || !email || !senha || !role) {
            alert("Preencha todos os campos");
            return;
        }

        try {
            // 1️⃣ Criar usuário no Auth
            const { data: signUpData, error: signUpError } = await window.supabaseClient.auth.signUp({
                email,
                password: senha
            });

            if (signUpError) {
                console.error("Erro no Auth:", signUpError);
                alert("Erro no Auth: " + signUpError.message);
                return;
            }

            if (!signUpData.user || !signUpData.user.id) {
                alert("Erro: usuário não criado corretamente.");
                return;
            }

            const userId = signUpData.user.id;

            // 2️⃣ Inserir perfil na tabela profiles
            const { data: perfilData, error: perfilError } = await window.supabaseClient
                .from('profiles')
                .insert([{
                    id: userId, // ID do Auth
                    nome: nome,
                    role: role
                }]);

            if (perfilError) {
                console.error("Erro ao inserir perfil:", perfilError);
                alert("Erro ao criar perfil: " + perfilError.message);
                return;
            }

            console.log("Perfil inserido com sucesso:", perfilData);
            alert("Cadastro realizado com sucesso! Faça login agora.");
            window.location.href = 'login.html';

        } catch (err) {
            console.error("Erro inesperado no cadastro:", err);
            alert("Erro inesperado: " + err.message);
        }
    });
});
