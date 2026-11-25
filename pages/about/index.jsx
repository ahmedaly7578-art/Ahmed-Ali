import { motion } from "framer-motion";
import { useState } from "react";
import {
  SiGoogleanalytics,
  SiMixpanel,
  SiGoogledatastudio,
} from "react-icons/si";
import { FaFlask, FaChartLine } from "react-icons/fa";

import {
  SiGoogleads,
  SiMeta,
  SiTiktok,
  SiSnapchat,
} from "react-icons/si";

import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";

// data
export const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Performance Media Buying",
        icons: [SiGoogleads, SiMeta, SiTiktok, SiSnapchat],
      },
      {
        title: "Tracking & CRO",
        icons: [SiGoogleanalytics,
    SiMixpanel,
    SiGoogledatastudio,
    
    FaChartLine,],
      },
      { title: "GA4, GTM, Pixel, Firebase, Hotjar" },
      { title: "CRO, A/B testing and app event tracking" },
    ],
  },
  {
    title: "experience",
    info: [
      { title: "Wameed: Head of Media Buying", stage: "Jun 2026 - Present" },
      { title: "TAG Creative Hub: Senior Media Buyer", stage: "Mar 2025 - Feb 2026" },
      { title: "Darb: Performance Marketing Team Leader", stage: "Aug 2024 - Feb 2025" },
      { title: "Azzrk: Performance Marketing Team Leader", stage: "Jun 2024 - Feb 2025" },
      { title: "Azzrk: Media Buyer", stage: "Sep 2023 - Apr 2024" },
      { title: "Freelance: Social Media Marketing Specialist", stage: "Jul 2016 - Sep 2023" },
      { title: "Freelance: Mobile App Developer", stage: "Sep 2022 - Jul 2023" },
    ],
  },
  {
    title: "education",
    info: [
      { title: "Civil Engineering - Misr University for Science and Technology" },
    ],
  },
];

const About = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="h-full bg-primary/30 py-32 text-center xl:text-left overflow-y-auto xl:overflow-visible">
      <Circles />

      {/* ===== AVATAR (DESKTOP ONLY – UNCHANGED) ===== */}
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="hidden xl:flex absolute bottom-0 -left-[240px] pointer-events-none select-none"
      >
        <Avatar />
      </motion.div>

      <div className="container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6 px-4 xl:pr-[max(0px,calc(130px-(100vw-1200px)/2))] xl:pl-[max(0px,calc(250px-(100vw-1200px)/2))]">

        {/* ================= TEXT ================= */}
        <div className="flex-1 flex flex-col justify-center">

          {/* ===== MOBILE TITLE ===== */}
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 mt-12 mb-4 xl:hidden"
          >
            Strategic <span className="text-accent">Insights</span><br />
            Drive Scalable Growth.
          </motion.h2>

          {/* ===== DESKTOP TITLE (UNCHANGED) ===== */}
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 hidden xl:block xl:max-[1439px]:!text-[40px] xl:max-[1439px]:!leading-[1.15]"
          >
            Strategic <span className="text-accent">Insights</span> create scalable growth.
          </motion.h2>

          {/* ===== MOBILE TEXT ===== */}
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            className="xl:hidden text-sm leading-relaxed text-white/70 mb-10 px-2"
          >
            I&apos;m Ahmed Ali, Head of Media Buying at Wameed. I help brands grow through paid media strategy, campaign optimization and reliable tracking. My work covers Meta, Google, Snapchat and TikTok, with a focus on full-funnel campaigns, creative testing and improving conversion rates. With a background in civil engineering and mobile app development, I bring a technical approach to understanding user journeys and measuring performance.
          </motion.p>

          {/* ===== DESKTOP TEXT (UNCHANGED) ===== */}
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            className="hidden xl:block max-w-[500px] mb-10 xl:mb-12 px-2 xl:px-0"
          >
            I&apos;m Ahmed Ali, Head of Media Buying at Wameed. I help brands grow through paid media strategy, campaign optimization and reliable tracking. My work covers Meta, Google, Snapchat and TikTok, with a focus on full-funnel campaigns, creative testing and improving conversion rates. With a background in civil engineering and mobile app development, I bring a technical approach to understanding user journeys and measuring performance.
          </motion.p>
        </div>

        {/* ================= INFO ================= */}
        <motion.div
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col w-full xl:max-w-[50%] xl:min-w-0 h-auto xl:h-[480px] pb-24 xl:pb-0"
        >
          <div className="flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-6">
            {aboutData.map((item, itemI) => (
              <div
                key={itemI}
                className={`${
                  index === itemI &&
                  "text-accent after:w-full after:bg-accent"
                } cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0`}
                onClick={() => setIndex(itemI)}
              >
                {item.title}
              </div>
            ))}
          </div>

          <div className="py-2 xl:py-6 flex flex-col gap-y-4 items-center xl:items-start">
            {aboutData[index].info.map((item, itemI) => (
              <div
                key={itemI}
                className="flex flex-col md:flex-row gap-x-2 items-center text-center text-white/60"
              >
                <div className="font-light">{item.title}</div>
                {item.stage && <div className="hidden md:flex">-</div>}
                <div className="md:whitespace-nowrap">{item.stage}</div>

                <div className="flex gap-x-4">
                  {item.icons?.map((Icon, iconI) => (
                    <Icon key={iconI} className="text-2xl text-white" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
