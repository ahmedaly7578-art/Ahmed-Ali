import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { fadeIn } from "../variants";

const chips = ["Meta", "Google", "Snapchat", "GTM \u00b7 GA4", "AppsFlyer"];

const Home = () => {
  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden">
      <div className="container mx-auto grid xl:grid-cols-[1.2fr_1fr] gap-x-12 gap-y-10 items-center pt-28 xl:pt-24 pb-32 xl:pb-12 xl:min-h-screen xl:content-center px-4 xl:px-0 xl:pr-24">
        {/* text */}
        <div className="order-2 xl:order-1 text-left">
          <motion.div
            variants={fadeIn("down", 0.1)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mono text-xs text-white/60 mb-5"
          >
            // head media buyer · tracking trainer
          </motion.div>

          <motion.h1
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-[42px] leading-[1.02] sm:text-6xl xl:text-[78px] font-bold tracking-[-0.04em] mb-6"
          >
            Turning ad spend into <span className="text-accent">scalable profit.</span>
          </motion.h1>

          <motion.p
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-xl mb-8 text-base xl:text-lg"
          >
            I run paid campaigns on Meta, Google and Snapchat, and I set up the
            tracking behind them with GTM, GA4 and AppsFlyer, so you can see
            what is working. I lead a team of media buyers and teach tracking in
            my course, Tracking From Zero.
          </motion.p>

          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-wrap gap-3 mb-8"
          >
            <Link
              href="/work"
              className="bg-accent text-onaccent font-bold px-6 py-3 rounded-xl text-sm"
            >
              View my work
            </Link>
            <Link
              href="/courses"
              className="border border-white/20 bg-white/5 px-6 py-3 rounded-xl text-sm font-medium hover:border-accent transition-all"
            >
              Tracking From Zero &rarr;
            </Link>
          </motion.div>

          <motion.div
            variants={fadeIn("down", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-wrap gap-2"
          >
            {chips.map((c) => (
              <span key={c} className="chip">
                <i />
                {c}
              </span>
            ))}
          </motion.div>
        </div>

        {/* portrait */}
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="order-1 xl:order-2 panel overflow-hidden relative h-[340px] sm:h-[420px] xl:h-[520px] flex items-end justify-center"
          style={{
            background:
              "radial-gradient(circle at 50% 38%, rgb(var(--c-accent) / 0.22), rgb(var(--c-primary) / 0.8) 70%)",
          }}
        >
          <Image
            src="/avatar.png"
            alt="Ahmed Ali"
            width={500}
            height={500}
            priority
            className="w-full max-w-[460px] h-auto select-none pointer-events-none"
          />
          <div className="absolute left-3 right-3 bottom-3 rounded-xl border border-white/10 bg-primary/85 backdrop-blur px-4 py-3 mono text-[11px] leading-6">
            <div className="text-white/60">working stack</div>
            <div className="flex justify-between"><span className="text-white/60">ads</span><span className="text-accent">Meta · Google · Snapchat</span></div>
            <div className="flex justify-between"><span className="text-white/60">tracking</span><span className="text-accent">GTM · GA4 · AppsFlyer</span></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
