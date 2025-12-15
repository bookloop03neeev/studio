
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us-image');

  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-20">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
            Our Story
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Connecting students, one book at a time.
          </p>
        </div>

        {aboutImage && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={aboutImage.imageUrl}
              alt="A library with shelves full of books"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              data-ai-hint={aboutImage.imageHint}
            />
          </div>
        )}

        <div className="prose prose-lg mx-auto max-w-none text-foreground/90">
          <p>
            BookLoop started with a simple idea: textbooks are too expensive, and they shouldn't go to waste after just one semester. We are a team of students who were tired of seeing useful books gather dust on shelves while others struggled to afford new ones.
          </p>
          <p>
            We believe in creating a sustainable and affordable way for students to access the educational materials they need. Our platform is designed to be a simple, trustworthy marketplace for buying and selling used textbooks directly within the student community.
          </p>
          <h2 className="text-2xl font-bold font-headline text-primary">Our Mission</h2>
          <p>
            Our mission is to make education more accessible and sustainable. By creating a loop of book-sharing, we help students save money, reduce waste, and build a stronger, more connected campus community. Every book that finds a new home is a win for students and the environment.
          </p>
        </div>
      </div>
    </div>
  );
}
