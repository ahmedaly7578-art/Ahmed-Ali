import { motion } from "framer-motion";
import {
  RiLinkedinLine,
  RiInstagramLine,
  RiFacebookLine,
} from "react-icons/ri";

import { fadeIn } from "../../variants";

const channels = [
  {
    name: "LinkedIn",
    hint: "Best for work and collaboration",
    link: "https://www.linkedin.com/in/ahmed3li/",
    Icon: RiLinkedinLine,
  },
  {
    name: "Instagram",
    hint: "Send a direct message",
    link: "https://www.instagram.com/ahmed3li_011/",
    Icon: RiInstagramLine,
  },
  {
    name: "Facebook",
    hint: "Message me on Facebook",
    link: "https://www.facebook.com/Ahmed.3li01/",
    Icon: RiFacebookLine,
  },
];

const Contact = () => {
  return (
    <div className="h-full bg-primary/30 overflow-y-auto xl:overflow-visible">
      <div className="container mx-auto pt-52 pb-8 xl:py-32 text-center flex items-center justify-center h-full">
        <div className="flex flex-col w-full max-w-[700px]">
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-center mb-4"
          >
            Let&apos;s <span className="text-accent">connect.</span>
          </motion.h2>
          <motion.p
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-10 max-w-[520px] mx-auto"
          >
            Want to talk about a campaign, tracking, or training your team?
            Send me a message on any of these.
          </motion.p>

          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-col gap-4 pb-24 xl:pb-0"
          >
            {channels.map((c) => (
              <a
                key={c.name}
                href={c.link}
                target="_blank"
                rel="noreferrer noopener"
                className="card-surface group flex items-center gap-x-4 text-left bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:border-accent transition-all duration-300"
              >
                <span className="text-3xl text-accent"><c.Icon aria-hidden /></span>
                <span className="flex flex-col">
                  <span className="font-medium group-hover:text-accent transition-all duration-300">{c.name}</span>
                  <span className="text-sm text-white/70">{c.hint}</span>
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
