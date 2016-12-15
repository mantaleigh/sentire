# sentire
TUI Fall 2016

## About

Sentire means "to feel" in Latin and is the name of a product currently in the stages of design for our Tangible User Interfaces class at Wellesley College. As a team of three students, we are creating a wearable mood and related environmental factor tracking bracelet using Arduino.

The intended user groups are busy people wanting to keep track of their mood, day to day events, and environmental factors; museum or conference goers who want to collect reaction and participation data; and caretakers of children on the autism spectrum who need to collect data to determine factors related to mood and function.

## Basic overview

This project includes a Flask web app, Arduino code that formats the output from the bracelet into what the app's endpoints can handle, and a python script that reads sensor data from a serial port and posts it to one of the Flask's endpoints.

## How to run

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
