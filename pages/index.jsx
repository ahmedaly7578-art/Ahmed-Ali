import { motion } from "framer-motion";
import ParticlesContainer from "../components/ParticlesContainer";
import ProjectsBtn from "../components/ProjectsBtn";
import Avatar from "../components/Avatar";
import { fadeIn } from "../variants";

const Home = () => {
  return (
    <div className="bg-primary/60 min-h-screen">
      {/* Mobile Layout */}
      <div className="xl:hidden w-full min-h-screen max-h-screen overflow-y-auto overflow-x-hidden bg-gradient-to-b from-primary/10 via-black/30 to-black/10">
        {/* Container with scroll */}
        <div className="flex flex-col items-center px-4 pt-8 pb-28">
          {/* Logo */}
          <motion.div
            variants={fadeIn("down", 0.1)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-6 text-center"
          >
            {/* Logo or Title */}
          </motion.div>

          {/* Icons */}
          <motion.div
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex gap-4 mb-8 justify-center"
          >
            {/* Icons Here */}
          </motion.div>

          {/* Avatar Image */}
          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full max-w-sm mb-8 mt-8 xl:mt-0 xl:mb-0"
          >
            <Avatar />
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1 text-3xl font-bold text-center mb-4"
          >
            Turning Ad Spend <br /> Into{" "}
            <span className="text-accent">Scalable Profit</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeIn("down", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-sm text-center mb-8 text-gray-300 leading-relaxed"
          >
             Smart, data-driven campaigns built to deliver real, scalable growth.

          </motion.p>

          {/* Button */}
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <ProjectsBtn />
          </motion.div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden xl:block w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10">
        <div className="text-center flex flex-col justify-center xl:pt-40 xl:text-left h-full container mx-auto">
          {/* title */}
          <motion.h1
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1"
          >
            Turning Ad Spend <br /> Into{" "}
            <span className="text-accent">Scalable Profit</span>
          </motion.h1>

          {/* subtitle */}
          <motion.p
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16"
          >
            I turn your ad spend into real, scalable profit by creating smart,
             data-driven campaigns that actually work. Through continuous testing,
            clear insights, and thoughtful optimization, I make sure every 
            dollar you invest drives measurable growth.

          </motion.p>

          {/* btn */}
          <div className="flex justify-center xl:hidden relative">
            <ProjectsBtn />
          </div>
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden xl:flex"
          >
            <ProjectsBtn />
          </motion.div>
        </div>
      </div>
      {/* image */}
      <div className="hidden xl:block w-[1280px] h-full absolute right-0 bottom-0">
        {/* bg img */}
        <div
          role="img"
          className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0"
          aria-hidden
        />

        {/* particles */}
        <ParticlesContainer />

        {/* avatar */}
        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-full h-full max-w-[737px] max-h-[678px] absolute -bottom-32 lg:bottom-0 lg:right-[8%]"
        >
          <Avatar />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
