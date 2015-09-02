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

// SUBMIT WINNER TO DATABASE
  function submitWinner(winningPlayerId){
    var gameId = $("h3").data('game-id');
    $.ajax({
      type: "POST",
      url: "/games/" + gameId + "/results",
      data: { winner_id: winningPlayerId, time_completed: counter }
    });
  }

// DEFINE WINNER
  var hasWon = function(){
    if (player1Position === 15){
      var winningPlayerId = $("#player1 th").data('player-id');
      $('#winner').html("Player 1 is the winner!");
      window.clearInterval(timer);
      submitWinner(winningPlayerId);
    }
    else if (player2Position == 15){
      var winningPlayerId = $("#player2 th").data('player-id');
      $('#winner').html("Player 2 is the winner!");
      window.clearInterval(timer);
      submitWinner(winningPlayerId);
    }
  };

// TIMER
  var counter = 0;
  var tictac = function(){
    counter++;
    $("h3#timer").html(counter + "s");
  };
  var timer = undefined;

// DRIVER CODE
$(document).ready(function(){

  $('button#start').click(function(){

    start_game();
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

// DIFFERENCE BETWEEN VARIABLES AND FUNCTIONS

  // hoisted();
  // unhoisted();

  // function hoisted(){
  //   console.log("hoisted")
  // }

  // var unhoisted = function(){
  //   console.log("unhoisted")
  // }

// WHEN DOCUMENT IS RAN, FUNCTION IS READ FIRST (HENCE CAN CALL FUNCTION BEFORE DEFINITION OF FUNCTION)
// WHEREAS FOR VARIABLES, IT CAN ONLY BE CALLED AFTER THE VARIABLE IS DEFINED.






