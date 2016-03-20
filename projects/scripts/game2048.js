
var currentScore = 0;

/*
 * possibleMove.js
 */

// This function will look for the first point where a move is possible in that direction. If it checks every
// 		option and none are possible, the direction is not possible and it returns false.
var possibleMove = function (board,dir) {
	var indexes = [[0, 1, 2, 3], [3, 2, 1, 0]]; // Used to interchange left and right || up and down
	var LUorDR = 0; // Which row of indexes is used

	if(dir == "RIGHT" || dir == "DOWN") {
		LUorDR = 1;
	}


	// All Possibilites for each line shifting towards the zero index
	// [ 0 0 0 0 ] = false
	// [ 0 0 0 1 ] = true
    //    . . .    = true
	// [ 0 1 1 1 ] = true
	// [ 1 0 0 0 ] = false
	// [ 1 0 0 1 ] = true
	// [ 1 0 1 0 ] = true
	// [ 1 0 1 1 ] = true
	// [ 1 1 0 0 ] = false
	// [ 1 1 0 1 ] = true
	// [ 1 1 1 0 ] = false
	// [ 1 1 1 1 ] = false
	//

	if(dir == "LEFT" || dir == "RIGHT") {
		for(var i = 0; i < 4; i++) { // Loop through each row
			//If there is an index with a zero where at least one of the coming indexes are non zero, then return true.
			if(board[i][indexes[LUorDR][0]] == 0) {
				if(board[i][indexes[LUorDR][1]] > 0 || board[i][indexes[LUorDR][2]] > 0 || board[i][indexes[LUorDR][3]] > 0) {
					return true;
				}
			}
			if(board[i][indexes[LUorDR][1]] == 0) {
				if(board[i][indexes[LUorDR][2]] > 0 || board[i][indexes[LUorDR][3]] > 0) {
					return true;
				}
			}
			if(board[i][indexes[LUorDR][2]] == 0) {
				if(board[i][indexes[LUorDR][3]] > 0) {
					return true;
				}
			}
			if(board[i][indexes[LUorDR][0]] == board[i][indexes[LUorDR][1]] && board[i][indexes[LUorDR][0]] != 0 && board[i][indexes[LUorDR][1]] != 0) {
				return true;
			}
			if(board[i][indexes[LUorDR][1]] == board[i][indexes[LUorDR][2]] && board[i][indexes[LUorDR][1]] != 0 && board[i][indexes[LUorDR][2]] != 0) {
				return true;
			}
			if(board[i][indexes[LUorDR][2]] == board[i][indexes[LUorDR][3]] && board[i][indexes[LUorDR][2]] != 0 && board[i][indexes[LUorDR][3]] != 0) {
				return true;
			}
		}
	}
	else {
		for(var i = 0; i < 4; i++) { // Loop through each column
			if(board[indexes[LUorDR][0]][i] == 0) {
				if(board[indexes[LUorDR][1]][i] > 0 || board[indexes[LUorDR][2]][i] > 0 || board[indexes[LUorDR][3]][i] > 0) {
					return true;
				}
			}
			if(board[indexes[LUorDR][1]][i] == 0) {
				if(board[indexes[LUorDR][2]][i] > 0 || board[indexes[LUorDR][3]][i] > 0) {
					return true;
				}
			}
			if(board[indexes[LUorDR][2]][i] == 0) {
				if(board[indexes[LUorDR][3]][i]) {
					return true;
				}
			}
			if(board[indexes[LUorDR][0]][i] == board[indexes[LUorDR][1]][i] && board[indexes[LUorDR][0]][i] != 0 && board[indexes[LUorDR][1]][i] != 0) {
				return true;
			}
			if(board[indexes[LUorDR][1]][i] == board[indexes[LUorDR][2]][i] && board[indexes[LUorDR][1]][i] != 0 && board[indexes[LUorDR][2]][i] != 0) {
				return true;
			}
			if(board[indexes[LUorDR][2]][i] == board[indexes[LUorDR][3]][i] && board[indexes[LUorDR][2]][i] != 0 && board[indexes[LUorDR][3]][i] != 0) {
				return true;
			}
		}
	}
	return false;
}

/*
 * move.js
 */

// Designed to Shift Array Towards Index 0
// This allows for the same function regardless of up, down, left, or right shifting
// pasteIndex holds current location with newArray. checkIndex holds current location in checkArray
// checkIndex moves through checkArray until a non zero, see's if there is a pair of numbers, and 
//		then puts the result in newArray closest to index 0.
var moveLine = function(checkArray, newArray, checkIndex, pasteIndex) {
	if(checkIndex > 3) { // Entire row has been checked
		return newArray;
	}
	else {
		if(checkArray[checkIndex] == 0) { // If zero, check next index in checkArray
			checkIndex++;
			return moveLine(checkArray, newArray, checkIndex, pasteIndex);
		}
		else {
			if(newArray[pasteIndex] == 0) { // If nothing has moved to newArray, transfer number
				newArray[pasteIndex] = checkArray[checkIndex];
				checkIndex++;
				return moveLine(checkArray, newArray, checkIndex, pasteIndex);
			}
			else { // We will need to see if checkIndex and pasteIndex are equal
				if(checkArray[checkIndex] == newArray[pasteIndex]) { // double the value at pasteIndex
					newArray[pasteIndex] = newArray[pasteIndex] * 2;
					currentScore += newArray[pasteIndex];
					checkIndex++;
					pasteIndex++;
					return moveLine(checkArray, newArray, checkIndex, pasteIndex);
				}
				else { // Paste checkIndex into next spot in newArray
					pasteIndex++;
					newArray[pasteIndex] = checkArray[checkIndex];
					checkIndex++;
					return moveLine(checkArray, newArray, checkIndex, pasteIndex);
				}
			}
		}
	}
}

var move = function(board,dir) {
	if(dir == "LEFT") {
		for(var i = 0; i < 4; i++) {
			var array = moveLine(board[i], [0, 0, 0, 0], 0, 0);
			board[i] = array;
		}
	}
	else if (dir == "RIGHT") {
		for(var i = 0; i < 4; i++) {
			var array = moveLine([board[i][3], board[i][2], board[i][1], board[i][0]], [0, 0, 0, 0], 0, 0);
			board[i][3] = array[0];
			board[i][2] = array[1];
			board[i][1] = array[2];
			board[i][0] = array[3];
		}
	}
	else if (dir == "UP") {
		for(var i = 0; i < 4; i++) {
			var array = moveLine([board[0][i], board[1][i], board[2][i], board[3][i]], [0, 0, 0, 0], 0, 0);
			board[0][i] = array[0];
			board[1][i] = array[1];
			board[2][i] = array[2];
			board[3][i] = array[3];
		}
	}
	else {
		for(var i = 0; i < 4; i++) {
			var array = moveLine([board[3][i], board[2][i], board[1][i], board[0][i]], [0, 0, 0, 0], 0, 0);
			board[3][i] = array[0];
			board[2][i] = array[1];
			board[1][i] = array[2];
			board[0][i] = array[3];
		}
	}
	return board;
}

/*
 * view.js
 */

var changeBackColor = function(row, col, val) {

	var backgroundcolor = "";

	//Sets Background Color
	if(val === 0) { 
		backgroundcolor = "#f9ebd1";
	}
	else if(val === 2) {
		backgroundcolor = "#cc9a66";
	}
	else if(val === 4) {
		backgroundcolor = "#ff9933";
	}
	else if(val === 8) {
		backgroundcolor = "#ff6600";
	}
	else if(val === 16) {
		backgroundcolor = "#ff3300";
	}
	else if(val === 32) {
		backgroundcolor = "#e60000"; //ff0000
	}
	else if(val === 64) {
		backgroundcolor = "#ff4444"; //ff3333
	}
	else if(val === 128) {
		backgroundcolor = "#ff0066";
	}
	else if(val === 256) {
		backgroundcolor = "#cc00ff";
	}
	else if(val === 512) {
		backgroundcolor = "#6600ff";
	}
	else if(val === 1024) {
		backgroundcolor = "#0000ff";
	}
	else if(val === 2048) {
		backgroundcolor = "#ffcc00";
	}
	else {
		backgroundcolor = "black";
	}

	//Updates Background Color
	$("#item" + row + col).css("background-color",backgroundcolor);

	//Updates Text Shadow
	if(val === 2048) {
		$("#item" + row + col).css("text-shadow","0 0 8px #000000");
	}
	else {
		$("#item" + row + col).css("text-shadow","none");
	}

	//Updates Text
	if(val === 0) {
		$("#item" + row + col).text("");
	}
	else {
		$("#item" + row + col).text(val);
	}
}

var printBoard = function(board) {
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			changeBackColor(i, j, board[i][j]);
		}
	}
	$("#score").text(currentScore);
}

/*
 * main.js
 */

//
// Returns a random integer between min (inclusive) and max (inclusive)
//
var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var randomValue = function() {
	var index = getRandomInt(0, 9);
	if(index < 9) {
		return 2;
	}
	else {
		return 4;
	}
}

var randomItem = function(board) {
	//Creates an array of all empty tiles
	var zeros = [];
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			if(board[i][j] == 0) {
				zeros.push({'v': i, 'h': j});
			}
		}
	}

	if(zeros.length > 0) { //Error Checking
		var index = getRandomInt(0, zeros.length - 1); //choses random index to place random tile
		var value = randomValue(); //value for the random tile
		board[zeros[index].v][zeros[index].h] = value;
	}

	return board;
}

var checkDirections = function(board) {
	var available = { l: false, r: false, u: false, d: false };

	//Checks for available moves (true=possible)
	available.l = possibleMove(board, "LEFT");
	available.r = possibleMove(board, "RIGHT");
	available.u = possibleMove(board, "UP");
	available.d = possibleMove(board, "DOWN");

	//If No More Moves Available, Game is over!
	if(available.l == false && available.r == false && available.u == false && available.d == false) {
		printBoard(board);
		var result = confirm("Game Over! Your Score: " + currentScore + ". Play again?");
		if(result == true) { //Okay
			location.reload();
		}
	}

	return available;
}

var main = function() {

	//Initialize board
	var currentBoard = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	//Adds a random value to two empty tiles
	currentBoard = randomItem(currentBoard);
	currentBoard = randomItem(currentBoard);
	printBoard(currentBoard);

	var availableDir = { l: false, r: false, u: false, d: false };

	availableDir = checkDirections(currentBoard);

	// 
	// Wait for Keystroke
	// 
	$(document).keydown(function(e) { //Arrow Keys
		if(e.which == 37) { //Left Key
			//$("#debug").text("Left");
			e.preventDefault();
			if(availableDir.l === true) { //Move must be possible
				//Shifts all tiles left
				currentBoard = move(currentBoard,"LEFT");
				//Adds a random value to one empty tile
				currentBoard = randomItem(currentBoard);
				//Determines new available moves
				availableDir = checkDirections(currentBoard);
				printBoard(currentBoard);
			}
		}
		else if(e.which == 38) { //Up Key
			//$("#debug").text("Up");
			e.preventDefault();
			if(availableDir.u === true) { //Move must be possible
				//Shifts all tiles up
				currentBoard = move(currentBoard,"UP");
				//Adds a random value to one empty tile
				currentBoard = randomItem(currentBoard);
				//Determines new available moves
				availableDir = checkDirections(currentBoard);
				printBoard(currentBoard);
			}
		}
		else if(e.which == 39) { //Right Key
			//$("#debug").text("Right");
			e.preventDefault();
			if(availableDir.r === true) { //Move must be possible
				//Shifts all tiles right
				currentBoard = move(currentBoard,"RIGHT");
				//Adds a random value to one empty tile
				currentBoard = randomItem(currentBoard);
				//Determines new available moves
				availableDir = checkDirections(currentBoard);
				printBoard(currentBoard);
			}
		}
		else if(e.which == 40) { //Down Key
			//$("#debug").text("Down");
			e.preventDefault();
			if(availableDir.d === true) { //Move must be possible
				//Shifts all tiles down
				currentBoard = move(currentBoard,"DOWN");
				//Adds a random value to one empty tile
				currentBoard = randomItem(currentBoard);
				//Determines new available moves
				availableDir = checkDirections(currentBoard);
				printBoard(currentBoard);
			}
		}
	});
	$(document).keypress(function(e) { //Letter Keys
		if(e.which == 105) { //I key
			//$("#debug").text("I - Up");
			if(availableDir.u === true) { //Move must be possible
				//Shifts all tiles up
				currentBoard = move(currentBoard,"UP");
				//Adds a random value to one empty tile
				currentBoard = randomItem(currentBoard);
				//Determines new available moves
				availableDir = checkDirections(currentBoard);
				printBoard(currentBoard);
			}
		}
		else if(e.which == 106) { //J key
			//$("#debug").text("J - Left");
			if(availableDir.l === true) { //Move must be possible
				//Shifts all tiles left
				currentBoard = move(currentBoard,"LEFT");
				//Adds a random value to one empty tile
				currentBoard = randomItem(currentBoard);
				//Determines new available moves
				availableDir = checkDirections(currentBoard);
				printBoard(currentBoard);
			}
		}
		else if(e.which == 107) { //K key
			//$("#debug").text("K - Down");
			if(availableDir.d === true) { //Move must be possible
				//Shifts all tiles down
				currentBoard = move(currentBoard,"DOWN");
				currentBoard = randomItem(currentBoard);
				//Determines new available moves
				availableDir = checkDirections(currentBoard);
				printBoard(currentBoard);
			}
		}
		else if(e.which == 108) { //L key
			//$("#debug").text("L - Right");
			if(availableDir.r === true) { //Move must be possible
				//Shifts all tiles right
				currentBoard = move(currentBoard,"RIGHT");
				//Adds a random value to one empty tile
				currentBoard = randomItem(currentBoard);
				//Determines new available moves
				availableDir = checkDirections(currentBoard);
				printBoard(currentBoard);
			}
		}
		else if(e.which == 112) { //P key
			$("#debug").text("P - Pause");
			pauseMenu();
		}
	});
}

main(); //Starts the game, Good Luck!
