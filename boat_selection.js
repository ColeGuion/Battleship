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
    let left = -1; // ship goes left from starting block
    let right = 1;
    let up = -10; // ship goes up from starting block
    let down = 10;
    let min = 90; // minimum grid location for ship on AI's board
    let max = 179; // maximum grid location for ship on AI's board
    
    if (in_boat_selection) {
        rand_location = Math.floor(Math.random() * (max - min + 1) + min); // gets a random location on the board that is inclusive of the min and max value
        var dir = [left, right, up, down][Math.floor(Math.random() * (3 - 0 + 1) + 0)]; // picks an adjacent location to place the ship. This determines if the ship is horizontal or vertical
        while (valid_first_block(rand_location) == false) { // if the random location chosen has already been used, find a new location
            rand_location = Math.floor(Math.random() * (max - min + 1) + min);
        }
        if(rand_location + dir < 90 || rand_location + dir > 179) { // ensures a 1xN ship won't crash the game if their initial direction takes them off the board
            dir = dir * -1;
        }
        setShipLocation(rand_location, dir);
        console.log("random location: " + rand_location);

        // For placement of first ship (1x1)
        if (!first_turn_already_a_ship_there(rand_location) && valid_first_block(rand_location) && boat_first_click) { 
            store_ship(rand_location);
            var shipImage = document.createElement('img');
            shipImage.src = 'images/ship' + num_of_ships + '.png'; // draws colored square to represent 1xN ship
            document.getElementById(rand_location).appendChild(shipImage);
            ship_inc++;
            boat_first_click = false;

        } // for every other ship placement
        else if (ship_inc <= num_of_ships && valid_first_block(rand_location)) {
            var looped = false;
            for (let i = 0; i < num_of_ships; i++) {
                console.log("Ship " + num_of_ships);
                rand_location = getShipLocation()[0];
                adj_location = getShipLocation()[1];

                if (i == 0) {
                    // places the initial boat location
                    store_ship(rand_location);
                    var shipImage = document.createElement('img');
                    shipImage.src = 'images/ship' + num_of_ships + '.png';
                    document.getElementById(rand_location).appendChild(shipImage);
                }
                
                // assigns the adjacent spaces for a ship of size 2
                if (i > 0) {
                    adj_location = getShipLocation()[0] + getShipLocation()[1];
                    if (looped == false) {
                        if (!boat_check_valid_move(adj_location)) {
                            adj_location = getShipLocation()[0] + ((-1) * getShipLocation()[1]);
                        }
                        if (!boat_check_valid_move(adj_location)) { // if a horizontal placement is illegal, change it to vertical and vice versa
                            if (Math.abs(getShipLocation()[1]) % 10 == 0) {
                                setShipLocation(rand_location, 1);
                            } else {
                                setShipLocation(rand_location, 10);
                            }
                        }
                        console.log("adjacent location: " + getShipLocation()[1]);
                        store_ship(adj_location);
                        var shipImage = document.createElement('img');
                        shipImage.src = 'images/ship' + num_of_ships + '.png';
                        document.getElementById(adj_location).innerHTML = '';
                        document.getElementById(adj_location).appendChild(shipImage);
                    }
                    // assigns the adjacent spaces for a ship of size 3 or greater
                    if (i > 1) {
                        let count = 2;
                        let offset1 = 1;
                        let offset2 = 1;
                        // counts num_of_ships before initial ship and calculates offset
                        for (let index = 0; index < rand_location - 90; index++) {
                            if (player_ships_placed.player2.charAt(index) == num_of_ships) {
                                offset1++;
                            }
                        }
                        console.log("offset1: " + offset1);
                        // counts num_of_ships after initial ship and calculates offset
                        for (let index2 = (rand_location + 1) - 90; index2 < 90; index2++) {
                            if (player_ships_placed.player2.charAt(index2) == num_of_ships) {
                                offset2++;
                            }
                        }
                        console.log("offset2: " + offset2);
                        const variation1 = rand_location + (getShipLocation()[1] * (-1)); // adjacent space that is on the opposite side of starting space
                        const variation2 = rand_location + (getShipLocation()[1] * offset1); // adjacent space that is a multiple of count from starting space (for ships of length > 3)
                        const variation3 = rand_location + (getShipLocation()[1] * ((-1) * offset1)); // adjacent space that is on the opposite side of starting space and is a multiple of count
                        const variation4 = rand_location + (getShipLocation()[1] * offset2);
                        const variation5 = rand_location + (getShipLocation()[1] * ((-1) * offset2));
                        console.log(boat_check_valid_move(variation1) && (variation1 > 89) && (variation1 < 180) && !first_turn_already_a_ship_there(variation1));
                        console.log(boat_check_valid_move(variation2) && (variation2 > 89) && (variation2 < 180) && !first_turn_already_a_ship_there(variation2));
                        console.log(boat_check_valid_move(variation3) && (variation3 > 89) && (variation3 < 180) && !first_turn_already_a_ship_there(variation3));
                        console.log(boat_check_valid_move(variation4) && (variation4 > 89) && (variation4 < 180) && !first_turn_already_a_ship_there(variation4));
                        console.log(boat_check_valid_move(variation5) && (variation5 > 89) && (variation5 < 180) && !first_turn_already_a_ship_there(variation5));
                        
                        do {
                            if (boat_check_valid_move(variation1) && (variation1 > 89) && (variation1 < 180) && !first_turn_already_a_ship_there(variation1)) { // tries adjacent space that is a multiple of count
                                adj_location = variation1;
                                console.log("working1");
                                count = count + 1;
                                break;
                            } else if (boat_check_valid_move(variation2) && (variation2 > 89) && (variation2 < 180) && !first_turn_already_a_ship_there(variation2)) { // tries adjacent space on opposite side of initial ship placement
                                adj_location = variation2;
                                console.log("working2");
                                count = count + 1;
                                break;
                            } else if (boat_check_valid_move(variation3) && (variation3 > 89) && (variation3 < 180) && !first_turn_already_a_ship_there(variation3)) { // tries adjacent space that is a multiple of count on the opposite side
                                adj_location = variation3;
                                console.log("working3");
                                count = count + 1;
                                break;
                            } else if (boat_check_valid_move(variation4) && (variation4 > 89) && (variation4 < 180) && !first_turn_already_a_ship_there(variation4)) {
                                adj_location = variation4;
                                console.log("working4");
                                count = count + 1;
                                break;
                            } else if (boat_check_valid_move(variation5) && (variation5 > 89) && (variation5 < 180) && !first_turn_already_a_ship_there(variation5)) {
                                adj_location = variation5;
                                console.log("working5");
                                count = count + 1;
                                break;
                            } else {
                                count = count + 1;
                            }

                        } while (count < i);
                        store_ship(adj_location);
                        var shipImage = document.createElement('img');
                        shipImage.src = 'images/ship' + num_of_ships + '.png';
                        document.getElementById(adj_location).innerHTML = '';
                        document.getElementById(adj_location).appendChild(shipImage);
                    }
                    looped = true;
                }
            }
            ship_inc++;
        }
        if (ship_inc == num_of_ships + 1) {
            ask_more_ships();
            let yesbutton = document.getElementById("yes_button").click();
        }
        
    }
}

/**
 * @author James Barnett
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
            } else {
                return false;
            }
            
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
