import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Autoplay } from 'swiper';
import { Typography } from '@mui/material';

interface IProps {
  items: string[];
  itemSx: object;
  slidersPerView: number;
  speed?: number;
}

const Slider: React.FC<IProps> = ({ items, itemSx = {}, slidersPerView = 1, speed = 2000 }) => {
  return (
    <>
      <Swiper
        className="mySwiper"
        modules={[Autoplay]}
        effect="slide"
        loop
        speed={speed}
        slidesPerView={slidersPerView}
        simulateTouch={false}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {items.map((item: string, index: number) => (
          <SwiperSlide key={`item-${index}-${item}`}>
            <Typography sx={itemSx}>{item}</Typography>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
