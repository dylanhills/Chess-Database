<?php

if(isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    $args = array(
      "a" => $_POST['a'],
    );
    $db = new mysqli("localhost", "root", "toor", "chess");

    $a = $_POST['a'];

    $a = mysqli_real_escape_string($db, $a);

    $sql = "";

    switch($action) {
        case 'getGameByID' :
          $sql = "Select * From Game Where GameId = $a";
          break;
        case 'getPlayerByID' :
          $sql = "Select * From Player Where PlayerId = $a";
          break;
        case 'getFENByID' :
          $sql = "Select * From FEN Where FENId = $a";
          break;
        case 'getOpeningByID' :
          $sql = "Select * From Game Where GameId = $a";
          break;
        case 'getTournamentByID' :
          $sql = "SELECT * From Tournament Where TournamentId = $a";
          $sql = str_replace("%s", $a, $sql);
          break;
        case 'getAllGamesWithSameOpening' :
          $sql = "SELECT * FROM gameopening where OpeningId in ( Select OpeningId from gameopening where GameId = $a)";
          break;
        case 'getAllGamesWithAFEN' : //fuck
          $sql = "SELECT GameId FROM gamefen where FENId = $a";
          break;
        case 'getAllGamesPlayedByAPlayer' :
          $sql = "SELECT gameid FROM Game where WhitePlayer = $a or BlackPlayer = $a";
          break;
        case 'getAllGamesWithSameWhitePawnStruct' :
          $sql = "SELECT Distinct GameId FROM gamefen where FENId in (SELECT FENId FROM FEN Where PawnStructW = (Select PawnStructW from FEN where FENId = $a))";
          break;
        case 'getAllGamesWithSameBlackPawnStruct' :
          $sql = "SELECT Distinct GameId FROM gamefen where FENId in (SELECT FENId FROM FEN Where PawnStructW = (Select PawnStructB from FEN where FENId = $a))";
          break;
        case 'getMovesOfGame' :
          $sql = "SELECT * FROM gamefen AS g LEFT OUTER JOIN (  SELECT * FROM FEN ) AS f ON g.FENId = f.FENId WHERE g.GameId = $a ORDER BY f.FullMoveCounter ASC, f.PlayerToMove DESC";
          break;
        case 'getNextMoveFromGame':
          $playerToMove = $_POST['b'];
          $moveNumber = parseInt($_POST['c']);
          if($playerToMove == "w"){
            $playerToMove = "b";
          }
          else{
            $playerToMove = "w"; 
            $moveNumber = $moveNumber+1;
          }
          $sql = "SELECT * FROM fen as f INNER JOIN gamefen as g ON f.fenid=g.fenid WHERE f.fullMoveCounter = $moveNumber AND f.playerToMove = $playerToMove AND g.gameid = $a";
          break;
    }

    $stmt = mysqli_query($db, $sql);

    if(!$result = $db->query($sql)){
        die('There was an error running the query [' . $db->error . ']');
    }

    $arr = [];
    $arr["num_rows"] = $result->num_rows;
    while($row = $result->fetch_assoc()){
        $arr[] = $row;
    }
    $result->free();
    $db->close();
    $_POST['action'] = "";
    echo json_encode($arr);
}
?>
