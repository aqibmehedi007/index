<!-- get_ip.php -->
<?php
if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    echo $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    echo $_SERVER['REMOTE_ADDR'];
}
?>