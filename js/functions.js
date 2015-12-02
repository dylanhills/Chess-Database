var currentGameFENS = [];
var currentMoveNumber = -1;
var currentGameID = 1700;
var currentFENID = 32099;
var availNextMoves = [];
var currentFEN = null;
var games = [];
var currentPlayer = "";
var currentGame = "";
var openings = [];
$(function() {
    $(".tabs").click(function() {
        var tab = $(this).attr("data-tab");
        $(".tabContent").hide();
        $('.tabs').removeClass('active');
        $(this).addClass('active');
        $("#" + tab).show();
    });
});
var init = function() {
	$("#tools").show()
	var board = ChessBoard('board', {position : 'start', onChange : onChangeBoard});
	var board,
	  game = new Chess(),
	  statusEl = $('#status'),
	  fenEl = $('#fen'),
	  pgnEl = $('#pgn');

	// do not pick up pieces if the game is over
	// only pick up pieces for the side to move
	onDragStart = function(source, piece, position, orientation) {
	  if (game.game_over() === true ||
		  (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
		  (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
		return false;
	  }
	};

	onDrop = function(source, target) {
	  // see if the move is legal
	  var move = game.move({
		from: source,
		to: target,
		promotion: 'q' // NOTE: always promote to a queen for example simplicity
	  });

	  // illegal move
	  if (move === null) return 'snapback';

	  updateStatus();
	};

	// update the board position after the piece snap
	// for castling, en passant, pawn promotion
	onSnapEnd = function() {
	  board.position(game.fen());
	};

	updateStatus = function() {
	  var status = '';

	  var moveColor = 'White';
	  if (game.turn() === 'b') {
		moveColor = 'Black';
	  }

	  // checkmate?
	  if (game.in_checkmate() === true) {
		status = 'Game over, ' + moveColor + ' is in checkmate.';
	  }

	  // draw?
	  else if (game.in_draw() === true) {
		status = 'Game over, drawn position';
	  }

	  // game still on
	  else {
		status = moveColor + ' to move';

		// check?
		if (game.in_check() === true) {
		  status += ', ' + moveColor + ' is in check';
		}
	  }

	  statusEl.html(status);
	  fenEl.html(game.fen());
	  pgnEl.html(game.pgn());
	};

	var cfg = {
	  draggable: true,
	  position: 'start',
	  onDragStart: onDragStart,
	  onDrop: onDrop,
	  onSnapEnd: onSnapEnd,
    onChange : onChangeBoard
	};
	board = ChessBoard('board', cfg);

	updateStatus();
};

onChangeBoard = function(oldPos, newPos) {
};

var boardSetupFEN = function(fen) {
  var onChangeBoard = function(oldPos, newPos) {
  };
  var cfg = {
    draggable: true,
    position: fen,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
    onChange : onChangeBoard
  };
	var board = ChessBoard('board', cfg);
  updateStatus();
};
$(document).ready(init);

var divOutput = function(output) {
  //console.log(output);
  try {
    var x = JSON.parse(output);
    //console.log(x);
    if(x.num_rows == 0) {
      $("#dbOut").html("No results!");
    } else {
      $("#dbOut").html(JSON.stringify(x, null, '\t'));
    }
  } catch (e) {
    $("#dbOut").html("Invalid input: \n" + output);
  }
}
var getGameByIDJS = function(gameId) {
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getGameByID',
      a : gameId,
    },
    type : 'post',
    success : function(output) {
      //everything echo'd in the doThing function is console log'd
      divOutput(output);
      currentGame = JSON.parse(output);
    }
  })
}
var getPlayerByIDJS = function(playerId) {
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getPlayerByID',
      a : playerId,
    },
    type : 'post',
    success : function(output) {
      //everything echo'd in the doThing function is console log'd
      divOutput(output);
      currentPlayer = JSON.parse(output);
    }
  })
}
var getOpeningByIDJS = function() {
  var myNumber = document.getElementById("OpeningInput").value;
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getOpeningByID',
      a : myNumber,
    },
    type : 'post',
    success : function(output) {
      //everything echo'd in the doThing function is console log'd
      divOutput(output);
    }
  })
}
var getFENByIDJS = function() {
  var myNumber = document.getElementById("FENInput").value;
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getFENByID',
      a : myNumber,
    },
    type : 'post',
    success : function(output) {
      //everything echo'd in the doThing function is console log'd
      divOutput(output);
    }
  })
}
var getTournamentByIDJS = function() {
  var myNumber = document.getElementById("TournamentInput").value;
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getTournamentByID',
      a : myNumber,
    },
    type : 'post',
    success : function(output) {
      //everything echo'd in the doThing function is console log'd
      divOutput(output);
    }
  })
}
var getFENByIDJS = function(fenID) {
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getFENByID',
      a : fenID,
    },
    type : 'post',
    success : function(output) {
      //everything echo'd in the doThing function is console log'd
      //divOutput(output);
      currentFEN = JSON.parse(output);
    }
  })
}

var getAllGamesWithSameOpeningJS = function(openingID) {
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getAllGamesWithSameOpening',
      a : openingID,
    },
    type : 'post',
    success : function(output) {
      //everything echo'd in the doThing function is console log'd
      divOutput(output);
      games = JSON.parse(output);
    }
  })
}
var getAllGamesWithAFENJS = function(fenID) {
  //var fenID = document.getElementById("GameFENInput").value;
  fenID = currentFENID;
  var myvar = "";
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getAllGamesWithAFEN',
      a : fenID,
    },
    type : 'post',
    success : function(output) {
      //everything echo'd in the doThing function is console log'd
      //divOutput(output);
      myvar = JSON.parse(output);
      i = 0;
      while(i<myvar.num_rows){
        games[i] = myvar[i].GameId;
        i++;
      }
    }
  })
}
var getAllGamesPlayedByAPlayerJS = function() {
  var myNumber = document.getElementById("PlayerGameInput").value;
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getAllGamesPlayedByAPlayer',
      a : myNumber,
    },
    type : 'post',
    success : function(output) {
      //everything echo'd in the doThing function is console log'd
      divOutput(output);
    }
  })
}
var getAllGamesWithSameWhitePawnStructJS = function() {
  var myNumber = document.getElementById("WhitePawnStructInput").value;
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getAllGamesWithSameWhitePawnStruct',
      a : myNumber,
    },
    type : 'post',
    success : function(output) {
      //everything echo'd in the doThing function is console log'd
      divOutput(output);
    }
  })
}
var getAllGamesWithSameBlackPawnStructJS = function() {
  var myNumber = document.getElementById("BlackPawnStructInput").value;
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getAllGamesWithSameBlackPawnStruct',
      a : myNumber,
    },
    type : 'post',
    success : function(output) {
      //everything echo'd in the doThing function is console log'd
      divOutput(output);
    }
  })
}
var getMovesOfGameJS = function() {
  var myNumber = document.getElementById("MovesInput").value;
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getMovesOfGame',
      a : myNumber,
    },
    type : 'post',
    success : function(output) {
      //everything echo'd in the doThing function is console log'd
      divOutput(output);
    }
  })
}

var getOpeningsJS = function() {
  var pgn = $('#pgn').text();
  if(!pgn) {
    return;
  }
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getOpenings',
      a : pgn,
    },
    type : 'post',
    success : function(output) {
      divOutput(output);
    }
  })
}



var getGamesWithSameFENJS = function() {
  var fen = $('#fen').text().split(" ");
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getGamesWithSameFEN',
      a : fen[0],
      b : fen[1]
    },
    type : 'post',
    success : function(output) {
      divOutput(output);
    }
  })
}
var getNextMovesJS = function() {
  var fen = $('#fen').text().split(" ");
  $("#openingsOut").html("Loading...");
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getNextMoves',
      a : fen[0],
      b : fen[1]
    },
    type : 'post',
    success : function(output) {
      try {
        var x = JSON.parse(output);
        //console.log(x);
        if(x.num_rows == 0) {
          $("#openingsOut").html("No results!");
        } else {
          var total = 0;
          var num = 0;
          var out = "";
          for(i = 0; i < x.num_rows; i++) {
            if(x[i].c) {
              num = num + 1;
              total = total + x[i].c;
              out = out + "<p>" + x[i].c + " - " + x[i].PiecePlacement + "</p>";
            }
          }

          // $("#openingsOut").html(JSON.stringify(x, null, 1));
          $("#openingsOut").html(out);
        }
      } catch (e) {
        $("#openingsOut").html("Invalid input: \n" + output);
      }
    }
  })
}

var populateCurrentGameJS = function(gameID) {
  gameID = document.getElementById("PopulateGameInput").value;
  var myvar = "";
  var myText = "";
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getMovesOfGame',
      a : gameID,
    },
    type : 'post',
    success : function(output) {
      divOutput(output);
      myvar = JSON.parse(output);
      var i = 0;
      currentMoveNumber = 0;
      while(i<myvar.num_rows){
        currentGameFENS[i] = myvar[i].PiecePlacement;
        i++;
      }
      boardSetupFEN(currentGameFENS[0]);
      displayGameInfo(myvar[0].GameId);
    }
  })
}
var displayGameInfo = function(gameId){
  var myText = "";
  getGameByIDJS(gameId);
  console.log("hello");
  $(document).ajaxStop(function () {
    var winner = "draw";
    if(currentGame[0].Winner == currentGame[0].White){winner = currentGame[0].White;}
    if(currentGame[0].Winner == currentGame[0].Black){winner = currentGame[0].Black;}
    myText = "<p>";
    myText = myText+"White Player: <a onClick = 'displayPlayerInfo("+currentGame[0].WhitePlayer+","+gameId+");'style='cursor: pointer; cursor: hand;''>"+currentGame[0].WhitePlayer+"</a>";
    myText = myText+"<br>Black Player: <a onClick = 'displayPlayerInfo("+currentGame[0].BlackPlayer+","+gameId+");'style='cursor: pointer; cursor: hand;''>"+currentGame[0].BlackPlayer+"</a>";
    myText = myText+"<br><a onClick = 'displayOpeningInfo("+gameId+");'style='cursor: pointer; cursor: hand;''>Opening Info</a>";
    myText = myText+"<br>Winner: "+winner;
    myText = myText+ "</p>";
    document.getElementById("displayInfo").innerHTML = myText;
  });
}
var displayPlayerInfo = function(playerID,gameId){
  var myText = "";
  getPlayerByIDJS(playerID);
  $(document).ajaxStop(function () {
    myText = "<p>";
    myText = myText+"First Name: "+currentPlayer[0].FirstName;
    myText = myText+"<br>Last Name: "+currentPlayer[0].LastName;
    myText = myText+"<br>Rating: "+currentPlayer[0].ELO;
    myText = myText+"<br>Game: <a onClick = 'displayGameInfo("+gameId+");'style='cursor: pointer; cursor: hand;''>Game</a>";
    myText = myText+ "</p>";
    document.getElementById("displayInfo").innerHTML = myText;
}
var displayOpeningInfo = function(gameId){
  var myText = "";
  getAllOpeningsOfAGameJS(gameId);
  $(document).ajaxStop(function () {
    myText = "<p>";
    i = 0;
    while(i<openings.num_rows){
      myText = myText+"Opening ID: <a onClick = 'displayOpeningGames("+openings[i].OpeningId+","+gameId+");'style='cursor: pointer; cursor: hand;''>"+openings[i].OpeningId+"</a></p>";
      myText = myText+"<br>Name: "+openings[i].Name;
      myText = myText+"<br>"+openings[i].Moves;
      i++;
    }
    myText = myText+"<br>Back to <a onClick = 'displayGameInfo("+gameId+");'style='cursor: pointer; cursor: hand;''>Game</a></p>";
    document.getElementById("displayInfo").innerHTML = myText;
  });
}
var displayOpeningGames = function(openingID,gameID){
  console.log("inside display opening games");
  var myText = "";
  getAllGamesWithSameOpeningJS(openingID);
  $(document).ajaxStop(function () {
    console.log(games);
    myText = "<p>";
    i = 0;
    while(i<games.num_rows){
      myText = myText+"ID: <a onClick = 'populateCurrentGameJS("+games[i].GameId+");'style='cursor: pointer; cursor: hand;''>"+games[i].GameId+"</a><br>";
      i++;
    }
    myText = myText+"<br>Back to <a onClick = 'populateCurrentGameJS("+gameID+");'style='cursor: pointer; cursor: hand;''>Game</a></p>";
    document.getElementById("displayInfo").innerHTML = myText;
  });
}
var getAllOpeningsOfAGameJS = function(gameId){
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getAllOpeningsOfAGame',
      a : gameId,
    },
    type : 'post',
    success : function(output) {
      //everything echo'd in the doThing function is console log'd
      divOutput(output);
      openings = JSON.parse(output);
    }
  })
}

var moveForwardInGameJS = function(){
  if(currentMoveNumber+1<currentGameFENS.length){
    currentMoveNumber++;
    boardSetupFEN(currentGameFENS[currentMoveNumber]);
  }
}
var moveBackwardsInGameJS = function(){
  if(currentMoveNumber-1>-1){
    currentMoveNumber--;
    boardSetupFEN(currentGameFENS[currentMoveNumber]);
  }
}
var generateNextMoveJS = function(fenID,moveNumber,playerToMove){
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getNextMoveFromGame',
      a : fenID,
      b : playerToMove,
      c : moveNumber
    },
    type : 'post',
    success : function(output) {
      //console.log(output);
      //everything echo'd in the doThing function is console log'd
      divOutput(output);
    }
  })
}
$("#startPositionBtn").click(function() {
  init();
});

var resetBoard = function() {
  moveNumber = 0;
  var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
    onChange : onChangeBoard
  };
  var board = ChessBoard('board', cfg);
  updateStatus();
}

var showAllNextMovesJS = function() {
  getFENByIDJS(currentFENID);
  getAllGamesWithAFENJS(currentFENID);
  $(document).ajaxStop(function () {
    console.log(currentFEN);
    console.log(games);
    console.log(games.length);
  });
  console.log("here");
    i = 0;

     while(i<games.length){
      //generateNextMoveJS(currentFENID,currentFEN.fullMoveNumber,currentFEN.playerToMove);
      generateNextMoveJS(currentGameID,3,'b');
      i++;
    }
}
