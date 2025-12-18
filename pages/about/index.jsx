import { motion } from "framer-motion";
import { useState } from "react";
import CountUp from "react-countup";
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
    FaFlask,
    FaChartLine,],
      },
    ],
  },
  {
    title: "Achievements",
    info: [
      { title: "Webby Awards - Honoree", stage: "2011 - 2012" },
      { title: "Adobe Design Achievement Awards - Finalist", stage: "2009 - 2010" },
    ],
  },
  {
    title: "experience",
    info: [
      { title: "UX/UI Designer - XYZ Company", stage: "2012 - 2023" },
      { title: "Web Developer - ABC Agency", stage: "2010 - 2012" },
      { title: "Intern - DEF Corporation", stage: "2008 - 2010" },
    ],
  },
  {
    title: "credentials",
    info: [
      { title: "Web Development - ABC University, LA, CA", stage: "2011" },
      { title: "Computer Science Diploma - AV Technical Institute", stage: "2009" },
      { title: "Certified Graphic Designer - ABC Institute, Los Angeles, CA", stage: "2006" },
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

      <div className="container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6 px-4 xl:px-0">

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
            className="h2 hidden xl:block"
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
            I help brands turn ad spend into real, scalable profit through smart,
            data-driven strategies focused on performance and sustainable growth.
          </motion.p>

          {/* ===== DESKTOP TEXT (UNCHANGED) ===== */}
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            className="hidden xl:block max-w-[500px] mb-10 xl:mb-12 px-2 xl:px-0"
          >
            I help brands turn data into direction, and ad spend into meaningful growth.
            With a blend of strategic insight, careful optimization, and performance-focused
            execution, I build campaigns that scale, connect with the right audience,
            and deliver results that actually matter.
          </motion.p>

          {/* ===== COUNTERS (DESKTOP ONLY – UNCHANGED) ===== */}
          <motion.div
            variants={fadeIn("right", 0.6)}
            initial="hidden"
            animate="show"
            className="hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8"
          >
            <div className="flex flex-1 xl:gap-x-6">
              {[
                { end: 10, label: "Years of experience." },
                { end: 250, label: "Satisfied clients." },
                { end: 650, label: "Finished projects." },
                { end: 8, label: "Winning awards." },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`relative flex-1 ${i !== 3 && "after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0"}`}
                >
                  <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                    <CountUp start={0} end={item.end} duration={5} />
                  </div>
                  <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ================= INFO ================= */}
        <motion.div
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col w-full xl:max-w-[48%] h-auto xl:h-[480px] pb-24 xl:pb-0"
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
                <div>{item.stage}</div>

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

