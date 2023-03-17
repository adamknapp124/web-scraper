const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const PORT = 4000;

// change this url to scrape something else in the future
const url = 'https://imageskincare.com/collections/all-skincare';

const app = express();

axios(url)
	.then((response) => {
		const html = response.data;
		const $ = cheerio.load(html);
		const items = [];
		$('.ProductItem__Wrapper, yotpo', html).each(function () {
			const image = $(this).find('.yotpo').attr('data-url');
			const title = $(this).find('.yotpo').attr('data-name');
			const price = $(this).find('.ProductItem__Price').text().trim();
			items.push({
				title,
				price,
				image,
			});
		});
		console.log(items);
	})
	.catch((err) => console.log(err));

app.listen(PORT, () => console.log('aye aye captain'));

// a.find('.container_c89a5').find('img').attr('src');
