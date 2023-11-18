const { createClient } = supabase;

document.addEventListener('DOMContentLoaded', function () {
    console.log(supabase.auth);

    
    // Configure o seu Supabase
    const supabaseUrl = 'https://dohewbwhqhvsmlovbtia.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvaGV3YndocWh2c21sb3ZidGlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5MTk2NjQsImV4cCI6MjAxNTQ5NTY2NH0.HVx-LD4FMxhxU5XYrDAi9TG81-gk2N-gH3TG819TdyDrQ';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Função para fazer o login
    const submitButton = document.querySelector('.submit.button');

    if (submitButton) {
        submitButton.addEventListener('click', async function (event) {
            event.preventDefault(); // Impede que o link funcione como um link normal

            const emailOrUsername = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Verifica se o valor fornecido parece ser um e-mail
            const isEmail = emailOrUsername.includes('@');

            try {
                const { user, error } = await supabase.auth.signIn({
                    [isEmail ? 'email' : 'username']: emailOrUsername,
                    password,
                });

                if (error) {
                    alert('Erro ao fazer login: ' + error.message);
                } else {
                    alert('Login bem-sucedido! Usuário: ' + user.email);
                    // Redirecionar para index.html após login bem-sucedido
                    window.location.href = 'index.html';
                }
            } catch (error) {
                console.error('Erro inesperado: ', error.message);
            }
        });
    } else {
        console.error('Elemento com classe ".submit.button" não encontrado');
    }
});
