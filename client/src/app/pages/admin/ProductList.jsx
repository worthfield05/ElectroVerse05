import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pencil, Trash } from "lucide-react";
import React from "react";
import { useDeleteProduct, useGetAdminProductList } from "@/hooks/useAdmin";
import Loading from "@/components/common/Loading";
import { useNavigate } from "react-router";

const ProductList = () => {
  const { data, isLoading } = useGetAdminProductList();
  const { mutate, isPending } = useDeleteProduct();
  const products = data?.products;
  const navigate = useNavigate();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-125">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="text-xs text-muted-foreground">
                    {product._id}
                  </TableCell>

                  <TableCell>
                    <img
                      src={product.image[0]?.url}
                      alt={product.name}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                  </TableCell>

                  <TableCell className="font-medium">{product.name}</TableCell>

                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        product.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock > 0 ? product.stock : "Out of stock"}
                    </span>
                  </TableCell>

                  <TableCell>{product.ratings} ⭐</TableCell>

                  <TableCell>Rs. {product.price}</TableCell>

                  <TableCell>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    <Button
                      onClick={() => navigate(`/admin/product/${product?._id}`)}
                      size="icon"
                      variant="outline"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      disabled={isPending}
                      onClick={() => mutate(product?._id)}
                      variant="destructive"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ProductList;
