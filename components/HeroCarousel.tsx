'use client'

import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

const heroImages = [
  { imgUrl: '/assets/images/hero-1.png', priority: true, alt: 'glasses'},
  { imgUrl: '/assets/images/hero-2.png', priority: false, alt: 'wine'},
  { imgUrl: '/assets/images/hero-3.png', priority: false, alt: 'cocktail'},
  { imgUrl: '/assets/images/hero-4.png', priority: false, alt: 'bottle'},
  { imgUrl: '/assets/images/hero-5.png', priority: false, alt: 'cocktail-old-fashioned'},
]

const HeroCarousel = () => {
  return (
    <div className='hero-carousel'>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          const defStyle = 'inline-block ml-2 w-2 h-2 cursor-pointer border border-gray-500 border-opacity-70 hover:border-gray-700 hover:border-opacity-80 opacity-50 rounded-full bg-white';
          return (
            <li
              className={`${defStyle} ${isSelected ? 'opacity-30 bg-primary' : ''}`}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              key={index}
              role="listitem"
              tabIndex={0}
              aria-label={`${label} ${index + 1}`}
            >
              {/* {"cust " + index} */}
            </li>
          );
        }}
      >
        {heroImages.map((image) => (
          <div key={image.alt}>
            <Image
              key={image.alt}
              src={image.imgUrl}
              width={560}
              height={560}
              priority={image.priority}
              alt={image.alt}
              sizes="100vw"
              className='object-contain'
            />
          </div>
        ))}
      </Carousel>

      <Image
        src='assets/icons/hand-drawn-arrow.svg'
        alt='arrow'
        width={175}
        height={175}
        style={{ width: "175px", height: "175px" }}
        className='max-xl:hidden absolute -left-[10%] -bottom-10 z-0'
      />
    </div>
  );
};

export default HeroCarousel;
