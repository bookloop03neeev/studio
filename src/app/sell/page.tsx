import { SellForm } from './sell-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SellPage() {
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
          <SellForm />
        </CardContent>
      </Card>
    </div>
  );
}
