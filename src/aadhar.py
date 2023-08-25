import uuid

import requests


def aadhar_generate():

    url = "https://tathya.uidai.gov.in/captchaServiceV3/api/captcha/v3/generation"

    headers = {
        "Content-Type": "application/json",
    }

    data = {
        "captchaLength": "6",
        "captchaType": "2",
        "audioCaptchaRequired": False
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        captcha_response = response.json()
        # print("Captcha response:", captcha_response)
        return captcha_response

    else:
        print("Failed to fetch captcha. Status code: ", response.status_code)
        return response.status_code


def aadhar_getStaus(udi, captcha, capId):
    generated_uuid = str(uuid.uuid4())
    transaction_id = "MYAADHAAR:" + generated_uuid
    url = "https://tathya.uidai.gov.in/uidVerifyRetrieveService/api/verifyUID"

    data = {
        "uid": udi,
        "captchaTxnId": capId,
        "captcha": captcha,
        "transactionId": transaction_id,
        "captchaLogic": "V3",
    }
    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 200:
        print("Request successful:")
        print(response.text)
        return response.json()
    else:
        print("Request failed with status code:", response.status_code)
        print("Response:", response.text)
