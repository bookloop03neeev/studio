import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { userSales } from '@/lib/data';

export function SalesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales History</CardTitle>
        <CardDescription>
          A record of all the books you have successfully sold.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Sold Price</TableHead>
              <TableHead className="hidden md:table-cell">Date Sold</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userSales.length > 0 ? (
              userSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.title}</TableCell>
                  <TableCell className="hidden sm:table-cell">₹{sale.soldPrice}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(sale.soldDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
                <TableRow>
                    <TableCell colSpan={3} className="text-center h-24">
                        You have no sales yet.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
