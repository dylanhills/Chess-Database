<?php
function initDB() {
  $username = "root";
  $password = "toor";
  $hostname = "localhost";
  $db_name = "chess";

  $db = new mysqli($hostname, $username, $password, $db_name);

  if($db->connect_errno > 0){
      die('Unable to connect to database [' . $db->connect_error . ']');
  }
  echo "Connected to MySQL<br>";

  return $db;
}

$GLOBALS['db'] = initDB();

?>
