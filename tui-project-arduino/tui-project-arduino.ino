/* 
 *  Sentire
 *  Allow for reading of 3 arbitary analog sensors + 4 arbitrary digital inputs (buttons)
 *  Use the on board LED as a second button click indicator
 */


// analog sensor pins -- these are read every minute (or whatever)
const int a_1 = 1
const int a_2 = 2
const int a_3 = 3

// digital sensor pins
const int d_1 = 1
const int d_2 = 2
const int d_3 = 3
const int d_4 = 4

const int ledPin = 13;       // the pin that the LED is attached to

// Variables will change:
int d_1_state = 0;         // current state of the button
int last_d_1_state = 0;     // previous state of the button

int d_2_state = 0;         // current state of the button
int last_d_2_state = 0;     // previous state of the button

int d_3_state = 0;         // current state of the button
int last_d_3_state = 0;     // previous state of the button

int d_4_state = 0;         // current state of the button
int last_d_4_state = 0;     // previous state of the button


// Analog read interval stuff
long previousMillis = 0;
long interval = 500;


void setup() {
  
  pinMode(a_1, INPUT);
  pinMode(a_2, INPUT);
  pinMode(a_3, INPUT);
  
  pinMode(d_1, INPUT);
  pinMode(d_2, INPUT);
  pinMode(d_3, INPUT);
  pinMode(d_4, INPUT);
  
  // initialize the LED as an output:
  pinMode(ledPin, OUTPUT);
  
  Serial.begin(9600);
}

void loop() {

  unsigned long currentMillis = millis();
  float out_1, out_2, out_3; // used for analog output

  // read the analog pins if it's been an appropriate amount of time
  if(currentMillis - previousMillis > interval) { 
    previousMillis = currentMillis;
    
    // read all the analog pins 
    int out_1 = analogRead(a_1);
    int out_2 = analogRead(a_2);
    int out_3 = analogRead(a_3);

    Serial.print("a_1 ");
    Serial.println(out_1); 

    Serial.print("a_2 ");
    Serial.println(out_2);
    
    Serial.print("a_3 ");
    Serial.println(out_3);
     
  }

  // be ready to read the digital input (buttons) always --- 
  
  d_1_state = digitalRead(d_1);
  d_2_state = digitalRead(d_2);
  d_3_state = digitalRead(d_3);
  d_4_state = digitalRead(d_4);

  // compare the current state to its previous state
  if (d_1_state != last_d_1_state) {
    if (d_1_state == HIGH) {
      // if the current state is HIGH then the button went from off to on
      Serial.println("d_1 on");
      digitalWrite(ledPin, HIGH); // indicate with on board LED
    }

    delay(50); // Delay a little bit to avoid bouncing
  }

  // compare the current state to its previous state
  if (d_2_state != last_d_2_state) {
    if (d_2_state == HIGH) {
      // if the current state is HIGH then the button went from off to on
      Serial.println("d_2 on");
      digitalWrite(ledPin, HIGH); // indicate with on board LED
    }

    delay(50); // Delay a little bit to avoid bouncing
  }

  // compare the current state to its previous state
  if (d_3_state != last_d_3_state) {
    if (d_3_state == HIGH) {
      // if the current state is HIGH then the button went from off to on
      Serial.println("d_3 on");
      digitalWrite(ledPin, HIGH); // indicate with on board LED
    }
    
    delay(50); // Delay a little bit to avoid bouncing
  }

  // compare the current state to its previous state
  if (d_4_state != last_d_4_state) {
    if (d_4_state == HIGH) {
      // if the current state is HIGH then the button went from off to on
      Serial.println("d_4 on");
      digitalWrite(ledPin, HIGH); // indicate with on board LED
    }

    delay(50); // Delay a little bit to avoid bouncing
  }

  // save the current state as the last state, for next time through the loop
  last_d_1_state = d_1_state;
  last_d_3_state = d_2_state;
  last_d_3_state = d_3_state;
  last_d_4_state = d_4_state;
}
