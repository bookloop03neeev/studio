
import { PlaceHolderImages } from './placeholder-images';
import type { User, Book, Conversation, Message } from './types';

const findImage = (id: string) => {
    const img = PlaceHolderImages.find(p => p.id === id);
    return img ? { url: img.imageUrl, hint: img.imageHint } : { url: 'https://picsum.photos/seed/fallback/400/600', hint: 'fallback' };
};

export const users: User[] = [
  { id: 'user-1', name: 'Alex Doe', avatarUrl: findImage('user-1').url, imageHint: findImage('user-1').hint },
  { id: 'user-2', name: 'Jane Smith', avatarUrl: findImage('user-2').url, imageHint: findImage('user-2').hint },
  { id: 'user-3', name: 'Sam Wilson', avatarUrl: findImage('user-3').url, imageHint: findImage('user-3').hint },
  { id: 'user-4', name: 'Beth Green', avatarUrl: findImage('user-4').url, imageHint: findImage('user-4').hint },
];

export const books: Book[] = [];

export const userListings = books.filter(book => book.sellerId === 'user-1');
export const userSales = [];
export const userPurchases = [];

export const conversations: Conversation[] = [];

export const messages: Record<string, Message[]> = {};
