
'use client';

import { SellForm } from './sell-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function SellPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login?redirect=/sell');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Sell Your Book</CardTitle>
          <CardDescription>
            Fill out the form below to list your book for sale. The more details you provide, the faster it will sell!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SellForm userId={user.uid} />
        </CardContent>
      </Card>
    </div>
  );
}
