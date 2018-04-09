<?php

/**
 * Created by PhpStorm.
 * User: Liu
 * Date: 2018/3/8
 * Time: 11:23
 */
class Users
{
   var $ID;
   var $USERNAME;
   var $PASSWORD;
   var $EMAIL;

    public function getEMAIL()
    {
        return $this->EMAIL;
    }

    public function getID()
    {
        return $this->ID;
    }

    public function getPASSWORD()
    {
        return $this->PASSWORD;
    }

    public function getUSERNAME()
    {
        return $this->USERNAME;
    }

    public function setEMAIL($EMAIL)
    {
        $this->EMAIL = $EMAIL;
    }

    public function setID($ID)
    {
        $this->ID = $ID;
    }

    public function setPASSWORD($PASSWORD)
    {
        $this->PASSWORD = $PASSWORD;
    }

    public function setUSERNAME($USERNAME)
    {
        $this->USERNAME = $USERNAME;
    }
}