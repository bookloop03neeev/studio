import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { userPurchases } from '@/lib/data';

export function PurchasesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase History</CardTitle>
        <CardDescription>
          A record of all the books you have bought on BookLoop.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Purchase Price</TableHead>
              <TableHead className="hidden md:table-cell">Date Purchased</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userPurchases.length > 0 ? (
              userPurchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell className="font-medium">{purchase.title}</TableCell>
                  <TableCell className="hidden sm:table-cell">₹{purchase.purchasePrice}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(purchase.purchaseDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
                <TableRow>
                    <TableCell colSpan={3} className="text-center h-24">
                        You haven't purchased any books yet.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
