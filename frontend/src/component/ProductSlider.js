import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProductSlider = ({ children }) => {
  return (
    <Carousel
      responsive={responsive}
      autoPlay={true}
      autoPlaySpeed={1000}
      draggable={true}
      itemClass="carousel-item-padding-40-px mx-3"
    >
      {children}
    </Carousel>
  );
};

export default ProductSlider;
