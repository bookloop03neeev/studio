
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud } from 'lucide-react';
import type { GradeLevel, Book } from '@/lib/types';
import { books as staticBooks } from '@/lib/data';
import Image from 'next/image';

const gradeLevels: GradeLevel[] = ['8', '9', '10', '11', '12', 'College'];

const formSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  author: z.string().min(2, 'Author must be at least 2 characters.'),
  price: z.coerce.number().int().positive('Price must be a positive number.'),
  condition: z.enum(['New', 'Like New', 'Good', 'Fair']),
  gradeLevel: z.enum(gradeLevels),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  image: z.any().refine(file => file instanceof File, 'Image is required.'),
});

export function SellForm({ userId }: { userId: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      author: '',
      price: 0,
      description: '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const existingBooks: Book[] = JSON.parse(localStorage.getItem('books') || '[]')
    const allBooks = [...staticBooks, ...existingBooks];

    const newBook: Book = {
        id: `book-${allBooks.length + 1}`,
        sellerId: userId,
        imageUrl: preview || '',
        imageHint: "book cover",
        ...values,
    };

    const updatedBooks = [...existingBooks, newBook];
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    
    toast({
      title: 'Listing Created!',
      description: `Your book "${values.title}" has been listed for sale.`,
    });
    form.reset();
    setPreview(null);
    router.push('/books');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., The Principles of Economics" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., N. Gregory Mankiw" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Price (₹)</FormLabel>
                <FormControl>
                    <Input type="number" step="1" placeholder="3500" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Condition</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select book condition" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {['New', 'Like New', 'Good', 'Fair'].map((condition) => (
                        <SelectItem key={condition} value={condition}>
                        {condition}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        
        <FormField
          control={form.control}
          name="gradeLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target grade level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {gradeLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level === 'College' ? 'College' : `Grade ${level}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about your book's condition, edition, etc."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Mention any highlights, notes, or included access codes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Cover Image</FormLabel>
              <FormControl>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted transition-colors"
                  >
                    {preview ? (
                      <Image
                        src={preview}
                        alt="Book cover preview"
                        fill
                        className="object-contain rounded-md"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG or WEBP (MAX. 800x400px)
                        </p>
                      </div>
                    )}
                    <Input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg">Create Listing</Button>
      </form>
    </Form>
  );
}
