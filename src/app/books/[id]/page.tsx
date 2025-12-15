
'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { books as staticBooks, users } from '@/lib/data';
import type { Book, Conversation } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { MessageCircle, Loader2 } from 'lucide-react';

export default function BookDetailPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [book, setBook] = useState<Book | null | undefined>(undefined);

    useEffect(() => {
        if (params.id) {
            const locallyStoredBooks: Book[] = JSON.parse(localStorage.getItem('books') || '[]');
            const allBooks = [...staticBooks, ...locallyStoredBooks];
            const foundBook = allBooks.find((b) => b.id === params.id);
            setBook(foundBook || null);
        }
    }, [params.id]);

    const handleContactSeller = () => {
        if (!book) return;

        const locallyStoredConversations: Conversation[] = JSON.parse(localStorage.getItem('conversations') || '[]');
        
        const existingConversation = locallyStoredConversations.find(
            c => c.bookId === book.id && c.userId === book.sellerId
        );

        if (existingConversation) {
            router.push(`/messages/${existingConversation.id}`);
            return;
        }

        const newConversation: Conversation = {
            id: `convo-${Date.now()}`,
            userId: book.sellerId,
            bookId: book.id,
        };

        const updatedConversations = [...locallyStoredConversations, newConversation];
        localStorage.setItem('conversations', JSON.stringify(updatedConversations));

        // Optionally, create an initial message
        const locallyStoredMessages = JSON.parse(localStorage.getItem('messages') || '{}');
        if (!locallyStoredMessages[newConversation.id]) {
            locallyStoredMessages[newConversation.id] = [];
        }
        localStorage.setItem('messages', JSON.stringify(locallyStoredMessages));

        router.push(`/messages/${newConversation.id}`);
    };


    if (book === undefined) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }
    
    if (!book) {
        notFound();
    }

    const seller = users.find((u) => u.id === book.sellerId);

    return (
        <div className="container mx-auto max-w-5xl py-8 md:py-12">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <div className="flex items-start justify-center">
                    <Card className="overflow-hidden w-full max-w-sm">
                        <div className="relative aspect-[2/3]">
                            <Image
                                src={book.imageUrl}
                                alt={`Cover of ${book.title}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 90vw, 450px"
                                data-ai-hint={book.imageHint}
                            />
                        </div>
                    </Card>
                </div>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold font-headline">{book.title}</h1>
                        <p className="text-xl text-muted-foreground mt-1">by {book.author}</p>
                    </div>
                    
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Description</h2>
                        <p className="text-foreground/80 leading-relaxed">{book.description}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Badge variant="outline" className="text-sm">{book.condition}</Badge>
                        <Badge variant="outline" className="text-sm">
                        {book.gradeLevel === 'College' ? 'College' : `Grade ${book.gradeLevel}`}
                        </Badge>
                    </div>

                    <p className="text-4xl font-bold text-primary">₹{book.price}</p>

                    <Separator />
                    
                    {seller && (
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg">Seller Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src={seller.avatarUrl} alt={seller.name} data-ai-hint={seller.imageHint} />
                                            <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <p className="font-semibold">{seller.name}</p>
                                    </div>
                                    <Button onClick={handleContactSeller}>
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        Contact Seller
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
