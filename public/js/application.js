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

// DEFINE WINNER
  var winner = function(){
    if (player1Position === 15){
      var winningPlayerId = $("#player1 th").data('player-id');
      $('#winner').html("Player 1 is the winner!");
    }
    else if (player2Position == 15){
      var winningPlayerId = $("#player2 th").data('player-id');
      $('#winner').html("Player 2 is the winner!");
    }

    var gameID = $("h3").data('game-id');

    $.ajax({
      type: "POST",
      url: "/games/" + gameID + "/results",
      data: { winner_id: winningPlayerId }
    })

  };

//START GAME
  var new_game = function(){
    alert("Player 1 press 'q' and Player 2 press 'p' to play!");
    $.ajax({
      type: "GET",
      url: "/start_game"
    })
  }

$(document).ready(function(){

  $('button#start').click(function(){
    new_game();

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

    winner();
    });

  });

  $('button#reset').click(function(){
    location.reload();
  });

});



