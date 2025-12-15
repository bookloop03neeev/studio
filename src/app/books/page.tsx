'use client';

import { useState, useEffect } from 'react';
import { BookCard } from '@/components/book-card';
import { books as staticBooks } from '@/lib/data';
import type { Book } from '@/lib/types';

export default function BooksPage() {
  const [allBooks, setAllBooks] = useState<Book[]>(staticBooks);

  useEffect(() => {
    // This code runs only on the client, after the component has mounted.
    try {
      const locallyStoredBooks: Book[] = JSON.parse(localStorage.getItem('books') || '[]');
      // Combine static books with locally stored ones, ensuring no duplicates.
      const combinedBooks = [...staticBooks];
      const staticIds = new Set(staticBooks.map(b => b.id));
      locallyStoredBooks.forEach(localBook => {
        if (!staticIds.has(localBook.id)) {
          combinedBooks.push(localBook);
        }
      });
      setAllBooks(combinedBooks);
    } catch (error) {
      console.error("Failed to parse books from localStorage", error);
      // Fallback to just static books if localStorage is corrupt
      setAllBooks(staticBooks);
    }
  }, []);

  return (
    <div className="container mx-auto py-12">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">
          All Books
        </h1>
        <p className="text-muted-foreground">
          Browse all the books available for sale.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {allBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
