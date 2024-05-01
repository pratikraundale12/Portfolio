<?php
$server= "localhost";
$username="root";
$password="";


$con =mysqli_connect($server,$username,$password);
if(!$con){
    die("connection to this database faild". mysqli_connect_error());

}
echo "Sucessfully connected";
?>