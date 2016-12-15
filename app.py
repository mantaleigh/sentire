from flask import Flask, request, jsonify, render_template, redirect, url_for
import os, datetime

app = Flask(__name__)

# initialize data dict -- this should be a database eventually
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
    },
    "eating_data": {
        "value": 0,
        "timestamps": []
    },
    "exercising_data": {
        "value": 0,
        "timestamps": []
    },
    "moods_data": { 
        "happy": {  # example mood, these can be totally customized
            "value": 0,
            "timestamps": []
        }
    }
}

# example of the currently_tracking dict
# {
#    'a_1': 'temperature',
#    'a_3': 'light',
#    'd_2': 'sleep',
#    'd_3': 'mood: CUSTOM MOOD HERE',
#    'd_4': 'mood: CUSTOM MOOD HERE',
# }

currently_tracking = {} 


# Home page, dump out the current data in the data dict
@app.route('/', methods=["GET", "POST"])
def home():
    global currently_tracking


    # handle posted data from the customization form
    if request.method == "POST": 
        for k in request.form.keys(): 
            if request.form[k] != "Choose Input Type":
                if request.form[k] == "mood":
                    detail_key = k + '_mood_desc'
                    currently_tracking[k] = "mood: " + request.form[detail_key].encode('ascii')
                elif 'mood_desc' not in k:
                    currently_tracking[k] = request.form[k].encode('ascii')

    return render_template("index.html")

# endpoint entirely to return all current tracked data
@app.route('/get_data', methods=["GET"])
def get_data():
    global data
    return jsonify(values=data)

# endpoint that handles interpreting the data coming in from read_data and only 
# adds info to the data dict only if the data coming across matches what's in the currently tracking dict
@app.route('/incoming_data', methods=['GET', 'POST'])
def incoming_data():

    global data
    if request.method == 'POST':
        pin = request.form.keys()[0] # only one line comes across at a time

        if pin in currently_tracking.keys(): # yay! you're tracking what just came across!
            if currently_tracking[pin] == "temperature":
                voltage = float(request.form[pin] - 58) * 0.004882814
                degreesC = (voltage - 0.5) * 100.0
                degreesF = degreesC * (9.0/5.0) + 32.0
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
                if mood_text in data['moods_data'].keys():
                    data['moods_data'][mood_text]['value'] += 1
                    data['moods_data'][mood_text]['timestamps'] += [datetime.datetime.now()]
                else: 
                    data['moods_data'][mood_text] = {'value':1, 'timestamps':[datetime.datetime.now()]}
        
        return jsonify(request.form) # echo the received info back

if __name__ == '__main__':
    app.debug = True
    app.run()
