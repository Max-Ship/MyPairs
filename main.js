// Логика создания и перемешивания массива для карт
/*----------------------------------------------------------------*/
//1)Создание массива
function createNumbersArray(count) {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const cards = [];
  let j = 0;

  for (let i = 1; i <= count; i++ && j++) {
    if (j === arr.length) {
      j = 0
    }

    let fistNumberOfPair = arr[j];
    let secondNumberOfPair = arr[j];

    cards.push(fistNumberOfPair, secondNumberOfPair);
  }

  return cards;
}

//Перемешивание массива
function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {

    let temp = null;
    let j = Math.floor(Math.random() * arr.length);

    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
}
/*--------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------*/
//ЛОГИКА
//Логика отрисованных в html элементов
// (Сверстано) Окно таймера. Используется в функции условия победы/поражения - statusGame
const gameTime = document.getElementById("time");
// 1)Функция работы инпута (выбор обложки карты)
function selectWrapperCard(statusInput) {
  const skin = document.getElementById("skin");
  if (statusInput === true) {
    //убираем подпись инпута
    skin.remove("skins-of-cards");
    // Создаем опции
    const selectSkin = new Option("Выбери обертку карты", "selection");
    selectSkin.selected = true;
    selectSkin.disabled = true;
    skin.append(selectSkin)

    const map = new Option("Земля", "map");
    skin.append(map);

    const car = new Option("Машина", "car");
    skin.append(car);

    const animal = new Option("Белка", "animal");
    skin.append(animal);

    const tracery = new Option("Абстракция", "tracery");
    skin.append(tracery);

    const cardsStyle = document.querySelectorAll(".card__style");
    // Действие на выбор опции
    document.addEventListener("input", function () {
      for (let imgWrapperCard of cardsStyle) {
        switch (true) {
          case car.selected:
            imgWrapperCard.classList.add("card__style_bg-car");

            imgWrapperCard.classList.remove("card__style_bg-planet");
            imgWrapperCard.classList.remove("card__style_bg-animal");
            imgWrapperCard.classList.remove("card__style_bg-tracery");
            break;
          case map.selected:
            imgWrapperCard.classList.add("card__style_bg-planet");

            imgWrapperCard.classList.remove("card__style_bg-car");
            imgWrapperCard.classList.remove("card__style_bg-animal");
            imgWrapperCard.classList.remove("card__style_bg-tracery");
            break;
          case animal.selected:
            imgWrapperCard.classList.add("card__style_bg-animal");

            imgWrapperCard.classList.remove("card__style_bg-car");
            imgWrapperCard.classList.remove("card__style_bg-planet");
            imgWrapperCard.classList.remove("card__style_bg-tracery");
            break;
          case tracery.selected:
            imgWrapperCard.classList.add("card__style_bg-tracery");

            imgWrapperCard.classList.remove("card__style_bg-car");
            imgWrapperCard.classList.remove("card__style_bg-animal");
            imgWrapperCard.classList.remove("card__style_bg-planet");
            break;
        }
      }
    });
  }
  // убираем из инпута все опции(если победил или проиграл)
  if (statusInput === false) {
    skin.innerHTML = ``;
  }
}
// 2)Функция кнопки "подсказка"
let isHelp = false
function getHelp(millisecs) {
  const giveHelp = document.getElementById("help");
  const forHelp = document.querySelectorAll(".card__close");

  // чтобы кнопка включалась при следующей игре
  giveHelp.disabled = false;
  giveHelp.style.backgroundColor = '#FFD700';
  isHelp = true
  // открываем все карты
  giveHelp.addEventListener("click", function () {
    giveHelp.style.backgroundColor = 'red';
    for (let i = 0; i < forHelp.length; i++) {
      forHelp[i].classList.add("card__open");
      forHelp[i].classList.remove("card__close");

      giveHelp.disabled = true;
    }
    // закрываем все карты, кроме угаданных
    function closeAllCards() {
      for (let i = 0; i < forHelp.length; i++) {
        if (!forHelp[i].classList.contains("success")) {
          forHelp[i].classList.add("card__close");
          forHelp[i].classList.remove("card__open");
        }
      }
      isHelp = false
    }
    // временной интервал для закрытия карт
    setTimeout(closeAllCards, millisecs);
  });
}
/*-----------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------*/
// Логика клика по картам
//Переменные для двух открытых карт
let firstOpenCard = null;
let secondOpenCard = null;
//Функция открытия/закрытия/метки найденно для двух карт
function clickCards(obj) {
  if (isHelp) return
  if (obj.succes || obj.open) {
    return
  }

  if (secondOpenCard !== null && firstOpenCard.number !== secondOpenCard.number) {
    firstOpenCard.is_close();
    secondOpenCard.is_close();
    firstOpenCard.open = false;
    secondOpenCard.open = false;
    firstOpenCard = null;
    secondOpenCard = null;
  }

  if (firstOpenCard === null) {
    firstOpenCard = obj;
    firstOpenCard.open = true;
    firstOpenCard.is_open();
  } else if (firstOpenCard !== null) {
    secondOpenCard = obj;
    secondOpenCard.open = true;
    secondOpenCard.is_open();
  }

  if (secondOpenCard !== null && firstOpenCard.number === secondOpenCard.number && firstOpenCard.number !== secondOpenCard) {
    firstOpenCard.succes = true;
    secondOpenCard.succes = true;
    firstOpenCard.is_succes();
    secondOpenCard.is_succes();
    firstOpenCard = null;
    secondOpenCard = null;
  }
}
/*------------------------------------------------------------------------------------------------*/
//Функция - условие победы или поражения
function statusGame(num, time) {
  // искомые элементы
  const wrapperGameOver = document.querySelector(".remove-wrapper-game-over");
  const cardsOfGame = document.querySelectorAll(".card__style");
  //функция удаления карт при победе или поражении
  function deletedCards() {
    for (let deleteCard of cardsOfGame) {
      deleteCard.remove();
    }
  }
  //функция очистки окна времени
  function clearGameTime() {
    gameTime.innerHTML = ``;
  }
  //функция вызова формы поражения
  function gameLose() {
    wrapperGameOver.classList.remove("remove-wrapper-game-over");
    wrapperGameOver.classList.add("game-lose");
  }
  //функция вызова формы победы
  function forVictoryDelay() {
    wrapperGameOver.classList.remove("remove-wrapper-game-over");
    wrapperGameOver.classList.add("game-victory");
  }
  //функция вызова функций сброса таймера, удаления опций из инпута(обертки карт),
  //удаление цифр из окна времени с задержкой (чтоб красиво было)))
  //удаление всех карт с поля с задержкой (чтоб как в настоящей игре))))
  function clearingPlayingField() {
    clearTimeout(resetTime);
    selectWrapperCard(false);
    setTimeout(clearGameTime, 500);
    setTimeout(deletedCards, 1100);
  }
  //условие при котором все обнуляется и выводится окно победы
  for (let anyCard of cardsOfGame) {
    anyCard.addEventListener("click", function () {
      const allSuccessCards = document.querySelectorAll(".success");

      if (allSuccessCards.length === num) {
        clearingPlayingField();
        setTimeout(forVictoryDelay, 1000);
      }
    });
  }
  //условия для возможности играть без времени
  if (time === "no time") {
    gameTime.textContent = `\u221E`;
    return;
  } else {
    // идентификатор таймера
    var resetTime = setTimeout(updateTime);
    //создание таймера
    function updateTime() {
      resetTime = setTimeout(updateTime, 1000);
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;

      seconds = seconds < 10 ? "0" + seconds : seconds;
      gameTime.textContent = `${minutes}:${seconds}`;
      time--;

      //условие при котором все обнуляется и выводится окно поражения
      if (minutes == 0 && seconds == 0) {
        clearingPlayingField();
        setTimeout(gameLose, 1400);
      }
    }
  }
}
/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------*/


// Классы: карта и поле для карт
//Карта
class Card {
  constructor(number, count) {
    this.number = number;
    this.count = count;
  }

  createElement() {
    const li = document.createElement("li");
    const img = document.createElement('img');
    img.classList.add('card__img');
    li.textContent = this.number;
    li.id = this.number;
    img.src = `img/${li.id}.png`;
    li.append(img);

    li.addEventListener('click', () => {
      clickCards(this);
    })
    li.classList.add("card__style", "card__close");
    switch (this.count) {
      case 16:
        li.classList.add("card__style_16");
        break;
      case 36:
        li.classList.add("card__style_36");
        break;
      case 64:
        li.classList.add("card__style_64");
        break;
      case 100:
        li.classList.add("card__style_100");
        break;
    }
    this.card = li;
    return li
  }

  is_open() {
    this.card.classList.remove("card__close");
    this.card.classList.add("card__open");
  }

  is_succes() {
    this.card.classList.add("success");
  }

  is_close() {
    this.card.classList.remove("card__open");
    this.card.classList.add("card__close");
  }
}

//Поле карт
class CreatFild {
  constructor(count, container) {
    this.count = count;
    this.container = container;
  }

  creatFild() {
    let lists = this.count / 2;
    const arrCards = createNumbersArray(lists);
    const arrMixedCards = shuffle(arrCards);
    let card;
    for (let num of arrMixedCards) {
      card = new Card(num, this.count).createElement();
      this.container.append(card);
    }
  }
}
/*---------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------*/
//ОТРИСОВКА. Создание форм - начало, конец игры.
// Отрисовка. Форма начала игры (выбор сложности)
function gameStart() {
  const gameStart = document.createElement("div");
  gameStart.classList.add("game-start");

  const buttonEasy = document.createElement("button");
  buttonEasy.classList.add("btn", "btn-easy");
  buttonEasy.textContent = "Easy";
  const buttonNormal = document.createElement("button");
  buttonNormal.classList.add("btn", "btn-normal");
  buttonNormal.textContent = "Normal";
  const buttonHard = document.createElement("button");
  buttonHard.classList.add("btn", "btn-hard");
  buttonHard.textContent = "Hard";
  const buttonVeryHard = document.createElement("button");
  buttonVeryHard.classList.add("btn", "btn-vhard");
  buttonVeryHard.textContent = "Very Hard";

  gameStart.append(buttonEasy, buttonNormal, buttonHard, buttonVeryHard)

  return {
    gameStart,
    buttonEasy,
    buttonNormal,
    buttonHard,
    buttonVeryHard,
  };
}
// Отрисовка. Форма - конец игры
function gameOver() {
  const over = document.createElement("div");
  over.classList.add("remove-wrapper-game-over");

  const buttonPlay = document.createElement("button");
  buttonPlay.classList.add("btn", "btn-more-play");
  buttonPlay.textContent = "Сыграем ещё";

  over.append(buttonPlay);

  return {
    over,
    buttonPlay,
  };
}
/*------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------*/
// РЕНДЕРИНГ
// Рендеринг игры
function renderGame() {
  const skin = document.getElementById("skin");
  const game = document.getElementById("game");
  // Форма запуска игры
  const gameBegun = gameStart();
  game.append(gameBegun.gameStart);

  const statusButton = [gameBegun.buttonEasy, gameBegun.buttonNormal, gameBegun.buttonHard, gameBegun.buttonVeryHard];

  for (let everyButton of statusButton) {
    everyButton.addEventListener("click", function () {
      // удаляем обертку "start-game"
      gameBegun.gameStart.classList.add("remove-wrapper-start-game");
      gameBegun.gameStart.classList.remove("game-start");
      const container = document.getElementById("cards");
      let newGame;

      switch (everyButton) {
        case gameBegun.buttonEasy:
          newGame = new CreatFild(16, container);
          newGame.creatFild();
          getHelp(2000)
          statusGame(16, "no time");
          break;
        case gameBegun.buttonNormal:
          newGame = new CreatFild(36, container);
          newGame.creatFild();
          getHelp("4000")
          statusGame(36, 600);
          break;
        case gameBegun.buttonHard:
          newGame = new CreatFild(64, container);
          newGame.creatFild();
          getHelp("6000")
          statusGame(64, 900);
          break;
        case gameBegun.buttonVeryHard:
          newGame = new CreatFild(100, container);
          newGame.creatFild();
          getHelp("8000")
          statusGame(100, 1200);
          break;
      }
      selectWrapperCard(true);
    });
  }
  // Форма game-over и логика нажатия кнопки. Добавляется сразу с началом игры. 
  const overGame = gameOver();
  game.append(overGame.over);

  overGame.buttonPlay.addEventListener("click", function () {

    // удаляем форму game-over
    overGame.over.classList.remove("game-lose");
    overGame.over.classList.remove("game-victory");
    overGame.over.classList.add("remove-wrapper-game-over");

    // вызываем форму начала игры
    gameBegun.gameStart.classList.remove("remove-wrapper-start-game");
    gameBegun.gameStart.classList.add("game-start");
    // таймер, подпись
    gameTime.textContent = "Таймер";
    // скины карт, подпись
    const skinsOfCards = new Option("Обертки для карт", "skins-of-cards");
    skin.append(skinsOfCards);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  renderGame();
});