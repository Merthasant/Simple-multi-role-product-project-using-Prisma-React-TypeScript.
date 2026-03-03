import { useState } from "react";
import { DataTable } from "../../components";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export default function ProductView() {
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Product 1",
      description: "Sample product description",
      price: 100,
      quantity: 50,
    },
    {
      id: "2",
      name: "Product 2",
      description: "Another sample product",
      price: 150,
      quantity: 30,
    },
  ]);

  return (
    <DataTable<Product>
      title="Products"
      columns={[
        { key: "name", label: "Name" },
        { key: "description", label: "Description" },
        {
          key: "price",
          label: "Price",
          render: (value) => `$${value}`,
        },
        { key: "quantity", label: "Quantity" },
      ]}
      data={products}
      onAdd={() => console.log("Add product")}
      onEdit={(product) => console.log("Edit product:", product)}
      onDelete={(product) => console.log("Delete product:", product)}
      addButtonText="Add Product"
      addButtonVariant="success"
    />
  );
}
