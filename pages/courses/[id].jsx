import Link from "next/link";
import { useRouter } from "next/router";
import { HiChevronRight } from "react-icons/hi2";

import Circles from "../../components/Circles";
import { getCourseById } from "../../data/courses";

const CoursePage = () => {
  const { query } = useRouter();
  const course = getCourseById(query.id);

  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden bg-primary/30 py-36">
      <Circles />
      <div className="container mx-auto max-w-[800px] relative z-10">
        {course ? (
          <>
            <Link href="/courses" className="text-sm text-accent">&larr; All courses</Link>
            <h2 className="h2 mt-4">{course.title}<span className="text-accent">.</span></h2>
            <p className="mb-8 text-white/70">{course.description}</p>
            <div className="flex flex-col gap-y-3">
              {course.lessons.map((lesson, i) => (
                <Link
                  key={lesson.id}
                  href={`/courses/${course.id}/${lesson.id}`}
                  className="w-full flex items-center justify-between px-5 py-4 border border-white/10 rounded-xl bg-white/5 hover:border-accent transition-all duration-300"
                >
                  <span className="font-medium">
                    <span className="text-accent mr-2">{i + 1}.</span>
                    {lesson.title}
                    {!lesson.approved && <span className="ml-2 text-xs text-white/40">(coming soon)</span>}
                  </span>
                  <HiChevronRight />
                </Link>
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
