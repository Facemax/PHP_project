<?php
/**
 * Created by PhpStorm.
 * User: Liu
 * Date: 2018/3/20
 * Time: 15:03
 */
require_once __DIR__ . '/Mysql.php';
session_start();
$dsn      = 'mysql:dbname=zenduredb;host=romi20171228.cltledcaqxbk.us-east-1.rds.amazonaws.com';
$username_sql = 'romi';
$password = '12345678';
$data=array();

if(empty($_SESSION["Username"])){

    $data['result']='error';
    echo json_encode($data);
    exit;
}
$mysql=new Mysql();
$connect=$mysql->connect_sqldbo($dsn,$username_sql,$password);
$check=$connect->prepare("SELECT * FROM Issue WHERE Issue_id=:id");
$check->bindParam(':id',$_POST["id"]);
try{
    $check->execute();
    $result=$check->fetch(PDO::FETCH_ASSOC);
    $connect=null;
    if(empty($result)){
        $result['result']='fail';
        echo json_encode($result);
        exit;
    }else{
        $result['result']='success';
        echo json_encode($result);
    }
}catch (PDOException $e){
    $result['result']="fail";
    echo json_encode($result);
    exit;
}


