import { motion } from "framer-motion";
import Link from "next/link";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import LessonAccordion from "../../components/LessonAccordion";
import { courses } from "../../data/courses";
import { fadeIn } from "../../variants";

// بيحدد كل الكورسات المتاحة عشان Next.js يعمل صفحة لكل واحد فيهم
export const getStaticPaths = () => {
  const paths = courses.map((course) => ({
    params: { id: course.id },
  }));

  return { paths, fallback: false };
};

// بيجيب بيانات الكورس المطلوب حسب الـ id اللي في اللينك
export const getStaticProps = ({ params }) => {
  const course = courses.find((c) => c.id === params.id);

  return { props: { course } };
};

const CoursePage = ({ course }) => {
  return (
    <div className="h-full bg-primary/30 py-36 flex items-center">
      <Circles />
      <div className="container mx-auto max-w-[800px]">
        <Link
          href="/courses"
          className="text-sm text-white/60 hover:text-accent transition-all duration-300"
        >
          ← رجوع لكل الكورسات
        </Link>

        <motion.h2
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="h2 mt-4 mb-2"
        >
          {course.title}
        </motion.h2>

        <motion.p
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="text-white/60 mb-10"
        >
          {course.description}
        </motion.p>

        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col gap-y-4"
        >
          {course.lessons.map((lesson, index) => (
            <LessonAccordion key={lesson.id} lesson={lesson} index={index} />
          ))}
        </motion.div>
      </div>
      <Bulb />
    </div>
  );
};

export default CoursePage;
