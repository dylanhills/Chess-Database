<?php

if(isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    $args = array(
      "a" => $_POST['a'],
      "b" => $_POST['b'],
    );
    switch($action) {
        case 'getGameByID' : getGameByID($args["a"]); break;
        case 'getPlayerByID' : getPlayerByID($args["a"]); break;
        case 'getFENByID' : getFENByID($args["a"]); break;
        case 'getOpeningByID' : getOpeningByID($args["a"]); break;
        case 'getTournamentByID' : getTournamentByID($args["a"]); break;
        case 'getAllGamesWithSameOpening' : getAllGamesWithSameOpening($args["a"]); break;
        case 'getAllGamesWithAFEN' : getAllGamesWithAFEN($args["a"]); break;
        case 'getAllGamesPlayedByAPlayer' : getAllGamesPlayedByAPlayer($args["a"]); break;
        case 'getAllGamesWithSameWhitePawnStruct' : getAllGamesWithSameWhitePawnStruct($args["a"]); break;
        case 'getAllGamesWithSameBlackPawnStruct' : getAllGamesWithSameBlackPawnStruct($args["a"]); break;

    }
}

function getGameByID($arg){
  $db = new mysqli("localhost", "root", "toor", "chess");

  $sql = "Select * From Game Where GameId = $arg";
  echo "Executing query: " . $sql . "\n";

  if(!$result = $db->query($sql)){
    echo $db->error;
      die('There was an error running the query [' . $db->error . ']');
  }
  echo 'Total results: ' . $result->num_rows . "\n";

  while($row = $result->fetch_assoc()){
      echo json_encode($row);
      echo "\n";
  }
  $result->free();
}
function getPlayerByID($arg){
  $db = new mysqli("localhost", "root", "toor", "chess");

  $sql = "Select * From Player Where PlayerId = $arg";
  echo "Executing query: " . $sql . "\n";

  if(!$result = $db->query($sql)){
    echo $db->error;
      die('There was an error running the query [' . $db->error . ']');
  }
  echo 'Total results: ' . $result->num_rows . "\n";

  while($row = $result->fetch_assoc()){
      echo json_encode($row);
      echo "\n";
  }
  $result->free();
}
function getOpeningByID($arg){
  $db = new mysqli("localhost", "root", "toor", "chess");

  $sql = "Select * From Opening Where OpeningId = $arg";
  echo "Executing query: " . $sql . "\n";

  if(!$result = $db->query($sql)){
    echo $db->error;
      die('There was an error running the query [' . $db->error . ']');
  }
  echo 'Total results: ' . $result->num_rows . "\n";

  while($row = $result->fetch_assoc()){
      echo json_encode($row);
      echo "\n";
  }
  $result->free();
}
function getFENByID($arg){
  $db = new mysqli("localhost", "root", "toor", "chess");

  $sql = "Select * From FEN Where FENId = $arg";
  echo "Executing query: " . $sql . "\n";

  if(!$result = $db->query($sql)){
    echo $db->error;
      die('There was an error running the query [' . $db->error . ']');
  }
  echo 'Total results: ' . $result->num_rows . "\n";

  while($row = $result->fetch_assoc()){
      echo json_encode($row);
      echo "\n";
  }
  $result->free();
}
function getTournamentByID($arg){
  $db = new mysqli("localhost", "root", "toor", "chess");

  $sql = "SELECT * From Tournament Where TournamentId = $arg";
  echo "Executing query: " . $sql . "\n";

  if(!$result = $db->query($sql)){
    echo $db->error;
      die('There was an error running the query [' . $db->error . ']');
  }
  echo 'Total results: ' . $result->num_rows . "\n";

  while($row = $result->fetch_assoc()){
      echo json_encode($row);
      echo "\n";
  }
  $result->free();
}
function getAllGamesWithSameOpening($arg){
  $db = new mysqli("localhost", "root", "toor", "chess");

  $sql = "SELECT * FROM gameopening where openingid in ( Select openingid from gameopening where gameid = $arg)";
  echo "Executing query: " . $sql . "\n";

  if(!$result = $db->query($sql)){
    echo $db->error;
      die('There was an error running the query [' . $db->error . ']');
  }
  //echo 'Total results: ' . $result->num_rows . "\n";

  while($row = $result->fetch_assoc()){
      echo json_encode($row);
      $openingid = $row["OpeningId"];
      echo "\n";
  }
  echo $openingid;
  $result->free();
}
function getAllGamesWithAFEN($arg){
  $db = new mysqli("localhost", "root", "toor", "chess");

  $sql = "SELECT gameid FROM gamefen where fenid = $arg";
  echo "Executing query: " . $sql . "\n";

  if(!$result = $db->query($sql)){
    echo $db->error;
      die('There was an error running the query [' . $db->error . ']');
  }
  //echo 'Total results: ' . $result->num_rows . "\n";
  while($row = $result->fetch_assoc()){
      echo json_encode($row);
      echo "\n";
  }
  $result->free();
}
function getAllGamesPlayedByAPlayer($arg){
  $db = new mysqli("localhost", "root", "toor", "chess");

  $sql = "SELECT gameid FROM game where WhitePlayer = $arg or BlackPlayer = $arg";
  echo "Executing query: " . $sql . "\n";

  if(!$result = $db->query($sql)){
    echo $db->error;
      die('There was an error running the query [' . $db->error . ']');
  }
  //echo 'Total results: ' . $result->num_rows . "\n";

  while($row = $result->fetch_assoc()){
      echo json_encode($row);
      //$openingid = $row["OpeningId"];
      echo "\n";
  }
  //echo $openingid;
  $result->free();
}
function getAllGamesWithSameWhitePawnStruct($arg){
  $db = new mysqli("localhost", "root", "toor", "chess");

  $sql = "SELECT Distinct gameid FROM gamefen where fenid in (SELECT fenid FROM fen Where PawnStructW = (Select PawnStructW from fen where fenid = $arg))";
  echo "Executing query: " . $sql . "\n";

  if(!$result = $db->query($sql)){
    echo $db->error;
      die('There was an error running the query [' . $db->error . ']');
  }
  //echo 'Total results: ' . $result->num_rows . "\n";

  while($row = $result->fetch_assoc()){
      echo json_encode($row);
      //$openingid = $row["OpeningId"];
      echo "\n";
  }
  //echo $openingid;
  $result->free();
}
function getAllGamesWithSameBlackPawnStruct($arg){
  $db = new mysqli("localhost", "root", "toor", "chess");

  $sql = "SELECT Distinct gameid FROM gamefen where fenid in (SELECT fenid FROM fen Where PawnStructW = (Select PawnStructB from fen where fenid = $arg))";
  echo "Executing query: " . $sql . "\n";

  if(!$result = $db->query($sql)){
    echo $db->error;
      die('There was an error running the query [' . $db->error . ']');
  }
  //echo 'Total results: ' . $result->num_rows . "\n";

  while($row = $result->fetch_assoc()){
      echo json_encode($row);
      //$openingid = $row["OpeningId"];
      echo "\n";
  }
  //echo $openingid;
  $result->free();
}
 ?>
