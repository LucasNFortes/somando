/*-------------------------------------dark-mode button-------------------------------------*/
const switchBtn = document.getElementById("switch-theme");
const body = document.querySelector("body");
const rootStyles = document.documentElement.style;

switchBtn.addEventListener("click", function () {
    var decorIcon = document.getElementById("decor-icon");
    var configIcon = document.getElementById("config-icon");


    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");

        decorIcon.src = "./media/decor-white.png";
        configIcon.src = "./media/config-white.png";

        rootStyles.setProperty('--main-text-color', '#A7A6A6');
        rootStyles.setProperty('--main-bg-color', '#262626');

    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");

        decorIcon.src = "./media/decor.png";
        configIcon.src = "./media/config.png";

        rootStyles.setProperty('--main-text-color', '#262626');
        rootStyles.setProperty('--main-bg-color', '#A7A6A6');
    }

});
/*-------------------------------------end dark-mode button-------------------------------------*/