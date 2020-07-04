
from bs4 import BeautifulSoup
import requests


url = "https://www.shop411.com/shopping?q=blue+jeans&%3Bo=11376&qo=shoppingSmartAnswer"

response = requests.get(url)
data = response.text
soup = BeautifulSoup(data,'html.parser')
# print(soup.prettify())

everything = []

tags=soup.find_all('div',class_="partial-search-results-item PartialSearchResults-item")

for tag in tags:
  website = tag.find('a',class_="PartialSearchResults-item-link").get('href')
  image = tag.find('img',class_="large-preview hidden").get('src')
  desc = tag.find('div',class_="PartialSearchResults-item-title").text
  price = tag.find('div',class_="PartialSearchResults-item-price").text
  data = {'Website':website,'Image':image,'desc':desc,'price':price}
  everything.append(data)
print(everything)
