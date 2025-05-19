#include <SoftwareSerial.h>
#include <Wire.h>
#include <MAX30100_PulseOximeter.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// Pin definitions
#define GSM_RX 2
#define GSM_TX 3
#define TEMP_SENSOR_PIN 4
#define EMG_SENSOR_PIN A0

// Initialize objects
SoftwareSerial gsmSerial(GSM_RX, GSM_TX);
PulseOximeter pox;
OneWire oneWire(TEMP_SENSOR_PIN);
DallasTemperature tempSensors(&oneWire);

// Constants
const char* PATIENT_ID = "YOUR_PATIENT_ID";  // Replace with actual patient ID
const char* SERVER_URL = "YOUR_SUPABASE_URL"; // Replace with your Supabase URL
const char* API_KEY = "YOUR_SUPABASE_ANON_KEY"; // Replace with your Supabase anon key

// Variables
float heartRate = 0;
float bodyTemp = 0;
float muscleActivity = 0;
unsigned long lastReadingTime = 0;
const unsigned long READ_INTERVAL = 5000; // Read every 5 seconds

void setup() {
  Serial.begin(9600);
  gsmSerial.begin(9600);
  
  // Initialize sensors
  if (!pox.begin()) {
    Serial.println("MAX30100 initialization failed!");
    while(1);
  }
  tempSensors.begin();
  
  // Initialize GSM
  initGSM();
  
  Serial.println("System initialized!");
}

void loop() {
  unsigned long currentTime = millis();
  
  if (currentTime - lastReadingTime >= READ_INTERVAL) {
    // Read sensors
    pox.update();
    heartRate = pox.getHeartRate();
    
    tempSensors.requestTemperatures();
    bodyTemp = tempSensors.getTempCByIndex(0);
    
    // Read EMG sensor (muscle activity)
    muscleActivity = readEMG();
    
    // Send data if readings are valid
    if (heartRate > 0 && bodyTemp > 0) {
      sendData();
    }
    
    lastReadingTime = currentTime;
  }
  
  // Keep the pulse oximeter running
  pox.update();
}

float readEMG() {
  // Read EMG sensor multiple times and average
  float total = 0;
  for(int i = 0; i < 10; i++) {
    total += analogRead(EMG_SENSOR_PIN);
    delay(10);
  }
  return total / 10.0;
}

void initGSM() {
  // Wait for GSM module to respond
  delay(2000);
  gsmSerial.println("AT");
  delay(1000);
  
  // Configure GPRS settings
  gsmSerial.println("AT+SAPBR=3,1,\"Contype\",\"GPRS\"");
  delay(1000);
  gsmSerial.println("AT+SAPBR=3,1,\"APN\",\"internet\""); // Replace with your carrier's APN
  delay(1000);
  gsmSerial.println("AT+SAPBR=1,1");
  delay(2000);
}

void sendData() {
  String data = "{";
  data += "\"patient_id\":\"" + String(PATIENT_ID) + "\",";
  data += "\"heart_rate\":" + String(heartRate) + ",";
  data += "\"body_temperature\":" + String(bodyTemp) + ",";
  data += "\"muscle_activity\":" + String(muscleActivity);
  data += "}";
  
  // Start HTTP request
  gsmSerial.println("AT+HTTPINIT");
  delay(1000);
  gsmSerial.println("AT+HTTPPARA=\"CID\",1");
  delay(1000);
  gsmSerial.println("AT+HTTPPARA=\"URL\"," + String(SERVER_URL));
  delay(1000);
  gsmSerial.println("AT+HTTPPARA=\"CONTENT\",\"application/json\"");
  delay(1000);
  gsmSerial.println("AT+HTTPPARA=\"Authorization\",\"Bearer " + String(API_KEY) + "\"");
  delay(1000);
  
  // Send data
  gsmSerial.println("AT+HTTPDATA=" + String(data.length()) + ",10000");
  delay(1000);
  gsmSerial.println(data);
  delay(1000);
  
  // Execute request
  gsmSerial.println("AT+HTTPACTION=1"); // POST request
  delay(5000);
  
  // End HTTP session
  gsmSerial.println("AT+HTTPTERM");
  delay(1000);
  
  Serial.println("Data sent: " + data);
}