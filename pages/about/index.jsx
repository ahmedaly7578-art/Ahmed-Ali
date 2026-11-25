import { motion } from "framer-motion";
import { useState } from "react";
import CountUp from "react-countup";
import {
  SiGoogleanalytics,
  SiMixpanel,
  SiGoogledatastudio,
} from "react-icons/si";
import { FaChartLine } from "react-icons/fa";

import {
  SiGoogleads,
  SiMeta,
    SiSnapchat,
} from "react-icons/si";

import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";
import { useCourse } from "../../lib/useCourse";
import { fadeIn } from "../../variants";

// data
export const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Paid media: Meta, Google, Snapchat",
        icons: [SiGoogleads, SiMeta, SiSnapchat],
      },
      {
        title: "Tracking: Google Tag Manager and GA4",
        icons: [SiGoogleanalytics],
      },
      { title: "Attribution across platforms, and app tracking with AppsFlyer" },
    ],
  },
  {
    title: "what I do",
    info: [
      { title: "Plan, launch and scale paid campaigns" },
      { title: "Set up tracking so results can be trusted" },
      { title: "Lead and train a team of media buyers" },
      { title: "Build practical learning material for the team" },
    ],
  },
  {
    title: "now",
    info: [
      { title: "Head media buyer, leading the media buying team" },
      { title: "Teaching tracking in Tracking From Zero, a course for media buyers" },
    ],
  },
];

const About = () => {
  const [index, setIndex] = useState(0);
  const course = useCourse("tracking-from-zero");
  const liveLessons = course && course.loaded ? course.lessons.filter((l) => l.approved).length : null;

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
            Media buying you can <span className="text-accent">measure</span>.
          </motion.h2>

          {/* ===== DESKTOP TITLE (UNCHANGED) ===== */}
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 hidden xl:block"
          >
            Media buying you can <span className="text-accent">measure</span>.
          </motion.h2>

          {/* ===== MOBILE TEXT ===== */}
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            className="xl:hidden text-sm leading-relaxed text-white/70 mb-10 px-2"
          >
            I am Ahmed Ali, a head media buyer. I run paid campaigns, set up the
            tracking behind them, and train my team to do the same.
          </motion.p>

          {/* ===== DESKTOP TEXT (UNCHANGED) ===== */}
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            className="hidden xl:block max-w-[500px] mb-10 xl:mb-12 px-2 xl:px-0"
          >
            I am Ahmed Ali, a head media buyer. I run paid campaigns on Meta,
            Google and Snapchat, and I set up the tracking behind them so
            every result can be traced back to its source. I lead a team of media
            buyers, and I teach what I know in Tracking From Zero, a practical
            course built for them.
          </motion.p>

          {/* ===== COUNTERS (DESKTOP ONLY – UNCHANGED) ===== */}
          <motion.div
            variants={fadeIn("right", 0.6)}
            initial="hidden"
            animate="show"
            className="flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8"
          >
            <div className="flex flex-1 xl:gap-x-6">
              {[
                { text: "GTM \u00b7 GA4", label: "Tracking setup." },
                { end: liveLessons, label: "Course lessons live." },
                { text: "Arabic", label: "Tracking lessons." },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`relative flex-1 ${i !== 2 && "after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0"}`}
                >
                  <div className={`font-extrabold text-accent mb-2 ${item.text ? "text-lg xl:text-2xl whitespace-nowrap xl:leading-[2.25rem]" : "text-2xl xl:text-4xl"}`}>
                    {item.text ? item.text : item.end === null ? "\u00a0" : <CountUp start={0} end={item.end} duration={2} />}
                  </div>
                  <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[120px]">
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
                <div className="font-light xl:text-left">{item.title}</div>
                {item.stage && <div className="hidden md:flex">-</div>}
                <div>{item.stage}</div>

                <div className="flex gap-x-4">
                  {item.icons?.map((Icon, iconI) => (
                    <Icon key={iconI} className="text-2xl text-white" aria-hidden />
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

