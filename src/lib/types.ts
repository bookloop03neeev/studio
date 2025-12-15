
import type { Timestamp } from "firebase/firestore";

export type User = {
  id: string;
  displayName: string;
  photoURL: string;
  imageHint: string;
  email: string;
  firstName: string;
  lastName:string;
  registrationDate: string;
};

export type GradeLevel = '8' | '9' | '10' | '11' | '12';

export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Worn';
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
