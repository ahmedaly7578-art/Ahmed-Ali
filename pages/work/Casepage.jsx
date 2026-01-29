import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import { RxArrowTopRight } from "react-icons/rx";
import { useRouter } from "next/router";

const CaseStudyPage = () => {
  const router = useRouter();
  
  // هنا هتجيب الـ data بناءً على الـ slug
  const caseStudy = {
    title: "Fashion E-commerce Brand",
    subtitle: "Scaling to 5x ROAS Through Strategic Retargeting",
    industry: "Fashion & Apparel",
    duration: "3 Months",
    services: ["Performance Ads", "CRO", "Retargeting"],
    
    challenge: {
      title: "The Challenge",
      description: "A growing fashion brand struggling with high customer acquisition costs and low return on ad spend. Their conversion rate was below industry standards at 1.2%, and they were spending heavily on cold traffic with minimal retargeting strategy.",
      metrics: [
        { label: "Starting ROAS", value: "1.8x" },
        { label: "Conversion Rate", value: "1.2%" },
        { label: "CAC", value: "$45" }
      ]
    },
    
    solution: {
      title: "Our Strategy",
      points: [
        {
          title: "Advanced Tracking Setup",
          description: "Implemented server-side tracking and custom events to capture every micro-conversion and build better audiences."
        },
        {
          title: "Retargeting Funnel Architecture",
          description: "Built a 7-stage retargeting funnel targeting users based on specific actions and engagement levels."
        },
        {
          title: "Landing Page Optimization",
          description: "Redesigned product pages with social proof, urgency elements, and streamlined checkout process."
        },
        {
          title: "Creative Testing Framework",
          description: "Systematic testing of ad creatives with focus on UGC-style content and testimonial-driven ads."
        }
      ]
    },
    
    results: {
      title: "The Results",
      metrics: [
        { label: "ROAS", value: "5.2x", change: "+189%" },
        { label: "Conversion Rate", value: "3.8%", change: "+217%" },
        { label: "CAC", value: "$18", change: "-60%" },
        { label: "Revenue", value: "$340K", change: "First 90 Days" }
      ]
    },
    
    testimonial: {
      text: "Working with this team transformed our entire advertising approach. The results speak for themselves - we've never seen performance like this.",
      author: "Sarah Mitchell",
      role: "Marketing Director"
    },
    
    images: {
      hero: "/case-studies/fashion-hero.jpg",
      before: "/case-studies/fashion-before.jpg",
      after: "/case-studies/fashion-after.jpg",
      screenshots: [
        "/case-studies/fashion-1.jpg",
        "/case-studies/fashion-2.jpg",
        "/case-studies/fashion-3.jpg"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-primary/60 py-32">
      <div className="container mx-auto px-4">
        
        {/* Back Button */}
        <motion.button
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          onClick={() => router.push("/work")}
          className="flex items-center gap-2 text-white/60 hover:text-accent transition-all mb-8"
        >
          <RxArrowTopRight className="rotate-180" />
          Back to Work
        </motion.button>

        {/* Hero Section */}
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mb-16"
        >
          <div className="flex flex-wrap gap-3 mb-6">
            {caseStudy.services.map((service, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm border border-accent/20"
              >
                {service}
              </span>
            ))}
          </div>
          
          <h1 className="h1 mb-4">
            {caseStudy.title}
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mb-8">
            {caseStudy.subtitle}
          </p>
          
          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <span className="text-white/60">Industry:</span>
              <span className="text-white ml-2">{caseStudy.industry}</span>
            </div>
            <div>
              <span className="text-white/60">Duration:</span>
              <span className="text-white ml-2">{caseStudy.duration}</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mb-20 rounded-lg overflow-hidden"
        >
          <img
            src={caseStudy.images.hero}
            alt={caseStudy.title}
            className="w-full h-[400px] object-cover"
          />
        </motion.div>

        {/* Challenge Section */}
        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mb-20"
        >
          <h2 className="h2 mb-6">{caseStudy.challenge.title}</h2>
          <p className="text-lg text-white/80 max-w-3xl mb-8 leading-relaxed">
            {caseStudy.challenge.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudy.challenge.metrics.map((metric, i) => (
              <div
                key={i}
                className="bg-[rgba(65,47,123,0.15)] rounded-lg p-6 border border-white/10"
              >
                <div className="text-3xl font-bold text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-white/60">{metric.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Solution Section */}
        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mb-20"
        >
          <h2 className="h2 mb-10">{caseStudy.solution.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudy.solution.points.map((point, i) => (
              <div
                key={i}
                className="bg-[rgba(65,47,123,0.15)] rounded-lg p-6 border border-white/10 hover:border-accent/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-all">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {point.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Screenshots Grid */}
        <motion.div
          variants={fadeIn("up", 0.7)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudy.images.screenshots.map((img, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden border border-white/10 hover:border-accent/30 transition-all"
              >
                <img
                  src={img}
                  alt={`Screenshot ${i + 1}`}
                  className="w-full h-[250px] object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          variants={fadeIn("up", 0.8)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mb-20"
        >
          <h2 className="h2 mb-10 text-center">{caseStudy.results.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {caseStudy.results.metrics.map((metric, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg p-8 border border-accent/30 text-center"
              >
                <div className="text-4xl font-bold text-accent mb-2">
                  {metric.value}
                </div>
                <div className="text-white/90 font-medium mb-1">
                  {metric.label}
                </div>
                <div className="text-sm text-green-400">
                  {metric.change}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          variants={fadeIn("up", 0.9)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mb-20"
        >
          <div className="bg-[rgba(65,47,123,0.15)] rounded-lg p-10 border border-white/10 max-w-4xl mx-auto">
            <div className="text-6xl text-accent/30 mb-4">"</div>
            <p className="text-2xl text-white/90 mb-6 italic leading-relaxed">
              {caseStudy.testimonial.text}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/20" />
              <div>
                <div className="text-white font-semibold">
                  {caseStudy.testimonial.author}
                </div>
                <div className="text-white/60 text-sm">
                  {caseStudy.testimonial.role}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeIn("up", 1.0)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to achieve similar results?
          </h3>
          <button className="btn rounded-full border border-white/50 max-w-[170px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group mx-auto">
            <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500">
              Let's talk
            </span>
            <RxArrowTopRight className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]" />
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default CaseStudyPage;
