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
		
		if searchTerms[0]=='runningshoe' or searchTerms[0]=='runningshoes':
			searchTerms[0]='shoes'
		
		if searchTerms[1]=='runningshoe' or searchTerms[1]=='runningshoes':
			searchTerms[1] = 'shoes'
		
		url = "https://www.shop411.com/shopping?q={}+{}&%3Bo=11376&qo=shoppingSmartAnswer".format(searchTerms[1],searchTerms[0])

		response = requests.get(url)
		data = response.text
		soup = BeautifulSoup(data,'html.parser')

		everything = []

		tags=soup.find_all('div',class_="partial-search-results-item PartialSearchResults-item")

		for tag in tags:
			website = tag.find('a',class_="PartialSearchResults-item-link").get('href')
			image = tag.find('img',class_="large-preview hidden").get('src')
			desc = tag.find('div',class_="PartialSearchResults-item-title").text
			price = tag.find('div',class_="PartialSearchResults-item-price").text
			data = {'Website':website,'Image':image,'desc':desc,'price':price}
			everything.append(data)
		
		return json.dumps({'Result':searchTerms,'Confidence':l,'scrapingResults':everything})
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
		nice=answer[0].split(':')
		imagePath=os.getcwd()+'/reversedata/'+answer[0]+'.png'
		img=cv2.imread(imagePath)
		ret,stream=cv2.imencode('.png',img)
		encoded_img=base64.b64encode(stream).decode()
		img_base64="data:image/png;base64,"+encoded_img
		path='localhost:3000/shop/{}/{}'.format(nice[0],nice[1])
		print(path)	
		return json.dumps({'matchedImage':img_base64,'path':path})
	except Exception as e:
		print(e)
		return json.dumps({'errorMessage':str(e)})
	

if __name__=='__main__':
	app.run(debug=True)