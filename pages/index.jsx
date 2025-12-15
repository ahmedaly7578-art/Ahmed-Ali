import { motion } from "framer-motion";
import ParticlesContainer from "../components/ParticlesContainer";
import ProjectsBtn from "../components/ProjectsBtn";
import Avatar from "../components/Avatar";
import { fadeIn } from "../variants";

const Home = () => {
  return (
    <div className="bg-primary/60 h-full relative">
      {/* Logo */}
      <div className="flex justify-center pt-6 xl:pt-12">
        <img src="/logo.png" alt="logo" className="w-20 h-20" />
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center mt-4">
        <div className="flex space-x-4">
          <a href="#" className="text-white">Instagram</a>
          <a href="#" className="text-white">LinkedIn</a>
          <a href="#" className="text-white">Facebook</a>
        </div>
      </div>

      {/* Image & Avatar (After Social Icons) */}
      <div className="relative w-full h-full xl:w-[1280px] xl:h-full">
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
          className="w-full h-full max-w-[737px] max-h-[678px] absolute -bottom-32 lg:bottom-0 lg:right-[8%] mx-auto"
        >
          <Avatar />
        </motion.div>
      </div>

      {/* Text Section */}
      <div className="w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10">
        <div className="text-center flex flex-col justify-center xl:pt-40 xl:text-left h-full container mx-auto px-4">
          {/* title */}
          <motion.h1
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-6"
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
            className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16 text-base sm:text-lg"
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate,
            exercitationem harum, quia nulla temporibus deleniti libero veniam
            vero beatae numquam ducimus illum ab similique ipsam tempore fugit
            quod laudantium debitis.
          </motion.p>

          {/* btn */}
          <div className="flex justify-center xl:hidden relative mb-10">
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
    </div>
  );
};

export default Home;
