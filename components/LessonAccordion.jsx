import { useState } from "react";
import HomeworkForm from "./HomeworkForm";
import { HiChevronDown, HiDocumentText, HiPencilSquare, HiPlayCircle } from "react-icons/hi2";

const isMp4 = (url) => /\.mp4($|\?)/i.test(url);

const LessonAccordion = ({ lesson, index, courseId }) => {
  const [open, setOpen] = useState(false);
  const live = lesson.approved;

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-medium">
          <span className="text-accent mr-2">{index + 1}.</span>
          {lesson.title}
          {!live && <span className="ml-2 text-xs text-white/40">(coming soon)</span>}
        </span>
        <HiChevronDown className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="px-5 pb-5 flex flex-col gap-y-5">
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
              {courseId ? (
                <HomeworkForm courseId={courseId} lessonId={lesson.id} />
              ) : lesson.homeworkUrl ? (
                <a href={lesson.homeworkUrl} target="_blank" rel="noreferrer"
                  className="inline-block px-4 py-2 rounded-lg bg-accent text-white text-sm">
                  Submit homework
                </a>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonAccordion;
