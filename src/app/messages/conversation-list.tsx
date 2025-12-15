'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { conversations } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ConversationList() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold font-headline">Messages</h2>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 p-2">
          {conversations.map((convo) => (
            <Link
              key={convo.id}
              href={`/messages/${convo.id}`}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground',
                pathname === `/messages/${convo.id}` &&
                  'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
              )}
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={convo.otherUser.avatarUrl} alt={convo.otherUser.name} data-ai-hint={convo.otherUser.imageHint} />
                <AvatarFallback>{convo.otherUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold truncate">{convo.otherUser.name}</p>
                <p className="text-xs truncate">
                  Re: {convo.book.title}
                </p>
              </div>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}
