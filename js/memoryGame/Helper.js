import { IMAGES } from "./global";

const createCard = (number, src) => {
  const div = document.createElement("div");
  div.classList.add("container__game__box");
  div.classList.add(`container__game__box--${number}`);
  div.setAttribute("data-id", number);

  const image = document.createElement("img");
  image.classList.add("container__game__box__image");
  image.src = src;
  div.appendChild(image);
  return div;
};

export const assignImage = (imagesNumber, pairs) => {
  const images = [];
  while (images.length < pairs.length) {
    const random = Math.floor(Math.random() * imagesNumber);
    if (images.indexOf(random) === -1) images.push(random);
  }
  const fields = [];
  for (let i = 0; i < pairs.length; i++) {
    const boxOneNumber = pairs[i][0];
    const boxTwoNumber = pairs[i][1];

    const imageSrc = IMAGES[images[i]];

    const div1 = createCard(boxOneNumber, imageSrc);
    const div2 = createCard(boxTwoNumber, imageSrc);

    fields.push(div1);
    fields.push(div2);
  }
  return fields;
};

export const randomNumber = (to) => {
  const arr = [];
  while (arr.length < to) {
    const random = Math.floor(Math.random() * to) + 1;
    if (arr.indexOf(random) === -1) arr.push(random);
  }
  return arr;
};

export const pairNumbers = (numbers) => {
  const pairs = [];
  for (let i = 0; i < numbers.length; i += 2) {
    const tuple = [numbers[i], numbers[i + 1]];
    pairs.push(tuple);
  }
  return pairs;
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
