// MongoDB documents use _id, so we support both for compatibility
export interface Job {
  _id?: string;
  id?: number | string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  salary: string;
  tags: string[];
  active?: boolean;
  applicants?: string[];
}

export interface UserProfile {
  _id?: string;
  id?: number | string;
  name: string;
  email?: string;
  role: string;
  skills?: string[];
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  rating?: number;
  image?: string;
  status?: 'Active' | 'Suspended' | 'Online' | 'Offline';
}

export interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
}

export interface Quiz {
  _id?: string;
  id?: number | string;
  title: string;
  topic: string;
  questionsCount?: number;
  questions?: QuizQuestion[];
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  streak?: number;
  completed?: number;
  average?: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer?: number;
}

export interface Hackathon {
  _id?: string;
  id?: number | string;
  title: string;
  organizer: string;
  date: string;
  participants: number;
  image?: string;
  tags?: string[];
  status: 'Upcoming' | 'Live' | 'Ended';
  registeredUsers?: string[];
}

export interface Course {
  _id?: string;
  id?: number | string;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  price: string;
  image?: string;
  tags?: string[];
  level?: string;
  hours?: string;
  enrolledUsers?: string[];
}

export interface ProfileStats {
  jobsApplied: number;
  hackathonsJoined: number;
  coursesEnrolled: number;
  quizzesCompleted: number;
  avgQuizScore: number;
}
