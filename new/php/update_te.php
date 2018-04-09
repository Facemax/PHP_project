<?php
/**
 * Created by PhpStorm.
 * User: Liu
 * Date: 2018/3/23
 * Time: 16:49
 */
require_once __DIR__ . '/Mysql.php';
require_once __DIR__ . '/Users.php';
require_once __DIR__.'/email.php';
session_start();
$dsn      = 'mysql:dbname=zenduredb;host=romi20171228.cltledcaqxbk.us-east-1.rds.amazonaws.com';
$username = 'romi';
$password = '12345678';
$submitter=$_SESSION["Email"];
$mysql=new Mysql();
$user=new Users();
$connect=$mysql->connect_sqldbo($dsn,$username,$password);
$update=$connect->prepare("Update Issue SET Datetime=:datetime,Root_Cause=:Root_Cause,Repley=:Repley,Close_date=:Close_date,Issue_status=:Issue_status,Analyst_email=:Analyst_email WHERE Issue_id=:id");
$update->bindParam(':Root_Cause',$_POST["Root_Cause"]);
$update->bindParam(':Repley',$_POST["Repley"]);
$update->bindParam(':Close_date',$_POST["Close_date"]);
$update->bindParam(':Issue_status',$_POST["Issue_status"]);
$update->bindParam(':id',$_POST["Issue_id"]);
$time=date('Y-m-d H:i:s',time());
$update->bindParam(':datetime',$time);
$update->bindParam(':Analyst_email',$submitter);
$feedback=$connect->prepare("SELECT * FROM Issue WHERE Issue_id=:id");
$feedback->bindParam(':id',$_POST["Issue_id"]);

try{
    $result=$update->execute();
    $feedback->execute();
    $results=$feedback->fetch(PDO::FETCH_ASSOC);
    //$result=$update->fetch(PDO::FETCH_ASSOC);
    if(empty($result)){

        $connect=null;
        $data=array();
        $data['result']='fail';
        echo json_encode($data);
        exit;

    }else{
        $s_e=$results["Submitter_email"];
        $a_e=$results["Analyst_email"];
        sendemail($a_e,$s_e,"The latest progress of Issue id:".$_POST["Issue_id"],$_POST["Repley"]);
        $data=array();
        $data['result']='success';
        echo json_encode($data);
        exit;

    }
}catch (PDOException $e){

    $connect=null;
    $data=array();
    $data['result']="error";
    echo json_encode($data);
    exit;
}


