let canvas; //global canvas
let context; //global context
let is_player_one = true; //bool to track current player
let is_ai_game = false;
let difficulty = 0; // 1 = easy, 2 = medium, 3 = hard

/**
 * @author Konrad Kahnert
 * @return void
 * @description checks for dom content and then prompts user to select between playing vs player or AI
 */
document.addEventListener('DOMContentLoaded', () => {

    // Initialize buttons
    play_vs_human_button = document.createElement("play_vs_human_button");
    play_vs_human_button.innerHTML = "Play Against Human";
    body = document.getElementsByTagName("body")[0];
    body.appendChild(play_vs_human_button);

    play_vs_ai_button = document.createElement("play_vs_ai_button");
    play_vs_ai_button.innerHTML = "Play Against AI";
    body.appendChild(play_vs_ai_button);

    easy_button = document.createElement("easy_button");
    easy_button.innerHTML = "Easy";

    medium_button = document.createElement("medium_button");
    medium_button.innerHTML = "Medium";

    hard_button = document.createElement("hard_button");
    hard_button.innerHTML = "Hard";

    // Define button behavior
    play_vs_human_button.addEventListener("click", () => {
        body.removeChild(play_vs_human_button);
        body.removeChild(play_vs_ai_button);
        is_ai_game = false;
        start_game();
    })

    play_vs_ai_button.addEventListener("click", () => {
        body.removeChild(play_vs_ai_button);
        body.removeChild(play_vs_human_button);
        is_ai_game = true;

        body.appendChild(easy_button);
        body.appendChild(medium_button);
        body.appendChild(hard_button);

        easy_button.addEventListener("click", () => {
            body.removeChild(easy_button);
            body.removeChild(medium_button);
            body.removeChild(hard_button);
            difficulty = 1;
            start_game();
        })
        medium_button.addEventListener("click", () => {
            body.removeChild(easy_button);
            body.removeChild(medium_button);
            body.removeChild(hard_button);
            difficulty = 2;
            start_game();
        })
        hard_button.addEventListener("click", () => {
            body.removeChild(easy_button);
            body.removeChild(medium_button);
            body.removeChild(hard_button);
            difficulty = 3;
            start_game();
        })
    })
})

/**
 * @author blake richmeier
 * @return void
 * @description Gets number of ships from the user, then starts the game
 */
function start_game()
{
    max_ships = prompt("How many ships do you want to allow?");
    while (max_ships < 1 || max_ships > 6) {
        max_ships = prompt("Please input a value that is between 1 and 6 this time");
    }
    max_ships = parseInt(max_ships);
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");
    let square = document.querySelectorAll('.square')
    let grid = document.querySelector('.grid')

    square.forEach(id => {
        id.addEventListener('click', boat_sel_click)
    })
    draw();
}

let turn = -1;


//player array for player 1 updated at each click event when turn%2 == 0
const player1array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89
]

//player array for player 2 updated at each click event when turn%2 == 0
const player2array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89
]
/**
 * @author blake richmeier
 * @version 2
 * @description updates player array when a click event happens used to print to the screen where hits/misses/empty spaces are
 */
function checkHit(squareToCheck, isPlayerOne) {
    turn++;
    if (isPlayerOne) {
        console.log("player 1 turn\n")
        player1array[squareToCheck] = 'ship'
        console.log(player1array)
    } else {
        console.log("player 2 turn\n")
        player2array[squareToCheck - 90] = 'ship'
        console.log(player2array)
    }
}

/**
 * @author blake richmeier
 * @version 1
 * @description creates blank board for players to interact with for player 1
 */
function fillSquaresPlayer1() {
    for (let i = 0; i < 90; i++) {
        var image = document.createElement('img')
        image.src = 'images/team10.png'
        document.getElementById(i).innerHTML = ''
        document.getElementById(i).appendChild(image)
    }
}

/**
 * @author blake richmeier
 * @version 1
 * creates blank board for players to interact with for player 2
 */
function fillSquaresPlayer2() {
    for (let i = 90; i < 180; i++) {
        var image = document.createElement('img')
        image.src = 'images/team10.png'
        document.getElementById(i).innerHTML = ''
        document.getElementById(i).appendChild(image)
    }
}

/**
 * @author blake richmeier
 * @version 2
 * @description Draws that current animation frame in according to what it tells to print
 */
function draw() {
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);
    print_board();
    if (in_boat_selection) { //if game is in the selection phase
        if (is_player_one) {
            place_ships(); //function in boat_selection.js
        } else {
            place_ships(); //function in boat_selection.js
        }
    }
}

/**
 * @author Ben Moeller
 * @return {bool}
 * @description Function to help print letters and numbers tO the board
 */
function print_board() {
    let alph = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    context.font = "Bold 12pt Candara";
    if (in_boat_selection) {
        if (is_player_one) {
            context.fillText("Player 1", 760, 50);
        } else {
            context.fillText("Player 2", 760, 50);
        }
    }
    context.font = "15pt Candara";
    for (let i = 1; i <= 9; i++) {
        context.fillText(i, 8, 56 * (i));
        context.fillText(i, 1000, 56 * i);
    }
    context.font = "12pt Candara";
    for (let i = 0; i < 10; i++) {
        context.fillText(alph[i], 54.5 * (i + 1), 15);
        context.fillText(alph[i], 1000 + (54.5 * (i + 1)), 15);
    }
}

/**
 * @author Ben Moeller
 * @return {void}
 * @description Function to help print letters and numbers tO the board, needed second function for combat phase
 */
function print_board2() {
    let alph = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    context.font = "Bold 12pt Candara";

    context.font = "15pt Candara";
    for (let i = 1; i <= 9; i++) {
        context.fillText(i, 8, 56 * (i));
        context.fillText(i, 1000, 56 * i);
    }
    context.font = "12pt Candara";
    for (let i = 0; i < 10; i++) {
        context.fillText(alph[i], 54.5 * (i + 1), 15);
        context.fillText(alph[i], 1000 + (54.5 * (i + 1)), 15);
    }
}

var Ship = function (name, location) {
    this.name = name;
    this.location = location;
    this.sunk = false;

    this.Checksunk = function () {
        for (var i = 0; i < location.length; i++) {
            if (location[i].hit !== true) {
                return false;
            }
        }
        this.sunk = true;
    };
};

var sunk = function () {

    //check ship is sunk//
    var ship1 = ship1.checkSunk();
    var ship2 = ship2.checkSunk();
    var ship3 = ship3.checkSunk();
    var ship4 = ship4.checkSunk();
    var ship5 = ship5.checkSunk();
    var ship6 = ship6.checkSunk();

    // if ship is sunk/
    for (var i = 0; i < arry.length; i++) {
        if (arry[i].sunk === true) {
            var call = document.addEventListener(arry.name);
        }
        game.Over();
    }
}
