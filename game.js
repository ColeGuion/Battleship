let canvas; //global canvas
let context; //global context
let is_player_one = true; //bool to track current player

//check for dom content loaded and add a click event to all class square elements
document.addEventListener('DOMContentLoaded', () => {
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");
    const square = document.querySelectorAll('.square')

    square.forEach(id => {
        id.addEventListener('click', checkHit)
        id.addEventListener('click', boat_sel_click)
    })
    draw();
})

let turn = -1;

//player array for player 1 updated at each click event when turn%2 == 0
const player1array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,
                        20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,
                        40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,
                        60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89]

//player array for player 1 updated at each click event when turn%2 == 0
const player2array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,
                        20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,
                        40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,
                        60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89]

//updates player array when a click event happens NOTE: will eventually be used to print to the screen where hits/misses/empty spaces are
function checkHit () {
    console.log(this)
    if (in_combat) {
        turn++;
        if(turn % 2 == 0){
            console.log("player 1 turn\n")
            player1array[this.id] = 'hit'
            console.log(player1array)
        }
        else{
            console.log("player 2 turn\n")
            player2array[this.id] = 'hit'
            console.log(player2array)
        }
    } 
}

//Draws that current animation frame in according to what it tells to print
function draw() {
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    context.clearRect(0,0,canvas.width,canvas.height);
    print_board();
    if (in_boat_selcection) { //if game is in the selection phase
        if(is_player_one) {
            place_ships(); //function in boat_selection.js
        } 
        else {
            place_ships(); //function in boat_selection.js
        }
    }
    else if(in_combat) { //if game is in the combat phase
        if(is_player_one) {

        }
        else {

        }
    }
    if(check_game_over() == false) { //recalls draw function if check_game_over returns false (does this through tick() function)
        tick();
    }
}

//Requests the current animation frame
function tick() {
    window.requestAnimationFrame(draw);
}

//Function to check if game is over
function check_game_over() {

}

function print_board() {
    let alph = ['A','B','C','D','E','F','G','H','I','J'];
    context.font = "Bold 12pt Candara";
    if(is_player_one) {
        context.fillText("Player1",600,50);
    }
    else {
        context.fillText("Player2",600,50);
    }
    context.font = "15pt Candara";
    for(let i = 1; i <= 9; i++) {
        context.fillText(i,8,56*(i));
    }
    context.font = "12pt Candara";
    for(let i = 0; i < 10; i++) {
        context.fillText(alph[i],54.5*(i+1),15);
    }
}


var Ship = function(name, location) {

  this.name = name ;
  this. location = location;
  this. sunk = false;

  this. Checksunk = function(){
    for (var i = 0; i < location.length; i++) {
            if (location[i].hit !== true) {
                return false;
            }
  }
  this.sunk = true ;
};
};

var sunk  = function(){
 
  //check ship is sunk//
   var ship1 = ship1.checkSunk();
   var ship2 = ship2.checkSunk();
   var ship3 = ship3.checkSunk();
   var ship4 = ship4.checkSunk();
   var ship5 = ship5.checkSunk();
   var ship6 = ship6.checkSunk();

// if ship is sunnk//
   for(var i = 0; i < arry.length; i++) {
        if(arry[i].sunk === true) {
          var call =  document.addEventListener(arry.name);
          
      }

          game.Over();
          
}
}

//Commented this out because it was causing errors
// Over: function(){  //
//   for (var i = 0; i < arry.length; i++) {
//     if(arr[i].sunk !== true) {
//       return false;
//     }
//     }
//     this.ship.gameOver = true;
// },
// }
