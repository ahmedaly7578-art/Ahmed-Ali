import {
  RxRocket,
  RxTrendingUp,
  RxDesktop,
  RxReader,
  RxRocket,
  RxArrowTopRight,
} from "react-icons/rx";
import { FreeMode, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const serviceData = [
  {
    Icon: RxRocket,
    title: "E-commerce Growth Strategy",
    description: "End-to-end growth planning including product strategy, offer structuring, budget allocation, and scalable campaign frameworks.",
  },
  {
    Icon: RxTrendingUp,
    title: "Performance Advertising",
    description: "Data-driven ad campaigns focused on generating profitable sales and high-quality leads across Meta, TikTok, Snapchat, and other digital platforms.",
  },
  {
    Icon: RxDesktop,
    title: "Tracking & Data Analytics",
    description: "Advanced tracking setup (Pixels, Events, Analytics) to measure every conversion and make optimization decisions based on real data.",
  },
  {
    Icon: RxReader,
    title: "Conversion Rate Optimization",
    description: "Improving landing pages, product pages, and user journey to increase conversion rates and maximize revenue from existing traffic.",
  },
  {
    Icon: RxRocket,
    title: "Retargeting & Scaling Systems",
    description: "Structured retargeting funnels and scaling strategies designed to recover lost customers and grow winning campaigns efficiently.",
  },
];

const ServiceSlider = () => {
  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      }}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      freeMode
      className="h-[240px] sm:h-[340px]"
    >
      {serviceData.map((item, i) => (
        <SwiperSlide key={i}>
          <div className="bg-[rgba(65,47,123,0.15)] h-max rounded-lg px-6 py-8 flex sm:flex-col gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300">
            {/* icon */}
            <div className="text-4xl text-accent mb-4">
              <item.Icon aria-hidden />
            </div>

            {/* title & description */}
            <div className="mb-8">
              <div className="mb-2 text-lg">{item.title}</div>
              <p className="max-w-[350px] leading-normal">{item.description}</p>
            </div>

            {/* arrow */}
            <div className="text-3xl">
              <RxArrowTopRight
                className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300"
                aria-hidden
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ServiceSlider;
