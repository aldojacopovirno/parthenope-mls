export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string; // HTML content
  author: string;
  date: string;
  imageUrl: string;
  tags: string[];
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export enum View {
  HOME = 'HOME',
  BLOG = 'BLOG',
  TEAM = 'TEAM',
  CONTACT = 'CONTACT'
}