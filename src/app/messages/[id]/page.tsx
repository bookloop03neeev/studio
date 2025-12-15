'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { conversations, messages, users } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function ConversationPage({ params }: { params: { id: string } }) {
  const conversation = conversations.find((c) => c.id === params.id);
  const chatMessages = messages[params.id] || [];
  const currentUser = users.find(u => u.id === 'user-1'); // Mock current user

  if (!conversation || !currentUser) {
    notFound();
  }

  const { otherUser, book } = conversation;

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
        {chatMessages.map((message) => (
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
        ))}
      </div>
      <div className="mt-auto border-t p-4">
        <form className="flex items-center gap-2">
          <Input
            id="message"
            placeholder="Type your message..."
            className="flex-1"
            autoComplete="off"
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
