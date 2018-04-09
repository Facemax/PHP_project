<?php
/**
 * Created by PhpStorm.
 * User: Liu
 * Date: 2018/3/9
 * Time: 11:08
 */
/*
 * $data=array();
 *  $data['result']="0";//值：0;非法访问
 *  $data['result']="1";//值：1; 上传的文件超过了 php.ini 中 upload_max_filesize 选项限制的值。
 * $data['result']="2";//值：2; 上传文件的大小超过了 HTML 表单中 MAX_FILE_SIZE 选项指定的值。
 * data['result']="3";//值：3; 文件只有部分被上传。
 *  $data['result']="4";//值 4 上传文件不是zip文件
 * $data['result']="5";//值 5 上传文件和数据 成功
 *  $data['result']="6";//值 6 上传数据 失败
 *  $data['result']="7";//值 7 上传数据 失败
 * $data['result']="8";//值 8 上传数据 成功
 * */

?>



<?php
require_once __DIR__ . '/Mysql.php';
require_once __DIR__.'/email.php';
session_start();
$dsn      = 'mysql:dbname=zenduredb;host=romi20171228.cltledcaqxbk.us-east-1.rds.amazonaws.com';
$username_sql = 'romi';
$password = '12345678';
$data=array();
if(empty($_SESSION["Username"])){

    $data['result']="0";//值：0;非法访问
    $json=json_encode($data);
    echo $json;
    exit;
}
$username=$_SESSION["Username"];
$submitter=$_SESSION["Email"];

if(!empty($_FILES['file']['tmp_name'])){//判断临时存储位置是否有文件
    // 允许上传的图片后缀
    $allowedExts = array("zip");
    $temp = explode(".", $_FILES["file"]["name"]);
    //echo $_FILES["file"]["size"]; 508 来源
    $extension = end($temp);     // 获取文件后缀名
    if ((($_FILES["file"]["type"] == "application/x-zip-compressed") && in_array($extension, $allowedExts))) {
        if ($_FILES["file"]["error"] > 0) {

            switch($_FILES["file"]["error"]){
                case 1:
                    $data['result']="1";//值：1; 上传的文件超过了 php.ini 中 upload_max_filesize 选项限制的值。
                    break;
                case 2:
                    $data['result']="2";//值：2; 上传文件的大小超过了 HTML 表单中 MAX_FILE_SIZE 选项指定的值。
                    break;
                case 3:
                    $data['result']="3";//值：3; 文件只有部分被上传。
                    break;
            }
            $json=json_encode($data);
            echo $json;
            exit;
        } else {
            //echo "上传文件名: " . $_FILES["file"]["name"] . "<br>";
           // echo "文件类型: " . $_FILES["file"]["type"] . "<br>";
           // echo "文件大小: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
           // echo "文件临时存储的位置: " . $_FILES["file"]["tmp_name"] . "<br>";
            //改名

            $time=time();
            $fileName=$_FILES['file']['name'];//得到上传文件的名字
            $name=explode('.',$fileName);//将文件名以'.'分割得到后缀名,得到一个数组
            $newPath=$username.$time.'.'.$name[1];//得到一个新的文件为'20070705163148.jpg',即新的路径
            //echo 'new name:'.$newPath;
            // 如果 upload 目录不存在该文件则将文件上传到 upload 目录下
            move_uploaded_file($_FILES["file"]["tmp_name"], "upload/" .$newPath);
            //echo "文件存储在: " . "upload/" .$newPath;
                }
    }else{
        $data['result']="4";//值 4 上传文件不是zip文件
        $json=json_encode($data);
        echo $json;
        exit;
         }
    $mysql=new Mysql();
    $connect=$mysql->connect_sqldbo($dsn,$username_sql,$password);
    $insert=$connect->prepare("INSERT INTO Issue(Product_name,Product_type,Customer_name,Customer_contact,Region,Raised_date,Issue_brief,Issue_detail_description,Attachment_id,Submitter_email,Datetime,Priorities)VALUE (:Product_name,:Product_type,:Customer_name,:Customer_contact,:Region,:Raised_date,:Issue_brief,:Issue_detail_description,:Attachment_id,:Submitter_email,:Datetime,:Priorities)");
    $insert->bindParam(":Product_name",$_POST["product_name"]);
    $insert->bindParam(":Product_type",$_POST["product_type"]);
    $insert->bindParam(":Customer_name",$_POST["customer_name"]);
    $insert->bindParam(":Customer_contact",$_POST["customer_contact"]);
    $insert->bindParam(":Region",$_POST["region"]);
    $raised_date=date('Y-m-d H:i:s',time());
    $insert->bindParam(":Raised_date",$raised_date);//提交时间
    $insert->bindParam(":Issue_brief",$_POST["issue_brief"]);
    $insert->bindParam(":Issue_detail_description",$_POST["issue_detail_description"]);
    //echo $newPath;
    //echo $username;
    $insert->bindParam(":Attachment_id",$newPath);
    $insert->bindParam(":Submitter_email",$submitter);
    $insert->bindParam(":Datetime",$raised_date);//time 每次修改都要更新时间
    $insert->bindParam(":Priorities",$_POST["priorities"]);
    try{
        $insert->execute();
        sendemail("wei.liu@zendure.com","roger@zendure.com","Issue_id:".$connect->lastInsertId(),$_POST["issue_brief"]);
        $connect=null;
        $data['result']="5";//值 5 上传文件和数据 成功
        $json=json_encode($data);
        echo $json;
        exit;
    }catch (PDOException $e){
       /* echo $e;
        echo " <script language='javascript'type = 'text/javascript'> ";
        echo"alert('System error');";
        echo " window.location.href = 'index.php' ";
        echo " </script> ";
        exit;*/
        $data['result']="6";//值 6 上传数据 失败
        $json=json_encode($data);
        echo $json;
        exit;
    }


}else{
    $mysql=new Mysql();
    $connect=$mysql->connect_sqldbo($dsn,$username_sql,$password);
    $insert=$connect->prepare("INSERT INTO Issue(Product_name,Product_type,Customer_name,Customer_contact,Region,Raised_date,Issue_brief,Issue_detail_description,Attachment_id,Submitter_email,Datetime,Priorities)VALUE (:Product_name,:Product_type,:Customer_name,:Customer_contact,:Region,:Raised_date,:Issue_brief,:Issue_detail_description,:Attachment_id,:Submitter_email,:Datetime,:Priorities)");
    $insert->bindParam(":Product_name",$_POST["product_name"]);
    $insert->bindParam(":Product_type",$_POST["product_type"]);
    $insert->bindParam(":Customer_name",$_POST["customer_name"]);
    $insert->bindParam(":Customer_contact",$_POST["customer_contact"]);
    $insert->bindParam(":Region",$_POST["region"]);
    $raised_date=date('y-m-d h:i:s',time());
    $insert->bindParam(":Raised_date",$raised_date);//提交时间
    $insert->bindParam(":Issue_brief",$_POST["issue_brief"]);
    $insert->bindParam(":Issue_detail_description",$_POST["issue_detail_description"]);
    $newPath=null;
    $insert->bindParam(":Attachment_id",$newPath);
    $insert->bindParam(":Submitter_email",$submitter);
    $insert->bindParam(":Datetime",$raised_date);//time 每次修改都要更新时间
    $insert->bindParam(":Priorities",$_POST["priorities"]);
    try{
        $insert->execute();
        sendemail("wei.liu@zendure.com","roger@zendure.com","Issue_id:".$connect->lastInsertId(),$_POST["issue_brief"]);
        $connect=null;
        /*echo " <script language='javascript'type = 'text/javascript'> ";
        echo"alert('Submitted successfully');";
        echo " window.location.href = 'homepage.html' ";
        echo " </script> ";
        exit;*/
        $data['result']="8";//值 8 上传数据 成功

        $json=json_encode($data);
        echo $json;
        exit;
    }catch (PDOException $e){
        /*echo $e;
        echo " <script language='javascript'type = 'text/javascript'> ";
        echo"alert('System error');";
        echo " window.location.href = 'index.php' ";
        echo " </script> ";
        exit;*/

        $data['result']="7";//值 7 上传数据 失败
        $json=json_encode($data);
        echo $json;
        exit;
    }
}


?>

