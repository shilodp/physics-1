const lineElem = document.querySelector("#line"),
    shopElem = document.querySelector("#shop"),
    girlElem = document.querySelector("#filler"),
    taskElem = document.querySelector("#task"),
    optionsElem = document.querySelector("#options"),
    messageElem = document.querySelector("#message");
let pathLenght,
    shopPosition,
    options,
    namesGirl = ["Маша", "Валя", "Вика", "Лена", "Юля", "Катя", "Оля"];

function getRandom(min, max) {
    return Math.floor(Math.random() * (1 + max - min)) + min;
}

function startGame() {
    pathLenght = getRandom(500, 2000);
    shopPosition = Math.round(getRandom(pathLenght * 0.25, pathLenght * 0.75));
    messageElem.innerHTML = "";
    setShopPosition(shopPosition);
    setGirlPosition(shopPosition);
    setOptions();
    setTask();
}

function setShopPosition(position) {
    shopElem.style.left = (position / pathLenght) * 100 + "%";
}

function setGirlPosition(position) {
    girlElem.style.width = (position / pathLenght) * 100 + "%";
}

function setOptions() {
    let correctAnswer = pathLenght - shopPosition;
    options = [correctAnswer];
    for (let i = 0; i < 3; i++) {
        options.push(
            Math.round(
                (Math.round(Math.random()) + Math.random()) * correctAnswer
            )
        );
    }
    options.sort(() => Math.random() - 0.5);
    fillValues();
}

function setTask() {
    let girlName = namesGirl[getRandom(0, namesGirl.length - 1)];
    taskElem.innerHTML = `${girlName} пошла утром в школу. Путь от школы до дома <i class='value'>S = ${pathLenght} м</i>.
    По пути ${girlName} зашла в магазин, который на расстоянии <i class='value'>S<sub>1</sub> = ${shopPosition} м</i> от дома.
    Сколько ещё ей осталось идти <i class="value">S<sub>2</sub> - ? м</i> до школы?`;
}

function fillValues() {
    let result = `<legend>Сколько осталось пройти метров?</legend>`;
    for (let i = 0; i < options.length; i++) {
        result += `<label><input type="radio" name="option" value="${options[i]}">${options[i]} м.</label>`;
    }
    optionsElem.innerHTML = result;
}

function submitAnswer() {
    let answer = document.forms["game"].querySelector(
        'input[name="option"]:checked'
    );
    if (answer) {
        let message = "";
        let value = +answer.value;
        messageElem.innerHTML = "";
        if (value === pathLenght - shopPosition) {
            message = `Правильно! Хочешь попробовать ещё раз?`;
        } else {
            message = `Увы <i class="fa fa-light fa-face-sad-tear"></i>. Попробуй ещё раз!`;
        }
        setGirlPosition(value + shopPosition);

        setTimeout(() => {
            messageElem.innerHTML = `<h1>${message}</h1>`;
        }, 3000);
    }
}

document.querySelector("#submit").addEventListener("click", submitAnswer);
document.querySelector("#reset").addEventListener("click", startGame);

startGame();
