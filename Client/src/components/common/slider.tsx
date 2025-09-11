/* eslint-disable @typescript-eslint/no-explicit-any */

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface IProps {
  data: any[];
  Children: any;
}

function Carousel({ data, Children }: IProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };
  return (
    <div className="slider-container h-full w-full">
      <Slider {...settings}>
        {data?.map((item, index) => (
          <Children key={item.public_id ?? index} data={item} />
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
