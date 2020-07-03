from flask import Flask,request
import json
from PIL import Image
import cv2
import numpy as np

app=Flask(__name__)

@app.route('/classify',methods=['POST'])
def classify():
    try:
        file = request.files['image']
        print(file)
        img=Image.open(file.stream)
        # print(img.size)
        # print(np.array(img).shape)
        # img.save('fromReact.jpg')
        # cvimg=cv2.imread('fromReact.jpg',cv2.IMREAD_COLOR)
        # #cvimg = cv2.cvtColor(cvimg, cv2.COLOR_RGB2BGR)
        # print(cvimg.shape)
        # cv2.imshow('frame',cvimg)
        imgg = np.array(img)
        imcv = cv2.cvtColor(imgg,cv2.COLOR_RGB2BGR)
        cv2.imwrite('newimg.jpg',imcv)
        imgnew = cv2.imread('newimg.jpg')
        print(imgnew.shape)
        # cv2.imshow('New',imgnew)
        # cv2.waitKey(0)
        # cv2.destroyAllWindows()
        return json.dumps({'status':'no error'})
    except Exception as e:
        print(str(e))
        return json.dumps({'status':str(e)})

if __name__=='__main__':
    app.run(debug=True)