from flask import Flask, request, jsonify
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
    app.run(debug=True)