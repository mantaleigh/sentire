import serial, requests
ser = serial.Serial('/dev/cu.usbmodem1411', 9600)

host = 'http://127.0.0.1:5000'

while True:	
	line = ser.readline()

	# will come across as one of these:
	#    a_X [voltage here]
	#    d_X [voltage here]
	# where X is the number of the pin (an int from 1 to 4)

	post_key = line[:3]
	post_data = line[4:]
	r = requests.post(host + '/incoming_data', data={post_key.strip():post_data.strip()}) # stripping to be doubly sure? ¯\_(ツ)_/¯
	print r.text