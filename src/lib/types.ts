
import type { Timestamp } from "firebase/firestore";

export type User = {
  id: string;
  userName: string;
  avatarUrl: string;
  imageHint: string;
  email: string;
};

export type GradeLevel = '8' | '9' | '10' | '11' | '12' | 'College';

export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  gradeLevel: GradeLevel;
  description: string;
  sellerId: string;
  imageUrl: string;
  imageHint: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type Conversation = {
  id: string;
  userId: string;
  bookId: string;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: string;
};
