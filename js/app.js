/**
 * The code logic for the Pig game.
 * 
 * Two players compete to reach the winning score. 
 * To play the game, each player rolls a die until they hold or roll a 1.
 * If a player chooses to hold, the current (round) score is added to the total
 * If the player rolls a 1, their turn ends and they earn no points
 * The first player to reach the target wins.
 */


/* Number of players in the game. */
const NUM_PLAYERS = 2;

/* Name of the radio button. */
const RADIO_NAME = 'radio-players';

/* Total scores for each player. */
let scores = [0,0];

/* Currently active player.*/
let activePlayer = 0;

/* Round score for the active player. */
let roundScore = 0;

/* Default winning score. */
let winningScore = 20;

/* Current die value */
let dice = 0;

/**
 * Toggles between two players and resets the round score. 
 */
function togglePlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = "0" ;
    document.getElementById('current-1').textContent = "0" ;
    document.querySelector(`.dice`).style.display = 'none';
    document.querySelector(`.player-0-panel`).classList.toggle('active');
    document.querySelector(`.player-1-panel`).classList.toggle('active');
}

/**
 * Updates the total score for the active player. 
 */
function updateTotal() {
    scores[activePlayer] += roundScore;
    document.querySelector(`#score-${activePlayer}`).textContent 
        = scores[activePlayer];
}
/**
 * Resets the game and all fields.
 */
function reset() {
    scores = [0, 0];
    roundScore = 0;
    dice = 0;
    activePlayer = 0;

    for (let i = 0; i < NUM_PLAYERS; i++) {
        document.getElementById(`current-${i}`).textContent = '0';
        document.querySelector(`.player-${i}-panel`).classList
            .remove('winner', 'active');
        document.getElementById(`score-${i}`).textContent = '0';
        document.getElementById(`name-${i}`).textContent = `Player ${i + 1}`;
    }
    
    document.querySelector(`.player-0-panel`).classList.toggle('active');
    document.querySelector(`.btn-roll`).style.display = 'block';
    document.querySelector(`.btn-hold`).style.display = 'block'; 
}

/**
 * Creates a new game with the desired values.
 */
function submit() {
    reset();
    let winScore = document.querySelector(`[name="winning-score"]`);
    winningScore = winScore.value;
    let options = document.querySelectorAll(`[name="${RADIO_NAME}"]`);
    for (let option of options) {
        if (option.checked && (activePlayer !== parseInt(option.value))) {
            togglePlayer();
        }
    }
    let ng = document.querySelector('.new-game');
    ng.style.display = 'none';
}

/* Die default visibility */
document.querySelector(`.dice`).style.display = 'none';

/* Display the scores. */
scores.forEach((ele, idx) => {
    document.getElementById(`score-${idx}`).textContent = "0";
    document.getElementById(`current-${idx}`).textContent = "0";
})


/* Handles roll button. */
document.querySelector(`.btn-roll`).addEventListener('click',
    (event)=>{
       dice = Math.floor(Math.random() * 6) + 1;
       let diceElement = document.querySelector(`.dice`);
       diceElement.src = `images/dice-${dice}.png`;
       diceElement.style.display = 'block';

        if(dice !== 1){
            roundScore += dice;
            document.querySelector(`#current-${activePlayer}`).textContent 
                = roundScore;
            
            let currTotal = scores[activePlayer] + roundScore;
            if(currTotal >= winningScore){
                updateTotal();
                document.getElementById(`name-${activePlayer}`).textContent 
                    = `Player ${activePlayer + 1} wins!`;
                document.querySelector(`.player-${activePlayer}-panel`)
                    .classList.add('winner');
                document.querySelector(`.player-${activePlayer}-panel`)
                    .classList.remove('active');
                document.querySelector(`.dice`).style.display = 'none';
                document.querySelector(`.btn-roll`).style.display = 'none';
                document.querySelector(`.btn-hold`).style.display = 'none'; 
            }
        } else { 
            togglePlayer();
        }
});

/* Handles hold button. */
document.querySelector(`.btn-hold`).addEventListener('click', () => {
    updateTotal();
    document.querySelector(`#current-${activePlayer}`).textContent = "0";
    togglePlayer();
});

/* Handles the New Game button and displays options to create a new game. */
document.querySelector(`.btn-new`).addEventListener('click', () => {
    let ng = document.querySelector(`.new-game`);
    while (ng.firstChild) {
        ng.removeChild(ng.firstChild);
    }
    let form = document.createElement('form');
    for (let i = 0; i < NUM_PLAYERS; i++) {
        let radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = RADIO_NAME;
        radio.value = i;
        let label = document.createElement('label');
        label.htmlFor = name;
        label.appendChild(document.createTextNode(`Player ${i + 1}`));
        form.appendChild(radio);
        form.appendChild(label);
        form.appendChild(document.createElement('br'));
    }

    let winScore = document.createElement('input');
    winScore.name = 'winning-score';
    winScore.value = '50';
    form.appendChild(winScore);
    ng.appendChild(form);
    ng.style.display = 'block';
    let button = document.createElement('button');
    button.className = 'btn-submit';
    button.appendChild(document.createTextNode('Create New Game'));
    button.style.left = '100px';
    ng.appendChild(form);
    ng.appendChild(button);
    document.querySelector(`.btn-submit`).addEventListener('click', submit);
});

