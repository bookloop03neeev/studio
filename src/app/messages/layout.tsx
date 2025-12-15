import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { ConversationList } from './conversation-list';

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted/40 flex-1">
      <SidebarProvider>
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] h-[calc(100dvh-4rem)]">
          <Sidebar
            variant="sidebar"
            collapsible="offcanvas"
            className="p-0 border-r"
          >
            <ConversationList />
          </Sidebar>
          <SidebarInset className="m-0 rounded-none shadow-none">
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
