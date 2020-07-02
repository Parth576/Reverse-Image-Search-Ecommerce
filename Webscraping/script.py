# from requests import get
# from requests.exceptions import RequestException
# from contextlib import closing
# from bs4 import BeautifulSoup

import requests
import urllib.request
import time
from bs4 import BeautifulSoup

url = 'https://www.google.co.in/search?hl=en&authuser=0&tbm=shop&sxsrf=ALeKk01dLFnuhG7sPOZGKQAxW7e25dQIdA%3A1593687520675&source=hp&ei=4L39XvbaJtie9QOgmpmYBw&q=blue+jeans&oq=blue+jeans&gs_lcp=Cgtwcm9kdWN0cy1jYxADMgQIIxAnMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAUNULWJ0aYKwcaABwAHgAgAGOAogBvwySAQUwLjcuM5gBAKABAaoBD3Byb2R1Y3RzLWNjLXdpeg&sclient=products-cc&ved=0ahUKEwj2yrPUtK7qAhVYT30KHSBNBnMQ4dUDCAc&uact=5'
response = requests.get(url)

soup = BeautifulSoup(response.text,"html.parser")

soup.findAll('img')[1:]
# link = one_a_tag['4']

#
# def simple_get(url):
#     """
#     Attempts to get the content at `url` by making an HTTP GET request.
#     If the content-type of response is some kind of HTML/XML, return the
#     text content, otherwise return None.
#     """
#     try:
#         with closing(get(url, stream=True)) as resp:
#             if is_good_response(resp):
#                 return resp.content
#             else:
#                 return None
#
#     except RequestException as e:
#         log_error('Error during requests to {0} : {1}'.format(url, str(e)))
#         return None
#
#
# def is_good_response(resp):
#     """
#     Returns True if the response seems to be HTML, False otherwise.
#     """
#     content_type = resp.headers['Content-Type'].lower()
#     return (resp.status_code == 200
#             and content_type is not None
#             and content_type.find('html') > -1)
#
#
# def log_error(e):
#     """
#     It is always a good idea to log errors.
#     This function just prints them, but you can
#     make it do anything.
#     """
#     print(e)
#
# # raw_html = simple_get('https://realpython.com/blog/')
# # len(raw_html)
# #
# # no_html = simple_get('https://realpython.com/blog/nope-not-gonna-find-it')
# # no_html is None
#
# # from bs4 import BeautifulSoup
# # raw_html = open('contrived.html').read()
# # html = BeautifulSoup(raw_html, 'html.parser')
# # for p in html.select('p'):
# #     if p['id'] == 'walrus':
# #         print(p.text)
#
# raw_html = simple_get('https://www.google.com/search?q=blue+jeans&sxsrf=ALeKk00owdwzezuB-DDeXJXdok1zjFV9kg:1593686546675&source=lnms&tbm=shop&sa=X&ved=2ahUKEwjPwv2Dsa7qAhUX4zgGHe2HBdsQ_AUoAXoECBoQAw&biw=1536&bih=706')
# html = BeautifulSoup(raw_html, 'html.parser')
# for i, href in enumerate(html.select('href')):
#     print(i, href.text)
#
# def get_names():
#     """
#     Downloads the page where the list of mathematicians is found
#     and returns a list of strings, one per mathematician
#     """
#     url = 'https://www.google.com/search?q=blue+jeans&sxsrf=ALeKk00owdwzezuB-DDeXJXdok1zjFV9kg:1593686546675&source=lnms&tbm=shop&sa=X&ved=2ahUKEwjPwv2Dsa7qAhUX4zgGHe2HBdsQ_AUoAXoECBoQAw&biw=1536&bih=706'
#     response = simple_get(url)
#
#     if response is not None:
#         html = BeautifulSoup(response, 'html.parser')
#         names = set()
#         for href in html.select('href'):
#             for name in href.text.split('\n'):
#                 if len(name) > 0:
#                     names.add(name.strip())
#         return list(names)
#
#     # Raise an exception if we failed to get any data from the url
#     raise Exception('Error retrieving contents at {}'.format(url))
#
# def get_hits_on_name(name):
#     """
#     Accepts a `name` of a mathematician and returns the number
#     of hits that mathematician's Wikipedia page received in the
#     last 60 days, as an `int`
#     """
#     # url_root is a template string that is used to build a URL.
#     url_root = 'URL_REMOVED_SEE_NOTICE_AT_START_OF_ARTICLE'
#     response = simple_get(url_root.format(name))
#
#     if response is not None:
#         html = BeautifulSoup(response, 'html.parser')
#
#         hit_link = [a for a in html.select('a')
#                     if a['href'].find('blue') > -1]
#
#         if len(hit_link) > 0:
#             # Strip commas
#             link_text = hit_link[0].text.replace(',', '')
#             try:
#                 # Convert to integer
#                 return int(link_text)
#             except:
#                 log_error("couldn't parse {} as an `int`".format(link_text))
#
#     log_error('No pageviews found for {}'.format(name))
#     return None
#
# if __name__ == '__main__':
#     print('Getting the list of names....')
#     names = get_names()
#     print('... done.\n')
#
#     results = []
#
#     print('Getting stats for each name....')
#
#     for name in names:
#         try:
#             hits = get_hits_on_name(name)
#             if hits is None:
#                 hits = -1
#             results.append((hits, name))
#         except:
#             results.append((-1, name))
#             log_error('error encountered while processing '
#                       '{}, skipping'.format(name))
#
#     print('... done.\n')
#
#     results.sort()
#     results.reverse()
#
#     if len(results) > 5:
#         top_marks = results[:5]
#     else:
#         top_marks = results
#
#     print('\nThe most popular mathematicians are:\n')
#     for (mark, mathematician) in top_marks:
#         print('{} with {} pageviews'.format(mathematician, mark))
#
#     no_results = len([res for res in results if res[0] == -1])
#     print('\nBut we did not find results for '
#           '{} mathematicians on the list'.format(no_results))