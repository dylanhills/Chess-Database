<?php

if(isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    $args = array(
      "a" => $_POST['a'],
      "b" => $_POST['b'],
    );
    switch($action) {
        case 'doThing' : doThing($args); break;
        case 'getGameByID' : getGameByID($args["a"]); break;
    }
}


function doThing($args) {
  echo var_dump($args);

  $db = new mysqli("localhost", "root", "toor", "chess");

  $sql = "show tables";
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
  $result->free();}

 ?>
