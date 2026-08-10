"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

type Course = {
  name: string;
  /* Material symbol + gradient pair stand in for photography on the course card. */
  symbol: string;
  gradient: string;
  overview: string;
  learn: string[];
  idealFor: string;
  careers: string[];
};

const COURSES: Course[] = [
  {
    name: "Business & Management",
    symbol: "trending_up",
    gradient: "from-[#0D182A] to-[#33507a]",
    overview:
      "One of the most popular study options in the UK, designed for students who want to build leadership, strategic thinking and decision-making skills. Combines theoretical knowledge with practical business experience.",
    learn: ["Business Strategy", "Marketing", "Finance", "Human Resource Management", "Operations Management", "Leadership & Entrepreneurship"],
    idealFor: "Students from any academic background who are interested in business, management or entrepreneurship.",
    careers: ["Business Analyst", "Project Manager", "Operations Manager", "Marketing Executive", "Business Consultant", "Entrepreneur"],
  },
  {
    name: "Computer Science",
    symbol: "terminal",
    gradient: "from-[#12263f] to-[#2f6f8f]",
    overview:
      "Focuses on designing, developing and improving software systems, applications and digital technologies, with practical, industry-focused projects.",
    learn: ["Programming", "Software Development", "Database Systems", "Computer Networks", "Cloud Computing", "Web & Mobile Development"],
    idealFor: "Students passionate about technology, programming and software development.",
    careers: ["Software Engineer", "Full Stack Developer", "Systems Analyst", "Cloud Engineer", "DevOps Engineer", "IT Consultant"],
  },
  {
    name: "Data Science & Analytics",
    symbol: "insights",
    gradient: "from-[#14304a] to-[#3b7d7d]",
    overview:
      "One of the fastest-growing fields globally. Students learn how to collect, analyse and interpret data to help organisations make informed decisions.",
    learn: ["Data Analysis", "Machine Learning", "Artificial Intelligence", "Python & R Programming", "Data Visualisation", "Big Data Technologies"],
    idealFor: "Students who enjoy mathematics, statistics, technology and solving real-world problems using data.",
    careers: ["Data Scientist", "Data Analyst", "Business Intelligence Analyst", "Machine Learning Engineer", "AI Specialist", "Data Engineer"],
  },
  {
    name: "Artificial Intelligence",
    symbol: "neurology",
    gradient: "from-[#1b2a4a] to-[#5b4b8a]",
    overview:
      "Explores how computers can simulate human intelligence through machine learning, automation and intelligent systems. The UK is a leading destination for AI research and innovation.",
    learn: ["Machine Learning", "Deep Learning", "Computer Vision", "Natural Language Processing", "Robotics", "AI Ethics"],
    idealFor: "Students interested in advanced computing, automation and emerging technologies.",
    careers: ["AI Engineer", "Machine Learning Engineer", "Robotics Engineer", "NLP Engineer", "AI Research Scientist"],
  },
  {
    name: "Cyber Security",
    symbol: "shield_lock",
    gradient: "from-[#101f36] to-[#2b5f7a]",
    overview:
      "Focuses on protecting digital systems, networks and sensitive information from cyber threats. Cybersecurity professionals are in high demand across all industries.",
    learn: ["Ethical Hacking", "Network Security", "Digital Forensics", "Risk Management", "Information Security", "Cyber Law"],
    idealFor: "Students interested in technology, ethical hacking and protecting digital systems.",
    careers: ["Cyber Security Analyst", "Ethical Hacker", "Security Consultant", "Information Security Manager", "Penetration Tester"],
  },
  {
    name: "Engineering",
    symbol: "engineering",
    gradient: "from-[#1d2b3a] to-[#6b5a3a]",
    overview:
      "Combines science, mathematics and innovation to design and build solutions for real-world challenges, with modern laboratories and industry placements.",
    learn: ["Engineering Design", "Manufacturing", "CAD & Simulation", "Robotics", "Materials Science", "Project Management"],
    idealFor: "Students interested in Mechanical, Civil, Electrical & Electronic, Automotive or Aerospace Engineering.",
    careers: ["Design Engineer", "Mechanical Engineer", "Civil Engineer", "Electrical Engineer", "Project Engineer"],
  },
  {
    name: "Public Health",
    symbol: "health_and_safety",
    gradient: "from-[#12303a] to-[#2f7a6a]",
    overview:
      "Focuses on improving community health through disease prevention, health education and healthcare policy. An excellent choice for healthcare management and global health.",
    learn: ["Epidemiology", "Global Health", "Healthcare Systems", "Health Promotion", "Public Health Policy", "Research Methods"],
    idealFor: "Healthcare professionals and graduates interested in improving population health.",
    careers: ["Public Health Officer", "Health Promotion Specialist", "Epidemiologist", "Healthcare Consultant", "Health Policy Analyst"],
  },
  {
    name: "Finance & Accounting",
    symbol: "account_balance",
    gradient: "from-[#14243f] to-[#4a6b3a]",
    overview:
      "Prepares students to manage financial resources, investments and business performance, combining academic learning with practical financial analysis.",
    learn: ["Financial Management", "Corporate Finance", "Investment Analysis", "Taxation", "Auditing", "Financial Reporting"],
    idealFor: "Students interested in banking, investment and corporate finance.",
    careers: ["Financial Analyst", "Accountant", "Investment Analyst", "Auditor", "Banking Professional", "Finance Manager"],
  },
  {
    name: "Digital Marketing",
    symbol: "campaign",
    gradient: "from-[#22203f] to-[#8a5a3a]",
    overview:
      "Focuses on promoting brands through online platforms using modern marketing strategies, data analytics and creative content — one of the fastest-growing career fields worldwide.",
    learn: ["Search Engine Optimisation (SEO)", "Social Media Marketing", "Google Ads", "Content Marketing", "Email Marketing", "Marketing Analytics"],
    idealFor: "Students who enjoy creativity, business, technology and digital communication.",
    careers: ["Digital Marketing Executive", "SEO Specialist", "Social Media Manager", "Content Strategist", "Marketing Analyst"],
  },
  {
    name: "Supply Chain & Logistics",
    symbol: "local_shipping",
    gradient: "from-[#152436] to-[#3a5f8a]",
    overview:
      "Focuses on planning, managing and delivering products efficiently from manufacturers to customers — essential for global trade, retail and manufacturing industries.",
    learn: ["Logistics Management", "Procurement", "Inventory Control", "International Trade", "Warehouse Operations", "Supply Chain Analytics"],
    idealFor: "Students interested in business operations, logistics and global commerce.",
    careers: ["Supply Chain Manager", "Logistics Coordinator", "Procurement Specialist", "Operations Manager", "Inventory Analyst"],
  },
];

function CourseTile({ course, index }: { course: Course; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={index * 60} className="h-full">
      <div className="hover-lift flex h-full flex-col overflow-hidden rounded-2xl border border-light-gray bg-white shadow-sm">
        <div
          aria-hidden
          className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${course.gradient}`}
        >
          <span className="material-symbols-outlined text-6xl text-white/90">{course.symbol}</span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <h3 className="font-heading font-semibold text-navy">{course.name}</h3>

          <p className="text-sm text-navy/70">{course.overview}</p>

        {open && (
          <div className="flex flex-col gap-4 text-sm text-navy/70">
            <div>
              <p className="font-semibold text-navy">What You&rsquo;ll Learn</p>
              <ul className="mt-1 list-inside list-disc">
                {course.learn.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-navy">Ideal For</p>
              <p>{course.idealFor}</p>
            </div>
            <div>
              <p className="font-semibold text-navy">Career Opportunities</p>
              <ul className="mt-1 list-inside list-disc">
                {course.careers.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mt-auto rounded bg-navy py-3 text-center text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-navy/90"
          >
            {open ? "Show Less" : "Learn More"}
          </button>
        </div>
      </div>
    </Reveal>
  );
}

export function PopularCourses() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
      <Reveal>
        <h2 className="mb-2 text-center text-2xl font-bold text-navy sm:text-3xl">Popular Courses</h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-navy/60">
          The subject areas our students ask for most — with what you&rsquo;ll study, who each course
          suits, and where it can take your career.
        </p>
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {COURSES.map((course, index) => (
          <CourseTile key={course.name} course={course} index={index} />
        ))}
      </div>
    </section>
  );
}
