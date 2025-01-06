import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CardSlider() {
  const navigate = useNavigate();
  const { services } = useSelector((state) => state.collections);
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    swipeToSlide: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1465,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    className: "w-[90%] mx-auto",
  };

  let int;
  let navi = true;
  let startX = -1;

  return (
    <Slider {...settings}>
      {services?.map((doc) => (
        <div key={doc?.id} className="group">
          <div className="flex flex-col items-center justify-center p-6">
            <div
              onMouseDown={(e) => {
                startX = e.screenX;
                navi = true;
                int = setTimeout(() => {
                  navi = false;
                }, 200);
              }}
              onMouseUp={(e) => {
                const endX = e.screenX;
                const abs = Math.abs(startX - endX);
                clearTimeout(int);
                if (navi && abs < 10)
                  navigate(`/services/${doc?.index + "_" + doc?.title}`);
              }}
              style={{ backgroundImage: `url(${doc?.data[0]})` }}
              className="w-full h-[220px] bg-center bg-cover bg-transparent mb-4 transition-all hover:shadow-xl"
            />
            <h5 className="text-xl font-bold mb-3">{doc?.title}</h5>
            {/* <p className="text-[15px] text-center leading-5 max-h-20 text-gray-600 text-ellipsis overflow-hidden">
              {doc?.content}
            </p> */}
          </div>
        </div>
      ))}
    </Slider>
  );
}
// transition-all hover:scale-110 hover:shadow-2xl hover:cursor-pointer hover:z-20
