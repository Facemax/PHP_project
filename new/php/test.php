
<?php
/*}


/*$date=date("h:m:s",time());//得到当前时间,如;20070705163148
echo $date ;
echo time();*/
require_once __DIR__ . '/Mysql.php';
session_start();

    $dsn      = 'mysql:dbname=zenduredb;host=romi20171228.cltledcaqxbk.us-east-1.rds.amazonaws.com';
    $username = 'romi';
    $password = '12345678';
    $mysql=new Mysql();
    $connect=$mysql->connect_sqldbo($dsn,$username,$password);
    $all=$connect->prepare("SELECT * FROM Issue");
    $check=$connect->prepare("SELECT * FROM Issue WHERE Issue_id=:id");
    $id="201800005";
$check->bindParam(':id',$id);
    try{
        $all->execute();
        $check->execute();
        $connect=null;
        $result=$all->fetchAll(PDO::FETCH_ASSOC);
        $results=$check->fetch(PDO::FETCH_ASSOC);
            $q=$results["Editor_email"];
        $s_e=$results["Submitter_email"];
        $a_e=$results["Analyst_email"];

        echo "s-e:".$s_e;
        echo "<br>q:".$q;
        echo "<br>s-e:".json_encode($results);
       // echo "e-e:".$results["Editor_email"];
       // echo "a-e:".$results["Analyst_email"];
       /* if(empty($result)){
            $result="";
            echo json_encode($result);
        }else{
            echo json_encode($result);
        }*/


    }catch(PDOException $e){
        echo $e;
        exit;
    }
/*require 'class.phpmailer.php';

$mail = new PHPMailer(true); //建立邮件发送类
$mail->CharSet = "UTF-8";//设置信息的编码类型
$mail->IsSMTP(); // 使用SMTP方式发送
$mail->Host ="box6502.bluehost.com"; //使用163邮箱服务器
$mail->SMTPAuth = true; // 启用SMTP验证功能
$mail->Username ="issue_tracking_sys@zendure.com"; //你的163服务器邮箱账号
$mail->Password ="Issue_2017!"; // 163邮箱密码
$mail->Port = 465;//邮箱服务器端口号
$mail->From = "issue_tracking_sys@zendure.com"; //邮件发送者email地址
$mail->FromName = "测试邮件-issue";//发件人名称
$mail->AddAddress("wei.liu@zendure.com"); //收件人地址，可以替换成任何想要接收邮件的email信箱,格式是AddAddress("收件人email","收件人姓名")
//$mail->AddCC("wei.liu@zendure.com");
$mail->AddCC("492664938@qq.com");
//$mail->AddAttachment("D:abc.txt"); // 添加附件(注意：路径不能有中文)
$mail->IsHTML(true);//是否使用HTML格式
$mail->Subject = "测试测试"; //邮件标题
$mail->Body = "新年快乐"; //邮件内容，上面设置HTML，则可以是HTML
if (!$mail->Send()) {

    echo "error: " . $mail->ErrorInfo;
    exit;
}else{
    echo "success ";
    exit;
}*/
require_once 'email.php';
if(sendemail("wei.liu@zendure.com","dev@zendure.com","test","test-body")){
    echo"true";
}else{
    echo"false";
}
?>

<?php
/*$file=fopen('./upload/liu1520583079.zip',"r");
header("Content-Type: application/octet-stream");
header("Accept-Ranges: bytes");
header("Accept-Length: ".filesize('./upload/liu1520583079.zip'));
header("Content-Disposition: attachment; filename=liu1520583079.zip");
echo fread($file,filesize('./upload/liu1520583079.zip'));
fclose($file);*/
// './upload/liu1520583079.zip' 路径
/*require_once __DIR__ . '/download.php';

$path=$_POST["path"];
$name=$_POST["name"];
dowload($path,$name);*/





?>