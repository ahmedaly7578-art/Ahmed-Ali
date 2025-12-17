import { motion } from "framer-motion";
import ParticlesContainer from "../components/ParticlesContainer";
import ProjectsBtn from "../components/ProjectsBtn";
import Avatar from "../components/Avatar";
import { fadeIn } from "../variants";

const Home = () => {
  return (
    <div className="bg-primary/60 min-h-screen">
      {/* Mobile Layout */}
      <div className="xl:hidden w-full bg-gradient-to-b from-primary/10 via-black/30 to-black/10">
        {/* Container with scroll */}
        <div className="flex flex-col items-center px-4 pt-8 pb-16">
          {/* Logo */}
          <motion.div
            variants={fadeIn("down", 0.1)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-6 text-center"
          >
           
          </motion.div>

          {/* Icons */}
          <motion.div
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex gap-4 mb-8 justify-center"
          >
          
          </motion.div>

          {/* Avatar Image */}
          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full max-w-sm mb-8"
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
            Transforming Ideas <br /> Into{" "}
            <span className="text-accent">Digital Reality</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeIn("down", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-sm text-center mb-8 text-gray-300 leading-relaxed"
          >
            skr ipsum dolor sit amet consectetur, adipisicing elit. Voluptate,
            exercitationem harum, quia nulla temporibus deleniti libero veniam
            vero beatae numquam ducimus illum ab similique ipsam tempore fugit
            quod laudantium debitis.
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
        <div className="text-center flex flex-col justify-center xl:pt-40 xl:text-left h-full container mx-auto px-4">
          {/* title */}
          <motion.h1
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1 text-6xl font-bold mb-6"
          >
            Transforming Ideas <br /> Into{" "}
            <span className="text-accent">Digital Reality</span>
          </motion.h1>
          {/* subtitle */}
          <motion.p
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-xl mb-16 text-lg"
          >
            skr ipsum dolor sit amet consectetur, adipisicing elit. Voluptate,
            exercitationem harum, quia nulla temporibus deleniti libero veniam
            vero beatae numquam ducimus illum ab similique ipsam tempore fugit
            quod laudantium debitis.
          </motion.p>
          {/* btn */}
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <ProjectsBtn />
          </motion.div>
        </div>

        {/* image */}
        <div className="w-full h-full xl:w-[1280px] xl:h-full absolute right-0 bottom-0">
          {/* bg img */}
          <div
            role="img"
            className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0"
            aria-hidden
          />
          {/* particles */}
          <ParticlesContainer />
          {/* avatar on desktop */}
          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-full h-full max-w-[737px] max-h-[678px] absolute -bottom-32 lg:bottom-0 lg:right-[8%] mb-16"
          >
            <Avatar />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
