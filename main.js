const IMAGES = [
  "bananas",
  "cherries",
  "popcorn",
  "bmw",
  "hamburger",
  "cheese",
  "toothbrush",
  "fox",
];
const ROOT = document.body.querySelector(".container__game");

const DIFFICULTY_BOX = {
  easy: 4,
  ease: 8,
  ease: 16,
};

const game = {
  state: {
    pairs: [],
    peekedCards: [],
    difficulty: "easy",
    pairsFounded: 0,
  },
  startGame: function () {
    const boxNumber = DIFFICULTY_BOX[this.state.difficulty];
    const imagesNumber = IMAGES.length;
    this.generatePairs(boxNumber);
    this.assignImage(imagesNumber);
    this.peekCards();
    this.startListening();
  },
  generatePairs: function (boxNumber) {
    const arr = [];
    while (arr.length < boxNumber) {
      const random = Math.floor(Math.random() * boxNumber) + 1;
      if (arr.indexOf(random) === -1) arr.push(random);
    }
    const pairs = [];
    for (let i = 0; i < arr.length; i += 2) {
      const tuple = [arr[i], arr[i + 1]];
      pairs.push(tuple);
    }
    this.state.pairs = pairs;
  },
  assignImage: function (imagesNumber) {
    const images = [];
    while (images.length < this.state.pairs.length) {
      const random = Math.floor(Math.random() * imagesNumber);
      if (images.indexOf(random) === -1) images.push(random);
    }
    for (let i = 0; i < this.state.pairs.length; i++) {
      console.log("hmm");
      const boxOneNumber = this.state.pairs[i][0];
      const boxTwoNumber = this.state.pairs[i][1];

      const image = IMAGES[images[i]];
      const imageSrc = `./${image}.png`;

      this.createCard(boxOneNumber, imageSrc);
      this.createCard(boxTwoNumber, imageSrc);
    }
  },
  createCard: function (number, src) {
    const div = document.createElement("div");
    div.classList.add("container__game__box");
    div.classList.add(`container__game__box--${number}`);
    div.setAttribute("data-id", number);

    const image = document.createElement("img");
    image.classList.add("container__game__box__image");
    image.src = src;
    div.appendChild(image);
    ROOT.appendChild(div);
  },
  peekCards: function () {
    const boxes = document.body.querySelectorAll(".container__game__box");
    boxes.forEach((item) => {
      item.setAttribute("data-active", true);
    });

    setTimeout(() => {
      boxes.forEach((item) => {
        item.removeAttribute("data-active");
      });
    }, 2500);
  },
  startListening: function () {
    const boxes = document.body.querySelectorAll(".container__game__box");
    console.log(this.state.peekedCards);
    boxes.forEach((item) => {
      item.addEventListener("click", this.peekCard.bind(this));
    });
  },
  peekCard: function (el) {
    this.state.peekedCards.push(el.target.getAttribute("data-id"));
    el.target.setAttribute("data-active", true);
    this.checkPair();
  },
  checkPair: function () {
    if (this.state.peekedCards.length < 2) return;
    const peekedCard = this.state.peekedCards;
    const pair = this.state.pairs.find((item) => {
      return (
        item[0] == this.state.peekedCards[0] ||
        item[1] == this.state.peekedCards[0]
      );
    });
    const isEqual = pair.sort().toString() === peekedCard.sort().toString();
    const boxes = document.body.querySelectorAll(".container__game__box");
    if (!isEqual) {
      setTimeout(() => {
        boxes.forEach((item) => {
          const id = item.getAttribute("data-id");
          if (peekedCard.includes(id)) item.removeAttribute("data-active");
        });
      }, 1000);
    } else {
      this.state.pairsFounded++;
      setTimeout(() => {
        boxes.forEach((item) => {
          const id = item.getAttribute("data-id");
          if (peekedCard.includes(id))
            item.setAttribute("data-invisible", true);
        });
      }, 1000);
    }
    this.state.peekedCards = [];
    if (DIFFICULTY_BOX[this.state.difficulty] === this.state.pairsFounded * 2) {
      alert("wygrałes talon");
    }
    console.log(isEqual);
  },
};

game.startGame();
