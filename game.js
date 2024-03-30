const gridSize = 6; // 6x6 grid
const treasureCount = 4; // Number of treasures
let map = [];
let treasuresFound = 0;
let totalClicks = 0; // Track how many clicks the player has made

// Generate the game map and display it
function generateMap() {
    let gridElement = document.getElementById('grid');
    gridElement.innerHTML = ''; //clears the game board. This is useful for resetting the game.

    // A nested loop (a loop inside another loop) goes through each row (i)
    // and each column (j) to create the grid cells. This is where arrays come in handy to organize 
    // the grid in a way we can easily check later
    for (let i = 0; i < gridSize; i++) {
        map[i] = [];
        for (let j = 0; j < gridSize; j++) {
            map[i][j] = ' '; // Initially empty cell
            let cell = document.createElement('div'); //creates a new square (or cell) for the grid.
            cell.className = 'cell';
            cell.id = `cell-${i}-${j}`; // allow for both multiline strings and string interpolation.
            // cell.className = 'cell'; and cell.id = 'cell-${i}-${j}'; give each cell a class 
            // for styling and a unique ID to identify it later.

            // Click event for each cell
            cell.addEventListener('click', function() { cellClicked(i, j); });
            // makes the cell respond to clicks.
            // When clicked, it calls the cellClicked function with the cell's coordinates.

            gridElement.appendChild(cell);
        }
    }

    // Randomly place treasures
    for (let i = 0; i < treasureCount; i++) {
        let x = Math.floor(Math.random() * gridSize);
        let y = Math.floor(Math.random() * gridSize);
        // The loop that places treasures randomly picks grid positions for them, checking to ensure each treasure has its unique spot.
        // Math.floor(Math.random() * gridSize); picks a random number from 0 to 4 (since gridSize is 5), which corresponds to the grid's rows and columns.

        // Ensure unique positions for treasures
        while (map[x][y] === 'T') {
            x = Math.floor(Math.random() * gridSize);
            y = Math.floor(Math.random() * gridSize);
        }

        map[x][y] = 'T'; // T for Treasure
    }
}

// Handle cell clicks
// This function handles what happens when a cell is clicked.
function cellClicked(x, y) {
    totalClicks++; // records each click.
    const cell = document.getElementById(`cell-${x}-${y}`);

    if (map[x][y] === 'T') { // checks if the clicked cell has a treasure
        cell.innerText = 'T'; // If there's a treasure, it updates the cell to show "T"
        treasuresFound++; //  increases the treasure count
        cell.removeEventListener('click', function() { cellClicked(x, y); }); // Disable further clicks
        alert('You found a treasure!'); //hows a message.

        if (treasuresFound === treasureCount) {
            alert(`Congratulations! You found all the treasures in ${totalClicks} clicks!`);
            // Optionally, offer a button to restart the game
        }
    } else { //If not, it marks the cell with "X" and changes its background to show it's been clicked.
        cell.innerText = 'X'; // Indicate this cell does not have a treasure
        cell.style.backgroundColor = '#f0f0f0'; // Change background to show it's been clicked
    }

    cell.style.pointerEvents = 'none'; // Disable further clicks on this cell
}// makes sure you can't click the same cell again.

// Initialize the game
function startGame() {
    treasuresFound = 0;
    totalClicks = 0;
    generateMap();
}

// You may want to add a button or a way to restart the game once all treasures are found or on user request
