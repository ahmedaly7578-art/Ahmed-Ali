import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const workSlides = {
  slides: [
    {
      images: [
        { title: "Fashion ROAS 6.36",       path: "/thumb12.png",    link: "/work/Casepage"   },
        { title: "Case Study Fashion",       path: "/thumb22.png",    link: "/work/Case2"      },
        { title: "AI Media Plan",            path: "/Mediaplan1.png", link: "/work/media-plan" },
        { title: "Multi-Platform Case Study",path: "/thumb40.png",    link: "/work/Case3"      },
      ],
    },
    {
      images: [
        { title: "Medical Fashion", path: "/thumb44.png", link: "/work/Casepage4" },
        { title: "title",           path: "/thumb1.jpg",  link: "/work/Casepage5"               },
        { title: "title",           path: "/thumb2.jpg",  link: "/"               },
        { title: "title",           path: "/thumb3.jpg",  link: "/"               },
      ],
    },
  ],
};

const WorkSlider = () => {
  return (
    <Swiper
      spaceBetween={10}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="h-[280px] sm:h-[480px]"
    >
      {workSlides.slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
            {slide.images.map((image, imageI) => (
              <Link
                key={imageI}
                href={image.link}
                className="relative rounded-lg overflow-hidden group cursor-pointer block"
              >
                {/* الصورة تملي الكارد بالكامل */}
                <div className="relative w-full h-full min-h-[120px] sm:min-h-[220px]">
                  <Image
                    src={image.path}
                    alt={image.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />

                  {/* overlay — pointer-events-none علشان ميبلكش الكليك */}
                  <div
                    className="absolute inset-0 bg-gradient-to-l from-transparent via-[#e838cc] to-[#4a22bd] opacity-0 group-hover:opacity-80 transition-all duration-700 pointer-events-none"
                    aria-hidden
                  />

                  {/* label */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center translate-y-full group-hover:-translate-y-10 group-hover:xl:-translate-y-20 transition-all duration-300 pointer-events-none">
                    <div className="flex items-center gap-x-2 text-[13px] tracking-[0.2em] text-white">
                      <div className="delay-100">LIVE</div>
                      <div className="translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150">
                        PROJECT
                      </div>
                      <div className="text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150">
                        <BsArrowRight aria-hidden />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default WorkSlider;
