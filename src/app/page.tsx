import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookCard } from '@/components/book-card';
import { books } from '@/lib/data';
import { Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');
  
  return (
    <>
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center">
        {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt="Students reading books"
                fill
                className="object-cover -z-10"
                priority
                data-ai-hint={heroImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
        <div className="container px-4 md:px-6 relative">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
              Give Your Textbooks a New Chapter
            </h1>
            <p className="text-lg md:text-xl text-foreground/80">
              Buy and sell used books with fellow students. Save money, reduce waste, and find the books you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search by title, author, or ISBN" className="pl-10 h-12" />
              </div>
              <Button size="lg" className="h-12">
                <Search className="mr-2 h-5 w-5" />
                Find Book
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Recently Added</h2>
            <Link href="/books" className="flex items-center text-primary hover:underline">
              <span>View All</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {books.slice(0, 10).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
