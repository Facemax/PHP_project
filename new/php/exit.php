<?php
/**
 * Created by PhpStorm.
 * User: Liu
 * Date: 2018/3/16
 * Time: 16:58
 */
session_start();
if(isset($_SESSION['ID']))
{
    unset($_SESSION['ID']);
    session_destroy();
    $data=array();
    $data['result']='success';
    $json=json_encode($data);
    echo $json;
}