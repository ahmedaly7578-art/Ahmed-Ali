import { motion } from "framer-motion";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import CourseCard from "../../components/CourseCard";
import { courses } from "../../data/courses";
import { fadeIn } from "../../variants";

const Courses = () => {
  return (
    <div className="h-screen flex flex-col bg-primary/30">
      <div className="shrink-0 h-[190px] lg:h-[110px]" />
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pb-28 relative">
      <Circles />
      <div className="container mx-auto">
        <div className="text-center flex flex-col mb-12">
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 xl:mt-12"
          >
            Courses <span className="text-accent">.</span>
          </motion.h2>
          <motion.p
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-4 max-w-[500px] mx-auto"
          >
            All courses and lessons live here.
          </motion.p>
        </div>

        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </motion.div>
      </div>
      <Bulb />
    </div>
      </div>
  );
};

export default Courses;
