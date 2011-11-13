<?php
$address = "http://konrad-kowalski.com/";

$curl = curl_init($address);
curl_setopt($curl, CURLOPT_RETURNTRANSFER , TRUE);
print $pageContent = curl_exec($curl);
curl_close($curl);
?>