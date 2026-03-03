import { useState } from "react";
import { DataTable, Badge } from "../../components";

interface Order {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  status: string;
  orderDate: string;
}

export default function OrderView() {
  const [orders] = useState<Order[]>([
    {
      id: "1",
      productName: "Product 1",
      quantity: 2,
      price: 100,
      total: 200,
      status: "Pending",
      orderDate: "2024-02-20",
    },
    {
      id: "2",
      productName: "Product 2",
      quantity: 1,
      price: 150,
      total: 150,
      status: "Completed",
      orderDate: "2024-02-18",
    },
  ]);

  return (
    <DataTable<Order>
      title="Orders"
      columns={[
        { key: "id", label: "Order ID" },
        { key: "productName", label: "Product" },
        { key: "quantity", label: "Quantity" },
        {
          key: "price",
          label: "Price",
          render: (value) => `$${value}`,
        },
        {
          key: "total",
          label: "Total",
          render: (value) => `$${value}`,
        },
        {
          key: "status",
          label: "Status",
          render: (value) => (
            <Badge variant={value === "Completed" ? "success" : "pending"}>
              {`${value}`}
            </Badge>
          ),
        },
        { key: "orderDate", label: "Date" },
      ]}
      data={orders}
      onAdd={() => console.log("Create order")}
      onEdit={(order) => console.log("View order:", order)}
      onDelete={(order) => console.log("Delete order:", order)}
      addButtonText="Create Order"
      addButtonVariant="info"
    />
  );
}
