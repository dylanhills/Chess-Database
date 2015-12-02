var currentGameFENS = [];
var currentMoveNumber = -1;

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
  console.log(output);
  try {
    var x = JSON.parse(output);
    console.log(x);
    if(x.num_rows == 0) {
      $("#dbOut").html("No results!");
    } else {
      $("#dbOut").html(JSON.stringify(x, null, '\t'));
    }
  } catch (e) {
    $("#dbOut").html("Invalid input: \n" + output);
  }
}

var getGameJS = function() {
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'doThing',
    },
    type : 'post',
    success : function(output) {
      //everything echo'd in the doThing function is console log'd
      console.log(output);
    }
  })
}
var getGameByIDJS = function() {
  var myNumber = document.getElementById("GameInput").value;
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getGameByID',
      a : myNumber,
    },
    type : 'post',
    success : function(output) {
      //everything echo'd in the doThing function is console log'd
      divOutput(output);
    }
  })
}
var getPlayerByIDJS = function() {
  var myNumber = document.getElementById("PlayerInput").value;
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getPlayerByID',
      a : myNumber,
    },
    type : 'post',
    success : function(output) {
      //everything echo'd in the doThing function is console log'd
      divOutput(output);
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
var getAllGamesWithSameOpeningJS = function() {
  var pgn = $('#pgn').text();
  if(!pgn) {
    return;
  }
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getAllGamesWithSameOpening',
      a : pgn,
    },
    type : 'post',
    success : function(output) {
      //everything echo'd in the doThing function is console log'd
      divOutput(output);
    }
  })
}
var getAllGamesWithAFENJS = function() {
  var myNumber = document.getElementById("GameFENInput").value;
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getAllGamesWithAFEN',
      a : myNumber,
    },
    type : 'post',
    success : function(output) {
      //everything echo'd in the doThing function is console log'd
      divOutput(output);
      populateMoves(output);
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
  console.log("fuck");
  var fen = $('#fen').text().split(" ");
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getNextMoves',
      a : fen[0],
      b : fen[1]
    },
    type : 'post',
    success : function(output) {
      divOutput(output);
    }
  })
}

var populateCurrentGameJS = function() {
  var myNumber = document.getElementById("PopulateGameInput").value;
  var myvar = "";
  var myText = "";
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getMovesOfGame',
      a : myNumber,
    },
    type : 'post',
    success : function(output) {
      console.log(output);
      //everything echo'd in the doThing function is console log'd
      divOutput(output);
      myvar = JSON.parse(output);
      var i = 0;
      currentMoveNumber = 0;
      while(i<myvar.num_rows){
        currentGameFENS[i] = myvar[i].PiecePlacement;
        //myText = myText + '<a onClick="boardSetupFEN(\''+myvar[i].PiecePlacement+'\')" style="cursor: pointer; cursor: hand;">move '+i+'</a><br>'
        i++;
      }
      //document.getElementById('availNextMoves').innerHTML = myText;
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
var generateNextMoveJS = function(){
  var myNumber = document.getElementById("GenerateNextMoveInput").value;
  var moveNumber = 3;
  var playerToMove = "b";
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getNextMoveFromGame',
      a : myNumber,
      b : playerToMove,
      c : moveNumber
    },
    type : 'post',
    success : function(output) {
      console.log(output);
      //everything echo'd in the doThing function is console log'd
      divOutput(output);
    }
  })
}

$("#startPositionBtn").click(function() {
  init();
});

var resetBoard = function() {
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
