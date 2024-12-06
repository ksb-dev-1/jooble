interface Job {
  id: string;
  companyLogo?: string | null;
  companyName: string;
  experience: string;
  role: string;
  type: string;
  location: string;
  workMode: string;
  salary: number;
  skills: string[];
  openings: number;
  applications: number;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
