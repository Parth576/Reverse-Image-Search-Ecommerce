import requests
from bs4 import BeautifulSoup


source = requests.get('https://www.google.com/search?q=blue+jeans&hl=en&sxsrf=ALeKk03_yMJ0_ecYx_AAO1CXQLrk0-ofnw:1593841622830&source=lnms&tbm=shop&sa=X&ved=2ahUKEwj034be8rLqAhXEbX0KHbgrDtUQ_AUoAXoECBoQAw&biw=1536&bih=754').text

soup = BeautifulSoup(source,'lxml')


everything = []

for mydiv in soup.find_all('div',class_="P8xhZc"):
    link_href = mydiv.div.a['href']
    title = mydiv.div.a.text
    
    price = mydiv.find('span',class_ = 'HRLxBb').text
    
    store = mydiv.find('div', class_="dD8iuc").text
    
    store = store.split('from')[1]
    
    data = {'link_href':link_href,'title':title,'price':price,'store':store}
    everything.append(data)

c=0
for image in soup.find_all('div', class_="oR27Gd"):
    print(image.img['src'])
    c+=1

#print(soup.find('div', class_="oR27Gd").img['src'])
