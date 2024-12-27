// Step 1: Initialize Variables
const cells = document.querySelectorAll('.cell');
const winnerMessage = document.getElementById('winner-message');
let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

// Step 2: Add Event Listeners to Each Cell
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(cell, index));
});

// Step 3: Handle Cell Clicks
function handleCellClick(cell, index) {
  if (!gameActive || boardState[index] !== '') return; // Ensure the cell is empty and the game is active

  // Update the board state and UI
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken', currentPlayer);

  // Check for a winner or a draw
  if (checkWinner()) {
    winnerMessage.textContent = `${currentPlayer} Wins!`;
    gameActive = false;
  } else if (boardState.every(cell => cell !== '')) {
    winnerMessage.textContent = "It's a Draw!";
    gameActive = false;
  } else {
    // Switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Step 4: Check for a Winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  // Loop through each combination and check if the current player occupies all positions
  return winningCombinations.some(combination =>
    combination.every(index => boardState[index] === currentPlayer)
  );
}

// Step 5: Reset Button
document.getElementById('reset-button').addEventListener('click', resetGame);

function resetGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  winnerMessage.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
  });
}
