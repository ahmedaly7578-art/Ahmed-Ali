import Link from "next/link";
import { useRouter } from "next/router";
import { HiDocumentText, HiPencilSquare, HiPlayCircle } from "react-icons/hi2";

import Circles from "../../../components/Circles";
import HomeworkForm from "../../../components/HomeworkForm";
import QuestionsSection from "../../../components/QuestionsSection";
import { useCourse } from "../../../lib/useCourse";

const isMp4 = (url) => /\.mp4($|\?)/i.test(url);

const LessonPage = () => {
  const { query } = useRouter();
  const course = useCourse(query.id);
  const index = course ? course.lessons.findIndex((l) => l.id === query.lesson) : -1;
  const lesson = index >= 0 ? course.lessons[index] : null;
  const live = lesson && lesson.approved;
  const prev = index > 0 ? course.lessons[index - 1] : null;
  const next = lesson && index < course.lessons.length - 1 ? course.lessons[index + 1] : null;

  return (
    <div className="course-shell flex flex-col bg-primary/30">
      <div className="shrink-0 h-[190px] lg:h-[110px]" />
      <div className="flex-1 min-h-0 course-scroll overflow-y-auto overflow-x-hidden relative">
      <Circles />
      <div className="container mx-auto max-w-[800px] relative z-10">
        {lesson ? (
          <>
            <Link href={`/courses/${course.id}`} className="text-sm text-accent">&larr; {course.title}</Link>
            <h2 className="h2 mt-4">
              <span className="text-accent mr-2">{index + 1}.</span>
              {lesson.title}
              <span className="text-accent">.</span>
            </h2>

            <div className="flex flex-col gap-y-8 mt-6">
              <div>
                <div className="flex items-center gap-x-2 text-sm text-white/70 mb-2">
                  <HiPlayCircle className="text-accent" /> Video
                </div>
                {live && lesson.videoUrl ? (
                  <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                    {isMp4(lesson.videoUrl) ? (
                      <video src={lesson.videoUrl} controls className="w-full h-full" />
                    ) : (
                      <iframe
                        src={lesson.videoUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>
                ) : (
                  <div className="w-full aspect-video rounded-lg border border-dashed border-white/20 flex items-center justify-center text-white/40 text-sm">
                    Video coming soon
                  </div>
                )}
              </div>

              {live && lesson.pptUrl && (
                <div>
                  <div className="flex items-center gap-x-2 text-sm text-white/70 mb-2">
                    <HiDocumentText className="text-accent" /> Slides
                  </div>
                  <a href={lesson.pptUrl} target="_blank" rel="noreferrer"
                    className="inline-block px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300 text-sm">
                    Open slides
                  </a>
                </div>
              )}

              {live && lesson.homework && (
                <div>
                  <div className="flex items-center gap-x-2 text-sm text-white/70 mb-2">
                    <HiPencilSquare className="text-accent" /> Homework
                  </div>
                  <p className="text-sm text-white/80 mb-3">{lesson.homework}</p>
                  <HomeworkForm courseId={course.id} lessonId={lesson.id} />
                </div>
              )}

              {live && <QuestionsSection courseId={course.id} lessonId={lesson.id} />}

              <div className="flex justify-between gap-x-4 text-sm pb-8">
                {prev ? <Link href={`/courses/${course.id}/${prev.id}`} className="px-4 py-3 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300">&larr; Previous lesson</Link> : <span />}
                {next ? <Link href={`/courses/${course.id}/${next.id}`} className="px-4 py-3 rounded-lg bg-accent text-white hover:bg-accent/80 transition-all duration-300">Next lesson &rarr;</Link> : <span />}
              </div>
            </div>
          </>
        ) : (
          <p>Lesson not found.</p>
        )}
      </div>
    </div>
      </div>
  );
};

export default LessonPage;
