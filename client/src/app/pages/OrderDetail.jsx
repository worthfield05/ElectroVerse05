import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useGetOrderDetail } from "@/hooks/useOrder";
import { useParams } from "react-router";
import Loading from "@/components/common/Loading";

const OrderDetail = () => {
  const { id } = useParams();

  const { isLoading, data } = useGetOrderDetail(id);
  if (isLoading) {
    return <Loading />;
  }
  const order = data?.order;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 max-h-screen overflow-y-scroll">
      <h1 className="text-2xl font-bold">Order Details</h1>

      {/* 1️⃣ Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-75">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.orderItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-14 w-14 rounded object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>Rs. {item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* 2️⃣ Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Name:</span>
            {order.user.name}
          </p>
          <p>
            <span className="font-medium">Phone:</span>{" "}
            {order.shippingInfo.phone}
          </p>
          <p>
            <span className="font-medium">Address:</span>{" "}
            {order.shippingInfo.address}
          </p>
          <p>
            <span className="font-medium">City:</span>
            {order.shippingInfo.city}
          </p>
          <p>
            <span className="font-medium">Postal Code:</span>{" "}
            {order.shippingInfo.pinCode}
          </p>
          <p>
            <span className="font-medium">Country:</span>{" "}
            {order.shippingInfo.country}
          </p>
        </CardContent>
      </Card>

      {/* 3️⃣ Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Items Price</span>
            <span>Rs. {order.itemPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>Rs. {order.taxPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Rs. {order.shippingPrice}</span>
          </div>

          <Separator />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>Rs. {order.totalPrice}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetail;
