from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from src.aadhar import aadhar_generate, aadhar_getStaus
from src.pan import pan_generate_otp, pan_getStatus
from src.classifier.imageClassifier import imageClassifier
import asyncio
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@app.route('/', methods=['POST'])
def index():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part'})

    image = request.files['image']
    if image.filename == '':
        return jsonify({'error': 'No selected file'})

    if image:
        image_path = os.path.join(UPLOAD_FOLDER, image.filename)
        image.save(image_path)
        pridict = imageClassifier(image_path)
        return jsonify({'data': pridict})


@ app.route('/verify/<string:id>', methods=['POST'])
def verify_id(id):
    if id == "aadhar":
        cap = aadhar_generate()
        return jsonify(cap)
    elif id == "pan":
        panNumber = request.json.get("panNumber")
        fullName = request.json.get("fullName")
        mobNo = request.json.get("mobNo")
        dob = request.json.get("dob")
        responce = pan_generate_otp(panNumber, fullName, mobNo, dob)
        return jsonify(responce)
    else:
        return "cannot verify id"


@ app.route('/aadhar-summit', methods=['POST'])
def process_aadhar():
    udi = request.json.get('udi')
    captcha = request.json.get('captcha')
    transactionId = request.json.get('transactionId')
    response = aadhar_getStaus(udi, captcha, transactionId)

    return response


@app.route('/pan-summit', methods=['POST'])
def process_pan():
    panNumber = request.json.get("panNumber")
    fullName = request.json.get("fullName")
    mobNo = request.json.get("mobNo")
    dob = request.json.get("dob")
    otp = request.json.get("otp")
    reqId = request.json.get("reqId")

    response = pan_getStatus(panNumber, fullName, mobNo, dob, otp, reqId)
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
