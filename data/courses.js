
export const courses = [
  {
    id: "meta-ads-basics",
    title: "أساسيات الـ Meta Ads",
    description: "كورس يشرح خطوة بخطوة إزاي تبني وتدير حملات إعلانية ناجحة على Meta.",
    thumbnail: "/case.png", // غيّرها بصورة الكورس بعد ما ترفعها في public/
    lessons: [
      {
        id: "lesson-1",
        title: "مقدمة عن Meta Ads Manager",
        videoUrl: "https://www.youtube.com/watch?v=p2suBUZkUZI&list=RDtSzBqXgKfss&index", // هتضيف لينك الفيديو هنا بعدين
        pptUrl: "", // هتضيف لينك البوربوينت هنا بعدين
        code: "",
      },
      {
        id: "lesson-2",
        title: "إنشاء أول حملة إعلانية",
        videoUrl: "",
        pptUrl: "",
        code: "",
      },
      {
        id: "lesson-3",
        title: "استهداف الجمهور (Targeting)",
        videoUrl: "",
        pptUrl: "",
        code: "",
      },
    ],
  },

  // عايز تضيف كورس تاني؟ انسخ الأوبجكت دا كله وحطه هنا وعدّل بياناته
  // {
  //   id: "google-ads-basics",
  //   title: "أساسيات Google Ads",
  //   description: "...",
  //   thumbnail: "/case2.png",
  //   lessons: [
  //     { id: "lesson-1", title: "...", videoUrl: "", pptUrl: "", code: "" },
  //   ],
  // },
];

// دالة مساعدة بترجع كورس معين حسب الـ id بتاعه
export const getCourseById = (id) => courses.find((course) => course.id === id);
