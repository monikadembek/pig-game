(function() {

    var p1, p2; //player objects
    var players = []; //array of players
    var winPoints;  //amount of points needed to win the game
    var roll;   //points rolled
    var active; //active player
    var gameOn; // state of game, wheter it finished or is still played


    // function constructor of player object
	var Player = function(rs, ts) {  
        this.roundScore = rs;
        this.totalScore = ts;
        //this.active = active;
    }

    Player.prototype.updateRoundScore = function(rs) {
        if (rs) {
            this.roundScore += rs;  
      } else {
            this.roundScore = 0;
      }   
    }

    Player.prototype.updateTotalScore = function() {
        this.totalScore += this.roundScore;
    }

    Player.prototype.checkWin = function(winPoints) {
        if (this.totalScore >= winPoints) {
            return true;
        } else {
            return false;
        }
    }


    //---function init() resets scores variables and sets player 1 as active player
    function init() {
        p1 = new Player(0, 0);
        p2 = new Player(0, 0);

        players = [p1, p2];

        winPoints = parseInt(document.querySelector('.game__points-to-win').textContent);

        gameOn = true;

        document.querySelector('.game__total-score-p0').textContent = players[0].totalScore;
        document.querySelector('.game__round-score-p0').textContent = players[0].roundScore;

        document.querySelector('.game__total-score-p1').textContent = players[1].totalScore;
        document.querySelector('.game__round-score-p1').textContent = players[1].roundScore;

        active = 0; //player with index 0 is active

        document.querySelector('.game__player0').classList.remove('active');
        document.querySelector('.game__player1').classList.remove('active');
        var activePlayerDom = document.querySelector('.game__player' + active);
        activePlayerDom.classList.add('active');

        //if exists remove message about previous winner

        var winMsg = document.querySelector('.game__win-msg');
        if (winMsg) {
            //remove element and show dice picture
            var parentEl = winMsg.parentNode;
            parentEl.removeChild(winMsg);
            document.querySelector('.game__dice').classList.remove('hide');
        }

    }


    //------function nextPlayer() makes the other player active
    function nextPlayer() {

        document.querySelector('.game__player0').classList.remove('active');
        document.querySelector('.game__player1').classList.remove('active');

        (active === 0) ? active = 1 : active = 0;  //set new active player

        document.querySelector('.game__player' + active).classList.add('active');
    }


    // function that creates message with info who won the game
    function createWinMessage(nr) { 
        //hide dice picture
        document.querySelector('.game__dice').classList.add('hide');

        //create new element with message about player who won and append it where dice pic was
        var diceBoxEl = document.querySelector('.game__dice-box');
        var msgEl = document.createElement('h3');
        msgEl.classList.add('game__win-msg');
        var msgContent = 'Player ' + (nr + 1) + ' WON!';
        msgEl.textContent = msgContent;
        diceBoxEl.append(msgEl);
    }


    // game buttons
    var newGameBtn = document.getElementById('newGame');
    var rollBtn = document.getElementById('roll');
    var holdBtn = document.getElementById('hold');
    var changeWinPoints = document.getElementById('changeWinPoints');


    // setting up variables and resetting points for new game
    init(); 


    // set up new amount of points needed to win the game
    changeWinPoints.addEventListener('click', function() {
        winPoints = parseInt(document.querySelector('.game__nav-input').value);
        document.querySelector('.game__points-to-win').textContent = winPoints;
    });


    // --- newGame button functionality ---------------------
    newGameBtn.addEventListener('click', function(e) {
        e.preventDefault();
        init();
    });


    // --- roll button functionality ---------------------
    rollBtn.addEventListener('click', function(e) {
        e.preventDefault();

        if (gameOn) {
            roll = Math.floor(Math.random() * 6 + 1); //dice is being rolled

            //show correct dice img
            document.querySelector('.game__dice').setAttribute('src', 'img/dice-' + roll + '.png');

            if (roll !== 1) {
                players[active].updateRoundScore(roll);
                document.querySelector('.game__round-score-p' + active).textContent = players[active].roundScore;
            } else {
                players[active].updateRoundScore(false); //resets roundScore of current player
                document.querySelector('.game__round-score-p' + active).textContent = players[active].roundScore;

                nextPlayer();
            };    
        };
        
        
    });


    // --- hold button functionality ---------------------
    holdBtn.addEventListener('click', function(e) {
        e.preventDefault();

        if (gameOn) {
            players[active].updateTotalScore();
            document.querySelector('.game__total-score-p' + active).textContent = players[active].totalScore;
            players[active].updateRoundScore(false);
            document.querySelector('.game__round-score-p' + active).textContent = players[active].roundScore;

            if(players[active].checkWin(winPoints)) {
                //player won the game
                gameOn = false;
                createWinMessage(active);
            } else {
                nextPlayer();
            };    
        };
        

    });

   /*
    // ---- game navigation functionality
    var btnGamePage = document.getElementById('game');
    btnGamePage.addEventListener('click', function() {
        document.querySelector('#game').style.left = '0';
    });

    var btnBackRules = document.querySelector('.btn-back-rules');
    btnGamePage.addEventListener('click', function() {
        document.querySelector('#rules').style.left = '200%';
    });

    var btnBackGame = document.querySelector('.btn-back-game');
    btnGamePage.addEventListener('click', function() {
        document.querySelector('#game').style.left = '100%';
    });
    */
   

})();