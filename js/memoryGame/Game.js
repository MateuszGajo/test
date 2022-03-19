import { assignImage, randomNumber, pairNumbers, sleep } from "./Helper";
import { IMAGES, ROOT, DIFFICULTY_BOX } from "./global";
class Game {
  state = {
    pairs: [],
    peekedCards: [],
    difficulty: "easy",
    pairsFounded: 0,
    activity: "pending",
  };

  startGame() {
    this.generatePairs();
    this.createBoard();
    this.peekCards();
    this.startListening();
  }

  restartGame() {
    document
      .querySelectorAll(".container__game__box")
      .forEach((item) => item.remove());
    this.resetState();
    this.startGame();
  }

  resetState() {
    this.state = {
      ...this.state,
      pairsFounded: 0,
      pairs: [],
      peekedCards: [],
    };
  }

  generatePairs() {
    const boxNumber = DIFFICULTY_BOX[this.state.difficulty];

    const randomNumbers = randomNumber(boxNumber);
    const pairs = pairNumbers(randomNumbers);

    this.state.pairs = pairs;
  }

  createBoard() {
    const imagesNumber = IMAGES.length;
    const fields = assignImage(imagesNumber, this.state.pairs);
    fields.forEach((item) => ROOT.appendChild(item));
  }

  peekCards() {
    this.state.activity = "peek";
    const boxes = document.body.querySelectorAll(".container__game__box");
    boxes.forEach((item) => {
      item.setAttribute("data-active", true);
    });

    setTimeout(() => {
      boxes.forEach((item) => {
        item.removeAttribute("data-active");
        this.state.activity = "game";
      });
    }, 2500);
  }

  startListening() {
    const boxes = document.body.querySelectorAll(".container__game__box");
    boxes.forEach((item) => {
      item.addEventListener("click", this.peekCard.bind(this));
    });
  }

  peekCard(el) {
    if (this.state.activity === "peek") return;
    this.state.activity = "peek";
    this.state.peekedCards.push(el.target.getAttribute("data-id"));
    el.target.setAttribute("data-active", true);
    this.checkPair();
  }

  changeDifficulty(difficulty) {
    this.state.difficulty = difficulty;
    this.restartGame();
  }

  async checkPair() {
    const isTwoCardVisible = this.state.peekedCards.length < 2;
    if (isTwoCardVisible) {
      this.state.activity = "game";
      return;
    }

    const peekedCard = this.state.peekedCards;
    const pair = this.state.pairs.find((item) => {
      return (
        item[0] == this.state.peekedCards[0] ||
        item[1] == this.state.peekedCards[0]
      );
    });
    const isMatch = pair.sort().toString() === peekedCard.sort().toString();

    await sleep(1000);
    if (!isMatch) {
      this.hideRevealedCards();
    } else {
      this.state.pairsFounded++;
      this.flipRevealedCards();
    }
    this.state.peekedCards = [];
    this.checkForWinner();

    this.state.activity = "game";
  }

  flipRevealedCards() {
    const boxes = document.body.querySelectorAll(".container__game__box");
    boxes.forEach((item) => {
      const id = item.getAttribute("data-id");
      if (this.state.peekedCards.includes(id))
        item.setAttribute("data-invisible", true);
    });
  }

  hideRevealedCards() {
    const boxes = document.body.querySelectorAll(".container__game__box");
    boxes.forEach((item) => {
      const id = item.getAttribute("data-id");
      if (this.state.peekedCards.includes(id))
        item.removeAttribute("data-active");
    });
  }

  checkForWinner() {
    if (DIFFICULTY_BOX[this.state.difficulty] === this.state.pairsFounded * 2) {
      alert("wygrałes!");
      this.restartGame();
    }
  }
}

export default Game;
