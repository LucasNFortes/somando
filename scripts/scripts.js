document.getElementById('dailyQuestion').addEventListener('click', function () {
    // Supondo que 'questions.json' esteja no mesmo diretório que este script
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            const questionsData = data.questions;

            // Escolhendo uma pergunta aleatória
            const randomIndex = Math.floor(Math.random() * questionsData.length);
            const randomQuestion = questionsData[randomIndex];

            // Atualizando o conteúdo no elemento questionContainer
            document.getElementById('questionContainer').innerText = randomQuestion;
        })
        .catch(error => console.error('Erro ao carregar perguntas:', error));
});



/*-------------------------------------together-------------------------------------*/
function updateTogether() {
    // Data de início para o cálculo
    var startDate = new Date('2023-06-05'); //Data de início

    // Data atual
    var currentDate = new Date();

    // Calcula a diferença em milissegundos
    var difference = currentDate - startDate;

    // Converte milissegundos para dias
    var daysTogether = Math.floor(difference / (1000 * 60 * 60 * 24));

    document.getElementById("together").innerText = " " + daysTogether + " ";
  }

  setInterval(updateTogether, 24 * 60 * 60 * 1000);
  updateTogether();
/*-------------------------------------end together-------------------------------------*/
