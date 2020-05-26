document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".ms-grid");
  let width = 10;
  let squares = [];

  // Creating the board

  function createTheBoard() {
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
