import { useState } from "react";
import { HiChevronDown, HiCodeBracket, HiDocumentText, HiPlayCircle } from "react-icons/hi2";

const LessonAccordion = ({ lesson, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
      {/* header */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-medium">
          <span className="text-accent mr-2">{index + 1}.</span>
          {lesson.title}
        </span>
        <HiChevronDown
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* body */}
      {open && (
        <div className="px-5 pb-5 flex flex-col gap-y-5">
          {/* video slot */}
          <div>
            <div className="flex items-center gap-x-2 text-sm text-white/70 mb-2">
              <HiPlayCircle className="text-accent" />
              الفيديو
            </div>
            {lesson.videoUrl ? (
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <iframe
                  src={lesson.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="w-full aspect-video rounded-lg border border-dashed border-white/20 flex items-center justify-center text-white/40 text-sm">
                هيتم إضافة الفيديو قريباً
              </div>
            )}
          </div>

          {/* powerpoint slot */}
          <div>
            <div className="flex items-center gap-x-2 text-sm text-white/70 mb-2">
              <HiDocumentText className="text-accent" />
              ملف العرض (PowerPoint)
            </div>
            {lesson.pptUrl ? (
              <a
                href={lesson.pptUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300 text-sm"
              >
                تحميل / فتح ملف العرض
              </a>
            ) : (
              <div className="w-full rounded-lg border border-dashed border-white/20 py-4 flex items-center justify-center text-white/40 text-sm">
                هيتم إضافة ملف العرض قريباً
              </div>
            )}
          </div>

          {/* code slot - only shown if code exists */}
          {lesson.code && (
            <div>
              <div className="flex items-center gap-x-2 text-sm text-white/70 mb-2">
                <HiCodeBracket className="text-accent" />
                الكود
              </div>
              <pre className="w-full overflow-x-auto rounded-lg bg-black/40 p-4 text-sm text-white/90 whitespace-pre-wrap">
                <code>{lesson.code}</code>
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonAccordion;
