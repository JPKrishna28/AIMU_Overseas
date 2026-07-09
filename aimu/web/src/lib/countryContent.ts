export type QuickFact = { label: string; value: string };
export type FeaturePoint = { icon: string; title: string; description: string };
export type CourseCategoryIcon =
  | "business"
  | "computing"
  | "engineering"
  | "healthcare"
  | "science"
  | "law"
  | "arts";
export type CourseCategory = { category: string; icon: CourseCategoryIcon; courses: string[] };
export type UniversityCard = {
  name: string;
  qsRanking: string;
  city: string;
  popularCourses: string[];
  scholarship?: string;
};
export type FeeRow = { program: string; fees: string };
export type ExpenseRow = { expense: string; cost: string };
export type SalaryRow = { industry: string; fresher: string; experienced: string };
export type Faq = { question: string; answer: string };
export type AdmissionStep = { step: number; title: string };

export type CountryContent = {
  slug: string;
  country: string;
  flagEmoji: string;
  heroTitle: string;
  heroSubtitle: string;
  overview: string[];
  quickFacts: QuickFact[];
  whyChoose: FeaturePoint[];
  whyStudyPoints: string[];
  educationSystem: { level: string; details: string[] }[];
  popularCourses: CourseCategory[];
  topUniversities: UniversityCard[];
  tuitionFees: FeeRow[];
  costOfLiving: ExpenseRow[];
  costOfLivingTotals: { label: string; value: string }[];
  studentEarnings: { label: string; value: string }[];
  scholarships: string[];
  admissionRequirements: { level: string; items: string[] }[];
  admissionProcess: AdmissionStep[];
  jobSectors: string[];
  graduateSalaries: SalaryRow[];
  studentLife: string[];
  visaInformation: string[];
  faqs: Faq[];
  aimuServices: string[];
};

const uk: CountryContent = {
  slug: "uk",
  country: "United Kingdom",
  flagEmoji: "🇬🇧",
  heroTitle: "Study in the United Kingdom",
  heroSubtitle:
    "Transform your future with a world-class UK education. Study at globally ranked universities, gain international work experience, and build a successful global career.",
  overview: [
    "The United Kingdom (UK) is one of the world's most popular destinations for international students. Every year, thousands of students choose the UK for its high-quality education, globally recognised universities, and excellent career opportunities.",
    "Studying in the UK gives you more than just a degree. It helps you develop practical skills, gain international exposure, and prepare for a successful global career. With modern campuses, experienced lecturers, and students from around the world, you'll enjoy a rich academic and cultural experience.",
    "One of the biggest advantages of studying in the UK is the shorter duration of courses. Most bachelor's degrees take 3 years, and many master's degrees can be completed in just 1 year, helping you save both time and money.",
    "International students can also work up to 20 hours per week during their studies (subject to visa conditions), allowing them to gain valuable work experience while supporting their living expenses. After graduation, eligible students may stay in the UK under the Graduate Route to gain international work experience and build their careers.",
    "Whether your goal is to become an engineer, business leader, healthcare professional, IT expert, or researcher, the UK offers excellent opportunities to achieve your ambitions.",
  ],
  quickFacts: [
    { label: "Capital", value: "London" },
    { label: "Currency", value: "British Pound (£)" },
    { label: "Language", value: "English" },
    { label: "Popular Intake", value: "September, January, May" },
    { label: "Average Study Duration", value: "1 Year (Master's), 3 Years (Bachelor's)" },
    { label: "Work During Studies", value: "20 Hours/Week" },
    { label: "Post Study Work Visa", value: "Up to 2 Years" },
    { label: "Top Student Cities", value: "London, Manchester, Birmingham, Leeds, Glasgow" },
    { label: "Time Difference from India", value: "+4.5 to +5.5 Hours" },
  ],
  whyChoose: [
    {
      icon: "🎓",
      title: "World-Class Education",
      description: "Study at internationally recognised universities with high academic standards.",
    },
    {
      icon: "🌍",
      title: "Globally Recognised Degrees",
      description: "UK qualifications are respected by employers and universities across the world.",
    },
    {
      icon: "⏳",
      title: "Shorter Course Duration",
      description: "Complete most bachelor's degrees in 3 years and master's degrees in just 1 year.",
    },
    {
      icon: "💼",
      title: "Part-Time Work Opportunities",
      description: "Work while studying to gain experience and earn extra income.",
    },
    {
      icon: "🚀",
      title: "Post-Study Work Opportunities",
      description: "Eligible graduates can stay in the UK to gain valuable professional experience.",
    },
    {
      icon: "🤝",
      title: "Multicultural Environment",
      description: "Meet people from different countries and experience diverse cultures.",
    },
    {
      icon: "🏙️",
      title: "Modern Cities & Student Life",
      description: "Enjoy vibrant cities, excellent public transport, and a wide range of student activities.",
    },
    {
      icon: "📈",
      title: "Strong Career Prospects",
      description:
        "The UK offers excellent opportunities in technology, business, healthcare, engineering, finance, and many other industries.",
    },
  ],
  whyStudyPoints: [
    "Globally recognized universities",
    "Shorter degree duration",
    "Excellent employment opportunities",
    "Strong graduate salaries",
    "Multicultural environment",
    "High quality education",
    "Access to Europe",
    "Modern research facilities",
    "Scholarships available",
    "Excellent healthcare",
  ],
  educationSystem: [
    {
      level: "Bachelor's Degree",
      details: ["Duration: 3 years (typical)", "Eligibility: 12th grade / equivalent, IELTS/PTE", "Tuition Fees: £12,000–£30,000/year"],
    },
    {
      level: "Master's Degree",
      details: ["Duration: 1 year (most programs)", "Popular Programs: Business, Computing, Engineering, Healthcare"],
    },
    { level: "MBA", details: ["Duration: 1 year", "Work experience often required"] },
    { level: "Research / PhD", details: ["Duration: 3–4 years", "Research proposal and supervisor required"] },
    { level: "Foundation Programs", details: ["Pathway to bachelor's degrees", "Tuition Fees: £10,000–£18,000/year"] },
  ],
  popularCourses: [
    {
      category: "Business",
      icon: "business",
      courses: [
        "MBA",
        "International Business",
        "Finance",
        "Accounting",
        "Marketing",
        "Human Resource Management",
        "Project Management",
        "Supply Chain",
      ],
    },
    {
      category: "Computing & IT",
      icon: "computing",
      courses: [
        "Computer Science",
        "Artificial Intelligence",
        "Machine Learning",
        "Cyber Security",
        "Software Engineering",
        "Data Science",
        "Cloud Computing",
        "Business Analytics",
        "Game Development",
        "Information Systems",
      ],
    },
    {
      category: "Engineering",
      icon: "engineering",
      courses: [
        "Mechanical",
        "Civil",
        "Electrical",
        "Automobile",
        "Robotics",
        "Chemical",
        "Biomedical",
        "Mechatronics",
        "Renewable Energy",
        "Construction Management",
      ],
    },
    {
      category: "Healthcare",
      icon: "healthcare",
      courses: [
        "Nursing",
        "Public Health",
        "Healthcare Management",
        "Biomedical Science",
        "Physiotherapy",
        "Occupational Therapy",
        "Pharmacy",
        "Psychology",
      ],
    },
    {
      category: "Science",
      icon: "science",
      courses: ["Biotechnology", "Environmental Science", "Food Science", "Chemistry", "Physics", "Mathematics"],
    },
    {
      category: "Law",
      icon: "law",
      courses: ["LLM", "International Law", "Corporate Law", "Commercial Law"],
    },
    {
      category: "Creative Arts",
      icon: "arts",
      courses: [
        "Graphic Design",
        "Animation",
        "Architecture",
        "Fashion Design",
        "Interior Design",
        "Film Production",
        "Photography",
        "Music",
      ],
    },
  ],
  topUniversities: [
    {
      name: "University of Manchester",
      qsRanking: "World Top 40",
      city: "Manchester",
      popularCourses: ["Engineering", "Business", "Computer Science"],
      scholarship: "Up to £10,000",
    },
  ],
  tuitionFees: [
    { program: "Foundation", fees: "£10,000–£18,000" },
    { program: "Bachelor's", fees: "£12,000–£30,000" },
    { program: "Master's", fees: "£14,000–£35,000" },
    { program: "MBA", fees: "£20,000–£60,000" },
    { program: "Medicine", fees: "£30,000–£60,000" },
  ],
  costOfLiving: [
    { expense: "Accommodation", cost: "£500–£1,200" },
    { expense: "Food", cost: "£180–£350" },
    { expense: "Transportation", cost: "£60–£150" },
    { expense: "Internet & Mobile", cost: "£30–£60" },
    { expense: "Utilities", cost: "£70–£150" },
    { expense: "Personal Expenses", cost: "£100–£300" },
    { expense: "Entertainment", cost: "£80–£200" },
  ],
  costOfLivingTotals: [
    { label: "Outside London", value: "£900–£1,500/month" },
    { label: "London", value: "£1,400–£2,200/month" },
  ],
  studentEarnings: [
    { label: "Average Wage", value: "£12–£16/hour" },
    { label: "Maximum Hours", value: "20 Hours per Week" },
    { label: "Potential Monthly Income", value: "£900–£1,300" },
    { label: "Holiday Period", value: "Full-time work permitted subject to visa conditions" },
  ],
  scholarships: [
    "Chevening Scholarships",
    "Commonwealth Scholarships",
    "GREAT Scholarships",
    "University Merit Scholarships",
    "Sports Scholarships",
    "Early Bird Discounts",
  ],
  admissionRequirements: [
    {
      level: "Undergraduate",
      items: ["Academic Transcripts", "Passport", "IELTS/PTE", "SOP", "LOR", "Resume (if applicable)"],
    },
    {
      level: "Master's",
      items: [
        "Bachelor's Degree",
        "Academic Transcripts",
        "English Test",
        "Passport",
        "SOP",
        "LOR",
        "Resume",
        "Experience (MBA)",
        "Portfolio (Design)",
      ],
    },
  ],
  admissionProcess: [
    { step: 1, title: "Free Profile Review" },
    { step: 2, title: "University & Scholarship Shortlisting" },
    { step: 3, title: "Application Submission" },
    { step: 4, title: "Visa & Accommodation Support" },
    { step: 5, title: "Pre-Departure & UK Assistance" },
  ],
  jobSectors: [
    "Artificial Intelligence",
    "Data Science",
    "Software Engineering",
    "Cybersecurity",
    "Finance",
    "Banking",
    "Healthcare",
    "Nursing",
    "Civil Engineering",
    "Mechanical Engineering",
    "Renewable Energy",
    "Construction",
    "Business Consulting",
    "Marketing",
    "Logistics",
    "Hospitality",
    "Education",
    "Biotechnology",
  ],
  graduateSalaries: [
    { industry: "Software Engineer", fresher: "£32k–£45k", experienced: "£55k–£90k" },
    { industry: "Data Scientist", fresher: "£35k–£48k", experienced: "£60k–£100k" },
    { industry: "AI Engineer", fresher: "£40k–£55k", experienced: "£70k–£120k" },
    { industry: "Cyber Security", fresher: "£35k–£50k", experienced: "£65k–£110k" },
    { industry: "Business Analyst", fresher: "£30k–£42k", experienced: "£55k–£85k" },
    { industry: "Accountant", fresher: "£28k–£40k", experienced: "£50k–£80k" },
    { industry: "Mechanical Engineer", fresher: "£30k–£42k", experienced: "£50k–£75k" },
    { industry: "Civil Engineer", fresher: "£30k–£45k", experienced: "£50k–£80k" },
    { industry: "Nurse", fresher: "£29k–£37k", experienced: "£40k–£60k" },
    { industry: "Marketing", fresher: "£28k–£38k", experienced: "£45k–£70k" },
  ],
  studentLife: [
    "Universities provide modern libraries, sports facilities, clubs, societies, and career support for a balanced and rewarding experience.",
    "Explore historic landmarks, beautiful countryside, vibrant cities, and cultural festivals while making friends from all over the world.",
    "Excellent public transport connects campuses, city centres, and the rest of the country.",
    "The UK is a safe, welcoming, and culturally diverse place to live and study.",
    "Students can access healthcare through the NHS after paying the Immigration Health Surcharge.",
    "Accommodation options include university halls, private student housing, shared apartments, and homestays.",
  ],
  visaInformation: [
    "Student visa requirements: a CAS (Confirmation of Acceptance for Studies) from a licensed sponsor university, valid passport, and supporting documents.",
    "Financial evidence: show tuition fees plus living costs (28-day bank statement requirement applies).",
    "English language requirements: IELTS, PTE, or an accepted equivalent.",
    "Biometrics: book and attend a biometrics appointment as part of the application.",
    "Visa processing time: typically 3–6 weeks from application to decision.",
    "Immigration Health Surcharge (if applicable) gives access to the NHS during your stay.",
    "Working rights: up to 20 hours per week during term, full-time during holidays (subject to visa conditions).",
    "Dependants: may accompany students on eligible courses (where applicable).",
  ],
  faqs: [
    {
      question: "Can I work while studying?",
      answer:
        "Yes. International students can work up to 20 hours per week during term time and full-time during holidays, subject to visa conditions.",
    },
    {
      question: "Is IELTS mandatory?",
      answer:
        "Most universities require IELTS or PTE, but some accept alternatives such as prior English-medium education or university-approved tests. We can help you find the right option.",
    },
    {
      question: "Can I stay after graduation?",
      answer:
        "Yes. Eligible graduates can stay in the UK under the Graduate Route for up to 2 years to work and build their careers.",
    },
    {
      question: "How much money do I need?",
      answer:
        "Plan for tuition fees (£12,000–£35,000/year for most programs) plus living costs of £900–£1,500/month outside London or £1,400–£2,200/month in London.",
    },
    {
      question: "Which intake is best?",
      answer:
        "September is the main intake with the widest course choice. January and May intakes are also popular and offer flexibility if you miss September.",
    },
    {
      question: "Can my spouse accompany me?",
      answer:
        "Dependants may accompany students on eligible courses (where applicable). Rules vary by program level — contact us for guidance on your specific case.",
    },
    {
      question: "Are scholarships available?",
      answer:
        "Yes. Options include Chevening, Commonwealth, and GREAT Scholarships, plus university merit scholarships, sports scholarships, and early bird discounts.",
    },
    {
      question: "What are the chances of getting a job?",
      answer:
        "The UK has strong demand in AI, data science, software, cybersecurity, finance, healthcare, engineering, and more. Graduate starting salaries typically range from £28k–£55k depending on field.",
    },
    {
      question: "How long does the visa take?",
      answer: "Student visa processing typically takes 3–6 weeks from application to decision.",
    },
    {
      question: "Can I get permanent residency?",
      answer:
        "The Graduate Route and subsequent skilled work visas can lead to settlement over time. We can explain the pathway based on your goals.",
    },
  ],
  aimuServices: [
    "Free career counselling",
    "University selection",
    "Admission support",
    "Scholarship guidance",
    "SOP & LOR assistance",
    "Education loan support",
    "Visa documentation",
    "Mock visa interviews",
    "Accommodation assistance",
    "Pre-departure briefing",
    "Airport pickup support (where available)",
    "Post-arrival guidance",
  ],
};

export const countryContent: Record<string, CountryContent> = {
  uk,
  "united-kingdom": uk,
};
