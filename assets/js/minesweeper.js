document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".ms-grid");
  let width = 10;
  let bombers = 20;
  let squares = [];
  let gameIsOver = false;

  // Creating the board

  function createTheBoard() {
    // Putting the random bombs inside the grid
    const bombsLocation = Array(bombers).fill("kaboom");
    const clearLocation = Array(width * width - bombers).fill("clear");

    const playingGrid = clearLocation.concat(bombsLocation);

    const randomGrid = playingGrid.sort(() => Math.random() - 0.5);

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("id", i);
      square.classList.add(randomGrid[i]);
      grid.appendChild(square);
      squares.push(square);

      // Listen to a click
      square.addEventListener("click", function (e) {
        click(square);
      });
    }
    // Adding the numbers to the cleared blocks
    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      const leftBorder = i % width === 0;
      const rightBorder = i % width === width - 1;

      if (squares[i].classList.contains("clear")) {
        if (i > 0 && !leftBorder && squares[i - 1].classList.contains("kaboom"))
          total++;
        if (
          i > 9 &&
          !rightBorder &&
          squares[i + 1 - width].classList.contains("kaboom")
        )
          total++;
        if (i > 10 && squares[i - width].classList.contains("kaboom")) total++;
        if (
          i > 11 &&
          !leftBorder &&
          squares[i - 1 - width].classList.contains("kaboom")
        )
          total++;
        if (
          i < 98 &&
          !rightBorder &&
          squares[i + 1].classList.contains("kaboom")
        )
          total++;
        if (
          i < 90 &&
          !leftBorder &&
          squares[i - 1 + width].classList.contains("kaboom")
        )
          total++;
        if (
          i < 88 &&
          !rightBorder &&
          squares[i + 1 + width].classList.contains("kaboom")
        )
          total++;
        if (i < 89 && squares[i + width].classList.contains("kaboom")) total++;
        squares[i].setAttribute("data", total);
        console.log(squares[i]);
      }
    }
  }
  createTheBoard();

  // Clicking on a square at the start of the game
  function click(square) {
    let currentBlock = square.id;

    if (gameIsOver) return;
    if (
      square.classList.contains("checked") ||
      square.classList.contains("flag")
    )
      return;
    if (square.classList.contains("kaboom")) {
      gameOver(square);
    } else {
      let totalBombs = square.getAttribute("data");
      if (totalBombs != 0) {
        square.classList.add("checked");
        square.innerHTML = totalBombs;
        return;
      }
      cleanSquare(square, currentBlock);
    }
    square.classList.add("checked");
  }

  // Clear blocks with zero bombs around them, once a square is clicked.
  function cleanSquare(square, currentBlock) {
    const leftBorder = currentBlock % width === 0;
    const rightBorder = currentBlock % width === width - 1;

    setTimeout(() => {
      if (currentBlock > 0 && !leftBorder) {
        const newId = squares[parseInt(currentBlock) - 1].id;
        const newSquare = document.getElementById(newId);

        click(newSquare);
      }
      if (currentBlock > 9 && !rightBorder) {
        const newId = squares[parseInt(currentBlock) + 1 - width].id;
        const newSquare = document.getElementById(newId);

        click(newSquare);
      }
      if (currentBlock > 10) {
        const newId = squares[parseInt(currentBlock - width)].id;
        const newSquare = document.getElementById(newId);

        click(newSquare);
      }
      if (currentBlock > 11 && !leftBorder) {
        const newId = squares[parseInt(currentBlock) - 1 - width].id;
        const newSquare = document.getElementById(newId);

        click(newSquare);
      }
      if (currentBlock < 98 && !rightBorder) {
        const newId = squares[parseInt(currentBlock) + 1].id;
        const newSquare = document.getElementById(newId);

        click(newSquare);
      }
      if (currentBlock < 90 && !leftBorder) {
        const newId = squares[parseInt(currentBlock) - 1 + width].id;
        const newSquare = document.getElementById(newId);

        click(newSquare);
      }
      if (currentBlock < 88 && !rightBorder) {
        const newId = squares[parseInt(currentBlock) + 1 + width].id;
        const newSquare = document.getElementById(newId);

        click(newSquare);
      }
      if (currentBlock < 89) {
        const newId = squares[parseInt(currentBlock) + width].id;
        const newSquare = document.getElementById(newId);

        click(newSquare);
      }
    }, 10);
  }

  // When the game is over
});
