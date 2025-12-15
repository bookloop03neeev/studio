
import { PlaceHolderImages } from './placeholder-images';
import type { User, Book, Conversation, Message } from './types';

const findImage = (id: string) => {
    const img = PlaceHolderImages.find(p => p.id === id);
    return img ? { url: img.imageUrl, hint: img.imageHint } : { url: 'https://picsum.photos/seed/fallback/400/600', hint: 'fallback' };
};

export const users: User[] = [];

export const books: Book[] = [];

export const userListings = books.filter(book => book.sellerId === 'user-1');
export const userSales = [];
export const userPurchases = [];

export const conversations: Conversation[] = [];

export const messages: Record<string, Message[]> = {};
