document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".ms-grid");
  let width = 10;
  let bombers = 20;
  let squares = [];

  // Creating the board

  function createTheBoard() {
    // Putting the random bombs inside the grid
    const bombsLocation = Array(bombers).fill("kaboom");
    const clearLocation = Array(width * width - bombers).fill("clear");
    console.log(bombsLocation);
    console.log(clearLocation);

    let i;
    for (i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("id", i);
      grid.appendChild(square);
      squares.push(square);
    }
  }
  createTheBoard();
});
