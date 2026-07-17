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
  /** Short name used in headings like "UK Education System" */
  shortName: string;
  /** Name with article for prose headings, e.g. "the UK", "Ireland" */
  nameWithArticle: string;
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
  shortName: "UK",
  nameWithArticle: "the UK",
  flagEmoji: "🇬🇧",
  heroTitle: "Study in the United Kingdom",
  heroSubtitle:
    "Transform your future with a world-class UK education. Study at globally ranked universities, gain international work experience, and build a successful global career.",
  overview: [
    "The United Kingdom is one of the most popular study destinations for international students. It is known for high-quality education, globally recognised universities and strong career opportunities.",
    "Most bachelor's degrees take three years, while many master's degrees can be completed in one year. This helps students save time and reduce the overall cost of studying abroad.",
    "International students can experience modern campuses, multicultural communities and practical learning opportunities.",
    "Eligible students may also work part-time during their studies, subject to their visa conditions. After graduation, eligible students may apply for the Graduate visa to gain international work experience and build their careers.",
  ],
  quickFacts: [
    { label: "Capital", value: "London" },
    { label: "Currency", value: "Pound Sterling — GBP (£)" },
    { label: "Language", value: "English" },
    { label: "Countries", value: "England, Scotland, Wales and Northern Ireland" },
    { label: "Popular Intake", value: "September (main), January and selected spring intakes" },
    {
      label: "Average Study Duration",
      value: "1 Year (Taught Master's), 3 Years (Bachelor's; commonly 4 in Scotland)",
    },
    { label: "Work During Studies", value: "Up to 20 Hours/Week during term time" },
    {
      label: "Graduate Visa",
      value: "2 years (applications before 1 Jan 2027); 18 months (from 1 Jan 2027); 3 years for PhD",
    },
    {
      label: "Top Student Cities",
      value: "London, Manchester, Birmingham, Leeds, Glasgow, Edinburgh, Sheffield, Nottingham, Newcastle",
    },
    {
      label: "Time Difference from India",
      value: "4.5 Hours behind (summer), 5.5 Hours behind (winter)",
    },
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
      description:
        "Eligible graduates may apply for the Graduate visa — up to 2 years for applications before 1 January 2027 (18 months from then), and 3 years for PhD graduates.",
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
        "Supply Chain Management",
        "Hospitality Management",
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
    { program: "Medicine", fees: "£30,000–£60,000 or more" },
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
    { label: "Minimum Wage — Age 21 and over", value: "£12.71/hour (from 1 April 2026)" },
    { label: "Minimum Wage — Age 18–20", value: "£10.85/hour (from 1 April 2026)" },
    { label: "Minimum Wage — Under 18", value: "£8.00/hour (from 1 April 2026)" },
    { label: "Eligible Apprentice Rate", value: "£8.00/hour (from 1 April 2026)" },
    { label: "Maximum Hours", value: "Up to 20 Hours per Week during term time" },
    { label: "Holiday Period", value: "Full-time work permitted during official university holidays" },
  ],
  scholarships: [
    "Chevening Scholarships",
    "Commonwealth Scholarships",
    "GREAT Scholarships",
    "University Merit Scholarships",
    "International Student Scholarships",
    "Sports Scholarships",
    "Early Payment Discounts",
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
  // Career-wide starter-to-experienced ranges published by the UK National
  // Careers Service — not guaranteed graduate salaries.
  graduateSalaries: [
    { industry: "Data Scientist", fresher: "£32,000", experienced: "£83,000" },
    { industry: "Data Analyst / Statistician", fresher: "£28,000", experienced: "£65,000" },
    { industry: "Artificial Intelligence Engineer", fresher: "£35,000", experienced: "£75,000" },
    { industry: "IT Security Coordinator", fresher: "£35,000", experienced: "£76,000" },
    { industry: "Cyber Intelligence Officer", fresher: "£25,000", experienced: "£50,000" },
    { industry: "Forensic Computer Analyst", fresher: "£30,000", experienced: "£62,000" },
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
    "Students usually need: a valid passport, university offer, CAS letter, financial evidence, English-language evidence, required supporting documents, and Immigration Health Surcharge payment.",
    "Financial requirement (maintenance funds): £1,529 per month for up to nine months in London (maximum £13,761); £1,171 per month for up to nine months outside London (maximum £10,539).",
    "English language requirements: IELTS, PTE, TOEFL, or an accepted equivalent.",
    "Visa applications made outside the UK are commonly processed within approximately three weeks, although some applications may take longer.",
    "Immigration Health Surcharge payment gives access to the NHS during your stay.",
    "Working rights: up to 20 hours per week during term time, full-time during official university holidays (subject to visa conditions).",
    "Dependants: generally allowed only for eligible postgraduate research students and certain government-sponsored students.",
    "Graduate visa after your course: up to 2 years for eligible applications before 1 January 2027 (18 months for most from 1 January 2027); 3 years for eligible PhD graduates. It does not guarantee a job or permanent residence.",
  ],
  faqs: [
    {
      question: "Can I work while studying?",
      answer: "Eligible students can usually work up to 20 hours per week during term time.",
    },
    {
      question: "Is IELTS compulsory?",
      answer:
        "Not always. Some universities accept PTE, TOEFL, previous English-medium education or university-approved tests.",
    },
    {
      question: "Which intake is best?",
      answer:
        "September normally offers the widest range of courses. January is also available at many universities.",
    },
    {
      question: "Can my spouse accompany me?",
      answer:
        "Dependants are generally allowed only for eligible postgraduate research students and certain government-sponsored students.",
    },
    {
      question: "Are scholarships available?",
      answer:
        "Yes. Scholarships are available from universities, the UK government and other organisations.",
    },
    {
      question: "Can I stay after graduation?",
      answer: "Eligible students may apply for the Graduate visa.",
    },
    {
      question: "Can I get permanent residence?",
      answer:
        "Studying in the UK does not directly guarantee permanent residence. Students may later switch to another eligible visa route.",
    },
    {
      question: "Is a job guaranteed after graduation?",
      answer: "No. Employment depends on skills, experience, the job market and visa eligibility.",
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

const aimuServices = [
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
];

const usa: CountryContent = {
  slug: "usa",
  country: "United States of America",
  shortName: "USA",
  nameWithArticle: "the USA",
  flagEmoji: "🇺🇸",
  heroTitle: "Study in the United States",
  heroSubtitle:
    "Study at the world's top-ranked universities, access cutting-edge research, and launch a global career with up to 3 years of post-study work through OPT.",
  overview: [
    "The United States hosts more international students than any other country, home to the largest number of top-100 universities in the world. Students choose the USA for its academic excellence, flexible education system, and unmatched career opportunities.",
    "The US education system is known for its flexibility — you can combine majors and minors, switch specialisations, and learn through a mix of coursework, research, and hands-on projects. Campuses offer world-class labs, libraries, and sports facilities.",
    "Bachelor's degrees typically take 4 years and master's degrees 1.5–2 years. Universities place strong emphasis on research, innovation, and industry collaboration, with many programs offering internships (CPT) as part of the curriculum.",
    "International students can work up to 20 hours per week on campus during term. After graduation, Optional Practical Training (OPT) allows 12 months of work experience — extendable to 36 months for STEM graduates.",
    "From Silicon Valley technology careers to Wall Street finance and world-leading healthcare and research, the USA offers pathways for every ambition.",
  ],
  quickFacts: [
    { label: "Capital", value: "Washington, D.C." },
    { label: "Currency", value: "US Dollar ($)" },
    { label: "Language", value: "English" },
    { label: "Popular Intake", value: "Fall (August), Spring (January), Summer (May)" },
    { label: "Average Study Duration", value: "2 Years (Master's), 4 Years (Bachelor's)" },
    { label: "Work During Studies", value: "20 Hours/Week (on-campus)" },
    { label: "Post Study Work", value: "OPT 1 Year (up to 3 Years for STEM)" },
    { label: "Top Student Cities", value: "New York, Boston, San Francisco, Chicago, Los Angeles" },
    { label: "Time Difference from India", value: "-9.5 to -12.5 Hours" },
  ],
  whyChoose: [
    {
      icon: "🎓",
      title: "World's Top-Ranked Universities",
      description: "The USA has more top-100 universities than any other country.",
    },
    {
      icon: "🌍",
      title: "Globally Respected Degrees",
      description: "US qualifications open doors with employers worldwide.",
    },
    {
      icon: "🔬",
      title: "Research & Innovation",
      description: "Access cutting-edge labs, funded research, and world-leading faculty.",
    },
    {
      icon: "💼",
      title: "On-Campus Work & Internships",
      description: "Work 20 hours/week on campus and gain industry experience through CPT internships.",
    },
    {
      icon: "🚀",
      title: "Up to 3 Years Post-Study Work",
      description: "OPT gives 12 months of work experience, extendable to 36 months for STEM graduates.",
    },
    {
      icon: "🤝",
      title: "Diverse, Global Campuses",
      description: "Study alongside students from every corner of the world.",
    },
    {
      icon: "🏙️",
      title: "Vibrant Cities & Campus Life",
      description: "From New York to San Francisco, experience dynamic cities and rich campus culture.",
    },
    {
      icon: "📈",
      title: "Highest Graduate Salaries",
      description: "US graduate salaries are among the highest in the world, especially in tech and finance.",
    },
  ],
  whyStudyPoints: [
    "Largest choice of universities and programs",
    "Flexible education system with majors and minors",
    "World-leading research facilities",
    "Strong industry connections and internships (CPT)",
    "OPT work rights after graduation",
    "STEM extension up to 3 years",
    "Generous merit scholarships and assistantships",
    "Diverse multicultural campuses",
    "Highest graduate salaries globally",
    "Pathways to H-1B work visas",
  ],
  educationSystem: [
    {
      level: "Bachelor's Degree",
      details: ["Duration: 4 years", "Eligibility: 12th grade, SAT/ACT (often optional), IELTS/TOEFL", "Tuition Fees: $20,000–$55,000/year"],
    },
    {
      level: "Master's Degree",
      details: ["Duration: 1.5–2 years", "Popular Programs: Computer Science, Engineering, Business Analytics, Data Science", "GRE/GMAT may be required"],
    },
    { level: "MBA", details: ["Duration: 1–2 years", "Work experience usually required", "GMAT often required"] },
    { level: "Research / PhD", details: ["Duration: 4–6 years", "Often fully funded with assistantships"] },
    { level: "Community College Pathways", details: ["2-year associate degrees with transfer to universities", "Lower tuition: $8,000–$15,000/year"] },
  ],
  popularCourses: [
    {
      category: "Business",
      icon: "business",
      courses: ["MBA", "Business Analytics", "Finance", "Accounting", "Marketing", "Management", "Supply Chain", "Entrepreneurship"],
    },
    {
      category: "Computing & IT",
      icon: "computing",
      courses: ["Computer Science", "Artificial Intelligence", "Machine Learning", "Cyber Security", "Software Engineering", "Data Science", "Cloud Computing", "Information Systems"],
    },
    {
      category: "Engineering",
      icon: "engineering",
      courses: ["Mechanical", "Civil", "Electrical", "Aerospace", "Robotics", "Chemical", "Biomedical", "Industrial Engineering"],
    },
    {
      category: "Healthcare",
      icon: "healthcare",
      courses: ["Public Health", "Healthcare Management", "Biomedical Science", "Nursing", "Pharmacy", "Psychology"],
    },
    {
      category: "Science",
      icon: "science",
      courses: ["Biotechnology", "Environmental Science", "Chemistry", "Physics", "Mathematics", "Statistics"],
    },
    {
      category: "Law",
      icon: "law",
      courses: ["LLM", "International Law", "Corporate Law", "Intellectual Property Law"],
    },
    {
      category: "Creative Arts",
      icon: "arts",
      courses: ["Graphic Design", "Animation", "Architecture", "Film Production", "Fashion Design", "Music"],
    },
  ],
  topUniversities: [
    {
      name: "Northeastern University",
      qsRanking: "World Top 400",
      city: "Boston",
      popularCourses: ["Computer Science", "Business Analytics", "Engineering"],
      scholarship: "Up to $25,000",
    },
    {
      name: "Arizona State University",
      qsRanking: "World Top 200",
      city: "Tempe, Arizona",
      popularCourses: ["Engineering", "Business", "Data Science"],
      scholarship: "Up to $15,000",
    },
  ],
  tuitionFees: [
    { program: "Community College", fees: "$8,000–$15,000" },
    { program: "Bachelor's", fees: "$20,000–$55,000" },
    { program: "Master's", fees: "$25,000–$60,000" },
    { program: "MBA", fees: "$40,000–$120,000" },
    { program: "Medicine", fees: "$45,000–$70,000" },
  ],
  costOfLiving: [
    { expense: "Accommodation", cost: "$600–$1,800" },
    { expense: "Food", cost: "$250–$500" },
    { expense: "Transportation", cost: "$70–$150" },
    { expense: "Internet & Mobile", cost: "$50–$100" },
    { expense: "Utilities", cost: "$100–$200" },
    { expense: "Personal Expenses", cost: "$150–$400" },
    { expense: "Entertainment", cost: "$100–$250" },
  ],
  costOfLivingTotals: [
    { label: "Smaller Cities", value: "$1,200–$2,000/month" },
    { label: "Major Cities (NYC, SF, Boston)", value: "$2,000–$3,500/month" },
  ],
  studentEarnings: [
    { label: "Average Wage", value: "$12–$20/hour" },
    { label: "Maximum Hours", value: "20 Hours per Week (on-campus)" },
    { label: "Potential Monthly Income", value: "$900–$1,600" },
    { label: "Holiday Period", value: "Full-time on-campus work permitted during breaks" },
  ],
  scholarships: [
    "Fulbright-Nehru Fellowships",
    "University Merit Scholarships",
    "Graduate & Teaching Assistantships",
    "Sports Scholarships",
    "Need-Based Aid (select universities)",
    "Early Bird & Alumni Discounts",
  ],
  admissionRequirements: [
    {
      level: "Undergraduate",
      items: ["Academic Transcripts", "Passport", "IELTS/TOEFL", "SAT/ACT (if required)", "Essays / SOP", "LOR", "Extracurricular Profile"],
    },
    {
      level: "Master's",
      items: ["Bachelor's Degree", "Academic Transcripts", "IELTS/TOEFL", "GRE/GMAT (if required)", "Passport", "SOP", "LOR", "Resume", "Portfolio (Design)"],
    },
  ],
  admissionProcess: [
    { step: 1, title: "Free Profile Review" },
    { step: 2, title: "University & Scholarship Shortlisting" },
    { step: 3, title: "Application Submission" },
    { step: 4, title: "Visa & Accommodation Support" },
    { step: 5, title: "Pre-Departure & USA Assistance" },
  ],
  jobSectors: [
    "Software Engineering",
    "Artificial Intelligence",
    "Data Science",
    "Cybersecurity",
    "Cloud Computing",
    "Finance",
    "Investment Banking",
    "Consulting",
    "Healthcare",
    "Biotechnology",
    "Pharmaceuticals",
    "Aerospace",
    "Mechanical Engineering",
    "Civil Engineering",
    "Marketing",
    "Supply Chain",
    "Education",
    "Renewable Energy",
  ],
  graduateSalaries: [
    { industry: "Software Engineer", fresher: "$75k–$110k", experienced: "$120k–$200k" },
    { industry: "Data Scientist", fresher: "$80k–$115k", experienced: "$130k–$190k" },
    { industry: "AI Engineer", fresher: "$95k–$130k", experienced: "$150k–$250k" },
    { industry: "Cyber Security", fresher: "$70k–$100k", experienced: "$110k–$180k" },
    { industry: "Business Analyst", fresher: "$60k–$85k", experienced: "$95k–$140k" },
    { industry: "Accountant", fresher: "$55k–$70k", experienced: "$80k–$120k" },
    { industry: "Mechanical Engineer", fresher: "$65k–$80k", experienced: "$90k–$130k" },
    { industry: "Civil Engineer", fresher: "$60k–$75k", experienced: "$85k–$120k" },
    { industry: "Nurse", fresher: "$60k–$80k", experienced: "$85k–$120k" },
    { industry: "Marketing", fresher: "$50k–$70k", experienced: "$80k–$130k" },
  ],
  studentLife: [
    "American campuses are self-contained communities with dorms, dining halls, gyms, stadiums, and hundreds of student clubs.",
    "College sports are a huge part of campus culture — from football games to intramural leagues anyone can join.",
    "Cultural diversity is everywhere: international student associations, festivals, and food from around the world.",
    "Most universities offer dedicated career centres, on-campus job fairs, and strong alumni networks.",
    "Public transport is strong in major cities; many college towns are walkable or bike-friendly.",
    "Accommodation options include on-campus dorms, shared apartments, and off-campus housing.",
  ],
  visaInformation: [
    "F-1 Student Visa: required for full-time academic study, issued after receiving Form I-20 from your university.",
    "SEVIS fee: pay the SEVIS I-901 fee before your visa interview.",
    "Financial evidence: show funds covering at least one year of tuition and living costs.",
    "English language requirements: IELTS, TOEFL, or Duolingo English Test (varies by university).",
    "Visa interview: attend an in-person interview at a US embassy or consulate.",
    "Visa processing time: interview wait times vary — apply as early as possible (up to 365 days before course start).",
    "Working rights: 20 hours/week on-campus during term; CPT internships during study; OPT after graduation.",
    "Dependants: spouses and children can accompany on F-2 visas (F-2 spouses cannot work).",
  ],
  faqs: [
    {
      question: "Can I work while studying?",
      answer:
        "Yes — up to 20 hours per week on campus during term and full-time during breaks. Off-campus work is possible through CPT internships tied to your program.",
    },
    {
      question: "Is GRE mandatory?",
      answer:
        "Many universities have made GRE optional, but competitive programs may still require it. We'll shortlist universities that match your test profile.",
    },
    {
      question: "Can I stay after graduation?",
      answer:
        "Yes. OPT gives 12 months of post-study work, extendable to 36 months for STEM degrees. Many graduates then move to H-1B sponsored roles.",
    },
    {
      question: "How much money do I need?",
      answer:
        "Plan for $25,000–$60,000/year tuition for most master's programs plus $1,200–$3,500/month living costs depending on city. Scholarships and assistantships can cut this significantly.",
    },
    {
      question: "Which intake is best?",
      answer:
        "Fall (August) is the main intake with the most programs and funding. Spring (January) is a good alternative; Summer (May) has limited options.",
    },
    {
      question: "Can my spouse accompany me?",
      answer: "Yes, on an F-2 dependant visa. F-2 spouses cannot work but children can attend school.",
    },
    {
      question: "Are scholarships available?",
      answer:
        "Yes — merit scholarships, graduate assistantships (which can waive tuition), Fulbright-Nehru fellowships, and university-specific awards.",
    },
    {
      question: "What are the chances of getting a job?",
      answer:
        "Strong for STEM fields — the US has the world's largest tech, finance, and healthcare job markets, and OPT gives you up to 3 years to build experience.",
    },
    {
      question: "How long does the visa take?",
      answer:
        "The F-1 process depends on interview appointment availability at your consulate — often 2–8 weeks. Apply as early as possible.",
    },
    {
      question: "Can I get permanent residency?",
      answer:
        "Many graduates move from OPT to H-1B sponsorship and later employer-sponsored green cards. It's a long-term pathway we can explain based on your field.",
    },
  ],
  aimuServices,
};

const ireland: CountryContent = {
  slug: "ireland",
  country: "Ireland",
  shortName: "Irish",
  nameWithArticle: "Ireland",
  flagEmoji: "🇮🇪",
  heroTitle: "Study in Ireland",
  heroSubtitle:
    "Europe's fastest-growing study destination. Earn a globally recognised degree in the EU's only English-speaking country and stay back up to 2 years after graduation.",
  overview: [
    "Ireland has become one of Europe's most popular study destinations, combining high-quality education, a booming tech economy, and a famously friendly culture. It is the only English-speaking country in the EU.",
    "Irish universities rank among the world's best and are closely connected to industry — Dublin is the European headquarters of Google, Meta, Apple, Microsoft, LinkedIn, and hundreds of pharmaceutical and finance companies.",
    "Most master's degrees take just 1 year, and bachelor's degrees take 3–4 years, making Ireland a time- and cost-efficient choice.",
    "International students can work up to 20 hours per week during term and full-time during holidays. After graduation, the Third Level Graduate Scheme allows eligible students to stay back for up to 2 years to find work.",
    "With its safe cities, green landscapes, and warm welcome, Ireland offers an outstanding quality of life alongside excellent career prospects in technology, pharmaceuticals, and finance.",
  ],
  quickFacts: [
    { label: "Capital", value: "Dublin" },
    { label: "Currency", value: "Euro (€)" },
    { label: "Language", value: "English" },
    { label: "Popular Intake", value: "September, January" },
    { label: "Average Study Duration", value: "1 Year (Master's), 3–4 Years (Bachelor's)" },
    { label: "Work During Studies", value: "20 Hours/Week" },
    { label: "Post Study Work Visa", value: "Up to 2 Years (Stamp 1G)" },
    { label: "Top Student Cities", value: "Dublin, Cork, Galway, Limerick" },
    { label: "Time Difference from India", value: "+4.5 to +5.5 Hours" },
  ],
  whyChoose: [
    {
      icon: "🎓",
      title: "High-Quality Education",
      description: "Irish universities rank in the top 3% worldwide with strong teaching standards.",
    },
    {
      icon: "🌍",
      title: "Only English-Speaking EU Country",
      description: "Study in English while enjoying full access to the European Union.",
    },
    {
      icon: "⏳",
      title: "1-Year Master's Degrees",
      description: "Save time and money with intensive one-year postgraduate programs.",
    },
    {
      icon: "💼",
      title: "Tech & Pharma Hub of Europe",
      description: "Google, Meta, Apple, Pfizer, and hundreds of multinationals hire from Irish campuses.",
    },
    {
      icon: "🚀",
      title: "2-Year Stay-Back Option",
      description: "The Third Level Graduate Scheme lets eligible graduates stay and work for up to 2 years.",
    },
    {
      icon: "🤝",
      title: "Safe & Friendly",
      description: "Ireland consistently ranks among the friendliest and safest countries in the world.",
    },
    {
      icon: "🏙️",
      title: "Vibrant Student Cities",
      description: "Dublin, Cork, and Galway buzz with culture, music, and student life.",
    },
    {
      icon: "📈",
      title: "Strong Graduate Employment",
      description: "High demand in IT, pharmaceuticals, finance, and engineering.",
    },
  ],
  whyStudyPoints: [
    "Top 3% of universities worldwide",
    "1-year master's programs",
    "European headquarters of global tech companies",
    "2-year post-study stay-back",
    "20 hours/week work rights",
    "English-speaking EU member",
    "World's largest pharma manufacturing hub",
    "Safe, friendly, and welcoming",
    "Scholarships for international students",
    "Gateway to Europe",
  ],
  educationSystem: [
    {
      level: "Bachelor's Degree",
      details: ["Duration: 3–4 years", "Eligibility: 12th grade, IELTS/PTE/Duolingo", "Tuition Fees: €10,000–€25,000/year"],
    },
    {
      level: "Master's Degree",
      details: ["Duration: 1 year (most programs)", "Popular Programs: Data Science, Computing, Business, Pharma"],
    },
    { level: "MBA", details: ["Duration: 1 year", "Work experience usually required"] },
    { level: "Research / PhD", details: ["Duration: 3–4 years", "Structured PhD programs with funding options"] },
    { level: "Pathway / Foundation", details: ["Pre-master's and foundation routes available", "Tuition Fees: €8,000–€15,000/year"] },
  ],
  popularCourses: [
    {
      category: "Business",
      icon: "business",
      courses: ["MBA", "International Business", "Finance", "Accounting", "Marketing", "Management", "Supply Chain"],
    },
    {
      category: "Computing & IT",
      icon: "computing",
      courses: ["Computer Science", "Data Science", "Artificial Intelligence", "Cyber Security", "Software Engineering", "Cloud Computing", "Business Analytics"],
    },
    {
      category: "Engineering",
      icon: "engineering",
      courses: ["Mechanical", "Civil", "Electrical", "Biomedical", "Chemical", "Renewable Energy"],
    },
    {
      category: "Healthcare",
      icon: "healthcare",
      courses: ["Nursing", "Public Health", "Pharmacy", "Biomedical Science", "Physiotherapy", "Psychology"],
    },
    {
      category: "Science",
      icon: "science",
      courses: ["Biotechnology", "Pharmaceutical Science", "Food Science", "Environmental Science", "Chemistry"],
    },
    {
      category: "Law",
      icon: "law",
      courses: ["LLM", "International Law", "Corporate Law", "Technology Law"],
    },
    {
      category: "Creative Arts",
      icon: "arts",
      courses: ["Animation", "Game Design", "Film Production", "Music", "Architecture"],
    },
  ],
  topUniversities: [
    {
      name: "Trinity College Dublin",
      qsRanking: "World Top 100",
      city: "Dublin",
      popularCourses: ["Computer Science", "Business", "Pharmaceutical Science"],
      scholarship: "Up to €5,000",
    },
    {
      name: "University College Dublin",
      qsRanking: "World Top 130",
      city: "Dublin",
      popularCourses: ["Data Analytics", "Engineering", "Finance"],
      scholarship: "Up to €10,000",
    },
  ],
  tuitionFees: [
    { program: "Foundation / Pathway", fees: "€8,000–€15,000" },
    { program: "Bachelor's", fees: "€10,000–€25,000" },
    { program: "Master's", fees: "€12,000–€28,000" },
    { program: "MBA", fees: "€20,000–€35,000" },
    { program: "Medicine", fees: "€40,000–€55,000" },
  ],
  costOfLiving: [
    { expense: "Accommodation", cost: "€500–€1,300" },
    { expense: "Food", cost: "€200–€350" },
    { expense: "Transportation", cost: "€50–€120" },
    { expense: "Internet & Mobile", cost: "€30–€60" },
    { expense: "Utilities", cost: "€70–€150" },
    { expense: "Personal Expenses", cost: "€100–€250" },
    { expense: "Entertainment", cost: "€80–€180" },
  ],
  costOfLivingTotals: [
    { label: "Outside Dublin", value: "€900–€1,400/month" },
    { label: "Dublin", value: "€1,300–€2,000/month" },
  ],
  studentEarnings: [
    { label: "Average Wage", value: "€12.70–€15/hour (minimum wage €12.70)" },
    { label: "Maximum Hours", value: "20 Hours per Week" },
    { label: "Potential Monthly Income", value: "€900–€1,200" },
    { label: "Holiday Period", value: "Up to 40 hours/week during holidays" },
  ],
  scholarships: [
    "Government of Ireland International Education Scholarships",
    "Centenary Scholarship Programme",
    "University Merit Scholarships",
    "Trinity Global Excellence Scholarships",
    "UCD Global Scholarships",
    "Early Bird Discounts",
  ],
  admissionRequirements: [
    {
      level: "Undergraduate",
      items: ["Academic Transcripts", "Passport", "IELTS/PTE/Duolingo", "SOP", "LOR", "Resume (if applicable)"],
    },
    {
      level: "Master's",
      items: ["Bachelor's Degree", "Academic Transcripts", "English Test", "Passport", "SOP", "LOR", "Resume", "Experience (MBA)"],
    },
  ],
  admissionProcess: [
    { step: 1, title: "Free Profile Review" },
    { step: 2, title: "University & Scholarship Shortlisting" },
    { step: 3, title: "Application Submission" },
    { step: 4, title: "Visa & Accommodation Support" },
    { step: 5, title: "Pre-Departure & Ireland Assistance" },
  ],
  jobSectors: [
    "Software Engineering",
    "Data Science",
    "Artificial Intelligence",
    "Cybersecurity",
    "Cloud Computing",
    "Pharmaceuticals",
    "Biotechnology",
    "Medical Devices",
    "Finance",
    "Fintech",
    "Accounting",
    "Business Consulting",
    "Digital Marketing",
    "Supply Chain",
    "Healthcare",
    "Nursing",
    "Engineering",
    "Hospitality",
  ],
  graduateSalaries: [
    { industry: "Software Engineer", fresher: "€35k–€50k", experienced: "€60k–€95k" },
    { industry: "Data Scientist", fresher: "€38k–€52k", experienced: "€65k–€100k" },
    { industry: "AI Engineer", fresher: "€42k–€58k", experienced: "€70k–€110k" },
    { industry: "Cyber Security", fresher: "€38k–€52k", experienced: "€65k–€100k" },
    { industry: "Business Analyst", fresher: "€32k–€45k", experienced: "€55k–€80k" },
    { industry: "Accountant", fresher: "€30k–€42k", experienced: "€50k–€75k" },
    { industry: "Pharma Scientist", fresher: "€32k–€45k", experienced: "€55k–€85k" },
    { industry: "Mechanical Engineer", fresher: "€32k–€42k", experienced: "€50k–€75k" },
    { industry: "Nurse", fresher: "€32k–€40k", experienced: "€45k–€60k" },
    { industry: "Marketing", fresher: "€28k–€38k", experienced: "€45k–€70k" },
  ],
  studentLife: [
    "Irish campuses are famous for their societies — debating, drama, music, sports, and hundreds more to join.",
    "Ireland is one of the safest and friendliest countries in the world, with a strong sense of community.",
    "Dublin, Cork, and Galway offer live music, festivals, and a legendary café and pub culture.",
    "Student Leap Cards give discounted public transport across buses, trams, and trains.",
    "Explore stunning landscapes — the Cliffs of Moher, Ring of Kerry, and Wild Atlantic Way are weekend trips away.",
    "Accommodation options include on-campus housing, purpose-built student residences, and shared houses.",
  ],
  visaInformation: [
    "Irish Study Visa (Long Stay D Visa): required for courses longer than 3 months.",
    "Letter of acceptance from an Irish institution is required before applying.",
    "Financial evidence: show access to at least €12,000 for living costs plus tuition fees.",
    "English language requirements: IELTS, PTE, or Duolingo accepted by most institutions.",
    "Medical insurance is mandatory for the duration of your stay.",
    "Visa processing time: typically 4–8 weeks — apply early.",
    "Working rights: 20 hours/week during term, 40 hours/week during holidays.",
    "After graduation: Stamp 1G permission allows up to 2 years to live and work in Ireland.",
  ],
  faqs: [
    {
      question: "Can I work while studying?",
      answer: "Yes — 20 hours per week during term and up to 40 hours per week during scheduled holidays.",
    },
    {
      question: "Is IELTS mandatory?",
      answer: "Most institutions accept IELTS, PTE, or Duolingo. Some accept prior English-medium education. We'll match you to the right option.",
    },
    {
      question: "Can I stay after graduation?",
      answer: "Yes. The Third Level Graduate Scheme (Stamp 1G) allows master's graduates to stay back for up to 2 years to find work.",
    },
    {
      question: "How much money do I need?",
      answer: "Tuition of €12,000–€28,000/year for most master's programs plus living costs of €900–€2,000/month depending on city. You must show €12,000+ in funds for the visa.",
    },
    {
      question: "Which intake is best?",
      answer: "September is the main intake with the widest choice. January intake is available for many popular programs.",
    },
    {
      question: "Can my spouse accompany me?",
      answer: "Dependants generally cannot accompany students on study visas, but can join once you move to a work permit after graduation. We can advise on your situation.",
    },
    {
      question: "Are scholarships available?",
      answer: "Yes — Government of Ireland scholarships, university merit awards up to €10,000, and early bird discounts.",
    },
    {
      question: "What are the chances of getting a job?",
      answer: "Excellent in tech, pharma, and finance — Ireland hosts the European HQs of most major tech companies and is the world's third-largest pharma exporter.",
    },
    {
      question: "How long does the visa take?",
      answer: "Typically 4–8 weeks. Apply as soon as you accept your offer and pay your deposit.",
    },
    {
      question: "Can I get permanent residency?",
      answer: "After Stamp 1G, graduates typically move to employment permits; long-term residence is possible after 5 years of legal residence.",
    },
  ],
  aimuServices,
};

const germany: CountryContent = {
  slug: "germany",
  country: "Germany",
  shortName: "German",
  nameWithArticle: "Germany",
  flagEmoji: "🇩🇪",
  heroTitle: "Study in Germany",
  heroSubtitle:
    "World-class engineering education with little or no tuition fees at public universities. Study in Europe's strongest economy and stay back 18 months after graduation.",
  overview: [
    "Germany is one of the most affordable world-class study destinations: most public universities charge no tuition fees — only a small semester contribution — while delivering education respected across the globe.",
    "Known as the land of engineering, Germany is home to global leaders like BMW, Mercedes-Benz, Siemens, Bosch, and SAP. Universities work closely with industry, and many programs include internships and applied research.",
    "Over 2,000 programs are taught entirely in English, so you can study without knowing German — though learning the language greatly improves job prospects.",
    "International students can work 120 full days (or 240 half days) per year. After graduation, an 18-month job seeker visa lets you stay and find work in your field.",
    "With its central location in Europe, excellent public transport, and rich culture, Germany offers an unbeatable combination of quality, affordability, and opportunity.",
  ],
  quickFacts: [
    { label: "Capital", value: "Berlin" },
    { label: "Currency", value: "Euro (€)" },
    { label: "Language", value: "German (2,000+ programs in English)" },
    { label: "Popular Intake", value: "Winter (October), Summer (April)" },
    { label: "Average Study Duration", value: "2 Years (Master's), 3 Years (Bachelor's)" },
    { label: "Work During Studies", value: "120 Full Days/Year (~20 Hours/Week)" },
    { label: "Post Study Work Visa", value: "18-Month Job Seeker Visa" },
    { label: "Top Student Cities", value: "Berlin, Munich, Frankfurt, Hamburg, Stuttgart" },
    { label: "Time Difference from India", value: "-3.5 to -4.5 Hours" },
  ],
  whyChoose: [
    {
      icon: "🎓",
      title: "Little or No Tuition Fees",
      description: "Most public universities charge only a small semester fee of €150–€350.",
    },
    {
      icon: "🌍",
      title: "World-Renowned Engineering",
      description: "German engineering degrees are the gold standard for employers worldwide.",
    },
    {
      icon: "⏳",
      title: "2,000+ English-Taught Programs",
      description: "Study in English — no German required for admission to many programs.",
    },
    {
      icon: "💼",
      title: "Work While You Study",
      description: "120 full working days per year plus paid internships and working-student jobs.",
    },
    {
      icon: "🚀",
      title: "18-Month Job Seeker Visa",
      description: "Stay back a year and a half after graduation to find a job in your field.",
    },
    {
      icon: "🤝",
      title: "Europe's Strongest Economy",
      description: "Home to BMW, Siemens, Bosch, SAP, and thousands of hidden-champion companies.",
    },
    {
      icon: "🏙️",
      title: "Central Location in Europe",
      description: "Weekend trips to Paris, Amsterdam, Prague, or the Alps by train.",
    },
    {
      icon: "📈",
      title: "Clear Path to PR",
      description: "EU Blue Card holders can qualify for permanent residency in as little as 21–27 months.",
    },
  ],
  whyStudyPoints: [
    "No tuition at most public universities",
    "World-class engineering and technology programs",
    "2,000+ English-taught degrees",
    "Europe's largest economy and job market",
    "120 working days per year for students",
    "18-month post-study job seeker visa",
    "Fast track to EU Blue Card and PR",
    "Low cost of living compared to UK/USA",
    "DAAD and government scholarships",
    "Travel across Europe with ease",
  ],
  educationSystem: [
    {
      level: "Bachelor's Degree",
      details: ["Duration: 3 years", "Eligibility: 12th grade + entrance qualification (some need Studienkolleg)", "Tuition: €0 at most public universities"],
    },
    {
      level: "Master's Degree",
      details: ["Duration: 2 years", "Popular Programs: Mechanical, Automotive, CS, Data Science", "Tuition: €0–€3,000/semester (public); private universities higher"],
    },
    { level: "MBA", details: ["Duration: 1–2 years", "Private business schools: €15,000–€45,000 total"] },
    { level: "Research / PhD", details: ["Duration: 3–5 years", "Often paid as research positions"] },
    { level: "Studienkolleg (Foundation)", details: ["1-year preparatory course for bachelor's applicants", "Required for some Indian qualifications"] },
  ],
  popularCourses: [
    {
      category: "Business",
      icon: "business",
      courses: ["MBA", "International Management", "Finance", "Supply Chain", "Business Analytics"],
    },
    {
      category: "Computing & IT",
      icon: "computing",
      courses: ["Computer Science", "Data Science", "Artificial Intelligence", "Cyber Security", "Software Engineering", "Embedded Systems"],
    },
    {
      category: "Engineering",
      icon: "engineering",
      courses: ["Mechanical", "Automotive", "Electrical", "Mechatronics", "Robotics", "Chemical", "Aerospace", "Renewable Energy"],
    },
    {
      category: "Healthcare",
      icon: "healthcare",
      courses: ["Public Health", "Biomedical Engineering", "Pharmacy", "Psychology"],
    },
    {
      category: "Science",
      icon: "science",
      courses: ["Physics", "Chemistry", "Biotechnology", "Environmental Science", "Mathematics"],
    },
    {
      category: "Law",
      icon: "law",
      courses: ["LLM", "International Law", "European Law", "IP Law"],
    },
    {
      category: "Creative Arts",
      icon: "arts",
      courses: ["Architecture", "Industrial Design", "Media Design", "Film", "Music"],
    },
  ],
  topUniversities: [
    {
      name: "Technical University of Munich",
      qsRanking: "World Top 30",
      city: "Munich",
      popularCourses: ["Mechanical Engineering", "Computer Science", "Data Engineering"],
      scholarship: "Deutschlandstipendium €300/month",
    },
    {
      name: "RWTH Aachen University",
      qsRanking: "World Top 100",
      city: "Aachen",
      popularCourses: ["Automotive Engineering", "Mechanical Engineering", "Electrical Engineering"],
      scholarship: "DAAD funding available",
    },
  ],
  tuitionFees: [
    { program: "Public University (most programs)", fees: "€0 + €150–€350 semester fee" },
    { program: "Public University (Baden-Württemberg)", fees: "€1,500/semester" },
    { program: "Private Bachelor's", fees: "€10,000–€20,000/year" },
    { program: "Private Master's", fees: "€12,000–€25,000/year" },
    { program: "MBA (private)", fees: "€15,000–€45,000 total" },
  ],
  costOfLiving: [
    { expense: "Accommodation", cost: "€350–€900" },
    { expense: "Food", cost: "€180–€300" },
    { expense: "Transportation", cost: "€0–€60 (often in semester ticket)" },
    { expense: "Internet & Mobile", cost: "€30–€50" },
    { expense: "Utilities", cost: "€80–€150" },
    { expense: "Health Insurance", cost: "€110–€130" },
    { expense: "Personal & Entertainment", cost: "€150–€300" },
  ],
  costOfLivingTotals: [
    { label: "Smaller Cities", value: "€850–€1,100/month" },
    { label: "Munich / Frankfurt / Hamburg", value: "€1,100–€1,600/month" },
  ],
  studentEarnings: [
    { label: "Average Wage", value: "€12.82–€16/hour (minimum wage €12.82)" },
    { label: "Maximum Work", value: "120 Full Days or 240 Half Days per Year" },
    { label: "Potential Monthly Income", value: "€900–€1,200" },
    { label: "Working Student Jobs", value: "Well-paid 'Werkstudent' roles in your field, up to 20 hrs/week" },
  ],
  scholarships: [
    "DAAD Scholarships",
    "Deutschlandstipendium (€300/month)",
    "Erasmus+ Funding",
    "Heinrich Böll Foundation Scholarships",
    "Konrad-Adenauer-Stiftung Scholarships",
    "University-Specific Awards",
  ],
  admissionRequirements: [
    {
      level: "Undergraduate",
      items: ["Academic Transcripts", "University Entrance Qualification (or Studienkolleg)", "Passport", "IELTS/TOEFL (English programs)", "German A1–B2 (German programs)", "SOP", "LOR"],
    },
    {
      level: "Master's",
      items: ["Bachelor's Degree (relevant field)", "Academic Transcripts", "IELTS/TOEFL", "GRE (some technical programs)", "Passport", "SOP", "LOR", "Resume", "APS Certificate (mandatory for Indian students)"],
    },
  ],
  admissionProcess: [
    { step: 1, title: "Free Profile Review" },
    { step: 2, title: "University & Scholarship Shortlisting" },
    { step: 3, title: "Application Submission" },
    { step: 4, title: "Visa & Accommodation Support" },
    { step: 5, title: "Pre-Departure & Germany Assistance" },
  ],
  jobSectors: [
    "Automotive Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Software Engineering",
    "Data Science",
    "Artificial Intelligence",
    "Embedded Systems",
    "Robotics",
    "Renewable Energy",
    "Chemical Industry",
    "Pharmaceuticals",
    "Finance",
    "Consulting",
    "Logistics",
    "Manufacturing",
    "Aerospace",
    "Healthcare",
    "Research & Academia",
  ],
  graduateSalaries: [
    { industry: "Software Engineer", fresher: "€48k–€60k", experienced: "€70k–€100k" },
    { industry: "Data Scientist", fresher: "€50k–€62k", experienced: "€75k–€105k" },
    { industry: "AI Engineer", fresher: "€55k–€68k", experienced: "€80k–€115k" },
    { industry: "Automotive Engineer", fresher: "€48k–€58k", experienced: "€70k–€95k" },
    { industry: "Mechanical Engineer", fresher: "€45k–€55k", experienced: "€65k–€90k" },
    { industry: "Electrical Engineer", fresher: "€46k–€56k", experienced: "€68k–€92k" },
    { industry: "Cyber Security", fresher: "€48k–€60k", experienced: "€75k–€105k" },
    { industry: "Business Analyst", fresher: "€42k–€52k", experienced: "€60k–€85k" },
    { industry: "Chemical Engineer", fresher: "€46k–€56k", experienced: "€68k–€90k" },
    { industry: "Consultant", fresher: "€45k–€60k", experienced: "€70k–€110k" },
  ],
  studentLife: [
    "Semester tickets often include free regional public transport — trams, buses, and trains.",
    "Student unions (Studentenwerk) run affordable canteens (Mensa), housing, and support services.",
    "Germany's festival culture ranges from Oktoberfest to world-class music, film, and tech events.",
    "Sports facilities and university clubs (Hochschulsport) are heavily subsidised for students.",
    "Travel Europe easily — Paris, Amsterdam, Vienna, and Prague are a train ride away.",
    "Accommodation options include student dorms (cheapest), shared flats (WG), and private studios.",
  ],
  visaInformation: [
    "German National Visa (Study Visa): required before travel; converted to a residence permit after arrival.",
    "Admission letter from a German university (or conditional admission with Studienkolleg).",
    "Blocked account (Sperrkonto): show €11,904/year (€992/month) in a blocked account as financial proof.",
    "APS Certificate: mandatory document verification for students from India.",
    "Health insurance: statutory student insurance (~€110–130/month) is required.",
    "Visa processing time: typically 6–12 weeks — book your appointment early.",
    "Working rights: 120 full days or 240 half days per year alongside studies.",
    "After graduation: 18-month job seeker visa, then EU Blue Card once employed.",
  ],
  faqs: [
    {
      question: "Is education really free in Germany?",
      answer:
        "At most public universities, yes — you pay only a semester contribution of €150–€350 which often includes a public transport ticket. Baden-Württemberg charges €1,500/semester for non-EU students, and private universities charge full tuition.",
    },
    {
      question: "Do I need to know German?",
      answer:
        "Not for admission — 2,000+ programs are taught in English. But German (B1+) dramatically improves part-time job options and graduate employment.",
    },
    {
      question: "Can I work while studying?",
      answer: "Yes — 120 full days or 240 half days per year, including well-paid working-student (Werkstudent) roles in your field.",
    },
    {
      question: "Can I stay after graduation?",
      answer: "Yes. The 18-month job seeker visa lets you stay and find work. Once employed, you can move to an EU Blue Card.",
    },
    {
      question: "How much money do I need?",
      answer:
        "The visa requires a blocked account of €11,904 for one year of living costs. With no tuition at public universities, total costs are far lower than the UK or USA.",
    },
    {
      question: "What is the APS certificate?",
      answer:
        "A mandatory verification of your academic documents for Indian students, issued by the APS office in New Delhi. It must be obtained before applying for the visa.",
    },
    {
      question: "Which intake is best?",
      answer: "Winter semester (October) is the main intake with the most programs. Summer semester (April) has fewer options.",
    },
    {
      question: "Can my spouse accompany me?",
      answer: "Spouses can apply for family reunion visas, usually requiring proof of funds and accommodation. We can advise case by case.",
    },
    {
      question: "Are scholarships available?",
      answer: "Yes — DAAD scholarships, the Deutschlandstipendium (€300/month), Erasmus+ funding, and foundation scholarships.",
    },
    {
      question: "Can I get permanent residency?",
      answer:
        "Yes — EU Blue Card holders can apply for a settlement permit after 27 months (21 months with B1 German). Germany actively welcomes skilled graduates.",
    },
  ],
  aimuServices,
};

const france: CountryContent = {
  slug: "france",
  country: "France",
  shortName: "French",
  nameWithArticle: "France",
  flagEmoji: "🇫🇷",
  heroTitle: "Study in France",
  heroSubtitle:
    "Affordable, world-class education in the heart of Europe. Study business, fashion, engineering, or culinary arts and stay back up to 2 years after graduation.",
  overview: [
    "France is one of Europe's most attractive study destinations, combining prestigious universities, affordable tuition, and an unrivalled quality of life. It hosts over 400,000 international students every year.",
    "French business schools — HEC Paris, INSEAD, ESSEC, ESCP — consistently rank among the best in the world, while public universities offer excellent education at a fraction of the cost of other countries.",
    "A growing number of programs are taught entirely in English, especially at master's level in business, engineering, and computer science. You can study in English while picking up French — a major career asset.",
    "International students can work up to 964 hours per year (about 20 hours per week). After a master's degree, the APS (Autorisation Provisoire de Séjour) allows you to stay up to 2 years to find work or start a business.",
    "From Paris fashion and finance to Toulouse aerospace and Lyon gastronomy, France offers world-leading industries, rich culture, and easy travel across Europe.",
  ],
  quickFacts: [
    { label: "Capital", value: "Paris" },
    { label: "Currency", value: "Euro (€)" },
    { label: "Language", value: "French (many English-taught programs)" },
    { label: "Popular Intake", value: "September, January" },
    { label: "Average Study Duration", value: "1–2 Years (Master's), 3 Years (Bachelor's)" },
    { label: "Work During Studies", value: "964 Hours/Year (~20 Hours/Week)" },
    { label: "Post Study Work Visa", value: "Up to 2 Years (APS)" },
    { label: "Top Student Cities", value: "Paris, Lyon, Toulouse, Lille, Nice" },
    { label: "Time Difference from India", value: "-3.5 to -4.5 Hours" },
  ],
  whyChoose: [
    {
      icon: "🎓",
      title: "Prestigious Institutions",
      description: "Home to world-top business schools and grandes écoles like HEC, ESSEC, and ESCP.",
    },
    {
      icon: "🌍",
      title: "Affordable Public Universities",
      description: "Public university tuition is €2,800–€3,900/year for international students.",
    },
    {
      icon: "⏳",
      title: "English-Taught Programs",
      description: "Hundreds of master's programs taught fully in English — no French required to start.",
    },
    {
      icon: "💼",
      title: "Work While Studying",
      description: "Work up to 964 hours per year alongside your studies.",
    },
    {
      icon: "🚀",
      title: "2-Year Post-Study Stay",
      description: "Master's graduates can stay up to 2 years with the APS to find work or launch a startup.",
    },
    {
      icon: "🤝",
      title: "World-Leading Industries",
      description: "Luxury, fashion, aerospace, AI, finance, and gastronomy — France leads them all.",
    },
    {
      icon: "🏙️",
      title: "Rich Culture & Lifestyle",
      description: "Art, cuisine, festivals, and the heart of European culture on your doorstep.",
    },
    {
      icon: "📈",
      title: "Government Support for Students",
      description: "Housing subsidies (CAF), discounted transport, and subsidised meals for students.",
    },
  ],
  whyStudyPoints: [
    "World-top business schools",
    "Affordable public university tuition",
    "Hundreds of English-taught programs",
    "2-year APS post-study permission",
    "964 hours/year work rights",
    "Housing subsidies for students (CAF)",
    "Aerospace capital of Europe (Toulouse)",
    "Global hub for luxury, fashion, and AI",
    "Charpak and Eiffel scholarships",
    "Travel Europe from the centre of it",
  ],
  educationSystem: [
    {
      level: "Bachelor's / Licence",
      details: ["Duration: 3 years", "Eligibility: 12th grade, Campus France procedure", "Public tuition: €2,895/year (2025 rate)"],
    },
    {
      level: "Master's Degree",
      details: ["Duration: 1–2 years", "Popular Programs: Management, Finance, Data Science, Luxury Brand Management", "Public tuition: €3,941/year; business schools €15,000–€35,000/year"],
    },
    { level: "MBA / Grande École", details: ["Duration: 1–2 years", "Top schools: HEC, INSEAD, ESSEC, ESCP, EDHEC"] },
    { level: "Research / PhD", details: ["Duration: 3 years", "Often funded through doctoral contracts"] },
    { level: "Specialised Schools", details: ["Fashion (ESMOD, IFM), Culinary (Le Cordon Bleu), Art & Design", "Fees vary: €10,000–€30,000/year"] },
  ],
  popularCourses: [
    {
      category: "Business",
      icon: "business",
      courses: ["MBA", "International Management", "Finance", "Luxury Brand Management", "Marketing", "Supply Chain"],
    },
    {
      category: "Computing & IT",
      icon: "computing",
      courses: ["Computer Science", "Data Science", "Artificial Intelligence", "Cyber Security", "Software Engineering"],
    },
    {
      category: "Engineering",
      icon: "engineering",
      courses: ["Aerospace", "Mechanical", "Electrical", "Civil", "Renewable Energy", "Automotive"],
    },
    {
      category: "Healthcare",
      icon: "healthcare",
      courses: ["Public Health", "Biomedical Science", "Pharmacy", "Psychology"],
    },
    {
      category: "Science",
      icon: "science",
      courses: ["Biotechnology", "Chemistry", "Physics", "Mathematics", "Environmental Science"],
    },
    {
      category: "Law",
      icon: "law",
      courses: ["LLM", "International Law", "European Law", "Business Law"],
    },
    {
      category: "Creative Arts",
      icon: "arts",
      courses: ["Fashion Design", "Culinary Arts", "Architecture", "Film", "Fine Arts", "Interior Design"],
    },
  ],
  topUniversities: [
    {
      name: "Sorbonne University",
      qsRanking: "World Top 60",
      city: "Paris",
      popularCourses: ["Science", "Engineering", "Humanities"],
      scholarship: "Eiffel Excellence Scholarship",
    },
    {
      name: "ESSEC Business School",
      qsRanking: "World Top 10 (Business, FT)",
      city: "Paris (Cergy)",
      popularCourses: ["Management", "Finance", "Luxury Brand Management"],
      scholarship: "Up to 50% tuition waiver",
    },
  ],
  tuitionFees: [
    { program: "Public Bachelor's (Licence)", fees: "€2,895/year" },
    { program: "Public Master's", fees: "€3,941/year" },
    { program: "Business School Master's", fees: "€15,000–€35,000/year" },
    { program: "MBA", fees: "€25,000–€90,000 total" },
    { program: "Specialised Schools (Fashion/Culinary)", fees: "€10,000–€30,000/year" },
  ],
  costOfLiving: [
    { expense: "Accommodation", cost: "€400–€1,200" },
    { expense: "Food", cost: "€200–€350" },
    { expense: "Transportation", cost: "€30–€90 (student discounts)" },
    { expense: "Internet & Mobile", cost: "€25–€50" },
    { expense: "Utilities", cost: "€60–€120" },
    { expense: "Personal Expenses", cost: "€100–€250" },
    { expense: "Entertainment", cost: "€80–€180" },
  ],
  costOfLivingTotals: [
    { label: "Outside Paris", value: "€800–€1,200/month" },
    { label: "Paris", value: "€1,200–€1,800/month" },
  ],
  studentEarnings: [
    { label: "Average Wage", value: "€11.88–€14/hour (minimum wage €11.88)" },
    { label: "Maximum Hours", value: "964 Hours per Year (~20 hrs/week)" },
    { label: "Potential Monthly Income", value: "€800–€1,100" },
    { label: "Student Support", value: "CAF housing subsidy can cover €100–€200/month of rent" },
  ],
  scholarships: [
    "Eiffel Excellence Scholarships",
    "Charpak Scholarships (for Indian students)",
    "Erasmus+ Funding",
    "Campus France Scholarships",
    "Business School Merit Waivers (up to 50%)",
    "Regional Government Grants",
  ],
  admissionRequirements: [
    {
      level: "Undergraduate",
      items: ["Academic Transcripts", "Passport", "IELTS/TOEFL (English programs)", "French B2 / DELF (French programs)", "SOP", "LOR", "Campus France Registration"],
    },
    {
      level: "Master's",
      items: ["Bachelor's Degree", "Academic Transcripts", "IELTS/TOEFL", "GMAT (some business schools)", "Passport", "SOP", "LOR", "Resume", "Campus France Interview"],
    },
  ],
  admissionProcess: [
    { step: 1, title: "Free Profile Review" },
    { step: 2, title: "University & Scholarship Shortlisting" },
    { step: 3, title: "Application Submission" },
    { step: 4, title: "Visa & Accommodation Support" },
    { step: 5, title: "Pre-Departure & France Assistance" },
  ],
  jobSectors: [
    "Luxury & Fashion",
    "Aerospace",
    "Artificial Intelligence",
    "Data Science",
    "Software Engineering",
    "Finance",
    "Banking",
    "Consulting",
    "Hospitality & Tourism",
    "Culinary Arts",
    "Pharmaceuticals",
    "Cosmetics",
    "Automotive",
    "Renewable Energy",
    "Marketing",
    "Supply Chain",
    "Healthcare",
    "Education",
  ],
  graduateSalaries: [
    { industry: "Software Engineer", fresher: "€38k–€48k", experienced: "€55k–€85k" },
    { industry: "Data Scientist", fresher: "€40k–€50k", experienced: "€60k–€90k" },
    { industry: "AI Engineer", fresher: "€45k–€55k", experienced: "€65k–€100k" },
    { industry: "Finance Analyst", fresher: "€40k–€52k", experienced: "€60k–€95k" },
    { industry: "Luxury Brand Manager", fresher: "€38k–€48k", experienced: "€60k–€100k" },
    { industry: "Aerospace Engineer", fresher: "€38k–€46k", experienced: "€55k–€80k" },
    { industry: "Business Analyst", fresher: "€36k–€45k", experienced: "€52k–€75k" },
    { industry: "Marketing", fresher: "€32k–€40k", experienced: "€48k–€70k" },
    { industry: "Mechanical Engineer", fresher: "€36k–€44k", experienced: "€52k–€75k" },
    { industry: "Hospitality Manager", fresher: "€30k–€38k", experienced: "€45k–€65k" },
  ],
  studentLife: [
    "Student status in France comes with real perks — subsidised university restaurants (CROUS), discounted transport, and museum access.",
    "The CAF housing subsidy helps international students pay €100–€200 less rent per month.",
    "Paris, Lyon, and Toulouse have huge international student communities and year-round cultural festivals.",
    "France's high-speed TGV network puts most of Europe within a few hours' reach.",
    "Campus associations cover everything from sports and debate to wine-tasting and startup incubators.",
    "Accommodation options include CROUS student residences (cheapest), private studios, and shared flats.",
  ],
  visaInformation: [
    "VLS-TS Student Visa: long-stay visa that doubles as a residence permit for the first year.",
    "Campus France procedure: mandatory pre-application and interview for Indian students.",
    "Financial evidence: show at least €615/month (€7,380/year) in funds.",
    "English or French test depending on program language (IELTS/TOEFL or DELF/DALF).",
    "Health insurance: free enrolment in French social security for students.",
    "Visa processing time: typically 2–4 weeks after Campus France approval.",
    "Working rights: up to 964 hours per year alongside studies.",
    "After a master's: APS allows up to 2 years to find work; a job offer converts it to a work permit.",
  ],
  faqs: [
    {
      question: "Can I study in English?",
      answer:
        "Yes — hundreds of master's programs, especially in business, engineering, and computer science, are taught fully in English. Learning basic French helps daily life and jobs.",
    },
    {
      question: "Can I work while studying?",
      answer: "Yes — up to 964 hours per year, roughly 20 hours per week, at a minimum wage of €11.88/hour.",
    },
    {
      question: "Can I stay after graduation?",
      answer:
        "Yes. Master's graduates get the APS for up to 2 years to find work or start a business. A qualifying job offer converts it to a work permit.",
    },
    {
      question: "How much money do I need?",
      answer:
        "Public universities cost just €2,895–€3,941/year in tuition. Living costs run €800–€1,800/month. The visa requires proof of €615/month.",
    },
    {
      question: "What is Campus France?",
      answer:
        "The official French agency that processes international student applications. Indian students must complete the Campus France procedure and interview before applying for a visa.",
    },
    {
      question: "Which intake is best?",
      answer: "September is the main intake. January intake is available at many business schools and some universities.",
    },
    {
      question: "Can my spouse accompany me?",
      answer: "Family accompaniment during studies is limited, but becomes straightforward once you move to a work permit after graduation.",
    },
    {
      question: "Are scholarships available?",
      answer:
        "Yes — the Charpak scholarship is specifically for Indian students; Eiffel Excellence covers tuition and living; business schools offer merit waivers up to 50%.",
    },
    {
      question: "What are the chances of getting a job?",
      answer:
        "Strong in luxury, aerospace, AI, and finance. France is investing heavily in AI and tech startups, and Paris is a top European financial centre post-Brexit.",
    },
    {
      question: "Can I get permanent residency?",
      answer:
        "After working in France, you can qualify for a multi-year Talent Passport and eventually a 10-year residence card. We can map the pathway for you.",
    },
  ],
  aimuServices,
};

export const countryContent: Record<string, CountryContent> = {
  uk,
  "united-kingdom": uk,
  usa,
  "united-states": usa,
  ireland,
  germany,
  france,
};
