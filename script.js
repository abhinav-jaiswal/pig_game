'use strict';

let score0 = Number(document.querySelector('#score--0').textContent);
let score1 = Number(document.querySelector('#score--1').textContent);
let current0 = Number(document.querySelector('#current--0').textContent);
let current1 = Number(document.querySelector('#current--1').textContent);

const generateRandom = function() {
    return Math.trunc(Math.random() * 6) + 1;
}

const getActivePlayer = function() {
    
    const allplayers = document.querySelectorAll('.player');
    let player1 = false;
    for (let index = 0; index < allplayers.length; index++) {
        if(allplayers[index].classList.contains('player--active') && allplayers[index].classList.contains('player--0')) {
            player1 = true;
        }
    }

    return (player1) ? 'player1' : 'player2';
}

const switchPlayer = function(activePlayer) {

    console.log(activePlayer);

    if (activePlayer === 'player1') {
        document.querySelector('.player--1').classList.add('player--active');
        document.querySelector('.player--0').classList.remove('player--active');
    } else {
        document.querySelector('.player--1').classList.remove('player--active');
        document.querySelector('.player--0').classList.add('player--active');
    }
}

const addToScore = function(placeholder,score) {
    document.querySelector(placeholder).textContent = score;
}

document.querySelector('.btn--roll').addEventListener('click',function(){

    let number = generateRandom();
    document.querySelector('.dice').src = 'dice-'+number+'.png';
    let activePlayer = getActivePlayer();
    
    if(activePlayer == 'player1') {
        addToScore('#current--0',(current0 += number)); 
        if (number == 1) {
            current0 = 0;
            addToScore('#current--0',current0);
            addToScore('#score--0',score0 += current0);
            switchPlayer(activePlayer);
        }
    } else {
        addToScore('#current--1',(current1 += number));
        if (number == 1) {
            current1 = 0;
            addToScore('#current--1',current1);
            addToScore('#score--1',score1 += current1);
            switchPlayer(activePlayer);
        }
    } 

});

document.querySelector('.btn--hold').addEventListener('click',function(){

    let activePlayer = getActivePlayer();
    if (activePlayer === 'player1') {
        score0 += current0;
        addToScore('#score--0',score0);
        current0 = 0;
        addToScore('#current--0',current0);
    } else {
        score1 += current1;
        addToScore('#score--1',score1);
        current1 = 0;
        addToScore('#current--1',current1);        
    }
    switchPlayer(activePlayer);
    
});

document.querySelector('.btn--new').addEventListener('click',function(){

    score0 = 0;
    score1 = 0;
    current0 = 0;
    current1 = 0;
    addToScore('#score--0',score0);
    addToScore('#score--1',score1);
    addToScore('#current--0',current0);
    addToScore('#current--1',current1);    
    switchPlayer('player2');
});
