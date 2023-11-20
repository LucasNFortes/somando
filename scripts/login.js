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


async function saveRegistration() {
    // Obtenha os valores dos inputs
    const username = document.getElementById('username').value;
    const email = document.getElementById('newEmail').value;
    const password = document.getElementById('newPassword').value;
    const name = document.getElementById('nome').value;
    const startDate = document.getElementById('startDate').value;
    const coupleId = document.getElementById('coupleId').value;

    // Crie um objeto com os dados a serem inseridos na planilha
    const values = [
        [generateUniqueId(), username, email, password, name, startDate, coupleId],
    ];

    // Configuração da autenticação (certifique-se de configurar suas credenciais corretamente)
    const auth = await authenticateGoogleSheets();

    // Use a API do Google Sheets para atualizar a planilha
    await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId: SPREADSHEET_ID,
        range: 'A2', // Comece a adicionar dados na segunda linha
        valueInputOption: 'RAW',
        resource: {
            values,
        },
    });
}

// Função para gerar um ID único (você pode ajustar conforme necessário)
function generateUniqueId() {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Gera um número aleatório entre 1000 e 9999
    return randomNumber.toString();
  }

// Função para autenticar com a API do Google Sheets
async function authenticateGoogleSheets() {
    const client_email = process.env.CLIENT_EMAIL;
    const private_key = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email,
            private_key,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return auth.getClient();
}

// Chame a função saveRegistration() quando necessário
saveRegistration();


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