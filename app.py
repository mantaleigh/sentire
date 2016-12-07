from flask import Flask, request, jsonify, render_template
import os, datetime

app = Flask(__name__)

# initialize data dict -- this should be a database eventually but ¯\_(ツ)_/¯
data = {
    "light_data": {
        "values": [],
        "timestamps": []
    },
    "temp_data": {
        "values": [],
        "timestamps": []
    },
    "sound_data": {
        "values": [],
        "timestamps": []
    },
    "sleep_data": { # value here is number of presses
        "value": 0,
        "timestamps": [] # list of timestamps of all button presses
    },
    "water_data": {
        "value": 0,
        "timestamps": []
    }
    "eating_data": {
        "value": 0,
        "timestamps": []
    },
    "exercising_data": {
        "value": 0,
        "timestamps": []
    },
    "moods_data": { 
        "happy": {  # example
            "value": 0,
            "timestamps": []
        }
    }
}

# example of the currently_tracking dict
# {
#    a_1: 'temperature',
#    a_3: 'light',
#    d_2: 'sleep',
#    d_3: 'mood: CUSTOM MOOD HERE',
#    d_4: 'mood: CUSTOM MOOD HERE',
# }

currently_tracking = {} 

@app.route('/')
def home():
 return render_template("index.html")

# endpoint to submit the current customizations of the bracelet
@app.route('/submit_custom', methods=["GET", "POST"])
def submit_custom(): 
    global currently_tracking

    if request.method == "POST": 
        for k in request.form.keys(): 
            currently_tracking[k] = request.form[k]

    return jsonify(currently_tracking)

@app.route('/get_data', methods=["GET"])
def get_data():
    global data
    return jsonify(values=data)

@app.route('/incoming_data', methods=['GET', 'POST'])
def incoming_data():

    global data # lol gross
    if request.method == 'POST':

        pin = request.form.keys()[0] # only one line comes across at a time

        if pin in currently_tracking.keys(): # yay! you're tracking what just came across!
            if currently_tracking[pin] == "temperature":
                voltage = float(request.form[pin]) * 0.004882814
                degreesF = degreesC * (9.0/5.0) + 32.0;
                data['temp_data']['values'] += [degreesF]
                data['temp_data']['timestamps'] += [datetime.datetime.now()]
            elif currently_tracking[pin] == "light":
                voltage = float(request.form[pin])
                data['light_data']['values'] += [voltage]
                data['light_data']['timestamps'] += [datetime.datetime.now()]
            elif currently_tracking[pin] == "sound":
                voltage = float(request.form[pin])
                data['sound_data']['values'] += [voltage]
                data['sound_data']['timestamps'] += [datetime.datetime.now()]
            elif currently_tracking[pin] == "sleep":
                data['sleep_data']['values'] += 1
                data['sleep_data']['timestamps'] += [datetime.datetime.now()]
            elif currently_tracking[pin] == "water":
                data['water_data']['values'] += 1
                data['water_data']['timestamps'] += [datetime.datetime.now()]
            elif currently_tracking[pin] == "exercising":
                data['exercising_data']['values'] += 1
                data['exercising_data']['timestamps'] += [datetime.datetime.now()]
            elif currently_tracking[pin] == "eating":
                data['eating_data']['values'] += 1
                data['eating_data']['timestamps'] += [datetime.datetime.now()]
            elif "mood" in currently_tracking[pin]:
                mood_text = currently_tracking[pin][6:] # strip the custom mood from the tracking info
                if mood_text in data['moods'].keys():
                    data['moods_data'][mood_text]['value'] += 1
                    data['moods_data'][mood_text]['timestamps'] += [datetime.datetime.now()]
                else: 
                    data['moods_data'][mood_text]['value'] = 1
                    data['moods_data'][mood_text]['timestamps'] = [datetime.datetime.now()]
        
        return jsonify(request.form) # echo the received info back

if __name__ == '__main__':
    app.debug = True
    # port = os.getuid()
    # # Flask will print the port anyhow, but let's do so too
    # print('Running on port '+str(port))
    # app.run('0.0.0.0',port)

    app.run()
