// require("dotenv").config();
// const { supabase } = require('./supabase-init');

// const cors = require("cors");
// const express = require("express");
// const path = require("path");
// const app = express();
// app.use(express.static(path.join(__dirname, "/")));
// app.listen(3000, () => {  
//     console.log("Server running on 3000");
// });

// app.use(cors());


// // supabase-init.js
// require('dotenv').config();
// const { createClient } = require('@supabase/supabase-js');

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// module.exports = {
//   supabase,
// };



// const button = document.querySelector('.submit.button');
// button.addEventListener('click', async () => {
//   // Chama a função login assíncrona
//   await login();
// });
// async function login() {
//     console.log('aaaaaaaaaaaaaaaaaaa');

//     const emailOrUsername = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     try {
//         // Fazendo a consulta no Supabase para verificar se o usuário existe
//         const { data, error } = await supabase
//             .from('users') // tabela do banco
//             .select('*')
//             .eq('email', emailOrUsername) // Verifica se o emailOrUsername corresponde à coluna 'email'
//             .or('username', 'eq', emailOrUsername) // Ou verifica se o emailOrUsername corresponde à coluna 'username'
//             .single();

//         if (error) {
//             console.error('Erro ao buscar usuário:', error.message);

//         } else if (!data) {
//             console.log('Usuário não encontrado');
//             alert('Usuário não encontrado');

//         } else if (data.password !== password) {
//             console.log('Senha incorreta');
//             alert('Senha incorreta');

//         } else {
//             console.log('Login bem-sucedido:', data);
//             window.location.href = "home.html";
//         }
//     } catch (error) {
//         console.error('Erro inesperado:', error.message);
//     }
// }

// index.js

// app.js

// app.js (lado do servidor)

const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");
const { createClient } = require('@supabase/supabase-js');

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "/")));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.post('/login', async (req, res) => {
    try {
        const emailOrUsername = req.body.email;
        const password = req.body.password;

        // Consulta para verificar se o email corresponde
        const { data: emailData, error: emailError } = await supabase
            .from('users')
            .select('*')
            .eq('email', emailOrUsername);

        if (emailError) {
            console.error('Erro ao buscar usuário por email:', emailError.message);
            return res.status(500).json({ error: 'Erro ao buscar usuário', details: emailError });
        }

        // Consulta para verificar se o username corresponde
        const { data: usernameData, error: usernameError } = await supabase
            .from('users')
            .select('*')
            .eq('username', emailOrUsername);

        if (usernameError) {
            console.error('Erro ao buscar usuário por username:', usernameError.message);
            return res.status(500).json({ error: 'Erro ao buscar usuário', details: usernameError });
        }

        // Combinar os resultados das duas consultas
        const data = emailData.length === 1 ? emailData[0] : usernameData.length === 1 ? usernameData[0] : null;

        if (!data) {
            console.log('Usuário não encontrado');
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        if (data.password !== password) {
            console.log('Senha incorreta');
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        console.log('Login bem-sucedido:', data);
        return res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (error) {
        console.error('Erro inesperado:', error);
        console.log('Error Stack:', error.stack);
        return res.status(500).json({ error: 'Erro inesperado', details: error });
    }
});