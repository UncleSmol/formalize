export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  summary: string;
  intro: string;
  items: string[];
  details: string[];
  color: string;
  gradient: string;
  href: string;
}

export const SERVICES: Service[] = [
  {
    id: "finance",
    icon: "bi-cash-stack",
    title: "Finance",
    description: "Take control of bookkeeping, cash flow, budgeting, and debt recovery.",
    summary: "Master your financial foundation.",
    intro:
      "We help you build clear financial systems that give you complete visibility and control over your money.",
    items: ["Monthly reports", "Cash flow tracking", "Budgeting", "Debt recovery"],
    details: [
      "Basic accounting around your finances",
      "Remittance management and processing",
      "Account reconciliations",
      "Monthly financial reports",
      "Cash flow tracking and optimization",
      "Budgeting and forecasting",
      "Debt recovery assistance",
      "Tax compliance support",
    ],
    color: "bg-primary",
    gradient: "from-yellow-400 to-amber-500",
    href: "/services/finance",
  },
  {
    id: "operations",
    icon: "bi-gear-wide-connected",
    title: "Operations",
    description: "Clean up workflows, reduce leaks, and make accountability visible.",
    summary: "Streamline your business processes.",
    intro:
      "Clean workflows reduce chaos and make it clear who is responsible for what. That is how businesses scale.",
    items: ["Process fixes", "SOPs", "Workflow mapping", "Accountability"],
    details: [
      "Process mapping and optimization",
      "Standard Operating Procedures (SOPs)",
      "Workflow automation setup",
      "Accountability systems",
      "Performance metrics definition",
      "Team coordination tools",
      "Efficiency audits",
      "Continuous improvement strategies",
    ],
    color: "bg-[#7df3ff]",
    gradient: "from-cyan-400 to-blue-500",
    href: "/services/operations",
  },
  {
    id: "it-systems",
    icon: "bi-pc-display-horizontal",
    title: "IT & Systems",
    description: "Build the technical backbone from websites to networks and devices.",
    summary: "Build your technical backbone.",
    intro:
      "The right technology eliminates friction and keeps your business moving at full speed.",
    items: ["Web development", "Networking", "Business emails", "Hardware"],
    details: [
      "Website and web application development",
      "Network infrastructure setup",
      "Business email configuration",
      "Hardware procurement and setup",
      "Cloud systems integration",
      "Cybersecurity implementation",
      "Data backup and recovery systems",
      "IT support and maintenance",
    ],
    color: "bg-[#ffb86b]",
    gradient: "from-orange-400 to-red-500",
    href: "/services/it-systems",
  },
  {
    id: "marketing",
    icon: "bi-megaphone",
    title: "Marketing & Branding",
    description: "Help your business look credible and show up consistently.",
    summary: "Build your brand presence.",
    intro:
      "Consistent branding and strategic marketing make your business visible to the right customers.",
    items: ["Brand identity", "Social media", "Video", "Website optimization"],
    details: [
      "Brand identity development",
      "Logo and visual design",
      "Social media strategy",
      "Content creation and management",
      "Video production",
      "Website optimization",
      "Digital advertising campaigns",
      "Marketing automation setup",
    ],
    color: "bg-[#ff4fa3]",
    gradient: "from-pink-400 to-rose-500",
    href: "/services/marketing",
  },
  {
    id: "hr",
    icon: "bi-people",
    title: "HR Management",
    description: "Create cleaner people operations with payroll, attendance, and contracts.",
    summary: "Organize your people operations.",
    intro:
      "Happy, organized teams are productive teams. We help you build systems that support both.",
    items: ["Payroll", "Attendance", "Leave systems", "Recruitment"],
    details: [
      "Payroll system setup and management",
      "Attendance tracking",
      "Leave management system",
      "Employee recruitment",
      "Contracts and compliance",
      "Performance management",
      "Benefits administration",
      "Team culture building",
    ],
    color: "bg-[#b69cff]",
    gradient: "from-purple-400 to-indigo-500",
    href: "/services/hr",
  },
  {
    id: "office",
    icon: "bi-building",
    title: "Office Setup",
    description: "Source and set up the practical tools your workspace needs.",
    summary: "Create your ideal workspace.",
    intro:
      "A well-designed workspace supports productivity and reflects your professional brand.",
    items: ["Furniture", "Printers", "Stationery", "Bulk sourcing"],
    details: [
      "Furniture sourcing and design",
      "Printer and equipment procurement",
      "Stationery and supplies management",
      "Bulk sourcing and discounts",
      "Office layout optimization",
      "Technology setup",
      "Meeting room configuration",
      "Maintenance coordination",
    ],
    color: "bg-[#85f0b2]",
    gradient: "from-green-400 to-emerald-500",
    href: "/services/office",
  },
];

export function getServiceById(serviceId: string) {
  return SERVICES.find((service) => service.id === serviceId);
}
