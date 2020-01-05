# Dependencies and Setup
from bs4 import BeautifulSoup
from splinter import Browser
import pandas as pd

executable_path = {'executable_path': 'chromedriver.exe'}
browser = Browser('chrome', **executable_path, headless=False)

# URL of page to be scraped
url = 'https://mars.nasa.gov/news/'
browser.visit(url)

# Create BeautifulSoup object; parse with 'html.parser'
html = browser.html
mars_news_soup = BeautifulSoup(html, 'html.parser')

# Scrape the first article title
first_title = mars_news_soup.find('div', class_='content_title').text
first_title

# Scrape the first article teaser paragraph text
first_paragraph = mars_news_soup.find('div', class_='article_teaser_body').text
first_paragraph

# URL of page to be scraped
url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
browser.visit(url)

# Go to 'FULL IMAGE'
browser.click_link_by_partial_text('FULL IMAGE')

# Go to 'more info'
browser.click_link_by_partial_text('more info')

# Create BeautifulSoup object; parse with 'html.parser'
html = browser.html
image_soup = BeautifulSoup(html, 'html.parser')

# Scrape the URL
feat_img_url = image_soup.find('figure', class_='lede').a['href']
feat_img_full_url = f'https://www.jpl.nasa.gov{feat_img_url}'
feat_img_full_url

# URL of page to be scraped
url = 'https://twitter.com/marswxreport?lang=en'
browser.visit(url)

# Create BeautifulSoup object; parse with 'html.parser'
html = browser.html
tweet_soup = BeautifulSoup(html, 'html.parser')

# Scrape the tweet info
first_tweet = tweet_soup.find('p', class_='TweetTextSize TweetTextSize--normal js-tweet-text tweet-text').text
first_tweet

# Scrape the table of Mars facts
url = 'https://space-facts.com/mars/'
tables = pd.read_html(url)
tables[0]
df = tables[0]
df.columns = ['Property', 'Value']
df

# Convert to HTML table string
df.to_html()

# URL of page to be scraped
url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
browser.visit(url)

# Create BeautifulSoup object; parse with 'html.parser'
html = browser.html
hemi_soup = BeautifulSoup(html, 'html.parser')

# Populate a list with links for the hemispheres
hemi_strings = []
links = hemi_soup.find_all('h3')

for hemi in links:
    hemi_strings.append(hemi.text)
    
hemi_strings

# Visit the USGS Astrogeology Science Center Site

url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
browser.visit(url)
hemisphere_image_urls = []

# Get a List of All the Hemispheres
links = browser.find_by_css("a.product-item h3")
for item in range(len(links)):
    hemisphere = {}
    
    # Find Element on Each Loop to Avoid a Stale Element Exception
    browser.find_by_css("a.product-item h3")[item].click()
    
    # Find Sample Image Anchor Tag & Extract <href>
    sample_element = browser.find_link_by_text("Sample").first
    hemisphere["img_url"] = sample_element["href"]
    
    # Get Hemisphere Title
    hemisphere["title"] = browser.find_by_css("h2.title").text
    
    # Append Hemisphere Object to List
    hemisphere_image_urls.append(hemisphere)
    
    # Navigate Backwards
    browser.back()

    hemisphere_image_urls