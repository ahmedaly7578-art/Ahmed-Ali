import { motion } from "framer-motion";
import { useState } from "react";
import CountUp from "react-countup";
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
        icons: [],
      },
      {
        title: "Tracking & CRO",
        icons: [],
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
    ],
  },
  {
    title: "credentials",
    info: [
      { title: "Web Development - ABC University, LA, CA", stage: "2011" },
      { title: "Computer Science Diploma - AV Technical Institute", stage: "2009" },
    ],
  },
];

const About = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="bg-primary/30 min-h-screen overflow-hidden">

      {/* ================= MOBILE ================= */}
      <div className="xl:hidden min-h-screen overflow-y-auto px-4 py-24 text-center">
        <motion.h2
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          animate="show"
          className="text-3xl font-bold mb-6"
        >
          Strategic <span className="text-accent">Insights</span><br />
          Drive Scalable Growth.
        </motion.h2>

        <motion.p
          variants={fadeIn("down", 0.3)}
          initial="hidden"
          animate="show"
          className="text-sm leading-relaxed text-white/70 mb-12"
        >
          I help brands turn data into profitable decisions through smart,
          performance-driven ad strategies that scale and deliver real results.
        </motion.p>

        {/* Avatar Mobile */}
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          className="flex justify-center mb-16"
        >
          <div className="max-w-[260px]">
            <Avatar />
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-8">
          {aboutData.map((item, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`text-sm ${
                index === i ? "text-accent border-b border-accent" : "text-white/60"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Info */}
        <div className="space-y-4 text-white/70 mb-24">
          {aboutData[index].info.map((item, i) => (
            <div key={i}>
              <p className="font-medium text-white">{item.title}</p>
              {item.stage && <p className="text-xs">{item.stage}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* ================= DESKTOP (زي ما كان بالظبط) ================= */}
      <div className="hidden xl:block h-full py-32 text-center xl:text-left">
        <Circles />

        {/* Avatar Desktop */}
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          animate="show"
          className="absolute bottom-0 -left-[240px] pointer-events-none select-none"
        >
          <Avatar />
        </motion.div>

        <div className="container mx-auto h-full flex flex-col xl:flex-row gap-x-6">
          {/* Text */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.h2
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              animate="show"
              className="h2"
            >
              Strategic <span className="text-accent">Insights</span> create
              scalable growth.
            </motion.h2>

            <motion.p
              variants={fadeIn("right", 0.4)}
              initial="hidden"
              animate="show"
              className="max-w-[500px] mb-12"
            >
              I help brands turn data into direction, and ad spend into meaningful growth.
              With a blend of strategic insight, careful optimization, and performance-focused
              execution, I build campaigns that scale, connect with the right audience, and
              deliver results that actually matter.
            </motion.p>

            {/* Counters */}
            <motion.div
              variants={fadeIn("right", 0.6)}
              initial="hidden"
              animate="show"
              className="flex gap-x-6"
            >
              <div>
                <div className="text-4xl text-accent font-bold">
                  <CountUp end={10} duration={5} />
                </div>
                <p className="text-xs">Years Experience</p>
              </div>
              <div>
                <div className="text-4xl text-accent font-bold">
                  <CountUp end={250} duration={5} />
                </div>
                <p className="text-xs">Clients</p>
              </div>
              <div>
                <div className="text-4xl text-accent font-bold">
                  <CountUp end={650} duration={5} />
                </div>
                <p className="text-xs">Projects</p>
              </div>
            </motion.div>
          </div>

          {/* Info */}
          <motion.div
            variants={fadeIn("left", 0.4)}
            initial="hidden"
            animate="show"
            className="flex flex-col w-full xl:max-w-[48%]"
          >
            <div className="flex gap-8 mb-6">
              {aboutData.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`capitalize ${
                    index === i ? "text-accent border-b border-accent" : "text-white/60"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            <div className="space-y-4 text-white/60">
              {aboutData[index].info.map((item, i) => (
                <div key={i}>
                  <p className="text-white">{item.title}</p>
                  {item.stage && <p className="text-sm">{item.stage}</p>}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
