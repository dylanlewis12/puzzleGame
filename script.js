let Number_of_moves = 0;
let time = 0;
let timer;  // Timer variable
let isTimerRunning = false;  

function simpleGame() {
    resetTimer(); // Reset the timer
    Number_of_moves = 0;
    updateMoves();

    // Ensure all tiles are in correct order
    let num = 1;
    for (let row = 1; row <= 4; row++) {
        for (let column = 1; column <= 4; column++) {
            let cellNum = "cell" + row + column;
            if (tileNumber <= 15) {
                document.getElementById(cellNum).className = "tile" + num;
                num++;
            } else {
                document.getElementById(cellNum).className = "tile16"; // Empty space
            }
        }
    }

    // Select a random tile that is NOT the empty tile
    let randomRow, randomColumn;
    do {
        randomRow = Math.floor(Math.random() * 4) + 1;
        randomColumn = Math.floor(Math.random() * 4) + 1;
    } while (randomRow === 4 && randomColumn === 4); // Avoid swapping the empty tile with itself

    // Swap the randomly chosen tile with the empty space
    swapTiles("cell" + randomRow + randomColumn, "cell44");
}

function updateTime() {
    document.getElementById("time-count").textContent = time;
}

function startTimer() {
    if (!isTimerRunning) {  // Only start if it's not running
        isTimerRunning = true;
        timer = setInterval(() => {
            time++;
            updateTime();
        }, 1000); // Increments time every second
    }
}

function resetTimer() {
    clearInterval(timer);
    time = 0;
    isTimerRunning = false;
    updateTime();
}

function updateMoves() {
    document.getElementById("moves-count").textContent = Number_of_moves;
}

function swapTiles(cell1, cell2) {
    var temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
    Number_of_moves++;
    updateMoves();
}			

function shuffle() {
    for (var row = 1; row <= 4; row++) {
        for (var column = 1; column <= 4; column++) {
            var row2 = Math.floor(Math.random() * 4 + 1);
            var column2 = Math.floor(Math.random() * 4 + 1);
            swapTiles("cell" + row + column, "cell" + row2 + column2);
        }
    }
    Number_of_moves = 0;
    updateMoves();
    resetTimer(); // Reset the timer when a new game starts
}

function clickTile(row, column) {
    if (Number_of_moves === 0) {  // Start timer on first move
        startTimer();
    }

    var cell = document.getElementById("cell" + row + column);
    var tile = cell.className;

    if (tile != "tile16") {
        if (column < 4 && document.getElementById("cell" + row + (column + 1)).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + row + (column + 1));
            setTimeout(Win,1000);
            return;
        }
        if (column > 1 && document.getElementById("cell" + row + (column - 1)).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + row + (column - 1));
            setTimeout(Win,1000);
            return;
        }
        if (row > 1 && document.getElementById("cell" + (row - 1) + column).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + (row - 1) + column);
	    setTimeout(Win,1000);
            return;
        }
        if (row < 4 && document.getElementById("cell" + (row + 1) + column).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + (row + 1) + column);
	    setTimeout(Win,1000);
            return;
        }
    }
}

function Win() {
    if (
        document.getElementById("cell11").className == "tile1" &&
        document.getElementById("cell12").className == "tile2" &&
        document.getElementById("cell13").className == "tile3" &&
        document.getElementById("cell14").className == "tile4" &&
        document.getElementById("cell21").className == "tile5" &&
        document.getElementById("cell22").className == "tile6" &&
        document.getElementById("cell23").className == "tile7" &&
        document.getElementById("cell24").className == "tile8" &&
        document.getElementById("cell31").className == "tile9" &&
        document.getElementById("cell32").className == "tile10" &&
        document.getElementById("cell33").className == "tile11" &&
        document.getElementById("cell34").className == "tile12" &&
        document.getElementById("cell41").className == "tile13" &&
        document.getElementById("cell42").className == "tile14" &&
        document.getElementById("cell43").className == "tile15" &&
        document.getElementById("cell44").className == "tile16" && 
        Number_of_moves > 0) {
	clearInterval(timer);
	
	window.alert(`🎉 Congratulations!! 🎉
Amount spent on current game in seconds: ${time}
Number of moves so far: ${Number_of_moves}
Would you like to play again?`);

        window.location.reload();
    }
}
