from flask import Flask, request, jsonify, render_template
import os, datetime

app = Flask(__name__)

curr_temp = 0
time_changed = datetime.datetime.now()

@app.route('/')
def home():
 #   return "The current temperature in F is: " + str(curr_temp) + " and was updated at: " + str(time_changed)
 return render_template("index.html")


@app.route('/temp_data', methods=['GET', 'POST'])
def temp_data():
    global curr_temp
    global time_changed
    if request.method == 'POST' and 'degrees_f' in request.form.keys():
        curr_temp = request.form['degrees_f']
        time_changed = datetime.datetime.now()
        response = jsonify(request.form) # echo the received info back
        return response

if __name__ == '__main__':
    app.debug = True
    port = os.getuid()
    # Flask will print the port anyhow, but let's do so too
    print('Running on port '+str(port))
    app.run('0.0.0.0',port)
    