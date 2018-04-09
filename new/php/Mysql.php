<?php
ini_set("display_errors", 0);

error_reporting(E_ALL ^ E_NOTICE);

error_reporting(E_ALL ^ E_WARNING);
/**
 * Created by PhpStorm.
 * User: Liu
 * Date: 2018/2/28
 * Time: 11:27
 */
class Mysql
{
    public $sdn;
    public $username;
    public $password;

    function connect_sqldbo($sdn,$username,$password){
        try {
            $connect = new PDO($sdn,$username, $password,array(PDO::ATTR_PERSISTENT => true));
            file_put_contents('./log.txt',"连接数据库成功");
            file_put_contents('./log.txt',date("Y-m-d=H:i:s",intval(time())).PHP_EOL,FILE_APPEND);
            $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);// 设置 PDO 错误模式，用于抛出异常

            return $connect;
        }
        catch(PDOException $e)
        {
            file_put_contents("./log.txt", $e.PHP_EOL);
            file_put_contents('./log.txt',date("Y-m-d=H:i:s",intval(time())),FILE_APPEND);
        }
    }
    function insert_sqluser($connect,$username,$password,$email,$datetime){
        try{
            echo $username;
           $sql = "INSERT INTO users (username,passwords, email, datetime)
            VALUES ($username,$password,$email,$datetime)";
            // 使用 exec() ，没有结果返回
            $connect->exec($sql);
            echo "新记录插入成功";


        }catch (PDOException $e){
            echo $e;
            file_put_contents("./log.txt", $e.PHP_EOL,FILE_APPEND);
            file_put_contents('./log.txt',date("Y-m-d=H:i:s",intval(time())).PHP_EOL,FILE_APPEND);
        }
    }

}