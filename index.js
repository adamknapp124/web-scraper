const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const PORT = 4000;

// change this url to scrape something else in the future
const url = 'https://imageskincare.com/collections/hand-body-care';

const app = express();

axios(url)
	.then((response) => {
		const html = response.data;
		const $ = cheerio.load(html);
		const items = [];
		// TEMPLATE
		$('.ProductItem__Wrapper, yotpo', html).each(function () {
			// EXTRACTION EXAMPLE
			const id = $(this).find('.ProductItem__Image').attr('data-media-id');
			const imgUrl = $(this).find('.yotpo').attr('data-image-url');
			const formattedUrl = imgUrl.substring(2, imgUrl.indexOf('.jpg') + 4);
			const name = $(this).find('.yotpo').attr('data-name');
			const price = $(this).find('.ProductItem__Price').text().trim();
			// PUSH ITEMS INTO DATA ARRAY
			items.push({
				id,
				category: 'hand and body skincare',
				name,
				price: parseFloat(price.replace('$', '')),
				imgUrl: `https://${formattedUrl}`,
			});
		});
		// CONSOLE LOG FOR ARRAY OR SEND TO DATABASE
		console.log(items);
	})
	.catch((err) => console.log(err));

app.listen(PORT, () => console.log('aye aye captain'));
