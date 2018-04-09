<?php
/**
 * Created by PhpStorm.
 * User: Liu
 * Date: 2018/4/3
 * Time: 10:18
 */
require 'class.phpmailer.php';
function sendemail($recipient,$Cc,$subject,$body){
    $mail = new PHPMailer(true); //建立邮件发送类
    $mail->CharSet = "UTF-8";//设置信息的编码类型
    $mail->IsSMTP(); // 使用SMTP方式发送
    $mail->Host ="box6502.bluehost.com"; //使用163邮箱服务器
    $mail->SMTPAuth = true; // 启用SMTP验证功能
    $mail->Username ="issue_tracking_sys@zendure.com"; //你的163服务器邮箱账号
    $mail->Password ="Issue_2017!"; // 163邮箱密码
    $mail->Port = 465;//邮箱服务器端口号
    $mail->From = "issue_tracking_sys@zendure.com"; //邮件发送者email地址
    $mail->FromName = "Issue tracking system";//发件人名称
    $mail->AddAddress($recipient); //收件人地址，可以替换成任何想要接收邮件的email信箱,格式是AddAddress("收件人email","收件人姓名")
    //$mail->AddCC("wei.liu@zendure.com");
    $mail->AddCC($Cc);
    //$mail->AddAttachment("D:abc.txt"); // 添加附件(注意：路径不能有中文)
    $mail->IsHTML(true);//是否使用HTML格式
    $mail->Subject = $subject; //邮件标题
    $mail->Body =$body; //邮件内容，上面设置HTML，则可以是HTML
    if (!$mail->Send()) {
        //echo "error: " . $mail->ErrorInfo;
        return false;
    }else{
        //echo "success ";
        return true;
    }
}