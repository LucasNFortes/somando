// scripts.js

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



/*-------------------------------------dark-mode button-------------------------------------*/
const switchBtn = document.getElementById("switch-theme");
const body = document.querySelector("body");
const rootStyles = document.documentElement.style;

switchBtn.addEventListener("click", function () {
    var homeIcon = document.getElementById("home-icon");
    var decorIcon = document.getElementById("decor-icon");
    var configIcon = document.getElementById("config-icon");
    var clockIcon = document.getElementById("clock-icon");


    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");

        homeIcon.src = "./media/home-white.png";
        decorIcon.src = "./media/decor-white.png";
        configIcon.src = "./media/config-white.png";
        clockIcon.src = "./media/clock-white.png";

        rootStyles.setProperty('--main-text-color', '#A7A6A6');
        rootStyles.setProperty('--main-bg-color', '#262626');

    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");


        homeIcon.src = "./media/home.png";
        decorIcon.src = "./media/decor.png";
        configIcon.src = "./media/config.png";
        clockIcon.src = "./media/clock.png";

        rootStyles.setProperty('--main-text-color', '#262626');
        rootStyles.setProperty('--main-bg-color', '#A7A6A6');
    }

});
/*-------------------------------------end dark-mode button-------------------------------------*/


/*-------------------------------------clock-------------------------------------*/
function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    var timeString = hours + ":" + minutes;

    document.getElementById("clock").innerText = timeString;
  }

  setInterval(updateClock, 1000);

  // Chama a função para exibir o horário atual imediatamente
  updateClock();
/*-------------------------------------end clock-------------------------------------*/


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
