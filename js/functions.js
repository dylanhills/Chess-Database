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
	var board = ChessBoard('board', 'start');
	var board,
	  game = new Chess(),
	  statusEl = $('#status'),
	  fenEl = $('#fen'),
	  pgnEl = $('#pgn');

	// do not pick up pieces if the game is over
	// only pick up pieces for the side to move
	var onDragStart = function(source, piece, position, orientation) {
	  if (game.game_over() === true ||
		  (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
		  (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
		return false;
	  }
	};

	var onDrop = function(source, target) {
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
	var onSnapEnd = function() {
	  board.position(game.fen());
	};

	var updateStatus = function() {
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
	  onSnapEnd: onSnapEnd
	};
	board = ChessBoard('board', cfg);

	updateStatus();

};
var boardSetupFEN = function(fen) {
	$("#tools").show()
	var board = ChessBoard('board', fen);
	var board,
	  game = new Chess(),
	  statusEl = $('#status'),
	  fenEl = $('#fen'),
	  pgnEl = $('#pgn');

	// do not pick up pieces if the game is over
	// only pick up pieces for the side to move
	var onDragStart = function(source, piece, position, orientation) {
	  if (game.game_over() === true ||
		  (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
		  (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
		return false;
	  }
	};

	var onDrop = function(source, target) {
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
	var onSnapEnd = function() {
	  board.position(game.fen());
	};

	var updateStatus = function() {
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
	  position: fen,
	  onDragStart: onDragStart,
	  onDrop: onDrop,
	  onSnapEnd: onSnapEnd
	};
	board = ChessBoard('board', cfg);

//	updateStatus();

};
$(document).ready(init);

var divOutput = function(output) {
  try {
    // var x = output.trim();
    // x = JSON.parse(JSON.stringify(x));
    var x = JSON.parse(output);
    console.log(x);
    $("#dbOut").html(JSON.stringify(x, null, '\t'));
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
  var myNumber = document.getElementById("GameOpeningInput").value;
  $.ajax({
    url : "db_funcs.php",
    data : {
      action : 'getAllGamesWithSameOpening',
      a : myNumber,
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
var populateMoves = function(str){
	var myvar = "rnbqk2r/pp2ppbp/2p2np1/3p4/3P4/5NP1/PPP1PPBP/RNBQ1RK1";
	myText = '<a onClick="boardSetupFEN(\''+myvar+'\')" style="cursor: pointer; cursor: hand;">*click here*</a>'
	document.getElementById("availNextMoves").innerHTML = myText;
}
