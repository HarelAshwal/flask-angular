from flask import Flask, send_from_directory, redirect, jsonify
from flask_socketio import SocketIO,emit

import pathlib
import cv2
import base64

cap=cv2.VideoCapture(0)  ##when removing debug=True or using gevent or eventlet uncomment this line and comment the cap=cv2.VideoCapture(0) in gen(json)
app = Flask(__name__)
# app.debug=True
# app.config['SECRET_KEY'] = '78581099#lkjh'
socketio = SocketIO(app)


@app.route("/<path:path>", methods=["GET"])
def static_proxy(path: str):
    p = pathlib.Path("../frontend/dist/frontend/" + path)
    if not p.is_file():  # or p.is_dir() to see if it is a directory
        return redirect("/")
    return send_from_directory("../frontend/dist/frontend", path)


@app.route("/")
def root():
    return send_from_directory("../frontend/dist/frontend", "index.html")

@socketio.on('check')
def gen():
	# cap=cv2.VideoCapture(0)	
	while(cap.isOpened()):
		ret,img=cap.read()
		if ret:
			# img = cv2.resize(img, (0,0), fx=0.5, fy=0.5)
			frame = cv2.imencode('.jpg', img)[1].tobytes()
			frame= base64.encodebytes(frame).decode("utf-8")
			emit("image",frame)
			socketio.sleep(0)
		else:
			break


def message(json, methods=['GET','POST']):
	# print("Recieved message")
	socketio.emit('image', json )


if __name__ == "__main__":
    app.run(host="127.0.0.1")