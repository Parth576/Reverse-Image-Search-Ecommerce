from flask import Flask,request
import json
from PIL import Image
import cv2
import numpy as np
import base64

app=Flask(__name__)

@app.route('/classify',methods=['POST'])
def classify():
    try:
        file = request.files['image']
        img=Image.open(file.stream)
        print(img.size)
        print(np.array(img).shape)
        img.save('fromReact.jpg')
        cvimg=cv2.imread('fromReact.jpg',cv2.IMREAD_COLOR)
        #cvimg = cv2.cvtColor(cvimg, cv2.COLOR_RGB2BGR)
        print(cvimg.shape)
        cv2.imshow('frame',cvimg)
        return json.dumps({'status':'no error'})
    except Exception as e:
        print(str(e))
        return json.dumps({'status':str(e)})

if __name__=='__main__':
    app.run(debug=True)