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

export const books: Book[] = [
  {
    id: '1',
    title: 'The Principles of Economics',
    author: 'N. Gregory Mankiw',
    price: 45,
    condition: 'Like New',
    gradeLevel: 'College',
    sellerId: 'user-2',
    imageUrl: findImage('book-1').url,
    imageHint: findImage('book-1').hint,
    description: 'A comprehensive introduction to the principles of economics, perfect for first-year college students. The book is in excellent condition with no markings or highlights.',
  },
  {
    id: '2',
    title: 'Biology: A Global Approach',
    author: 'Campbell, Urry, Cain',
    price: 60,
    condition: 'Good',
    gradeLevel: 'College',
    sellerId: 'user-3',
    imageUrl: findImage('book-2').url,
    imageHint: findImage('book-2').hint,
    description: 'The 11th edition of this classic biology textbook. Has some highlighting in the first few chapters but is otherwise in great shape. Access code not included.',
  },
  {
    id: '3',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 8,
    condition: 'Good',
    gradeLevel: '10',
    sellerId: 'user-4',
    imageUrl: findImage('book-3').url,
    imageHint: findImage('book-3').hint,
    description: 'A classic novel for high school English classes. Paperback version with a slightly worn cover, but no torn pages or markings inside. A great reading copy.',
  },
  {
    id: '4',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 5,
    condition: 'Fair',
    gradeLevel: '11',
    sellerId: 'user-2',
    imageUrl: findImage('book-4').url,
    imageHint: findImage('book-4').hint,
    description: 'Required reading for many literature courses. This copy has seen better days, with some notes in the margins and a creased spine, but it is complete and readable.',
  },
  {
    id: '5',
    title: 'Introduction to Algorithms',
    author: 'CLRS',
    price: 75,
    condition: 'New',
    gradeLevel: 'College',
    sellerId: 'user-3',
    imageUrl: findImage('book-5').url,
    imageHint: findImage('book-5').hint,
    description: 'The bible of algorithms. This is a brand new, unused hardcover copy. I bought it but dropped the class. My loss is your gain.',
  },
  {
    id: '6',
    title: 'Where the Wild Things Are',
    author: 'Maurice Sendak',
    price: 12,
    condition: 'Like New',
    gradeLevel: '2',
    sellerId: 'user-4',
    imageUrl: findImage('book-6').url,
    imageHint: findImage('book-6').hint,
    description: 'A beloved children\'s book in pristine condition. Perfect for young readers or as a collector\'s item. No signs of wear.',
  },
  {
    id: '7',
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    price: 9,
    condition: 'Good',
    gradeLevel: '11',
    sellerId: 'user-2',
    imageUrl: findImage('book-7').url,
    imageHint: findImage('book-7').hint,
    description: 'A thought-provoking dystopian novel. This paperback is in good condition, with a clean interior and a solid spine. Minor shelf wear on the cover.',
  },
  {
    id: '8',
    title: 'A Wrinkle in Time',
    author: 'Madeleine L\'Engle',
    price: 6,
    condition: 'Good',
    gradeLevel: '7',
    sellerId: 'user-3',
    imageUrl: findImage('book-8').url,
    imageHint: findImage('book-8').hint,
    description: 'A fantastic sci-fi story for middle schoolers. The book has been read once and is in great shape, ready for its next adventure.',
  },
];

export const userListings = books.filter(book => book.sellerId === 'user-1');
export const userSales = [
  { ...books[1], soldPrice: 55.00, soldDate: '2023-10-15', buyer: 'user-4' },
  { ...books[3], soldPrice: 5.00, soldDate: '2023-09-01', buyer: 'user-3' },
];
export const userPurchases = [
  { ...books[2], purchasePrice: 60.50, purchaseDate: '2023-08-20', seller: 'user-3' },
];

export const conversations: (Conversation & { otherUser: User, book: Book })[] = [
    {
        id: 'conv-1',
        userId: 'user-2',
        bookId: '1',
        otherUser: users.find(u => u.id === 'user-2')!,
        book: books.find(b => b.id === '1')!
    },
    {
        id: 'conv-2',
        userId: 'user-3',
        bookId: '2',
        otherUser: users.find(u => u.id === 'user-3')!,
        book: books.find(b => b.id === '2')!
    },
];

export const messages: Record<string, Message[]> = {
    'conv-1': [
        { id: 'msg-1', conversationId: 'conv-1', senderId: 'user-1', text: 'Hi, is this book still available?', timestamp: '2023-11-10T10:00:00Z' },
        { id: 'msg-2', conversationId: 'conv-1', senderId: 'user-2', text: 'Yes, it is!', timestamp: '2023-11-10T10:01:00Z' },
        { id: 'msg-3', conversationId: 'conv-1', senderId: 'user-1', text: 'Great! Does it have any highlighting?', timestamp: '2023-11-10T10:02:00Z' },
        { id: 'msg-4', conversationId: 'conv-1', senderId: 'user-2', text: 'Nope, it\'s completely clean inside.', timestamp: '2023-11-10T10:03:00Z' },
    ],
    'conv-2': [
        { id: 'msg-5', conversationId: 'conv-2', senderId: 'user-1', text: 'Hello, I\'m interested in the biology textbook.', timestamp: '2023-11-09T14:30:00Z' },
    ],
};
