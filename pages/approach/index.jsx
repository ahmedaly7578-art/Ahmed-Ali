import { motion } from "framer-motion";
import { RxCrosshair2, RxBarChart, RxLoop, RxPerson } from "react-icons/rx";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";

const steps = [
  {
    Icon: RxCrosshair2,
    title: "Start from the goal",
    text: "Every campaign begins with what the business needs: sales, leads or app installs. Then we pick the platforms and budget to match.",
  },
  {
    Icon: RxBarChart,
    title: "Measure it properly",
    text: "Tracking comes before scaling. I set up GTM and GA4 first, so each result can be traced to its source.",
  },
  {
    Icon: RxLoop,
    title: "Test, learn, scale",
    text: "Small tests first. What works gets more budget, what does not gets cut, and the numbers decide.",
  },
  {
    Icon: RxPerson,
    title: "Teach the team",
    text: "A good setup should not depend on one person. I train the team, and the Tracking From Zero course comes from that.",
  },
];

const Approach = () => {
  return (
    <div className="h-full bg-primary/30 pt-52 pb-24 xl:py-32 overflow-y-auto xl:overflow-visible">
      <Circles />
      <div className="container mx-auto h-full flex flex-col justify-center items-center text-center">
        <motion.h2
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="h2 mb-4"
        >
          How I <span className="text-accent">work.</span>
        </motion.h2>
        <motion.p
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="max-w-[560px] mb-10"
        >
          Four habits behind every campaign I run.
        </motion.p>

        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-[900px] text-left pb-24 xl:pb-0 relative z-20"
        >
          {steps.map((s, i) => (
            <div key={i} className="card-surface bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-x-3 mb-2">
                <span className="text-2xl text-accent"><s.Icon aria-hidden /></span>
                <h3 className="text-lg font-medium">{s.title}</h3>
              </div>
              <p className="text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
      <Bulb />
    </div>
  );
};

export default Approach;
