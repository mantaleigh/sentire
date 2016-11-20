from flask import Flask, request, jsonify

import os

app = Flask(__name__)

curr_temp = 0

@app.route('/')
def hello_world():
    return curr_temp

@app.route('/temp_data', methods=['GET', 'POST'])
def temp_data():
    global curr_temp
    if request.method == 'POST' and 'degrees_f' in request.form.keys():
        curr_temp = request.form['degrees_f']
        response = jsonify(request.form) # echo the received info back
        return response

if __name__ == '__main__':
    app.debug = True
    port = os.getuid()
    # Flask will print the port anyhow, but let's do so too
    print('Running on port '+str(port))
    app.run('0.0.0.0',port)