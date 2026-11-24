import Image from "next/image";
import Link from "next/link";

import { useCourse } from "../lib/useCourse";

const CourseCard = ({ course: base }) => {
  const live = useCourse(base.id);
  const course = base;
  const loaded = live && live.loaded;
  const count = loaded ? live.lessons.filter((l) => l.approved).length : null;
  return (
    <Link
      href={`/courses/${course.id}`}
      className="group flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-accent transition-all duration-300"
    >
      <div className="relative w-full h-[180px] overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-all duration-500"
        />
      </div>
      <div className="p-5 flex flex-col gap-y-2">
        <h3 className="text-lg font-semibold group-hover:text-accent transition-all duration-300">
          {course.title}
        </h3>
        <p className="text-sm text-white/60 line-clamp-2">{course.description}</p>
        <span className="text-xs text-accent mt-2">
          {count === null ? "\u00a0" : `${count} ${count === 1 ? "lesson" : "lessons"}`}
        </span>
      </div>
    </Link>
  );
};

export default CourseCard;
