document.addEventListener('DOMContentLoaded', function () {
    const formItems = document.querySelectorAll('.form-item');

    formItems.forEach(function (formItem) {
        const input = formItem.querySelector('.form-style');

        input.addEventListener('input', function () {
            if (input.value.trim() !== '') {
                formItem.classList.add('input-focus');
            } else {
                formItem.classList.remove('input-focus');
            }
        });
    });
});


/*---------------------------------------------------------------------------------close eyes---------------------------------------------------------------------------------*/
document.getElementById('password').addEventListener('focus', function () {
    // Quando o campo de senha está em foco, troca o caminho da imagem
    document.getElementById('eyes').src = './media/daniel-closed.png';
});

document.getElementById('password').addEventListener('blur', function () {
    // Quando o campo de senha perde o foco, volta para o caminho original
    document.getElementById('eyes').src = './media/daniel-open.png';
});
/*---------------------------------------------------------------------------------end close eyes---------------------------------------------------------------------------------*/





/*---------------------------------------------------------------------------------login---------------------------------------------------------------------------------*/

// Determina a URL do servidor com base no ambiente
const serverUrl = process.env.NODE_ENV === 'production'
    ? 'https://somando.onrender.com/'  // Substitua pelo seu domínio no Render
    : 'http://localhost:3000';

async function login() {
    console.log('aaaaaaaaaaaaaaaaaaa');

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${serverUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Login bem-sucedido:', result);
            window.location.href = "home.html";
        } else {
            const errorMessage = result.error || result.message || 'Erro desconhecido';
            console.error('Erro durante o login:', errorMessage);
            alert('Erro durante o login: ' + errorMessage);
        }
    } catch (error) {
        console.error('Erro inesperado:', error.message);
        alert('Erro inesperado: ' + error.message);
    }
}

/*---------------------------------------------------------------------------------end login---------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------register form---------------------------------------------------------------------------------*/
// Função para abrir o formulário de registro
function openRegistrationForm() {
    document.getElementById('registrationForm').style.display = 'block';
    generateCoupleCode();
}


// Função para gerar um ID único (você pode ajustar conforme necessário)
function generateUniqueId() {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Gera um número aleatório entre 1000 e 9999
    return randomNumber.toString();
}

function generateCoupleCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const codeLength = 4; // Defina o comprimento desejado do código

    let generatedCode = '';
    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        generatedCode += characters.charAt(randomIndex);
    }

    // Preencher o input readonly com o código gerado
    document.getElementById('coupleId').value = generatedCode;
}

function toggleCoupleIdInput() {
    const coupleIdInput = document.getElementById('coupleId');
    const hasCoupleIdCheckbox = document.getElementById('hasCoupleId');

    coupleIdInput.readOnly = !hasCoupleIdCheckbox.checked;

    // Se o checkbox estiver marcado, remova o valor atual do coupleId
    if (hasCoupleIdCheckbox.checked) {
        coupleIdInput.value = '';
    } else {
        generateCoupleCode();
    }
}

async function saveRegistration() {
    // Obtenha os valores dos inputs
    const username = document.getElementById('username').value;
    const email = document.getElementById('newEmail').value;
    const password = document.getElementById('newPassword').value;
    const name = document.getElementById('nome').value;
    const startDate = document.getElementById('startDate').value;
    const coupleId = document.getElementById('coupleId').value;

    // Crie um objeto com os dados a serem inseridos no banco
    const values = [
        [generateUniqueId(), username, email, password, name, startDate, coupleId],
    ];

    // Lógica para salvar o registro
}

function closeForm() {
    document.getElementById('registrationForm').style.display = 'none';
}
/*---------------------------------------------------------------------------------end register form---------------------------------------------------------------------------------*/