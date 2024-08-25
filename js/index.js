const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const startCells = ["", "", "", "", "", "", "", "", ""];

// Jag använder 'let' eftersom denna variabel ska skrivas över!
// Circle spelar först!
let turn = "circle";

infoDisplay.textContent = "Circle börja spelet";

// Vi börjar ett spel!
createBoard();

// ==========================================================
// Metoder

function createBoard() {
  // Underscore _ före ett variabelnamn, som i _cell,
  // används ofta som en konvention för att indikera att
  // variabeln inte kommer att användas.
  // I detta fall visar det att _cell är ett argument som
  // skickas till forEach-funktionen,
  // men själva värdet används inte i funktionen.
  // Detta kan hjälpa utvecklare att förstå att _cell är
  // ett icke-använt argument och undvika förvirring.

  // Update #4a - Kan man ta bort 'index'
  // Update #4b - Kan man ta bort '_cell'
  // startCells.forEach((_cell, index) => {
  startCells.forEach(() => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");

    cellElement.addEventListener("click", addTurn);
    gameBoard.append(cellElement);
  });
}

function addTurn(e) {
  console.log("clicked", e.target);
  const turnDisplay = document.createElement("div");

  // Minns ni att Circle spelar först?
  turnDisplay.classList.add(turn);

  e.target.append(turnDisplay);

  // Ternary operator... har ni sett en sådan förut?
  // Vi byter spelare efter var tur
  turn = turn === "circle" ? "cross" : "circle";

  infoDisplay.textContent = "Player " + turn;

  // Ta bort denna rad!
  // Vad händer?
  e.target.removeEventListener("click", addTurn);

  checkScore();
}

function checkScore() {
  //   Varför querySelectorAll?
  const allSquares = document.querySelectorAll(".square");
  console.log(allSquares);
  const winningCombos = [
    // Update #5 - Först vinnande kombo var feldefinierat!'
    // [0, 1, 3], // Vågrätt
    [0, 1, 2], // Vågrätt
    [3, 4, 5], // Vågrätt
    [6, 7, 8], // Vågrätt
    [0, 3, 6], // Lodrätt
    [1, 4, 7], // Lodrätt
    [2, 5, 8], // Lodrätt
    [0, 4, 8], // Diagonal
    [2, 4, 6], // Diagonal
  ];
  console.log(winningCombos);

  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      infoDisplay.textContent = "Circle vinner spelet!";

      // När spelet är över stänger vi av samtliga Event listeners
      // (så spelarna inte kan fortsätta klicka och lägga nya drag)
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
    }
  });

  winningCombos.forEach((array) => {
    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      infoDisplay.textContent = "Cross vinner spelet!";

      // När spelet är över stänger vi av samtliga Event listeners
      // (så spelarna inte kan fortsätta klicka och lägga nya drag)
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
    }
  });
}
