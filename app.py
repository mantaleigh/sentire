from flask import Flask, request
app = Flask(__name__)

curr_temp_info = 0

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/temp_data')
def temp_data():
    global curr_temp
    if request.method == 'POST' and 'temp_dict' in request.form.keys():
        curr_temp = request.form['temp_dict']
        response = jsonify(request.form) # echo the received info back
        return response

if __name__ == '__main__':
    app.run(debug=True)