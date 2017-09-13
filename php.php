<?php
    header('Content-type:text/html;charset=utf-8');
    $arr=array('EGHP','ESDA','DFDJ','DFDF','OPPJ');
    $index=array_rand($arr);
    echo $arr[$index];
    sleep(3);
?>
