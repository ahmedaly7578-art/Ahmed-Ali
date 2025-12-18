
import { motion } from "framer-motion";
import { useState } from "react";
import CountUp from "react-countup";
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
        icons: [SiGoogleads, SiMeta, SiTiktok, SiSnapchat],
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
            With a blend of strategic insight, careful optimization, and pe

