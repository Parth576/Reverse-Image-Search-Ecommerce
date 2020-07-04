from flask import Flask,request
import json
from PIL import Image
import cv2
import numpy as np
from keras.preprocessing.image import img_to_array
from keras.models import load_model
import imutils
import pickle
from pyimagesearch.colordescriptor import ColorDescriptor
from pyimagesearch.searcher import Searcher
import os
import base64
from flask_cors import CORS, cross_origin
import requests
import urllib.request
import time
from bs4 import BeautifulSoup

app=Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

searchTerms=[]

@app.route('/classify',methods=['POST'])
@cross_origin()
def classify():
	global searchTerms
	searchTerms=[]
	try:
		file = request.files['image']
		print(file)
		img=Image.open(file.stream)
		imgg = np.array(img)
		imcv = cv2.cvtColor(imgg,cv2.COLOR_RGB2BGR)
		cv2.imwrite('newimg.jpg',imcv)
		image = cv2.imread('newimg.jpg')
		image = cv2.resize(image, (96, 96))
		image = image.astype("float") / 255.0
		image = img_to_array(image)
		image = np.expand_dims(image, axis=0)
		print("[INFO] loading network...")
		model = load_model('newmodel')
		mlb = pickle.loads(open('mlb.pickle', "rb").read())
		print("[INFO] classifying image...")
		proba = model.predict(image)[0]
		idxs = np.argsort(proba)[::-1][:2]
		l=[]
		for (label, p) in zip(mlb.classes_, proba):
			d={}
			d[label]="{:.2f}%".format(p*100)
			l.append(d)
			print("{}: {:.2f}%".format(label, p * 100))
		print(l)
		for (i, j) in enumerate(idxs):
			searchTerms.append(mlb.classes_[j])
			print(searchTerms)
			label = "{}: {:.2f}%".format(mlb.classes_[j], proba[j] * 100)
		url = 'https://www.google.co.in/search?hl=en&authuser=0&tbm=shop&sxsrf=ALeKk01dLFnuhG7sPOZGKQAxW7e25dQIdA%3A1593687520675&source=hp&ei=4L39XvbaJtie9QOgmpmYBw&q={}+{}&oq={}+{}&gs_lcp=Cgtwcm9kdWN0cy1jYxADMgQIIxAnMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAUNULWJ0aYKwcaABwAHgAgAGOAogBvwySAQUwLjcuM5gBAKABAaoBD3Byb2R1Y3RzLWNjLXdpeg&sclient=products-cc&ved=0ahUKEwj2yrPUtK7qAhVYT30KHSBNBnMQ4dUDCAc&uact=5'.format(searchTerms[1],searchTerms[0],searchTerms[1],searchTerms[0])
		response = requests.get(url)

		soup = BeautifulSoup(response.text,"html.parser")

		scrapingResults=soup.findAll('img')[1:]
		newResults=[]
		for i in scrapingResults:
			newResults.append(i['src'])
		
		return json.dumps({'Result':searchTerms,'Confidence':l,'scrapingResults':newResults})
	except Exception as e:
		print(str(e))
		return json.dumps({'errorMessage':str(e)})

@app.route('/reverseImageSearch',methods=['GET'])
@cross_origin()
def reverseImageSearch():
	try:
		cd = ColorDescriptor((4, 8, 6))

		query = cv2.imread('newimg.jpg')
		features = cd.describe(query)

		searcher = Searcher('index.csv')
		results = searcher.search(features)

		
		answer = [c for c in str(results[0][1]).split('.')]
		print(answer)
		imagePath=os.getcwd()+'/reversedata/'+answer[0]+'.png'
		img=cv2.imread(imagePath)
		ret,stream=cv2.imencode('.png',img)
		encoded_img=base64.b64encode(stream).decode()
		img_base64="data:image/png;base64,"+encoded_img	
		return json.dumps({'matchedImage':img_base64})
	except Exception as e:
		print(e)
		return json.dumps({'errorMessage':str(e)})
	

if __name__=='__main__':
	app.run(debug=True)