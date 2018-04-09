
<?php
/**
 * Created by PhpStorm.
 * User: Liu
 * Date: 2018/3/2
 * Time: 15:41
 */
?>


<?php
require_once __DIR__ . '/Mysql.php';
$dsn      = 'mysql:dbname=zenduredb;host=romi20171228.cltledcaqxbk.us-east-1.rds.amazonaws.com';
$username = 'romi';
$password = '12345678';

$mysql=new Mysql();
$connect=$mysql->connect_sqldbo($dsn,$username,$password);
$insert=$connect->prepare("INSERT INTO Users(USERNAME,PASSWORD,EMAIL,DATETIME,POWER) VALUE (:USERNAME,:PASSWORD,:EMAIL,:DATETIME,:POWER)");
$insert->bindParam(":USERNAME",$_POST["username"]);
$insert->bindParam(":PASSWORD",$_POST["password"]);
$insert->bindParam(":EMAIL",$_POST["email"]);
/*$t="name";
$t2="123";
$t3="123@zendure.com";
$insert->bindParam(":USERNAME",$t);
$insert->bindParam(":PASSWORD",$t2);
$insert->bindParam(":EMAIL",$t3);*/

$time=date('Y-m-d h:i:s',time());
$insert->bindParam(":DATETIME",$time);
$power=2;
$insert->bindParam(":POWER",$power);
try{
    $result=$insert->execute();
    $connect=null;
    if(empty($result)){


        $data=array();
        $data['result']='fail';
        echo json_encode($data);
        exit;

    }else{
        $data=array();
        $data['result']='success';

        echo json_encode($data);
        exit;

    }


}catch (PDOException $e){
    $data=array();
    $data['result']="error";
    echo json_encode($data);
    exit;
}

?>


