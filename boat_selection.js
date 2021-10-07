let in_boat_selection = true; //if in the boat selection phase
let num_of_ships = 1; //holds the number of ships
let ship_inc = 1; //increment that counts up to compare with the number of ships
let max_ships; //maximum amount of ships that players can place
let more_ships = false; //Bool to track whether more ships need to be placed
let boat_first_click = true; //If the new boat is the first block being placed
let is_vertical = true; //If the boat is in a vertical orientation
let is_horizontal = true; //If the boat is in a horizontal orientaion
let boat6 = false;
let first_button = true;
let initial_location; // stores the starting coordinate of a ship. To be used by the AI
let direction; // stores the direction of the current ship being placed by the AI
var yes_button; //varibale to hold the yes_button
var body; //body declaration to help with the placement of buttons
var no_button; //variable to hold the no_button

//Strings that will hold where the boats are
let player_ships_placed = {
    player1: "..........................................................................................",
    player2: "..........................................................................................",
}

/**
 * @author James Barnett
 * @see ask_more_ships for function declaration
 * @return {void}
 * @description function that places AI's ships on the board
 */
function ai_boat_sel() {
    is_player_one = false;
    in_boat_selection = true;

    // directional variables
    const left = -1; 
    const right = 1;
    const up = -10; 
    const down = 10;

    // max and min grid locations
    const min = 90; 
    const max = 179;

    // array that holds a ship's proposed coordinates
    let locationArray = []; 

    if (in_boat_selection) {
        // gets a random location on the board that is inclusive of the min and max value
        let rand_location = Math.floor(Math.random() * (max - min + 1) + min);

        // picks direction for the ship
        let dir = [left, right, up, down][Math.floor(Math.random() * (3 - 0 + 1) + 0)];

        // if the random location chosen is invalid, find a new location
        while (valid_first_block(rand_location) === false || valid_first_block(rand_location) === undefined) { 
            rand_location = Math.floor(Math.random() * (max - min + 1) + min);
        }

        // store the location and direction
        setShipLocation(rand_location, dir);

        if (ship_inc <= num_of_ships && valid_first_block(getShipLocation()[0])) {
            for (let i = 0; i < num_of_ships; i++) {
                // if the entire length of the ship won't be valid, find a new starting location for the ship.
                // Reset i to 0 to iterate through and check if the new location is valid
                if (checkShip(getShipLocation()[0] + (getShipLocation()[1] * i)) === false) {
                    rand_location = Math.floor(Math.random() * (max - min + 1) + min);
                    setShipLocation(rand_location, getShipLocation()[1]);
                    i = 0;
                }
                if (valid_first_block(getShipLocation()[0] + (getShipLocation()[1] * i)) === false) {
                    rand_location = Math.floor(Math.random() * (max - min + 1) + min);
                    setShipLocation(rand_location, getShipLocation()[1]);
                    i = 0;
                }
            }
            // store the proposed coordinates in locationArray
            for (let i = 0; i < num_of_ships; i++) {
                let location = getShipLocation()[0] + (getShipLocation()[1] * i);
                locationArray[i] = location;
            }
            // if the ship does not wrap around and is a valid placement, place it on the board
            if (shipWrap(locationArray) !== false) {
                for (let i = 0; i < num_of_ships; i++) {
                    store_ship(locationArray[i]);
                    var shipImage = document.createElement('img');
                    shipImage.src = 'images/ship' + num_of_ships + '.png';
                    document.getElementById(locationArray[i]).appendChild(shipImage);
                }
                ship_inc++;
            } // start over if the ship wraps around to the other side
            else if (shipWrap(locationArray) === false) {
                ai_boat_sel();
            }
        }
        if (ship_inc == num_of_ships + 1) {
            ask_more_ships();
            document.getElementById("yes_button").click();
        }
    }
}

/**
 * @author James Barnett
 * @param num1 - initial location for ship
 * @param num2 - direction of ship
 * @see ai_boat_sel() for function declaration
 * @return {void}
 * @description Function that sets initial ship placement of AI's current ship and its direction in case it needs to reference back to the initial location
 */
function setShipLocation(num1, num2) {
    initial_location = num1;
    direction = num2;
}

/**
 * @author James Barnett
 * @see ai_boat_sel() for function declaration
 * @return {Array}
 * @description Function that gets initial ship placement of AI's current ship
 */
function getShipLocation() {
    return [initial_location, direction];
}

/**
 * @author James Barnett
 * @param num - location on the board
 * @see ai_boat_sel() for function declaration
 * @return {boolean}
 * @description Function checks player2array for ship locations
 */
function checkShip(num) {
    if (player2array[num - 90] == 'ship') {
        return false;
    } return true;
}

/**
 * @author James Barnett
 * @param params - an array of intended locations for a ship to go
 * @see ai_boat_sel() for function declaration
 * @return {boolean}
 * @description Function checks incoming array of a ship's desired coordinate and checks to ensure the ship won't wrap to the other side
 */
function shipWrap(params) {
    for (let i = 0; i < params.length; i++) {
        if (params[i] % 10 == 9) { // if a ship is placed in column J...
            if (params[i + 1] % 10 == 0) { // and the same ship is then placed in column A...
                return false;
            }
        } else if (params[i] % 10 == 0) { // if a ship is placed in column A...
            if (params[i + 1] % 10 == 9) { // and the same ship is then placed in column J...
                return false;
            }
        }
    } return true;
}

/**
 * @author Ben Moeller
 * @see game.js to see original declaration
 * @return {void}
 * @description function that activates whenever there is a click on the board
 */
function boat_sel_click() {
    console.log(this);
    if (in_boat_selection) {
        if (boat_first_click && !first_turn_already_a_ship_there(parseInt(this.id)) && valid_first_block(parseInt(this.id))) {
            store_ship(parseInt(this.id));
            var shipImage = document.createElement('img');
            shipImage.src = 'images/ship' + num_of_ships + '.png'; // draws colored square to represent 1xN ship
            document.getElementById(this.id).appendChild(shipImage)
            ship_inc++;
            boat_first_click = false;
        } else if (ship_inc <= num_of_ships && boat_check_valid_move(parseInt(this.id))) {
            store_ship(parseInt(this.id));
            var shipImage = document.createElement('img')
            shipImage.src = 'images/ship' + num_of_ships + '.png';
            document.getElementById(this.id).innerHTML = ''
            document.getElementById(this.id).appendChild(shipImage)
            ship_inc++;
        } else if (ship_inc > num_of_ships) {
            context.fillText("Max number of blocks placed", 675, 475);
        } else if (boat_check_valid_move(parseInt(this.id)) == false) {
            if (parseInt(this.id) > 89 && is_player_one) {
                context.fillText("Wrong board!", 735, 575);
            }
            else if (first_turn_already_a_ship_there(parseInt(this.id))) {
                context.fillText("Already a ship there!", 709, 550);
            } else {
                context.fillText("Please selects blocks to create", 675, 600);
                context.fillText("a valid 1x" + num_of_ships + " ship", 735, 625);
            }
        }

        if (!is_player_one && num_of_ships == 7) {
            in_boat_selection = false;
            in_combat = true;
            fillSquaresPlayer2();
            start_combat();
        } else if (ship_inc == max_ships + 1 && is_player_one && ship_inc == num_of_ships + 1) {
            boat6 = true;
            if (first_button) {
                if (is_ai_game != true) {
                    context.fillText("Ready to pass", 735, 150);
                    context.fillText("to Player 2?", 740, 175);
                    ask_more_ships();
                } else {
                    context.fillText("Ready to pass", 735, 150);
                    context.fillText("to the AI?", 740, 175);
                    ask_more_ships();
                }
            }
        } else if (ship_inc == num_of_ships + 1) {
            if (first_button) {
                context.fillText("Are you done adding boat " + num_of_ships + "?", 675, 150);
                ask_more_ships();
            }
        }
    }
}

/**
 * @author Ben Moeller
 * @return {void}
 * @description function that helps the game reset the bools and increments counters for each ship number that is currently being placed
 */
function place_ships() {
    if (num_of_ships == 1) {
        reset_bools();
        ship_inc = 1;
        print_boat_sel_inst()
    } else if (num_of_ships == 2 && more_ships == true) {
        reset_bools();
        ship_inc = 1;
        print_boat_sel_inst()
    } else if (num_of_ships == 3 && more_ships == true) {
        reset_bools();
        ship_inc = 1;
        print_boat_sel_inst()
    } else if (num_of_ships == 4 && more_ships == true) {
        reset_bools();
        ship_inc = 1;
        print_boat_sel_inst()
    } else if (num_of_ships == 5 && more_ships == true) {
        reset_bools();
        ship_inc = 1;
        print_boat_sel_inst()
    } else if (num_of_ships == 6 && more_ships == true) {
        reset_bools();
        ship_inc = 1;
        print_boat_sel_inst()
    }
}

/**
 * @author Ben Moeller
 * @version 2
 * @return {void}
 * @description function that helps make the yes button, along with what to do when clicking yes
 */
function ask_more_ships() {
    first_button = false;
    yes_button = document.createElement("yes_button");
    yes_button.setAttribute("id", "yes_button");
    yes_button.innerHTML = "Yes";
    body = document.getElementsByTagName("body")[0];
    body.appendChild(yes_button);

    yes_button.addEventListener("click", () => {
        body.removeChild(yes_button);
        num_of_ships++;
        more_ships = true;
        if (num_of_ships == max_ships + 1 && is_player_one) {
            if (is_player_one) {
                fillSquaresPlayer1()
            } else {
                fillSquaresPlayer2()
            }
            is_player_one = false;
            num_of_ships = 1;
            if (is_ai_game) {
                draw();
                ai_boat_sel();
            }
        } else if (!is_player_one && num_of_ships == max_ships + 1) {
            in_boat_selection = false;
            in_combat = true;
            fillSquaresPlayer2();
            start_combat();
            console.log("should start combat phase")
        } else if (!is_player_one && ship_inc == 7) {
            in_boat_selection = false;
            in_combat = true;
            fillSquaresPlayer2();
            start_combat();
        } else if (!is_player_one && is_ai_game) {
            ai_boat_sel();
        }
        draw();
    })
}

/**
 * @author Ben Moeller
 * @param {num} - number that corresponds to a block in the board
 * @return {void}
 * @description function that stores the ships in the player strings, as well as calls checkHit in order to store data in a separate array (checkHit() is in game.js)
 */
function store_ship(num) {
    if (is_player_one) {
        player_ships_placed.player1 =
            player_ships_placed.player1.slice(0, num) +
            num_of_ships +
            player_ships_placed.player1.slice(num + 1, 90)
        checkHit(num, is_player_one)
        console.log(player_ships_placed.player1);
    } else {
        player_ships_placed.player2 =
            player_ships_placed.player2.slice(0, num - 90) +
            num_of_ships +
            player_ships_placed.player2.slice((num - 90) + 1, 90)
        checkHit(num, is_player_one)
        console.log(player_ships_placed.player2);
    }
}

/**
 * @author Ben Moeller
 * @param {num} - number that corresponds to a number on the board
 * @return {bool}
 * @description function that checks if the block being placed is a valid move for the current boat
 */
function boat_check_valid_move(num) {
    if (is_player_one) {
        for (i = 1; i <= num_of_ships; i++) {
            if (player_ships_placed.player1.charAt(num) != ".") { //<-- checks to ensure there isn't already a ship placed there
                return false;
            } else if (player_ships_placed.player1.charAt(num - i) == num_of_ships && is_horizontal) {
                is_vertical = false;
                return true
            } else if (player_ships_placed.player1.charAt(num + i) == num_of_ships && is_horizontal) {
                is_vertical = false;
                return true;
            } else if (player_ships_placed.player1.charAt(num - (i * 10)) == num_of_ships && is_vertical) {
                is_horizontal = false;
                return true;
            } else if (player_ships_placed.player1.charAt(num + (i * 10)) == num_of_ships && is_vertical) {
                is_horizontal = false;
                return true;
            } 
            return false;
        }
    } else {
        num = num - 90;
        for (i = 1; i <= num_of_ships; i++) {
            if (player_ships_placed.player2.charAt(num) != ".") { //<-- checks to ensure there isn't already a ship placed there
                return false;
            } else if (player_ships_placed.player2.charAt(num - i) == num_of_ships && is_horizontal) {
                is_vertical = false;
                return true
            } else if (player_ships_placed.player2.charAt(num + i) == num_of_ships && is_horizontal) {
                is_vertical = false;
                return true;
            } else if (player_ships_placed.player2.charAt(num - (i * 10)) == num_of_ships && is_vertical) {
                is_horizontal = false;
                return true;
            } else if (player_ships_placed.player2.charAt(num + (i * 10)) == num_of_ships && is_vertical) {
                is_horizontal = false;
                return true;
            }
            if (is_ai_game) {
                return true;
            }
            return false;
        }
    }
}

/**
 * @author Alec Mcglynn
 * @description checks whether or not the boat has enough space to fit based on the first square
 * @param {num} - number that corresponds to a number on the board
 * @return bool
 */
function valid_first_block(num) {
    let space_up = 0,
        space_down = 0,
        space_left = 0,
        space_right = 0
    if (is_player_one) {
        if (player_ships_placed.player1.charAt(num) != ".") { //<-- checks to ensure there isn't already a ship placed there
            return false;
        }
        for (i = 1; i < 10; i++) {
            if (player_ships_placed.player1.charAt(num - i) == "." && (num % 10) - i >= 0 && i - 1 == space_left) {
                space_left++
            }
            if (player_ships_placed.player1.charAt(num + i) == "." && (num % 10) + i < 10 && i - 1 == space_right) {
                space_right++
            }
            if (player_ships_placed.player1.charAt(num - (i * 10)) == "." && i - 1 == space_up) {
                space_up++
            }
            if (player_ships_placed.player1.charAt(num + (i * 10)) == "." && i - 1 == space_down) {
                space_down++
            }
        }
    } else {
        num = num - 90;
        if (player_ships_placed.player2.charAt(num) != ".") { //<-- checks to ensure there isn't already a ship placed there
            return false;
        }
        for (i = 1; i < 10; i++) {
            if (player_ships_placed.player2.charAt(num - i) == "." && (num % 10) - i >= 0 && i - 1 == space_left) {
                space_left++
            }
            if (player_ships_placed.player2.charAt(num + i) == "." && (num % 10) + i < 10 && i - 1 == space_right) {
                space_right++
            }
            if (player_ships_placed.player2.charAt(num - (i * 10)) == "." && i - 1 == space_up) {
                space_up++
            }
            if (player_ships_placed.player2.charAt(num + (i * 10)) == "." && i - 1 == space_down) {
                space_down++
            }
        }
    }
    if (num_of_ships - 1 <= space_down + space_up || num_of_ships - 1 <= space_left + space_right) {
        if (num_of_ships - 1 <= space_down + space_up == false) {
            is_vertical = false
        }
        if (num_of_ships - 1 <= space_left + space_right == false) {
            is_horizontal = false
        }
        return true
    }
}

/**
 * @author Sam Jerguson
 * @param {num} - number that corresponds to a number on the board
 * @return bool
 * @description checks if ship is already placed on a square
 */
function first_turn_already_a_ship_there(num) {
    if (is_player_one) {
        if (player_ships_placed.player1.charAt(num) != ".")
            return true;
        else
            return false;
    } else {
        num = num - 90;
        if (player_ships_placed.player2.charAt(num) != ".")
            return true;
        else
            return false;
    }

}

/**
 * @author Ben Moeller
 * @return {void}
 * @description function to reset the bools when swapping to another ship
 */
function reset_bools() {
    first_button = true;
    is_vertical = true;
    is_horizontal = true;
    boat_first_click = true;
}

/**
 * @author Ben Moeller
 * @return {void}
 * @description helper function to help print out instructions to the board
 */
function print_boat_sel_inst() {
    context.fillText("Please select the blocks where you want", 635, 75);
    context.fillText("the first ship of size=" + num_of_ships + " block", 680, 100);
    if (is_player_one) {
        context.fillText("<------------------------------------------------", 655, 125);
    } else {
        context.fillText("------------------------------------------------->", 655, 125);
    }
}
