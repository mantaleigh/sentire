from flask import Flask, request, jsonify, render_template
import os, datetime

app = Flask(__name__)

# initialize data dict
data = {
    "light_data": {
        "values": [],
        "timestamps": []
    },
    "temp_data": {
        "values": [],
        "timestamps": []
    },
    "button_1_data": { # value here is number of presses
        "value": 0,
        "timestamps": [] # list of timestamps of all button presses
    },
    "button_2_data": { # value here is number of presses 
        "value": 0,
        "timestamps": [] # list of timestamps of all button presses
    }
}

@app.route('/')
def home():
 #   return "The current temperature in F is: " + str(curr_light) + " and was updated at: " + str(time_changed)
 return render_template("index.html")
 # return str(data) # temporary

@app.route('/get_data', methods=["GET"])
def get_data():
    global data
    return jsonify(values=data)

@app.route('/incoming_data', methods=['GET', 'POST'])
def incoming_data():
    global data # lol gross
    if request.method == 'POST' and '_data' in request.form.keys()[0]: # only do things if it's a request from the serial port of the arduino

        key = request.form.keys()[0]
        if "button" in key:
            data[key]["value"] += 1
        elif "temp" in key:
            data[key]["values"] += [float(request.form[key])]
        else:
            data[key]["values"] += [int(request.form[key])]
        
        data[key]["timestamps"] += [datetime.datetime.now()]
        
        return jsonify(request.form) # echo the received info back

if __name__ == '__main__':
    app.debug = True
    # port = os.getuid()
    # # Flask will print the port anyhow, but let's do so too
    # print('Running on port '+str(port))
    # app.run('0.0.0.0',port)

    app.run()
