let userName = document.querySelector(".game-info .name span");
let triesSpan = document.querySelector(".game-info .tries span");
let gameBlocksCont = document.querySelector(".game-container");
let gameBlock = document.querySelector(".game-block");
// let gameBlockLen = document.querySelectorAll(".game-block");
let faceFront = document.querySelector(".game-block .front");
let duration = 1000;
let isFlipping = false;
let flippBlocks = [];
let tries = 0;
let blocks = Array.from(gameBlocksCont.children);

document.querySelector(".controls-button span").onclick = () => {
  let yourName = prompt("What's Your Name?:");
  if (yourName === "" || yourName === null) {
    userName.textContent = "Unknown";
  } else {
    userName.textContent = yourName;
  }

  document.querySelector(".controls-button").remove();
};

let orderRang = [...Array(blocks.length).keys()];
shuffel(orderRang);
blocks.forEach((block, index) => {
  block.style.order = orderRang[index];

  block.addEventListener("click", () => {
    if (!isFlipping) {
      flipped(block);
    }
  });
});

// gameBlocksCont.forEach((block) => {
//   if (block.classList.contains("match")) {
//     document.body.style.pointerEvents = "none";
//     theEnd();
//   }
// });

function flipped(selectedBlock) {
  selectedBlock.classList.add("flipped");
  flippBlocks.push(selectedBlock);

  if (flippBlocks.length === 2) {
    isFlipping = true;
    stopClicking();
    setTimeout(() => {
      flippBlocks.forEach((block) => {
        block.classList.remove("flipped");
      });
      gameBlocksCont.classList.remove("no-click");
      checkMatch(flippBlocks[0], flippBlocks[1]);
      isFlipping = false;
      flippBlocks = [];
    }, duration);
  }
}

function checkMatch(firstBlock, secondBlock) {
  if (firstBlock.dataset.tecnolegy === secondBlock.dataset.tecnolegy) {
    firstBlock.classList.remove("flipped");
    secondBlock.classList.remove("flipped");

    firstBlock.classList.add("matched");
    secondBlock.classList.add("matched");
  } else {
    tries++;
    triesSpan.innerHTML = tries;
  }
}

function stopClicking() {
  gameBlocksCont.classList.add("no-click");
}

function shuffel(array) {
  let current = array.length,
    stash,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);

    current--;

    stash = array[current];

    array[current] = array[random];

    array[random] = stash;
  }
  return array;
}

// function theEnd() {
//   document.querySelector(".the-end").innerHTML = `Not Bad...${tries} Mistake`;
//   document.querySelector(".the-end").style.display = "flex";
// }
