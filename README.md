# sentire
TUI Fall 2016

## About

Sentire means "to feel" in Latin and is the name of a product currently in the stages of design for our Tangible User Interfaces class at Wellesley College. As a team of three students, we are creating a wearable mood and related environmental factor tracking bracelet using Arduino.

The intended user groups are busy people wanting to keep track of their mood, day to day events, and environmental factors; museum or conference goers who want to collect reaction and participation data; and caretakers of children on the autism spectrum who need to collect data to determine factors related to mood and function.

## Basic overview

This project includes a Flask web app, Arduino code that formats the output from the bracelet into what the app's endpoints can handle, and a python script that reads sensor data from a serial port and posts it to one of the Flask's endpoints.

### How are the customizations handled?

There are 2 sections on the bracelet: 
* Active inputs -- buttons
* Passive inputs -- sensors

The active inputs are named d_1 through d_4, with d stanading for digital (these bead spaces are plugged into digital pins on the Arduino).

The passive inputs are named a_1 through a_3, with a standing for analog (these bead spaces are plugged into analog pins on the Arduino).

The customization form puts it on the user to associate the spaces on the bracelet with what beads they have put there (i.e. a_3 might be a temperature sensor). The endpoint that handles inserting the data coming in from the Arduino then uses the currently_tracking dictionary, based on the customization form, to only save data that is currently being tracked.

This way, the user gets maximum customizability. They can remove beads or put them in any order (as long as they stay in the right section) and only have to worry about updating the fields in the customization form. The code handles the rest of the associating.

## How to run

### Dependencies 

* Python 2.7
* Flask 0.10.X

### To run just the web app: 

`$ python app.py `

and visit ` localhost:5000/#graphs ` in your browser. 

### To connect the output from the Arduino to the web app: 

Run the web app as above.

Plug in the Arduino to your computer. 
Compile and upload the Ardiuno code through the Arduino IDE. 

Take note of the serial port that is being used -- usually 1421 or 1411.

Run the data script, making sure that the serial port you're using and the one in the script match.

`$ python read_data.py`

Visit ` localhost:5000 ` in your browser. Reload on the #graphs page only, then come back to the home page to see the posted data. 
