export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  imageHint: string;
};

export type GradeLevel = '8' | '9' | '10' | '11' | '12';

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
