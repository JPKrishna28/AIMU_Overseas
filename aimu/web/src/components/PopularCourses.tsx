"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

type Course = {
  name: string;
  icon: string;
  overview: string;
  learn: string[];
  idealFor: string;
  careers: string[];
};

const COURSES: Course[] = [
  {
    name: "Business & Management",
    icon: "💼",
    overview:
      "One of the most popular study options in the UK, designed for students who want to build leadership, strategic thinking and decision-making skills. Combines theoretical knowledge with practical business experience.",
    learn: ["Business Strategy", "Marketing", "Finance", "Human Resource Management", "Operations Management", "Leadership & Entrepreneurship"],
    idealFor: "Students from any academic background who are interested in business, management or entrepreneurship.",
    careers: ["Business Analyst", "Project Manager", "Operations Manager", "Marketing Executive", "Business Consultant", "Entrepreneur"],
  },
  {
    name: "Computer Science",
    icon: "💻",
    overview:
      "Focuses on designing, developing and improving software systems, applications and digital technologies, with practical, industry-focused projects.",
    learn: ["Programming", "Software Development", "Database Systems", "Computer Networks", "Cloud Computing", "Web & Mobile Development"],
    idealFor: "Students passionate about technology, programming and software development.",
    careers: ["Software Engineer", "Full Stack Developer", "Systems Analyst", "Cloud Engineer", "DevOps Engineer", "IT Consultant"],
  },
  {
    name: "Data Science & Analytics",
    icon: "📊",
    overview:
      "One of the fastest-growing fields globally. Students learn how to collect, analyse and interpret data to help organisations make informed decisions.",
    learn: ["Data Analysis", "Machine Learning", "Artificial Intelligence", "Python & R Programming", "Data Visualisation", "Big Data Technologies"],
    idealFor: "Students who enjoy mathematics, statistics, technology and solving real-world problems using data.",
    careers: ["Data Scientist", "Data Analyst", "Business Intelligence Analyst", "Machine Learning Engineer", "AI Specialist", "Data Engineer"],
  },
  {
    name: "Artificial Intelligence",
    icon: "🤖",
    overview:
      "Explores how computers can simulate human intelligence through machine learning, automation and intelligent systems. The UK is a leading destination for AI research and innovation.",
    learn: ["Machine Learning", "Deep Learning", "Computer Vision", "Natural Language Processing", "Robotics", "AI Ethics"],
    idealFor: "Students interested in advanced computing, automation and emerging technologies.",
    careers: ["AI Engineer", "Machine Learning Engineer", "Robotics Engineer", "NLP Engineer", "AI Research Scientist"],
  },
  {
    name: "Cyber Security",
    icon: "🔒",
    overview:
      "Focuses on protecting digital systems, networks and sensitive information from cyber threats. Cybersecurity professionals are in high demand across all industries.",
    learn: ["Ethical Hacking", "Network Security", "Digital Forensics", "Risk Management", "Information Security", "Cyber Law"],
    idealFor: "Students interested in technology, ethical hacking and protecting digital systems.",
    careers: ["Cyber Security Analyst", "Ethical Hacker", "Security Consultant", "Information Security Manager", "Penetration Tester"],
  },
  {
    name: "Engineering",
    icon: "⚙️",
    overview:
      "Combines science, mathematics and innovation to design and build solutions for real-world challenges, with modern laboratories and industry placements.",
    learn: ["Engineering Design", "Manufacturing", "CAD & Simulation", "Robotics", "Materials Science", "Project Management"],
    idealFor: "Students interested in Mechanical, Civil, Electrical & Electronic, Automotive or Aerospace Engineering.",
    careers: ["Design Engineer", "Mechanical Engineer", "Civil Engineer", "Electrical Engineer", "Project Engineer"],
  },
  {
    name: "Public Health",
    icon: "🏥",
    overview:
      "Focuses on improving community health through disease prevention, health education and healthcare policy. An excellent choice for healthcare management and global health.",
    learn: ["Epidemiology", "Global Health", "Healthcare Systems", "Health Promotion", "Public Health Policy", "Research Methods"],
    idealFor: "Healthcare professionals and graduates interested in improving population health.",
    careers: ["Public Health Officer", "Health Promotion Specialist", "Epidemiologist", "Healthcare Consultant", "Health Policy Analyst"],
  },
  {
    name: "Finance & Accounting",
    icon: "💰",
    overview:
      "Prepares students to manage financial resources, investments and business performance, combining academic learning with practical financial analysis.",
    learn: ["Financial Management", "Corporate Finance", "Investment Analysis", "Taxation", "Auditing", "Financial Reporting"],
    idealFor: "Students interested in banking, investment and corporate finance.",
    careers: ["Financial Analyst", "Accountant", "Investment Analyst", "Auditor", "Banking Professional", "Finance Manager"],
  },
  {
    name: "Digital Marketing",
    icon: "📣",
    overview:
      "Focuses on promoting brands through online platforms using modern marketing strategies, data analytics and creative content — one of the fastest-growing career fields worldwide.",
    learn: ["Search Engine Optimisation (SEO)", "Social Media Marketing", "Google Ads", "Content Marketing", "Email Marketing", "Marketing Analytics"],
    idealFor: "Students who enjoy creativity, business, technology and digital communication.",
    careers: ["Digital Marketing Executive", "SEO Specialist", "Social Media Manager", "Content Strategist", "Marketing Analyst"],
  },
  {
    name: "Supply Chain & Logistics",
    icon: "📦",
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
      <div className="hover-lift flex h-full flex-col gap-4 rounded-2xl border border-light-gray bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 rounded-full bg-light-gray px-5 py-3">
          <span aria-hidden className="text-2xl">
            {course.icon}
          </span>
          <span className="font-heading font-semibold text-navy">{course.name}</span>
        </div>

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
    </Reveal>
  );
}

export function PopularCourses() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
      <Reveal>
        <h2 className="mb-2 text-center text-2xl font-bold text-navy sm:text-3xl">Popular Courses</h2>
        <p className="mb-10 text-center text-navy/60">
          List out the primary or important courses that students look for.
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
