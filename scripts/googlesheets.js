const API_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
const SPREADSHEET_ID = process.env.SPREADSHEET_USERS_ID;
const RANGE = 'A1:G20';  // Edit as needed based on the number of users
const { google } = require('googleapis');
const sheets = google.sheets('v4');


function init() {

    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    }).then(() => {
        // Initialization complete, return a promise
        return Promise.resolve();
    });
}

function handleClientLoad() {
    gapi.load('client', init).then(() => {
        // Call the login function after initialization is complete
        login();
    });
}

function login() {
    const emailOrUsername = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE,
    }).then((response) => {
        const values = response.result.values;

        // Find the user with the provided email or username
        const user = values.find((row) => row[2] === emailOrUsername || row[1] === emailOrUsername);

        if (user && user[3] === password) {
            // Redirect to the index.html page
            window.location.href = 'home.html';
        } else {
            // Invalid credentials
            alert('Invalid credentials. Please try again.');
        }
    }).catch((error) => {
        console.error('Error reading data:', error);
    });
}
