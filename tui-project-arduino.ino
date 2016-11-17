/*
  State change detection (edge detection)

 Often, you don't need to know the state of a digital input all the time,
 but you just need to know when the input changes from one state to another.
 For example, you want to know when a button goes from OFF to ON.  This is called
 state change detection, or edge detection.

 This example shows how to detect when a button or button changes from off to on
 and on to off.

 The circuit:
 * pushbutton attached to pin 2 from +5V
 * 10K resistor attached to pin 2 from ground
 * LED attached from pin 13 to ground (or use the built-in LED on
   most Arduino boards)

 created  27 Sep 2005
 modified 30 Aug 2011
 by Tom Igoe

This example code is in the public domain.

 http://www.arduino.cc/en/Tutorial/ButtonStateChange

 */

// pin assignments
const int LDR = 0;

// this constant won't change:
const int  buttonPin_one = 2;    // the pin that the pushbutton is attached to
const int  buttonPin_two = 3;
const int ledPin = 13;       // the pin that the LED is attached to

// Variables will change:
int buttonOnePushCounter = 0;   // counter for the number of button presses
int buttonOneState = 0;         // current state of the button
int lastButtonOneState = 0;     // previous state of the button

int buttonTwoPushCounter = 0;   // counter for the number of button presses
int buttonTwoState = 0;         // current state of the button
int lastButtonTwoState = 0;     // previous state of the button

long previousMillis = 0;

long interval = 5000;


void setup() {
  // initialize the buttbon pin as a input:
  pinMode(buttonPin_one, INPUT);
  pinMode(buttonPin_two, INPUT);
  // initialize the LED as an output:
  pinMode(ledPin, OUTPUT);

  pinMode(LDR, INPUT);
  
  Serial.begin(9600);
 
}


void loop() {

  unsigned long currentMillis = millis();

  if(currentMillis - previousMillis > interval) { 
    previousMillis = currentMillis;
    // read the photoresister 
    int v = analogRead(LDR);
    Serial.print("voltage from photo resistor:    ");
    Serial.println(v); 
  }
  
  // read the pushbutton input pin:
  buttonOneState = digitalRead(buttonPin_one);
  buttonTwoState = digitalRead(buttonPin_two);

  // compare the buttonState to its previous state
  if (buttonOneState != lastButtonOneState) {
    // if the state has changed, increment the counter
    if (buttonOneState == HIGH) {
      // if the current state is HIGH then the button
      // wend from off to on:
      buttonOnePushCounter++;
      Serial.println("button one on");
      Serial.print("number of button one pushes:  ");
      Serial.println(buttonOnePushCounter);
    } else {
      // if the current state is LOW then the button
      // wend from on to off:
      Serial.println("button one off");
    }
    // Delay a little bit to avoid bouncing
    delay(50);
  }


  // compare the buttonState to its previous state
  if (buttonTwoState != lastButtonTwoState) {
    // if the state has changed, increment the counter
    if (buttonTwoState == HIGH) {
      // if the current state is HIGH then the button
      // wend from off to on:
      buttonTwoPushCounter++;
      Serial.println("button two on");
      Serial.print("number of button two pushes:  ");
      Serial.println(buttonTwoPushCounter);
    } else {
      // if the current state is LOW then the button
      // wend from on to off:
      Serial.println("button two off");
    }
    // Delay a little bit to avoid bouncing
    delay(50);
  }
  
  // save the current state as the last state,
  //for next time through the loop
  lastButtonOneState = buttonOneState;
  lastButtonTwoState = buttonTwoState;


  // turns on the LED every four button pushes by
  // checking the modulo of the button push counter.
  // the modulo function gives you the remainder of
  // the division of two numbers:
  if (buttonOnePushCounter % 4 == 0) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }

}

