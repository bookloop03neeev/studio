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
import { userListings } from '@/lib/data';

export function ListingsTab() {
  return (
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
            {userListings.length > 0 ? (
              userListings.map((book) => (
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
                    ${book.price.toFixed(2)}
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
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
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
  );
}
