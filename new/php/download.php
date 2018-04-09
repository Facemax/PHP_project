
<?php
/**
 * Created by PhpStorm.
 * User: Liu
 * Date: 2018/3/9
 * Time: 16:32
 */
session_start();
if(empty($_SESSION["Username"])){
    echo 'error';
    exit;
}else{
    $name=$_POST['Attachment'];
    $path="upload/".$name;
    dowload($path,$name);
}




function dowload($path,$name){
    $file=fopen($path,"r");
    header("Content-Type: application/octet-stream");
    header("Accept-Ranges: bytes");
    header("Accept-Length: ".filesize($path));
    header("Content-Disposition: attachment; filename=".$name);
    echo fread($file,filesize($path));
    fclose($file);
}

?>