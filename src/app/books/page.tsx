
'use client';

import { BookCard } from '@/components/book-card';
import type { Book } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';

export default function BooksPage() {
  const firestore = useFirestore();

  const booksQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'bookListings'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: allBooks, isLoading: loading } = useCollection<Book>(booksQuery);

  return (
    <div className="container mx-auto py-12">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">
          available books
        </h1>
        <p className="text-muted-foreground">
          look for anything book you want!
        </p>
      </div>
      {loading ? (
          <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
      ) : allBooks && allBooks.length > 0 ? (
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
