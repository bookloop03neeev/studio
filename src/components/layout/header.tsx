'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookLoopLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Book, LogOut, LayoutDashboard } from 'lucide-react';
import { users } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const user = users.find(u => u.id === 'user-1'); // Mock logged-in user

  const navItems = [
    { href: '/', label: 'Browse' },
    { href: '/sell', label: 'Sell a Book' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BookLoopLogo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              BookLoop
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'transition-colors hover:text-primary',
                  pathname === item.href ? 'text-primary' : 'text-foreground/60'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="flex items-center" onClick={() => setSheetOpen(false)}>
              <BookLoopLogo className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-lg font-headline">BookLoop</span>
            </Link>
            <div className="flex flex-col space-y-3 mt-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setSheetOpen(false)}
                  className={cn(
                    'text-lg transition-colors hover:text-primary',
                    pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Can add search here if needed */}
          </div>
          <nav className="flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.imageHint} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        student@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/messages">
                      <Book className="mr-2 h-4 w-4" />
                      <span>Messages</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button>Sign In</Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
