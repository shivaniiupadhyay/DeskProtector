<?php
//generic php function to send GCM push notification
require "sendEmail.php";


function sendPushNotificationToGCM($registatoin_ids, $number) {
    //Google cloud messaging GCM-API url
    $url = 'https://android.googleapis.com/gcm/send';
    class Car {
     function Car($number) {
     $result['number'] = $number;
         $this->message = "WARNING!!! Some one just opned your desk!!!! Please check.";
         $this->title = "Desk Protector";
         $this->num = $number;
         $this->info = "super secret info";
     }
}
    
    $fields['registration_ids'] = $registatoin_ids;
    $fields['data'] = new Car($number);
   /* $fields = array(
        'registration_ids' => $registatoin_ids,
        'data' => $message,
    );*/
    // Google Cloud Messaging GCM API Key
    define("GOOGLE_API_KEY", "AIzaSyDw81J5X6EGTDydhdYcrEHaejpYoQcDXYg");       
    $headers = array(
        'Authorization: key=' . GOOGLE_API_KEY,
        'Content-Type: application/json'
    );
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
    $result = curl_exec($ch);             
    if ($result === FALSE) {
        die('Curl failed: ' . curl_error($ch));
    }
    curl_close($ch);
    return $result;
}
?>
<?php
//this block is to post message to GCM on-click



include "config.php";

              // $data = file_get_contents("php://input");
               
                //$dataObj = json_decode($data);
	        //$myNum = $dataObj->myNum;
		//$number = $dataObj->num;
			$number ="8058742471";
		
		
		if($myNum == "" && $number == "") exit;
		
		$result = array();
		
		
		$sel = mysql_query("SELECT * FROM gcmRegId where number=$number");
                  $row = mysql_fetch_array($sel);
                  $gcmRegID = $row['regId'];
		
	$result['gcmid'] = $gcmRegID;
	$result['number'] = 'hey';
	

$gcmRegIds = array($gcmRegID);
       

        $pushStatus = sendPushNotificationToGCM($gcmRegIds, $myNum);
        $toEmail = "shivani.upadhyay@spsu.ac.in";
        $toName = "Shivani";
        $subject = "WARNING!!! somebody opened your desk";
        $body = "Hello Shivani, <br />
        Somebody has opened your desk. Please check who was it.
        <br /><br /><br />
        Cheers,<br />
        DeskProtector Angels.
        
        ";
        $sendEmail = callToEmailFunction($toEmail, $toName, $subject, $body);
        
        
        $result['status'] = $pushStatus;
        	echo json_encode($result);
?>