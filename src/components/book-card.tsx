import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Book } from '@/lib/types';

export function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/books/${book.id}`} className="group outline-none" aria-label={`View details for ${book.title}`}>
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2">
        <div className="relative aspect-[2/3] w-full">
          <Image 
            src={book.imageUrl} 
            alt={`Cover of ${book.title}`} 
            fill 
            className="object-cover" 
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            data-ai-hint={book.imageHint}
          />
        </div>
        <CardContent className="p-4 flex flex-col flex-1">
          <h3 className="font-headline font-bold text-base leading-snug truncate">{book.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{book.author}</p>
          <div className="flex justify-between items-center mt-auto pt-2">
            <p className="text-lg font-bold text-primary">₹{book.price}</p>
            <Badge variant="secondary">{book.condition}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
