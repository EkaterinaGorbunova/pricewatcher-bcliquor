'use server';

import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractCurrency, extractPrice, estimateRecommendationRate } from '../utils';

export async function scrapeBCLiquorProduct(url: string) {
  if (!url) return;

  // BrightData proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  };

  try {
    // Fetch the product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);
    // console.log('response.data:', response.data);

    // Extract the product info
    console.log('title:', $('meta[property="og:title"]').attr('content'));
    console.log('image:', $('meta[property="og:image"]').attr('content'));
    console.log('price:amount:', $('meta[property="product:price:amount"]').attr('content'));
    console.log('regularPrice:amount', $('meta[property="product:regularPrice:amount"]').attr('content'));
    console.log('currency:', $('meta[property="product:price:currency"]').attr('content'));
    console.log('availability', $('meta[property="product:availability"]').attr('content'));
    console.log('tastingDescription:', $('meta[property="og:description"]').attr('content'));

    // Extract the title
    const title = $('meta[property="og:title"]')?.attr('content') || '';

    // Extract the current price
    const currentPrice = extractPrice(
      $('meta[property="product:price:amount"]').attr('content')
    );

    // Extract the original price
    const originalPrice = extractPrice(
      $('meta[property="product:regularPrice:amount"]').attr('content')
    );

    // Determine if a product is out of stock
    const availabilityText = $('meta[property="product:availability"]').attr('content')?.toLowerCase();
    const outOfStock = !availabilityText?.includes('in stock');
    console.log('outOfStock:', outOfStock);

    // Extract the image
    const imageUrl = $('meta[property="og:image"]').attr('content') || '{}';

    // Extract the currency
    const currency = extractCurrency(
      $('meta[property="product:price:currency"]').attr('content')
    );

    // Get the text content of all elements with the class '.savingsPercentage'
    const savingsText = $('.savingsPercentage').text();
    console.log('savingsText:', savingsText);
    // const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");
    // console.log('discountRate:', discountRate)

    // Remove duplicate occurrences of '-' and '%', then split the text by non-digit characters
    const discountRates = savingsText.replace(/([-%])\1+/g, '$1').split(/\D+/);
    // Remove any empty strings from the array
    const filteredDiscountRates = discountRates.filter((rate) => rate !== '');
    // Use the first value as the discount rate
    let discountRate = filteredDiscountRates[0];

    // Extract the category from script tag
    let category = null;
    const script = $('script[type="application/ld+json"]');
    // Check if script exists and has content
    if (script.length > 0) {
      // Get the JSON data string
      const jsonDataStr = script.text().trim();
      // Parse the JSON data
      const jsonData = JSON.parse(jsonDataStr);
      // Iterate through the parsed JSON data
      jsonData.forEach(function (item: any) {
        if (item['@type'] === 'BreadcrumbList') {
          item.itemListElement.forEach(function (element: any) {
            const name = element.name; // Store the name for better readability
            if (name === 'BEER' || name === 'SPIRITS' || name === 'WINE') {
              category =
                name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
              console.log('category:', category);
            } else if (name === 'COOLERS &amp; CIDERS') {
              const fixedName = name
                .replace(/&amp;|&/g, '&') // Replace both "&amp;" and "&" with "&"
                .split(' & ') // Split by space after "&"
                .map(
                  (part: any) =>
                    part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
                ) // Capitalize first letter in each part
                .join(' & '); // Join back with " & " separator
              category = fixedName;
              console.log('category:', category);
            }
          });
        }
      });
    } else {
      console.log('JSON-LD script tag not found.');
    }

    // Extract the ratingValue from script tag
    let ratingValue = null;
    let reviewCount = null;
    const scriptSelector = $('script[type="application/ld+json"]');
    // Check if script exists and has content
    if (scriptSelector.length > 0) {
      const jsonData = JSON.parse($('script[type="application/ld+json"]').text());

      ratingValue = jsonData[0].aggregateRating.ratingValue;
      console.log("Product rating:", ratingValue);

      reviewCount = jsonData[0].aggregateRating.reviewCount;
      console.log("Product review:", reviewCount);
    }

    const recommendationRate = estimateRecommendationRate(reviewCount, ratingValue)
    console.log(`Estimated percentage of buyers recommending the product: ${recommendationRate.toFixed(2)}%`);

    // Extract the description
    const descriptionText =
      $('meta[property="product:tastingDescription"]').attr('content') ||
      $('title').text().trim() ||
      '{}';
    const description = descriptionText.replace(/&#039;/g, "'");

    // Construct data object with scraped product information
    const data = {
      url,
      currency: currency || '$',
      image: imageUrl,
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate) || 5,
      category: category || '',
      reviewsCount: reviewCount || 100,
      stars: ratingValue || 4.5,
      recommendationRate: recommendationRate || 93,
      isOutOfStock: outOfStock,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };
    // console.log(data)
    // console.log({title, currentPrice, originalPrice, outOfStock, imageUrls, currency, discountRate})

    return data;
  } catch (error: any) {
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
