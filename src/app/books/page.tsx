import { BookCard } from '@/components/book-card';
import { books } from '@/lib/data';

export default function BooksPage() {
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
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
