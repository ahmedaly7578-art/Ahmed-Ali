// Course catalog. A lesson is shown to visitors only when approved is true.
// videoUrl: a YouTube embed URL (https://www.youtube.com/embed/ID) or an .mp4 path/URL.
// homeworkUrl: link to the homework submission form for the lesson (optional).
export const courses = [
  {
    id: "tracking-from-zero",
    title: "Tracking From Zero",
    description:
      "A practical tracking course for media buyers: what we measure, how data is collected, and how the tools fit together. Video narration is in Arabic.",
    thumbnail: "/tracking-from-zero.png",
    lessons: [
      {
        id: "lesson-1",
        title: "What are we measuring, and why?",
        approved: false,
        videoUrl: "",
        pptUrl: "",
        homework: "Describe what you measured in your last campaign, and why.",
        homeworkUrl: "",
      },
      {
        id: "lesson-2",
        title: "How data is collected: Cookies, Pixels, Events and Parameters",
        approved: false,
        videoUrl: "",
        pptUrl: "",
        homework:
          "Open DevTools on a test site, find one network request, and note which event was sent.",
        homeworkUrl: "",
      },
      {
        id: "lesson-3",
        title: "The tools map and what each one does",
        approved: false,
        videoUrl: "",
        pptUrl: "",
        homework:
          "Draw a tracking map for a store or lead-gen site you work on and mark the independent paths.",
        homeworkUrl: "",
      },
    ],
  },
];

export const getCourseById = (id) => courses.find((course) => course.id === id);
