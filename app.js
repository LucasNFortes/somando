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


app.post('/saveRegistration', async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            name,
            startDate,
            coupleId
        } = req.body;

        // Gerar número de ID (4 números aleatórios)
        const id = Math.floor(1000 + Math.random() * 9000);

        let finalStartDate = startDate;

        if (startDate === 'Parceiro já respondeu'){
            // Procurar outro usuário com o mesmo coupleId
            const { data: existingUser, error: existingUserError } = await supabase
                .from('users')
                .select('startDate')
                .eq('coupleId', coupleId)
                .single();

            if (existingUserError) {
                console.error('Erro ao buscar usuário existente:', existingUserError.message);
                return res.status(500).json({
                    error: 'Erro ao buscar usuário existente',
                    details: existingUserError
                });
            }

            if (existingUser) {
                // Se encontrar outro usuário com o mesmo coupleId, copiar a startDate
                finalStartDate = existingUser.startDate;
            }
        }

        // Inserir novo registro no banco de dados
        const { data, error } = await supabase
            .from('users')
            .insert([{
                id,
                username,
                email,
                password,
                name,
                startDate: finalStartDate,
                coupleId
            }]);

        if (error) {
            console.error('Erro ao salvar o registro:', error.message);
            return res.status(500).json({
                error: 'Erro ao salvar o registro',
                details: error
            });
        }

        console.log('Registro salvo com sucesso:', data);
        return res.status(200).json({
            message: 'Registro salvo com sucesso',
            data
        });
    } catch (error) {
        console.error('Erro inesperado ao salvar o registro:', error);
        return res.status(500).json({
            error: 'Erro inesperado ao salvar o registro',
            details: error
        });
    }
});