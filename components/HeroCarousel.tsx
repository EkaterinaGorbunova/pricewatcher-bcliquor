'use client'

import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

const heroImages = [
  { imgUrl: '/assets/images/hero-1.png', alt: 'glasses'},
  { imgUrl: '/assets/images/hero-2.png', alt: 'wine'},
  { imgUrl: '/assets/images/hero-3.png', alt: 'cocktail'},
  { imgUrl: '/assets/images/hero-4.png', alt: 'bottle'},
  { imgUrl: '/assets/images/hero-5.png', alt: 'cocktail-old-fashioned'},
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
      >
        {heroImages.map((image) => (
          <Image
            key={image.alt}
            src={image.imgUrl}
            width={484}
            height={484}
            alt={image.alt}
            className='object-contain'
          />
        ))}
      </Carousel>

      <Image
        src='assets/icons/hand-drawn-arrow.svg'
        alt='arrow'
        width={175}
        height={175}
        className='max-xl:hidden absolute -left-[10%] -bottom-10 z-0'
      />
    </div>
  );
};

export default HeroCarousel;
