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


/*------------------close eyes------------------*/
document.getElementById('password').addEventListener('focus', function () {
    // Quando o campo de senha está em foco, troca o caminho da imagem
    document.getElementById('eyes').src = './media/daniel-closed.png';
});

document.getElementById('password').addEventListener('blur', function () {
    // Quando o campo de senha perde o foco, volta para o caminho original
    document.getElementById('eyes').src = './media/daniel-open.png';
});
/*------------------end close eyes------------------*/




/*------------------register form------------------*/
// Função para abrir o formulário de registro
function openRegistrationForm() {
    document.getElementById('registrationForm').style.display = 'block';
    generateCoupleCode(); // Chamar a função de geração de código
}

function saveRegistration() {
    // Obter os valores dos campos do formulário
    const username = document.getElementById('username').value;
    const email = document.getElementById('newEmail').value;
    const password = document.getElementById('newPassword').value;
    const nome = document.getElementById('nome').value;
    const startDate = document.getElementById('startDate').value;
    const coupleId = document.getElementById('coupleId').value;

    // Criar objeto com os dados a serem enviados
    const data = {
        username: username,
        email: email,
        password: password,
        nome: nome,
        startDate: startDate,
        coupleId: coupleId
    };

    // Enviar solicitação à API do Google Sheets
    fetch('https://sheets.googleapis.com/v4/spreadsheets/1NZAIma-QRGWIzcVX1u844vHbVgHKRFca9PSqheWTyzs/values/A?valueRenderOption=FORMATTED_VALUE&dateTimeRenderOption=FORMATTED_STRING', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + 'SUA_API_KEY_AQUI' // Substituir 'SUA_API_KEY_AQUI' pela sua chave de API
        }
    })
        .then(response => response.json())
        .then(data => {
            // Encontrar o último valor preenchido na coluna A
            const lastId = data.values.length > 0 ? parseInt(data.values[data.values.length - 1][0]) : 0;

            // Incrementar o último ID para obter o próximo valor
            const nextId = lastId + 1;

            // Adicionar nextId como o novo valor da coluna A
            data.values.push([nextId, data.username, data.email, data.password, data.nome, data.startDate, data.coupleCode]);

            // Enviar solicitação à API do Google Sheets para adicionar os novos dados
            fetch('https://sheets.googleapis.com/v4/spreadsheets/1NZAIma-QRGWIzcVX1u844vHbVgHKRFca9PSqheWTyzs/values/A1:append?valueInputOption=RAW', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + 'SUA_API_KEY_AQUI' // Substituir 'SUA_API_KEY_AQUI' pela sua chave de API
                },
                body: JSON.stringify(data) // Enviar todos os dados em uma única chamada
            })
                .then(response => response.json())
                .then(responseData => {
                    console.log('Registro salvo com sucesso:', responseData);
                    alert('Registro salvo com sucesso. Faça login.');
                    // Adicione aqui qualquer lógica adicional, como fechar o formulário de registro ou redirecionar o usuário
                })
                .catch(error => {
                    console.error('Erro ao salvar registro:', error);
                });
        })
        .catch(error => {
            console.error('Erro ao obter último valor da coluna A:', error);
        });
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

function closeForm() {
    document.getElementById('registrationForm').style.display = 'none';
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

/*------------------end register form------------------*/