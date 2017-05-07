#include <SoftwareSerial.h>
const int ledPin = 13;
const int buzzerPin = 12;
const int ldrPin = A0;
SoftwareSerial Serial1(10, 11); // RX, TX
int led=13;
int cs = 0;
int ps = 0;
void setup() {
  Serial.begin(9600);
Serial1.begin(115200);
pinMode(ledPin, OUTPUT);
pinMode(buzzerPin, OUTPUT);
pinMode(ldrPin, INPUT);
delay(100);
connectWiFi();
  // Open serial communications and wait for port to open:
  
}

void printResponse() {
  while (Serial1.available()) {
    Serial.println(Serial1.readStringUntil('\n')); 
  }
}

void loop() { // run over and over
 
int ldrStatus = analogRead(ldrPin);

if(ldrStatus >= 400)
{
  cs = 1;
 tone(buzzerPin, 100);
 digitalWrite(ledPin, HIGH);
 delay(100);

 noTone(buzzerPin);
 digitalWrite(ledPin, LOW);
 delay(100);


if(cs == ps){
 
}else{
  Serial.print("hi");
  sendnotification();
 ps = 1;
  }

 Serial.println("----------ALARM ACTIVATED----------");
}

else
{ 
 noTone(buzzerPin);
 digitalWrite(ledPin, LOW); 

 Serial.println("---ALARM DEACTIVATED---");
cs = 0;
ps = 0;
}


 
  

}


boolean sendnotification(){
    // TCP connection 
    Serial1.println("AT+CIFSR");
    
    
String cmd = "AT+CIPSTART=4,\"TCP\",\""; 
cmd += "198.74.52.197"; 
// api.thingspeak.com 
cmd += "\",80\r\n\r\n"; 

Serial1.println(cmd);

delay(200);

if(Serial1.find("ERROR")
)
{ 
Serial.println("AT+CIPSTART error"); 
return false; 
}

// prepare GET string 

String getStr = "GET /~guitarme/notification/sendpushnotification.php\r\n\r\n";

// send data length 

cmd = "AT+CIPSEND=4,54"; 
//cmd += String(getStr.length());

Serial1.println(cmd); 
Serial1.println(getStr);

delay(10);
/*
if(Serial1.find(">"))
{
 Serial.println("Request Sent"); 
Serial1.print(getStr);
 }
 else
{ 
Serial1.println("AT+CIPCLOSE"); 
// alert user 
Serial.println("Closing Connection");
 } 
*/
  }




boolean connectWiFi()
{
Serial1.println("AT+CWMODE=3");
delay(100);

delay(100);

  String cmd="AT+CWJAP=\"";
  cmd+="Bottle";
  cmd+="\",\"";
  cmd+="bottle11";
  cmd+="\"";
  Serial.println(cmd);

  Serial1.println(cmd);
  Serial1.println("AT+CIPMUX=1");
  delay(15000);
  Serial1.print("AT+CWJAP?");
  if(Serial1.find("+CWJAP"))
  {
    Serial.println("ok connected to wifi");
    return true;
}
else
{
  Serial.println("can not connect to wifi.");
  return false;
}
}
