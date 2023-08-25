import requests
import base64


def pan_generate_otp(panNumber, fullName, mobNo, dob):
    url = "https://eportal.incometax.gov.in/iec/guestservicesapi/saveEntity/"
    data = {
        "panNumber": panNumber,
        "fullName": base64.b64encode(fullName.encode()).decode(),
        "dob": dob,
        "mobNo": mobNo,
        "areaCd": "91",
        "serviceName": "verifyYourPanService",
        "formName": "FO-009-VYPAN"
    }
    response = requests.post(url, json=data)
    if response.status_code == 200:
        print(response.json())
        return response.json()
    else:
        print(f"POST request failed. Status code: {response.status_code}")
        return response.status_code


def pan_getStatus(panNumber, fullName, mobNo, dob, otp, reqId):
    url = "https://eportal.incometax.gov.in/iec/guestservicesapi/validateOTP/"
    data = {
        "panNumber": panNumber,
        "fullName": fullName,
        "dob": dob,
        "mobNo": mobNo,
        "areaCd": "91",
        "otp": otp,
        "serviceName": "verifyYourPanService",
        "formName": "FO-009-VYPAN",
        "reqId": reqId,
    }
    response = requests.post(url, json=data)
    if response.status_code == 200:
        print(response.json())
        return response.json()
    else:
        print(f"POST request failed. Status code1: {response.status_code}")
        return response.status_code
