/*-------------------------------------clock-------------------------------------*/
function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    var timeString = "🕓" + hours + ":" + minutes;

    document.getElementById("clock").innerText = timeString;
  }

  setInterval(updateClock, 1000);
  updateClock();
/*-------------------------------------end clock-------------------------------------*/