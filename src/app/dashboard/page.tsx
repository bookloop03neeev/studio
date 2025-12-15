import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, DollarSign, ShoppingCart } from 'lucide-react';
import { ListingsTab } from './listings-tab';
import { SalesTab } from './sales-tab';
import { PurchasesTab } from './purchases-tab';

export default function DashboardPage() {
    return (
        <div className="container mx-auto py-10">
            <div className="space-y-2 mb-8">
                <h1 className="text-3xl md:text-4xl font-bold font-headline">My Dashboard</h1>
                <p className="text-muted-foreground">Manage your listings, track sales, and view your purchase history.</p>
            </div>
            
            <Tabs defaultValue="listings" className="space-y-4">
                <TabsList className="grid w-full grid-cols-1 sm:w-auto sm:grid-cols-3">
                    <TabsTrigger value="listings">
                        <Book className="mr-2 h-4 w-4" /> My Listings
                    </TabsTrigger>
                    <TabsTrigger value="sales">
                        <DollarSign className="mr-2 h-4 w-4" /> Sales History
                    </TabsTrigger>
                    <TabsTrigger value="purchases">
                        <ShoppingCart className="mr-2 h-4 w-4" /> Purchase History
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="listings">
                    <ListingsTab />
                </TabsContent>
                <TabsContent value="sales">
                    <SalesTab />
                </TabsContent>
                <TabsContent value="purchases">
                    <PurchasesTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
