// TIMER (GLOBAL VARIABLE)
var counter = 0;
var tictac = function(){
  counter++;
  $("h3#timer").html(counter + "s");
};
var timer = undefined;

// DRIVER CODE
$(document).ready(function(){

  // PLAYER CLASS
  var Player = function(playerID){
    this.playerID = playerID;
    this.playerPosition = 0;
    this.movePlayer = movePlayer;

    function movePlayer(){
      var tableRowElement = "tr#" + this.playerID + " > td.active";
      $(tableRowElement).removeClass().next().addClass('active');
      this.playerPosition += 1;
    };
  };

  // GAME CLASS
  var Game = function(player1, player2){
    this.player1 = player1;
    this.player2 = player2;
    this.startGame = startGame;
    this.checkWinner = checkWinner;

    function startGame(){
      alert("Player 1 press 'q' and Player 2 press 'p' to play!");
      timer = setInterval("tictac()", 1000);
    };

    function checkWinner(){
      if (this.player1.playerPosition === 15) {
        window.clearInterval(timer);
        $('#winner').html("Player 1 is the winner!");
        submitWinner(this.player1.playerID);
      } else if (this.player2.playerPosition === 15) {
        window.clearInterval(timer);
        $('#winner').html("Player 2 is the winner!");
        submitWinner(this.player2.playerID);
      }
    };

    function submitWinner(winningPlayerId){
      var gameId = $("h3").data('game-id');
      $.ajax({
        type: "POST",
        url: "/games/" + gameId + "/results",
        data: { winner_id: winningPlayerId, time_completed: counter }
      });
    };
  };

  var game = new Game(new Player($(".player1 th").data('player-id')), new Player($(".player2 th").data('player-id')));

  $('button#start').click(function(){
    game.startGame();

    // BIND USER KEY PRESS TO ALLOW GAME PLAY
    $(document).on('keyup', function(keyCode){

      if (keyCode.which === 81){
        game.player1.movePlayer();
      }
      else if (keyCode.which === 80){
        game.player2.movePlayer();
      }
      game.checkWinner();

    });

  });

});


