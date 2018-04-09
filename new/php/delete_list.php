<?php
/**
 * Created by PhpStorm.
 * User: Liu
 * Date: 2018/3/1
 * Time: 14:54
 */
?>


<?php
require_once __DIR__ . '/Mysql.php';
require_once __DIR__ . '/Users.php';
session_start();
$dsn      = 'mysql:dbname=zenduredb;host=romi20171228.cltledcaqxbk.us-east-1.rds.amazonaws.com';
$username = 'romi';
$password = '12345678';
$mysql=new Mysql();
$user=new Users();
$connect=$mysql->connect_sqldbo($dsn,$username,$password);
$del=$connect->prepare("DELETE FROM Issue WHERE Issue_id=:id");
$del->bindParam(':id',$_POST["id"]);

try{
    $del->execute();
    $connect=null;
    $result=$del->rowCount();
    if($result==0){

        /*echo"<script language='javascript' type = 'text/javascript'>";
        echo"alert('error:Sorry, the account with this keycode was not found.');";
        echo" window.location.href ='index.html'";
        echo"</script>";*/

        $data=array();
        $data['result']='fail';
        echo json_encode($data);
        exit;

    }else{

       /* echo " <script language='javascript'type = 'text/javascript'> ";
        echo " window.location.href = 'homepage.html' ";
        echo " </script> ";
        exit;*/
        $data=array();
        $data['result']='success';
       echo json_encode($data);
        exit;

    }
}catch (PDOException $e){
    /*echo " <script language='javascript'type = 'text/javascript'> ";
    echo"alert('System error, login failed.');";
    echo " window.location.href = 'index.html' ";
    echo " </script> ";*/

    $data=array();
    $data['result']='error';
    echo json_encode($data);
    exit;
}



?>
