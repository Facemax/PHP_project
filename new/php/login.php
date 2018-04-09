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
$check=$connect->prepare("SELECT * FROM Users WHERE EMAIL=:email and PASSWORD=:psd");
$check->bindParam(':email',$_POST["email"]);
$check->bindParam(':psd',$_POST["password"]);
try{
    $check->execute();
    $connect=null;
    $result=$check->fetch(PDO::FETCH_ASSOC);
    if(empty($result)){

        /*echo"<script language='javascript' type = 'text/javascript'>";
        echo"alert('error:Sorry, the account with this keycode was not found.');";
        echo" window.location.href ='index.html'";
        echo"</script>";*/

        $data=array();
        $data['result']='fail';
        echo json_encode($data);
        exit;

    }else{
        $user->setID($result['ID']);
        $user->setEMAIL($result['EMAIL']);
        $user->setPASSWORD($result['PASSWORD']);
        $user->setUSERNAME($result['USERNAME']);
        $_SESSION["Power"]=$result['POWER'];
        $_SESSION["Email"]=$result['EMAIL'];
        $_SESSION['Username']=$user->getUSERNAME();
        $_SESSION['ID']=$user->getID();

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
