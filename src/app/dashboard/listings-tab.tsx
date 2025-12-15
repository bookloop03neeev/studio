
'use client';

import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { books as staticBooks } from '@/lib/data';
import type { Book } from '@/lib/types';
import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


export function ListingsTab() {
  const [listings, setListings] = useState<Book[]>([]);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  useEffect(() => {
    const userListings = staticBooks.filter(book => book.sellerId === 'user-1');
    const localListings : Book[] = JSON.parse(localStorage.getItem('books') || '[]');
    const userLocalListings = localListings.filter(book => book.sellerId === 'user-1');
    
    const allUserListings = [...userListings];
    const userListingIds = new Set(userListings.map(b => b.id));

    userLocalListings.forEach(localBook => {
        if (!userListingIds.has(localBook.id)) {
            allUserListings.push(localBook);
        }
    });

    setListings(allUserListings);
  }, []);

  const handleDelete = () => {
    if (!bookToDelete) return;

    // We can only delete from localStorage, not from the static data array
    const localListings: Book[] = JSON.parse(localStorage.getItem('books') || '[]');
    const updatedLocalListings = localListings.filter(book => book.id !== bookToDelete.id);
    localStorage.setItem('books', JSON.stringify(updatedLocalListings));

    setListings(listings.filter(book => book.id !== bookToDelete.id));
    setBookToDelete(null);
  };


  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>My Active Listings</CardTitle>
          <CardDescription>
            Here are the books you currently have for sale.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.length > 0 ? (
                listings.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={book.title}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={book.imageUrl}
                        width="64"
                        data-ai-hint={book.imageHint}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{book.condition}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      ₹{book.price}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive"
                            onClick={() => setBookToDelete(book)}
                            disabled={staticBooks.some(b => b.id === book.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    You have no active listings.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <AlertDialog open={!!bookToDelete} onOpenChange={(open) => !open && setBookToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              listing for &quot;{bookToDelete?.title}&quot;.
            </Lad AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setBookToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
