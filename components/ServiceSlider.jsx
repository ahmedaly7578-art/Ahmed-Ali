import {
  RxTarget,
  RxBarChart,
  RxMixerHorizontal,
  RxRocket,
  RxLoop,
  RxArrowTopRight,
  RxPerson,
} from "react-icons/rx";
import { FreeMode, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const serviceData = [
  {
    Icon: RxRocket,
    title: "Performance Advertising",
    description: "Paid campaigns on Meta, Google, Snapchat and TikTok, planned around your sales goals.",
  },
  {
    Icon: RxTarget,
    title: "Tracking & Analytics",
    description: "GTM and GA4 set up properly, so the numbers you read can be trusted.",
  },
  {
    Icon: RxBarChart,
    title: "Reporting & Attribution",
    description: "Clear reports that show which channel and which campaign drove each result.",
  },
  {
    Icon: RxMixerHorizontal,
    title: "Conversion Optimization",
    description: "Testing pages, offers and creatives to turn more of your traffic into orders.",
  },
  {
    Icon: RxLoop,
    title: "Retargeting & Scaling",
    description: "Re-engage visitors and grow spend step by step, while watching profitability.",
  },
  {
    Icon: RxPerson,
    title: "Team Training",
    description: "Hands-on training for media buying teams, including the Tracking From Zero course.",
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
        1200: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      }}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      freeMode
      className="h-[260px] sm:h-[340px]"
    >
      {serviceData.map((item, i) => (
        <SwiperSlide key={i}>
          <div className="card-surface bg-white/5 border border-white/10 h-max rounded-lg px-6 py-8 flex sm:flex-col gap-x-6 sm:gap-x-0 group cursor-pointer hover:border-accent transition-all duration-300">
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
