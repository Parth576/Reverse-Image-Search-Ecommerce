# USAGE
# python search.py --index index.csv --query images.png --result-path reversedata

# import the necessary packages
from pyimagesearch.colordescriptor import ColorDescriptor
from pyimagesearch.searcher import Searcher
import argparse
import cv2

# construct the argument parser and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--index", required = True,
	help = "Path to where the computed index will be stored")
ap.add_argument("-q", "--query", required = True,
	help = "Path to the query image")
ap.add_argument("-r", "--result-path", required = True,
	help = "Path to the result path")
args = vars(ap.parse_args())

# initialize the image descriptor
cd = ColorDescriptor((4, 8, 6))

# load the query image and describe it
query = cv2.imread(args["query"])
features = cd.describe(query)

# perform the search
searcher = Searcher(args["index"])
results = searcher.search(features)

# display the query
# cv2.imshow("Query", query)

# loop over the results
# for (score, resultID) in results:
# 	# load the result image and display it
# 	print(resultID)
# 	result = cv2.imread(args["result_path"] + "/" + resultID)
# 	cv2.imshow("Result", result)
# 	cv2.waitKey(0)
answer = [c for c in str(results[0][1]).split('.')]
print(answer)
answer = [a for a in str(answer[0]).split(':')]
print(answer)
