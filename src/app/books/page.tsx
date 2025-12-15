
'use client';

import { useState, useEffect } from 'react';
import { BookCard } from '@/components/book-card';
import { books as staticBooks } from '@/lib/data';
import type { Book } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function BooksPage() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
        setLoading(false);
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
      {loading ? (
          <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
      ) : allBooks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {allBooks.map((book) => (
            <BookCard key={book.id} book={book} />
            ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
            <h2 className="text-2xl font-semibold mb-2">No books yet!</h2>
            <p>Check back later or be the first to list a book for sale.</p>
        </div>
      )}
    </div>
  );
}
