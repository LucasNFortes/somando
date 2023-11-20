// const API_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
const SPREADSHEET_ID = process.env.SPREADSHEET_USERS_ID;
const RANGE = 'A1:G20';  // Editar de acordo com qtd users
const { google } = require('googleapis');
const sheets = google.sheets('v4');

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


module.exports = {
    authenticateGoogleSheets
};