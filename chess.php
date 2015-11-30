<!-- JS -->
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>


<!-- Bootstrap -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css" integrity="sha384-aUGj/X2zp5rLCbBxumKTCw2Z50WgIr1vs/PFN4praOTvYXWlVyh2UtNUU0KAUhAX" crossorigin="anonymous">

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" integrity="sha512-K1qjQ+NcF2TYO/eI3M6v8EiNYZfA95pQumfvcVrTHtwQVDG+aHRqLi/ETn2uB+1JqwYqVG3LIvdm9lj6imS/pQ==" crossorigin="anonymous"></script>

<html>
<?php
	include_once("init_db.php");
 ?>
<body>
	<div class="container">
		<div class="row">
			<div class = "col-xs-6" style= "padding-top: 50px;">
				<div id = "chessboard" class = "horizontal-center">
					<div id="board" style="width: 400px"></div>
					<p></p>
					<p>Status: <span id="status"></span></p>
					<p>FEN: <span id="fen"></span></p>
					<p>PGN: <span id="pgn"></span></p>
				</div>
			</div>
			<div class = "col-xs-6">
				<ul class="nav nav-tabs" style="padding-top:12px; margin-bottom:20px">
					<li role="presentation" class="tabs active" data-tab="tools"><a href="#">Tools</a></li>
					<li role="presentation" class="tabs" data-tab="players"><a href="#">Players</a></li>
					<li role="presentation" class="tabs" data-tab="openings"><a href="#">Openings</a></li>
				</ul>
				<div id="tools" class="tabContent" >
					<div class = "wrapper">
						<div id = "availNextMoves">
						</div>
						<input id = "GameInput" type = "text" name = "Game"> &nbsp;
						<button id = "GameButton" onclick = "getGameByIDJS()" class="btn btn-default">Get Game By ID</button>
						<br>
						<input id = "PlayerInput" type = "text" name = "Player"> &nbsp;
						<button id = "PlayerButton" onclick = "getPlayerByIDJS()" class="btn btn-default">Get Player By ID</button>
						<br>
						<input id = "OpeningInput" type = "text" name = "Opening"> &nbsp;
						<button id = "OpeningButton" onclick = "getOpeningByIDJS()" class="btn btn-default">Get Opening By ID</button>
						<br>
						<input id = "TournamentInput" type = "text" name = "Tournament"> &nbsp;
						<button id = "TournamentButton" onclick = "getTournamentByIDJS()" class="btn btn-default">Get Tournament By ID</button>
						<br>
						<input id = "FENInput" type = "text" name = "FEN"> &nbsp;
						<button id = "FENButton" onclick = "getFENByIDJS()" class="btn btn-default">Get FEN By ID</button>
						<br>
						<input id = "GameOpeningInput" type = "text" name = "GameOpening"> &nbsp;
						<button id = "GameOpeningButton" onclick = "getAllGamesWithSameOpeningJS()" class="btn btn-default">Get All Games With Same Opening</button>
						<br>
						<input id = "GameFENInput" type = "text" name = "GameFEN"> &nbsp;
						<button id = "GameFENButton" onclick = "getAllGamesWithAFENJS()" class="btn btn-default">Get All Games With a FEN</button>
						<br>
						<input id = "PlayerGameInput" type = "text" name = "PlayerGame"> &nbsp;
						<button id = "PlayerGameButton" onclick = "getAllGamesPlayedByAPlayerJS()" class="btn btn-default">Get All Games Played by a Player</button>
						<br>
						<input id = "WhitePawnStructInput" type = "text" name = "WhitePawnStruct"> &nbsp;
						<button id = "WhitePawnStructButton" onclick = "getAllGamesWithSameWhitePawnStructJS()" class="btn btn-default">Get All Games That Reach This White Pawn Struct</button>
						<br>
						<input id = "BlackPawnStructInput" type = "text" name = "BlackPawnStruct"> &nbsp;
						<button id = "BlackPawnStructButton" onclick = "getAllGamesWithSameBlackPawnStructJS()" class="btn btn-default">Get All Games That Reach This Black Pawn Struct</button>
					<div id = "FENOutput"></div>
					</div>
				</div>
				<div id="players" class="tabContent">
					<p>WERK</p>
				</div>
				<div id="openings" class="tabContent" >
					<p>whaaat</p>
				</div>
			</div>
		</div>

		<div class="row">
			<hr>
			<pre id = "dbOut" class="col-xs-12">

			</pre>
		</div>
</body>

<head>
	<script type = "text/javascript" src = "js/functions.js"></script>
	<script type = "text/javascript" src = "js/chess.js"></script>
	<script type = "text/javascript" src = "js/chessboard-0.3.0.js"></script>
	<script type = "text/javascript" src = "https://cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.js"></script>
	<script type = "text/javascript" src = "https://code.jquery.com/jquery-1.10.1.min.js"></script>

	<link rel="stylesheet" type="text/css" href="css/chess.css">
	<link rel="stylesheet" type="text/css" href="css/chessboard-0.3.0.css">
</head>
</html>
