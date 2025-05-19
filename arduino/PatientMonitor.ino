#include <Wire.h> 
#include <LiquidCrystal_I2C.h>
#include <SoftwareSerial.h>
#include <DFRobotDFPlayerMini.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// Pin definitions for ADXL335
const int xPin = A0;
const int yPin = A1;
const int zPin = A2;

// Pin definition for LED
const int ledPin = 13;

// GSM Module Pins
const int gsmTx = 19;
const int gsmRx = 18;
SoftwareSerial gsm(gsmRx, gsmTx);

// DFPlayer Mini Pins
const int dfTx = 10;
const int dfRx = 11;
SoftwareSerial dfPlayerSerial(dfRx, dfTx);
DFRobotDFPlayerMini dfPlayer;

// DS18B20 Temperature Sensor
const int oneWireBus = 4;
OneWire oneWire(oneWireBus);
DallasTemperature sensors(&oneWire);

// Flex Sensor Pins
const int flex1 = A3;
const int flex2 = A4;
const int flex3 = A5;

// AD8232 ECG Module Pins
const int ecgPin = A6;
const int loPlus = 7;
const int loMinus = 8;

// Fall detection threshold
const float fallThreshold = 1.7;

// Initialize LCD
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  pinMode(flex1, INPUT);
  pinMode(flex2, INPUT);
  pinMode(flex3, INPUT);
  pinMode(ecgPin, INPUT);
  pinMode(loPlus, INPUT);
  pinMode(loMinus, INPUT);

  gsm.begin(9600);
  sendSMS("System Initialized: Monitoring Started!");

  digitalWrite(ledPin, LOW);

  lcd.init();
  lcd.backlight();
  displayMainScreen();
  
  dfPlayerSerial.begin(9600);
  if (!dfPlayer.begin(dfPlayerSerial)) {
    Serial.println("DFPlayer Mini not detected!");
  } else {
    dfPlayer.volume(20);
  }

  sensors.begin();
}

void loop() {
  int xValue = analogRead(xPin);
  int yValue = analogRead(yPin);
  int zValue = analogRead(zPin);
  float xVoltage = xValue * (5.0 / 1023.0);
  float yVoltage = yValue * (5.0 / 1023.0);
  float zVoltage = zValue * (5.0 / 1023.0);

  sensors.requestTemperatures();
  float temperature = sensors.getTempCByIndex(0);

  int ecgValue = analogRead(ecgPin);
  int leadOff = digitalRead(loPlus) || digitalRead(loMinus);

  if (leadOff) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("ECG: Lead Off");
  } else {
    displayMainScreen();
  }

  delay(1000);

  int flex1Value = analogRead(flex1);
  int flex2Value = analogRead(flex2);
  int flex3Value = analogRead(flex3);

  Serial.print("Flex1: "); Serial.print(flex1Value);
  Serial.print(" Flex2: "); Serial.print(flex2Value);
  Serial.print(" Flex3: "); Serial.println(flex3Value);

  if (xVoltage < fallThreshold || yVoltage < fallThreshold || zVoltage < fallThreshold) {
    Serial.println("Fall detected! Activating alerts...");
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Fall Detected!");
    for (int i = 0; i < 3; i++) {
      digitalWrite(ledPin, HIGH);
      delay(200);
      digitalWrite(ledPin, LOW);
      delay(200);
    }
    dfPlayer.play(1);
    sendSMS("Fall Detected! Immediate attention required!");
    delay(2000);
    displayMainScreen();
  } else if (temperature > 37.5) {
    Serial.println("High temperature detected!");
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Temp Alert!");
    lcd.setCursor(0, 1);
    lcd.print("T:");
    lcd.print(temperature, 1);
    lcd.print("C");
    delay(2000);
    displayMainScreen();
  }

  if (flex1Value > 500) {
    Serial.println("Request: I need food");
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("I need food");
    dfPlayer.play(2);
    delay(3000);
    displayMainScreen();
  } else if (flex2Value > 500) {
    Serial.println("Request: I need water");
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("I need water");
    dfPlayer.play(5);
    delay(3000);
    displayMainScreen();
  } else if (flex3Value > 500) {
    Serial.println("Request: Go to restroom");
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Go to restroom");
    dfPlayer.play(8);
    delay(3000);
    displayMainScreen();
  }
  delay(1000);
}

void sendSMS(String message) {
  Serial.println("Sending SMS...");
  gsm.println("AT+CMGF=1");
  delay(200);
  gsm.println("AT+CMGS=\"+919708380044\"");
  delay(200);
  gsm.print(message);
  delay(200);
  gsm.write(26);
  delay(100);
  Serial.println("SMS Sent!");
}

void displayMainScreen() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Paralysis Health");
  lcd.setCursor(0, 1);
  lcd.print("Tracker System");
}
