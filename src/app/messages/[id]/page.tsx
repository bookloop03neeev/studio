'use client';

import { notFound, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { users, books as staticBooks } from '@/lib/data';
import type { Conversation, Message, User, Book } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function ConversationPage({ params }: { params: { id: string } }) {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  const currentUser = users.find(u => u.id === 'user-1'); // Mock current user

  useEffect(() => {
    const locallyStoredConversations: Conversation[] = JSON.parse(localStorage.getItem('conversations') || '[]');
    const foundConvo = locallyStoredConversations.find(c => c.id === params.id);
    setConversation(foundConvo || null);

    if (foundConvo) {
      const seller = users.find(u => u.id === foundConvo.userId);
      setOtherUser(seller || null);

      const locallyStoredBooks: Book[] = JSON.parse(localStorage.getItem('books') || '[]');
      const allBooks = [...staticBooks, ...locallyStoredBooks];
      const relatedBook = allBooks.find(b => b.id === foundConvo.bookId);
      setBook(relatedBook || null);

      const locallyStoredMessages = JSON.parse(localStorage.getItem('messages') || '{}');
      setChatMessages(locallyStoredMessages[params.id] || []);
    }
  }, [params.id]);


  if (!conversation || !currentUser || !otherUser || !book) {
    // You can show a loading state here
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <p>Loading conversation...</p>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
        id: `msg-${Date.now()}`,
        conversationId: conversation.id,
        senderId: currentUser.id,
        text: newMessage,
        timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...chatMessages, message];
    setChatMessages(updatedMessages);

    const locallyStoredMessages = JSON.parse(localStorage.getItem('messages') || '{}');
    locallyStoredMessages[conversation.id] = updatedMessages;
    localStorage.setItem('messages', JSON.stringify(locallyStoredMessages));
    
    setNewMessage('');
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 p-3 border-b">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
        <div className="flex items-center gap-3">
            <Avatar>
                <AvatarImage src={otherUser.avatarUrl} alt={otherUser.name} data-ai-hint={otherUser.imageHint} />
                <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold">{otherUser.name}</p>
                <p className="text-sm text-muted-foreground">
                    Regarding: <Link href={`/books/${book.id}`} className="hover:underline">{book.title}</Link>
                </p>
            </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.length === 0 ? (
            <div className="text-center text-muted-foreground">
                No messages yet. Start the conversation!
            </div>
        ) : (
            chatMessages.map((message) => (
            <div
                key={message.id}
                className={cn(
                'flex items-end gap-2',
                message.senderId === currentUser.id ? 'justify-end' : 'justify-start'
                )}
            >
                {message.senderId !== currentUser.id && (
                <Avatar className="h-8 w-8">
                    <AvatarImage src={otherUser.avatarUrl} alt={otherUser.name} data-ai-hint={otherUser.imageHint}/>
                    <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                )}
                <div
                className={cn(
                    'max-w-xs md:max-w-md rounded-lg p-3 text-sm',
                    message.senderId === currentUser.id
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-card border rounded-bl-none'
                )}
                >
                <p>{message.text}</p>
                </div>
                {message.senderId === currentUser.id && (
                <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint={currentUser.imageHint}/>
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                )}
            </div>
            ))
        )}
      </div>
      <div className="mt-auto border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            id="message"
            placeholder="Type your message..."
            className="flex-1"
            autoComplete="off"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
