<?php
/**
 * Created by PhpStorm.
 * User: Liu
 * Date: 2018/3/15
 * Time: 15:58
 */
session_start();
if(empty($_SESSION['ID']) || empty($_SESSION["Username"])){
    $data=array();
    $data['id']='';
    $data['username']='';
    $json=json_encode($data);
    echo $json;


}else{
    $data=array();
    $data['id']=$_SESSION['ID'];
    $data['username']=$_SESSION["Username"];
    $data['power']=$_SESSION["Power"];
    $json=json_encode($data);
    echo $json;
}

