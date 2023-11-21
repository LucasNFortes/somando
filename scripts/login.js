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
async function login() {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Determina a URL do servidor com base no ambiente
    let serverUrl = 'http://localhost:3000'; // Valor padrão para ambiente de desenvolvimento

    // Verifica se está no ambiente de produção
    if (typeof window !== 'undefined' && window.location.hostname === 'somando.onrender.com') {
        serverUrl = 'https://somando.onrender.com';
    }

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
    const startDateInput = document.getElementById('startDate');
    const hasCoupleIdCheckbox = document.getElementById('hasCoupleId');

    coupleIdInput.readOnly = !hasCoupleIdCheckbox.checked;

    // Se o checkbox estiver marcado, remova o valor atual do coupleId
    if (hasCoupleIdCheckbox.checked) {
        coupleIdInput.value = '';
        startDateInput.value = 'Parceiro já respondeu';
        startDateInput.setAttribute('readonly', true);
    } else {
        generateCoupleCode();
        startDateInput.setAttribute('readonly', false);
        startDateInput.value = '';
    }
}

async function saveRegistration() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('newEmail').value;
    const password = document.getElementById('newPassword').value;
    const name = document.getElementById('name').value;
    const startDateInput = document.getElementById('startDate');
    let startDate;
    if (startDateInput.value === 'Parceiro já respondeu'){
        startDate = startDateInput.value;
    } else {
        startDate = startDateInput ? convertDate(startDateInput.value) : '';
    }


    const coupleId = document.getElementById('coupleId').value.toUpperCase();

    try {
        const response = await fetch('http://localhost:3000/saveRegistration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
                name,
                startDate,
                coupleId,
            }),
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Registro salvo com sucesso:', result);
            alert('Dados salvos. Faça login.');
            closeForm();
            // Faça algo após o registro bem-sucedido, se necessário
        } else {
            const errorMessage = result.error || result.message || 'Erro desconhecido';
            console.error('Erro ao salvar o registro:', errorMessage);
            alert('Erro ao salvar o registro: ' + errorMessage);
        }
    } catch (error) {
        console.error('Erro inesperado ao salvar o registro:', error.message);
        alert('Erro inesperado ao salvar o registro: ' + error.message);
    }
}

// Função para converter a data
function convertDate(inputDate) {if (inputDate) {
    const [day, month, year] = inputDate.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
} else {
    const startDate = document.getElementById('startDate'); // Retorna uma string vazia se inputDate for nulo ou indefinido
}
}


function closeForm() {
    document.getElementById('registrationForm').style.display = 'none';
}
/*---------------------------------------------------------------------------------end register form---------------------------------------------------------------------------------*/