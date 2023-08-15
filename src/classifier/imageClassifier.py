from tensorflow.keras.models import load_model
import cv2
import numpy as np
import os

class_labels = ["Aadhaar", "PAN", "Driving Licence",
                "Voter ID", "Passport"]

path = os.path.join('src', 'classifier', 'classifier_model.h5')
print(path)
model = load_model(path)


def preprocess_image(img_path):
    img = cv2.imread(img_path)
    img = cv2.resize(img, (224, 224))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)  # Add an extra dimension for batch size
    return img


def imageClassifier(image):
    input_image_path = image

    input_image = preprocess_image(input_image_path)

    predictions = model.predict(input_image)
    predicted_class_index = np.argmax(predictions)
    predicted_class = class_labels[predicted_class_index]

    print("Predicted Class:", predicted_class)
    return predicted_class
