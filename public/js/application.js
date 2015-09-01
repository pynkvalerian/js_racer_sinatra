// START DEFAULTS
  var player1Position = 0
  var player2Position = 0

// MOVE PLAYER BY REMOVING CLASS ON CURRENT TD AND ADDING CLASS TO NEXT TD
  var movePlayer1 = function(){
    $('tr#player1 > td.active').removeClass().next().addClass('active');
    player1Position ++
  };

  var movePlayer2 = function(){
    $("tr#player2 > td.active").removeClass().next().addClass('active');
    player2Position ++
  };

//START GAME
  var start_game = function(){
    alert("Player 1 press 'q' and Player 2 press 'p' to play!");
  }

// DEFINE who has won
  var hasWon = function(){
    if (player1Position === 15){
      var winningPlayerId = $("#player1 th").data('player-id');
      $('#winner').html("Player 1 is the winner!");
      window.clearInterval(timer);
    }
    else if (player2Position == 15){
      var winningPlayerId = $("#player2 th").data('player-id');
      $('#winner').html("Player 2 is the winner!");
      window.clearInterval(timer);
    }

    var gameId = $("h3").data('game-id');

    $.ajax({
      type: "POST",
      url: "/games/" + gameId + "/results",
      data: { winner_id: winningPlayerId }
    });

  };

// TIMER
  var counter = 0;
  var tictac = function(){
    counter++;
    $("h3#timer").html(counter + "s");
  };
  var timer = undefined;



$(document).ready(function(){

  $('button#start').click(function(){

    timer = setInterval("tictac()", 1000);

    // BIND USER KEY PRESS TO ALLOW GAME PLAY
    $(document).on('keyup', function(keyCode){
      // GET KEYCODE FOR SPECIFIC KEY
      // alert("keyCode is " + keyCode.which)

      if (keyCode.which === 81){
        movePlayer1();
      }
      else if (keyCode.which === 80){
        movePlayer2();
      }

    hasWon();
    });

  });

});



