<?php
error_reporting(0);
header('Access-Control-Allow-Origin: http://localhost:1988');
header('Access-Control-Allow-Methods: GET, POST');

$url = "";
if ($_GET['mobile'] == "true") $url = "https://lion777.apple855.com/HomeSmart.aspx?lang=EN-GB";
else $url = "https://lion777.apple855.com/Default8.aspx?lang=EN-GB";

$ckfile = tempnam(__DIR__ . "/tmp", "CURLCOOKIE");
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_COOKIEJAR, $ckfile);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$html = curl_exec($ch);

$ufabet = [];

$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
if ($httpcode == 200) {

    $viewstate = explode('id="__VIEWSTATE" value="', $html);
    $viewstate = explode('"', $viewstate[1]);
    $viewstate = $viewstate[0];

    $eventvalidation = explode('id="__EVENTVALIDATION" value="', $html);
    $eventvalidation = explode('"', $eventvalidation[1]);
    $eventvalidation = $eventvalidation[0];

    $viewstategeneration = explode('id="__VIEWSTATEGENERATOR" value="', $html);
    $viewstategeneration = explode('"', $viewstategeneration[1]);
    $viewstategeneration = $viewstategeneration[0];

    $sesid = explode('_SessionId', file_get_contents($ckfile));
    // $sesid = explode("\n", $sesid[1]);
    $sesid = trim($sesid[0]);


    $ufabet = [
        "VIEWSTATE" => $viewstate,
        "EVENTVALIDATION" => $eventvalidation,
        "VIEWSTATEGENERATOR" => $viewstategeneration,
        "SESSION_ID" => $sesid,
        "URL_LOGIN" => $url,
        "isMobile" => $_GET['mobile']
    ];
}

curl_close($ch);
exec('rm -f ' . __DIR__ . "/tmp/*.*");

header("Content-Type: application/json; charset=UTF-8");
echo json_encode($ufabet);
