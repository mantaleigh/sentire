import serial, requests
ser = serial.Serial('/dev/cu.usbmodem1421', 9600)

while True:	
	# r = requests.post('http://hackmit-spot.herokuapp.com/availability_data', data={'availability':ser.readline()[0]})
	r = requests.post('http://127.0.0.1:5000/temp_data', data={'temp_dict':ser.readline()[0]})
	print r.text