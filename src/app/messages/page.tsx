import { MessageCircle } from 'lucide-react';

export default function MessagesPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <MessageCircle className="w-16 h-16 text-muted-foreground" />
      <h3 className="text-2xl font-bold tracking-tight">
        Select a conversation
      </h3>
      <p className="text-muted-foreground">
        Choose a conversation from the list to see your messages or start a new one from a book listing.
      </p>
    </div>
  );
}
