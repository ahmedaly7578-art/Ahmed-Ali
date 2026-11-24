import Link from "next/link";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { HiChevronRight } from "react-icons/hi2";

import Circles from "../../components/Circles";
import { useCourse } from "../../lib/useCourse";

const CoursePage = () => {
  const { query } = useRouter();
  const course = useCourse(query.id);

  return (
    <div className="course-shell flex flex-col bg-primary/30">
      <div className="shrink-0 h-[190px] lg:h-[110px]" />
      <div className="flex-1 min-h-0 course-scroll overflow-y-auto overflow-x-hidden relative">
      <Circles />
      <div className="container mx-auto max-w-[800px] relative z-10">
        {course ? (
          <>
            <Link href="/courses" className="text-sm text-accent">&larr; All courses</Link>
            <h2 className="h2 mt-4">{course.title}<span className="text-accent">.</span></h2>
            <p className="mb-8 text-white/70">{course.description}</p>
            <div className="flex flex-col gap-y-3">
              {course.lessons.map((lesson, i) => (
                <Fragment key={lesson.id}>
                {lesson.section && lesson.section !== (i > 0 ? course.lessons[i - 1].section : undefined) && (
                  <h3 className={`text-lg text-accent ${i > 0 ? "mt-6" : ""}`}>{lesson.section}</h3>
                )}
                <Link
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
                </Fragment>
              ))}
            </div>
          </>
        ) : (
          <p>Course not found.</p>
        )}
      </div>
    </div>
      </div>
  );
};

export default CoursePage;
