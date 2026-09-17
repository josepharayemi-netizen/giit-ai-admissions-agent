export type Course = { name: string; summary: string; skills: string[]; careers: string[]; keywords: string[] };

export const programmeLevels = [
  { name: "Professional", fee: "₦150,000", duration: "2 months", note: "A focused introduction with practical projects." },
  { name: "Master", fee: "₦300,000", duration: "4 months", note: "Deeper technical coverage and portfolio development." },
  { name: "Career Accelerator", fee: "₦500,000", duration: "6 months", note: "Intensive training, career preparation and remote-job assistance." },
];

export const courses: Course[] = [
  { name: "Data Analytics", summary: "Turn raw business data into decisions with Excel, SQL and Power BI.", skills: ["Excel", "SQL", "Power BI"], careers: ["Data Analyst", "BI Analyst"], keywords: ["data", "excel", "sql", "power bi", "report", "business"] },
  { name: "Data Science", summary: "Build predictive models and solve business problems with Python and statistics.", skills: ["Python", "Statistics", "Machine Learning"], careers: ["Data Scientist", "ML Analyst"], keywords: ["python", "statistics", "prediction", "science", "machine learning"] },
  { name: "AI & Machine Learning", summary: "Create practical AI solutions, intelligent applications and production-ready models.", skills: ["Python", "Generative AI", "MLOps"], careers: ["AI Engineer", "ML Engineer"], keywords: ["ai", "artificial intelligence", "machine learning", "ml", "automation", "model"] },
  { name: "Cybersecurity", summary: "Protect systems, investigate threats and build resilient security operations.", skills: ["Network Security", "SOC", "Cloud Security"], careers: ["SOC Analyst", "Security Engineer"], keywords: ["security", "cyber", "hacking", "soc", "network", "protect"] },
  { name: "Cloud Computing", summary: "Design and operate modern infrastructure across AWS and Microsoft Azure.", skills: ["AWS", "Azure", "Architecture"], careers: ["Cloud Engineer", "Solutions Architect"], keywords: ["cloud", "aws", "azure", "architect", "infrastructure"] },
  { name: "DevOps Engineering", summary: "Automate software delivery with CI/CD, containers and cloud platforms.", skills: ["Git", "Docker", "Kubernetes"], careers: ["DevOps Engineer", "Platform Engineer"], keywords: ["devops", "docker", "kubernetes", "deployment", "automation", "ci/cd"] },
  { name: "Full-Stack Development", summary: "Build complete, responsive web applications from frontend to backend.", skills: ["JavaScript", "React", "APIs"], careers: ["Frontend Developer", "Full-Stack Developer"], keywords: ["website", "web", "coding", "software", "developer", "javascript"] },
  { name: "UI/UX Design", summary: "Research, design and test digital products that people enjoy using.", skills: ["Figma", "User Research", "Prototyping"], careers: ["UI Designer", "UX Designer"], keywords: ["design", "figma", "creative", "interface", "user experience"] },
  { name: "Digital Marketing", summary: "Grow brands using social media, SEO, content and AI-assisted campaigns.", skills: ["Social Media", "SEO", "Content"], careers: ["Digital Marketer", "Growth Specialist"], keywords: ["marketing", "social media", "seo", "content", "advertising", "sales"] },
  { name: "Microsoft 365", summary: "Work productively with modern Microsoft collaboration and business tools.", skills: ["Excel", "Teams", "SharePoint"], careers: ["M365 Administrator", "Business Support"], keywords: ["microsoft", "office", "excel", "teams", "productivity"] },
];

export const giitFacts = { address: "3, Awolowo Way, Ikeja, Lagos", phones: ["09019776416", "08060515686", "08184961247"], website: "www.giitafrica.com" };

export function matchCourses(message: string) {
  const q = message.toLowerCase();
  return courses.map((course) => ({ course, score: course.keywords.reduce((n, keyword) => n + (q.includes(keyword) ? 1 : 0), 0) })).filter((item) => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 3).map((item) => item.course);
}
