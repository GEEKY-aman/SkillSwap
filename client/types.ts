<<<<<<< HEAD
export interface Job {
  id: number;
=======
// MongoDB documents use _id, so we support both for compatibility
export interface Job {
  _id?: string;
  id?: number | string;
>>>>>>> 7fb58eb (Your commit message here)
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  salary: string;
  tags: string[];
  active?: boolean;
<<<<<<< HEAD
}

export interface UserProfile {
  id: number;
  name: string;
  role: string;
  skill: string;
  rating: number;
  image: string;
=======
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
>>>>>>> 7fb58eb (Your commit message here)
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
<<<<<<< HEAD
  id: number;
  title: string;
  topic: string;
  questions: number;
=======
  _id?: string;
  id?: number | string;
  title: string;
  topic: string;
  questionsCount?: number;
  questions?: QuizQuestion[];
>>>>>>> 7fb58eb (Your commit message here)
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  streak?: number;
  completed?: number;
  average?: number;
}
<<<<<<< HEAD
=======

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
>>>>>>> 7fb58eb (Your commit message here)
