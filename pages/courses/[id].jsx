import Link from "next/link";
import { useRouter } from "next/router";

import Circles from "../../components/Circles";
import LessonAccordion from "../../components/LessonAccordion";
import { getCourseById } from "../../data/courses";

const CoursePage = () => {
  const { query } = useRouter();
  const course = getCourseById(query.id);

  return (
    <div className="h-full bg-primary/30 py-36 overflow-y-auto">
      <Circles />
      <div className="container mx-auto max-w-[800px] relative z-10">
        {course ? (
          <>
            <Link href="/courses" className="text-sm text-accent">&larr; All courses</Link>
            <h2 className="h2 mt-4">{course.title}<span className="text-accent">.</span></h2>
            <p className="mb-8 text-white/70">{course.description}</p>
            <div className="flex flex-col gap-y-3">
              {course.lessons.map((lesson, i) => (
                <LessonAccordion key={lesson.id} lesson={lesson} index={i} courseId={course.id} />
              ))}
            </div>
          </>
        ) : (
          <p>Course not found.</p>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
