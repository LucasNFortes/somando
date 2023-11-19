const SPREADSHEET_ID = '1NZAIma-QRGWIzcVX1u844vHbVgHKRFca9PSqheWTyzs';
const API_KEY = 'SUA_API_KEY_AQUI';
const RANGE = 'A1:G20';  //Editar conforme qtd users

function init() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    }).then(() => {
        // Inicialização completa, agora chame a função de login
        login();
    });
}

function handleClientLoad() {
    gapi.load('client', init);
}

function login() {
    const emailOrUsername = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE,
    }).then((response) => {
        const values = response.result.values;

        // Encontrar usuário com o email ou username fornecido
        const user = values.find((row) => row[2] === emailOrUsername || row[1] === emailOrUsername);

        if (user && user[3] === password) {
            // Redirecionar para a página index.html
            window.location.href = 'home.html';
        } else {
            // Credenciais inválidas
            alert('Credenciais inválidas. Tente novamente.');
        }
    }).catch((error) => {
        console.error('Erro ao ler dados:', error);
    });
}