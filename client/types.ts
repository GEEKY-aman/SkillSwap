export interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  salary: string;
  tags: string[];
  active?: boolean;
}

export interface UserProfile {
  id: number;
  name: string;
  role: string;
  skill: string;
  rating: number;
  image: string;
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
  id: number;
  title: string;
  topic: string;
  questions: number;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  streak?: number;
  completed?: number;
  average?: number;
}
