<?php

if(isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    $db = new mysqli("localhost", "root", "toor", "chess");
    $a = "";
    if($_POST['a']) {
      $a = $_POST['a'];
    }


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
          break;
        case 'getAllGamesWithSameOpening' :
          $a = "\"" . $a . "%" . "\"";
          $sql = "SELECT o.OpeningId, o.Name, o.Moves, g.GameId FROM opening as o left outer join gameopening as g on o.OpeningId = g.OpeningId WHERE o.Moves LIKE $a";
          break;
        case 'getAllOpeningsOfAGame':
          $sql = "SELECT * FROM opening where OpeningId in ( Select OpeningId from gameopening where GameId = $a)";
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
        case 'getGamesWithSameFEN' :
          //$a is fen string, $b is next player to move
          $b = $_POST['b'];
          // $boardRows = explode("/", $a);
          $a = str_replace("/", "%", $a);
          $sql = "SELECT * FROM gamefen AS g
                  LEFT OUTER JOIN ( SELECT * FROM FEN ) AS f
                  ON g.FENId = f.FENId
                  WHERE f.PiecePlacement LIKE " . "\"$a\"";
            // $sql = str_replace("/", "\/", $sql);
            // $sql = mysqli_real_escape_string($db, $sql);
            // echo $sql; return;
          break;
        case 'getNextMoveFromGame':
          // $playerToMove = $_POST['b'];
          // $moveNumber = parseInt($_POST['c']);
          // if($playerToMove == "w"){
          //   $playerToMove = "b";
          // }
          // else{
          //   $playerToMove = "w";
          //   $moveNumber = $moveNumber+1;
          // }
          $playerToMove = 'b';
          $moveNumber = 3;
          $sql = "SELECT f.PiecePlacement FROM fen as f INNER JOIN gamefen as g ON f.fenid=g.fenid WHERE f.fullMoveCounter = $moveNumber AND f.PlayerToMove = \"$playerToMove\" AND g.gameid = $a";
          break;
        case 'getOpenings':
          $a = "\"" . $a . "%" . "\"";
          $sql = "SELECT * FROM opening WHERE moves LIKE $a";
          break;
        case 'getNextMoves':
          $b = $_POST['b'];
          $a = str_replace("/", "%", $a);

          $sql = "SELECT count(*) as c, j2.PiecePlacement FROM gamefen AS g
          	      LEFT OUTER JOIN ( SELECT * FROM FEN ) AS f
          	      ON g.FENId = f.FENId
                  LEFT OUTER JOIN (SELECT g2.FENId, GameId as gid, f2.PiecePlacement, f2.FullMoveCounter, f2.PlayerToMove
                                    FROM gamefen AS g2
                                    LEFT OUTER JOIN ( SELECT * FROM FEN ) AS f2
                                    ON g2.FENId = f2.FENId) as j2
                  ON g.GameId = gid
                  WHERE f.PiecePlacement LIKE \"" . $a . "\" ";
                  if($b == 'b') {
                    $sql = $sql . "AND j2.FullMoveCounter = f.FullMoveCounter + 1 AND j2.PlayerToMove = 'w' ";
                  } else if($b == 'w') {
                    $sql = $sql . "AND j2.FullMoveCounter = f.FullMoveCounter AND j2.PlayerToMove = 'b' ";
                  }
                  $sql = $sql . " GROUP BY j2.PiecePlacement ORDER BY c DESC";

    }
    // echo $sql;return;
    $stmt = mysqli_query($db, $sql);

    if(!$result = $db->query($sql)){
        die('There was an error running the query [' . $db->error . ']');
    }

    $arr = [];
    $arr["num_rows"] = $result->num_rows;
    $arr["mysql_query"] = $sql;
    while($row = $result->fetch_assoc()){
        $arr[] = $row;
    }
    $result->free();
    $db->close();
    $_POST['action'] = "";
    echo json_encode($arr);
}
?>
