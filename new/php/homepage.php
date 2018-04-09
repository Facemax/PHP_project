

<?php
/**
 * Created by PhpStorm.
 * User: Liu
 * Date: 2018/3/1
 * Time: 14:42
 */
require_once __DIR__ . '/Mysql.php';
session_start();
if(empty($_SESSION['ID']) || empty($_SESSION["Username"])){
    exit;
}else{
    $dsn      = 'mysql:dbname=zenduredb;host=romi20171228.cltledcaqxbk.us-east-1.rds.amazonaws.com';
    $username = 'romi';
    $password = '12345678';
    $mysql=new Mysql();
    $connect=$mysql->connect_sqldbo($dsn,$username,$password);
    $all=$connect->prepare("SELECT * FROM Issue");
    try{
        $all->execute();
        $result=$all->fetchAll(PDO::FETCH_ASSOC);
        $connect=null;
        echo json_encode($result);

    }catch(PDOException $e){

        exit;
    }
}

?>