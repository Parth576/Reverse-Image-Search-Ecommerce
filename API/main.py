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

app=Flask(__name__)

searchTerms=[]

@app.route('/classify',methods=['POST'])
def classify():
	global searchTerms
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
		return json.dumps({'Result':searchTerms,'Confidence':l})
	except Exception as e:
		print(str(e))
		return json.dumps({'status':str(e)})

@app.route('/reverseImageSearch',methods=['GET'])
def reverseImageSearch():
	cd = ColorDescriptor((4, 8, 6))

	query = cv2.imread('newimg.jpg')
	features = cd.describe(query)

	searcher = Searcher('index.csv')
	results = searcher.search(features)

	
	answer = [c for c in str(results[0][1]).split('.')]
	print(answer)
	answer = [a for a in str(answer[0]).split(':')]
	print(answer)
	return json.dumps('success')
	

if __name__=='__main__':
	app.run(debug=True)