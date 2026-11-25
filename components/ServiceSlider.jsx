import {
  RxTarget,
  RxBarChart,
  RxMixerHorizontal,
  RxRocket,
  RxLoop,
  RxArrowTopRight, // ← إضافة
} from "react-icons/rx";
import { FreeMode, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const serviceData = [
  {
    Icon: RxBarChart,
    title: "E-commerce Growth Strategy",
    description: "Strategic growth planning for sustainable scaling and profitability.",
  },
  {
    Icon: RxRocket,
    title: "Performance Advertising",
    description: "Data-driven ad campaigns for maximum ROI across all platforms.",
  },
  {
    Icon: RxTarget,
    title: "Tracking & Data Analytics",
    description: "Advanced tracking systems for actionable insights and optimization.",
  },
  {
    Icon: RxMixerHorizontal,
    title: "Conversion Rate Optimization",
    description: "Systematic testing to boost conversions and revenue.",
  },
  {
    Icon: RxLoop,
    title: "Retargeting & Scaling Systems",
    description: "Automated campaigns to re-engage and scale profitably.",
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
