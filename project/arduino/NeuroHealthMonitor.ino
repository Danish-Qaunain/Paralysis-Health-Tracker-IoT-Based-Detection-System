#include <OneWire.h>
#include <DallasTemperature.h>
#include <SoftwareSerial.h>
#include <ArduinoJson.h>
#include <DFRobotDFPlayerMini.h>

// Pin Definitions
#define TEMP_SENSOR_PIN 2
#define FLEX_SENSOR_1 A0
#define FLEX_SENSOR_2 A1
#define FLEX_SENSOR_3 A2
#define ACCEL_X_PIN A3
#define ACCEL_Y_PIN A4
#define ACCEL_Z_PIN A5
#define ECG_LO_PLUS 10
#define ECG_LO_MINUS 11
#define ECG_OUTPUT A6

// GSM Module
SoftwareSerial gsmSerial(7, 8); // RX, TX
// DFPlayer Mini
SoftwareSerial dfSerial(5, 6); // RX, TX
DFRobotDFPlayerMini dfPlayer;

// Temperature sensor setup
OneWire oneWire(TEMP_SENSOR_PIN);
DallasTemperature tempSensor(&oneWire);

// Threshold values
const float TEMP_THRESHOLD = 38.5;
const int FLEX_THRESHOLD = 500;
const float FALL_THRESHOLD = 2.0;
const int HEART_RATE_LOW = 50;
const int HEART_RATE_HIGH = 120;

// Variables for fall detection
float lastX, lastY, lastZ;
bool fallDetected = false;

void setup() {
  Serial.begin(115200);
  gsmSerial.begin(9600);
  dfSerial.begin(9600);
  
  // Initialize sensors
  tempSensor.begin();
  
  // Initialize DFPlayer
  if (!dfPlayer.begin(dfSerial)) {
    Serial.println("DFPlayer Mini failed!");
  }
  dfPlayer.volume(20);
  
  // Initialize GSM
  initGSM();
}

void loop() {
  // Read sensor values
  float temperature = readTemperature();
  int flexValue1 = analogRead(FLEX_SENSOR_1);
  int flexValue2 = analogRead(FLEX_SENSOR_2);
  int flexValue3 = analogRead(FLEX_SENSOR_3);
  float accX = readAcceleration(ACCEL_X_PIN);
  float accY = readAcceleration(ACCEL_Y_PIN);
  float accZ = readAcceleration(ACCEL_Z_PIN);
  int heartRate = readECG();

  // Check for fall
  checkFall(accX, accY, accZ);

  // Check flex sensors for gestures
  String request = checkFlexGestures(flexValue1, flexValue2, flexValue3);

  // Create JSON data
  StaticJsonDocument<200> doc;
  doc["temperature"] = temperature;
  doc["heart_rate"] = heartRate;
  doc["flex_request"] = request;
  doc["fall_status"] = fallDetected;

  // Send data via Serial
  String jsonString;
  serializeJson(doc, jsonString);
  Serial.println(jsonString);

  // Check for critical conditions
  if (temperature > TEMP_THRESHOLD || 
      heartRate < HEART_RATE_LOW || 
      heartRate > HEART_RATE_HIGH || 
      fallDetected) {
    sendSMSAlert(temperature, heartRate, fallDetected);
  }

  // Reset fall detection
  fallDetected = false;
  delay(1000);
}

float readTemperature() {
  tempSensor.requestTemperatures();
  return tempSensor.getTempCByIndex(0);
}

float readAcceleration(int pin) {
  int rawValue = analogRead(pin);
  return (rawValue - 512.0) / 102.4; // Convert to g
}

void checkFall(float x, float y, float z) {
  float acceleration = sqrt(x*x + y*y + z*z);
  if (acceleration > FALL_THRESHOLD) {
    fallDetected = true;
    dfPlayer.play(1); // Play fall alert sound
  }
}

String checkFlexGestures(int flex1, int flex2, int flex3) {
  if (flex1 > FLEX_THRESHOLD) {
    dfPlayer.play(2); // Play "Need Water" sound
    return "I need water";
  }
  if (flex2 > FLEX_THRESHOLD) {
    dfPlayer.play(3); // Play "Need Food" sound
    return "I need food";
  }
  if (flex3 > FLEX_THRESHOLD) {
    dfPlayer.play(4); // Play "Need Restroom" sound
    return "I need restroom assistance";
  }
  return "";
}

int readECG() {
  if (digitalRead(ECG_LO_PLUS) || digitalRead(ECG_LO_MINUS)) {
    return 0; // Leads off detection
  }
  // Simple heart rate calculation (would need more sophisticated algorithm in production)
  int ecgValue = analogRead(ECG_OUTPUT);
  // Convert to BPM (simplified)
  return map(ecgValue, 0, 1023, 40, 140);
}

void initGSM() {
  gsmSerial.println("AT");
  delay(1000);
  gsmSerial.println("AT+CMGF=1"); // Set SMS text mode
  delay(1000);
}

void sendSMSAlert(float temp, int heartRate, bool fall) {
  String message = "ALERT: Patient needs attention!\n";
  if (temp > TEMP_THRESHOLD) {
    message += "High temperature: " + String(temp) + "C\n";
  }
  if (heartRate < HEART_RATE_LOW || heartRate > HEART_RATE_HIGH) {
    message += "Abnormal heart rate: " + String(heartRate) + " BPM\n";
  }
  if (fall) {
    message += "Fall detected!\n";
  }
  
  gsmSerial.println("AT+CMGS=\"+1234567890\""); // Replace with caregiver's number
  delay(1000);
  gsmSerial.println(message);
  delay(100);
  gsmSerial.write(26); // End SMS command
}