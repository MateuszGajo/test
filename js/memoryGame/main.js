import Game from "./Game";

const onLvlButtonClick = (item) => {
  const difficulty = item.target.getAttribute("data-type");
  const buttons = document.querySelectorAll(".container__difficulty__type");
  buttons.forEach((item) => {
    if (item.hasAttribute("data-active")) item.removeAttribute("data-active");
  });
  document
    .querySelector(`.container__difficulty__type--${difficulty}`)
    .setAttribute("data-active", true);

  game.changeDifficulty(difficulty);
};

const lvlButtons = document.querySelectorAll(".container__difficulty__type");
lvlButtons.forEach((item) => {
  item.addEventListener("click", onLvlButtonClick);
});

const game = new Game();
game.startGame();
