import { useEffect, useState } from "react";

import { getCourseById } from "../data/courses";

// Returns the course with lessons from the live API when available (static data until then).
export const useCourse = (id) => {
  const base = id ? getCourseById(id) : null;
  const [lessons, setLessons] = useState(null);
  useEffect(() => {
    if (!id) return;
    let alive = true;
    fetch(`/api/lessons?course=${encodeURIComponent(id)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && d && setLessons(d.lessons))
      .catch(() => {});
    return () => { alive = false; };
  }, [id]);
  if (!base) return null;
  return { ...base, lessons: lessons || base.lessons };
};
