import serial, requests
ser = serial.Serial('/dev/cu.usbmodem1411', 9600)

while True:	
	line = ser.readline()

	if "temperature" in line: 
		post_data = line[13:] # 13 chars in "temperature: "
		r = requests.post('http://127.0.0.1:5000/incoming_data', data={'temp_data':post_data.strip()})
		print r.text
	elif "light" in line: 
		post_data = line[7:] # 7 chars in "light: "
		r = requests.post('http://127.0.0.1:5000/incoming_data', data={'light_data':post_data.strip()})
		print r.text
	elif "button" in line: 
		key = line[:8] + "_data"
		post_data = line[10:] # 8 chars in "button_X: "
		r = requests.post('http://127.0.0.1:5000/incoming_data', data={key:post_data.strip()})
		print r.text
