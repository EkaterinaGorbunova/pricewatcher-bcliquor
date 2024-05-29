import { PriceHistoryItem, Product } from "@/types";

const Notification = {
  WELCOME: 'WELCOME',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
}

const THRESHOLD_PERCENTAGE = 40;

// Extracts and returns the price from a list of possible elements.
export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.trim();

    if(priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, '');

      let firstPrice; 

      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
      } 

      return firstPrice || cleanPrice;
    }
  }

  return '';
}

// Extracts and returns the currency symbol from an element.
export function extractCurrency(element: any) {
  const currency = element.trim().slice(0, 3);
  const currencyText = currency && currency.includes('CAD') ? currency + '$' : currency
  return currencyText ? currencyText : "";
}

export function getHighestPrice(priceList: PriceHistoryItem[]) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
}

export function getLowestPrice(priceList: PriceHistoryItem[]) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
}

export function getAveragePrice(priceList: PriceHistoryItem[]) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceList.length || 0;

  return averagePrice;
}

export const getEmailNotifType = (
  scrapedProduct: Product,
  currentProduct: Product
) => {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);

  if (scrapedProduct.currentPrice < lowestPrice) {
    return Notification.LOWEST_PRICE as keyof typeof Notification;
  }
  if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
    return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
  }
  if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
    return Notification.THRESHOLD_MET as keyof typeof Notification;
  }

  return null;
};

export const formatNumber = (num: number = 0) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

// Calculate % of buyers who recommended this product (approximately)
export const estimateRecommendationRate = (reviewsCount: number, averageStars: number) => {
  if (typeof reviewsCount !== "number" || typeof averageStars !== "number") {
    throw new Error("Invalid arguments. reviewsCount and averageStars must be numbers.");
  }
  let estimatedBuyers

  if (averageStars >= 4.8) {
    estimatedBuyers = 95;
} else if (averageStars >= 4.5) {
  estimatedBuyers = 90 + (averageStars - 4.5) / 0.3 * 5; // 90% to 95%
} else if (averageStars >= 4.0) {
  estimatedBuyers = 70 + (averageStars - 4.0) / 0.5 * 20; // 70% to 90%
} else if (averageStars >= 3.5) {
  estimatedBuyers = 50 + (averageStars - 3.5) / 0.5 * 20; // 50% to 70%
} else if (averageStars >= 3.0) {
  estimatedBuyers = 30 + (averageStars - 3.0) / 0.5 * 20; // 30% to 50%
} else if (averageStars >= 2.5) {
  estimatedBuyers = 20 + (averageStars - 2.5) / 0.5 * 10; // 20% to 30%
} else {
  estimatedBuyers = 10 + (averageStars - 2.0) / 0.5 * 10; // 10% to 20%
}

  return Math.round(estimatedBuyers);
}