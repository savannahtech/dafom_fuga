#include <WiFi.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>


const char* ssid = "Daffy Duck";
const char* password = "";
const char* server = "134.209.228.132";
const int serverPort = 5000;
const char* route = "/farmoperations/my-route";
const int waterPumpRelay = 5;
const int airPumpRelay = 15;

String waterpumpStatus = "off";
String airPump = "off";

WebSocketsClient webSocket;

void setup() {
  Serial.begin(9600);
  pinMode(waterPumpRelay, OUTPUT);
  pinMode(airPumpRelay, OUTPUT);
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Connect to WebSocket server
  char url[100];
  sprintf(url, "ws://%s:%d%s", server, serverPort, route);
  const char *const url_c = url;
  webSocket.begin(server, serverPort, url);
  webSocket.onEvent(webSocketEvent);
  webSocket.loop();
}

void loop() {
  // webSocket.loop();
   webSocket.loop();
  // send data as JSON
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["air_pump_status"] = airPump;
  jsonDoc["water_pump_status"] = waterpumpStatus;

  // jsonDoc["pump_status"] = waterpumpStatus;
  // jsonDoc["pump_wattage"] = 40;
  // jsonDoc["pressure"] = 150;
  String jsonString;
  serializeJson(jsonDoc, jsonString);
  webSocket.sendTXT(jsonString);
}

void switchOnPumpOne() {
  // Switch on the pump
  digitalWrite(waterPumpRelay, HIGH);
  waterpumpStatus= "on";
  Serial.println("Pump turned on");

  // send data as JSON
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["pump_status"] = "::::: switched on ::::";
  String jsonString;
  serializeJson(jsonDoc, jsonString);
  webSocket.sendTXT(jsonString);
}

void switchOffPumpOne() {
  // Switch on the pump
  digitalWrite(waterPumpRelay, LOW);
  waterpumpStatus= "off";
  Serial.println("Pump turned off");

  // send data as JSON
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["pump_status"] = "::::: switched off ::::";
  String jsonString;
  serializeJson(jsonDoc, jsonString);
  webSocket.sendTXT(jsonString);
}

void switchOffPumpTwo() {
  // Switch on the pump
  digitalWrite(airPumpRelay, LOW);
  airPump= "off";
  Serial.println("Pump 2 turned off");

  // send data as JSON
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["pump_status"] = "::::: Pump 2 switched off ::::";
  String jsonString;
  serializeJson(jsonDoc, jsonString);
  webSocket.sendTXT(jsonString);
}

void switchOnPumpTwo() {
  // Switch on the pump
  digitalWrite(airPumpRelay, HIGH);
  airPump= "on";
  Serial.println("Pump 2 turned on");

  // send data as JSON
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["pump_status"] = "::::: switched on ::::";
  String jsonString;
  serializeJson(jsonDoc, jsonString);
  webSocket.sendTXT(jsonString);
}

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  switch(type) {
    case WStype_DISCONNECTED:
      Serial.println("Disconnected from WebSocket server");
      break;
    case WStype_CONNECTED:
      Serial.println("Connected to WebSocket server");
      break;

    case WStype_TEXT: {
      // Received a message from the server
      char message[length + 1];
      memcpy(message, payload, length);
      message[length] = '\0';
      if (strcmp(message, "pumpOneOn") == 0) {
        switchOnPumpOne();
      }
      else if (strcmp(message, "pumpOneOff") == 0) {
      switchOffPumpOne();
      }
      else if (strcmp(message, "pumpsOff") == 0) {
      switchOffPumpOne();
      switchOffPumpTwo();
      }
      else if (strcmp(message, "pumpTwoOn") == 0) {
      switchOnPumpTwo();
      }
      else if (strcmp(message, "pumpTwoOff") == 0) {
      switchOffPumpTwo();
      }
      break;
    }
    // case WStype_TEXT:
    //   String message = String((char *)payload);
    //   Serial.println(message);
    //   if (message == "pumpOn") {
    //     // Switch on the pump
    //     digitalWrite(waterPumpRelay, HIGH);
        
    //     waterpumpStatus= "on";
    //   }
    //   else if (message == "pumpOff") {
    //     // Switch off the pump
    //     digitalWrite(waterPumpRelay, LOW);
    //     waterpumpStatus= "off";
    //   }
    //   StaticJsonDocument<200> jsonDoc;
    //   jsonDoc["pump_status"] = waterpumpStatus;
    //   String jsonString;
    //   serializeJson(jsonDoc, jsonString);
    //   webSocket.sendTXT(jsonString);
      // StaticJsonDocument<200> doc;
      // deserializeJson(doc, payload);
      // const char* status = doc["status"];
      // if (strcmp(status, "lightOn") == 0) {
      //   // Do something with the received status (e.g. update a variable, send a message to another device, etc.)
      //   switchOnBulb();

      //   Serial.println("Light is on");
      // }
      break;
    // case WStype_BIN:
    //   Serial.printf("Received binary message of length %u\n", length);
    //   break;
  }
}

// void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
//   switch(type) {
//     case WStype_DISCONNECTED:
//       Serial.println("Disconnected from WebSocket server");
//       break;
//     case WStype_CONNECTED:
//       Serial.println("Connected to WebSocket server");
//       break;
//     case WStype_TEXT:
//       Serial.printf("Received text message: %s\n", payload);
//       if (strcmp((const char *)payload, "onLight") == 0) {
//         switchOnBulb();
//       }
//       break;
//     case WStype_BIN:
//       Serial.printf("Received binary message of length %u\n", length);
//       break;
//   }
// }