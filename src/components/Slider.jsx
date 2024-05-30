import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade"; // Import fade effect
import "swiper/css/autoplay"; // Import autoplay
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Slider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://whitehat.realty/api/v1/get-sliders");
        const data = await response.json();
        const heroData = data.api_data;
        const images = heroData.map(item => item.image);
        setSlides(images);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hero sections:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex justify-center">
        <div className="w-11/12 md:w-8/12 h-5/6 rounded-3xl relative">
          <Skeleton height="100%" borderRadius="1.5rem" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[60vh] flex justify-center">
      <Swiper
        pagination={{ type: "progressbar" }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        modules={[Pagination, EffectFade, Autoplay]}
        className="mySwiper w-11/12 md:w-8/12 h-5/6 rounded-3xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="slider-img bg-cover bg-center w-full h-full rounded-3xl"
              style={{ backgroundImage: `url(${slide})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
