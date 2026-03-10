import { useState } from "react";
import { Button, Card, Input } from "../../components";

interface Products {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    name: string;
    email: string;
  };
}

export default function SearchView() {
  const [products] = useState<Products[]>([
    {
      id: "a2dff5b1-d6c7-4c50-85e6-b71228b15dc9",
      name: "iphone 14 pro max",
      description: "Apple iPhone 14 Pro Max with advanced features",
      price: 1099.99,
      quantity: 4,
      createdAt: "2026-02-10T10:54:10.620Z",
      updatedAt: "2026-02-10T10:54:10.620Z",
      userId: "c624cc40-81b2-45a2-ab35-8d0682d9835a",
      user: {
        name: "John Doe",
        email: "jhon.doe@example.com",
      },
    },
    {
      id: "14311964-1527-4b48-abb8-25afe9d3a3ee",
      name: "Samsung Galaxy S23 Ultra",
      description: "Samsung Galaxy S23 Ultra with cutting-edge technology",
      price: 1199.99,
      quantity: 2,
      createdAt: "2026-02-10T10:54:10.620Z",
      updatedAt: "2026-02-10T10:54:10.620Z",
      userId: "c624cc40-81b2-45a2-ab35-8d0682d9835a",
      user: {
        name: "John Doe",
        email: "jhon.doe@example.com",
      },
    },
    {
      id: "63e5957d-e92f-4115-a2d9-97323dbb52a8",
      name: "Google Pixel 7 Pro",
      description: "Google Pixel 7 Pro with exceptional camera capabilities",
      price: 899.99,
      quantity: 12,
      createdAt: "2026-02-10T10:54:10.620Z",
      updatedAt: "2026-02-10T10:54:10.620Z",
      userId: "c624cc40-81b2-45a2-ab35-8d0682d9835a",
      user: {
        name: "John Doe",
        email: "jhon.doe@example.com",
      },
    },
    {
      id: "1886ab66-9c6d-4790-b5ff-4d0b87db79ac",
      name: "OnePlus 11",
      description: "OnePlus 11 with high performance",
      price: 699.99,
      quantity: 30,
      createdAt: "2026-02-10T10:54:10.704Z",
      updatedAt: "2026-02-10T10:54:10.704Z",
      userId: "7400e5d6-9809-4129-9be3-fc423869c291",
      user: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
      },
    },
    {
      id: "9c71b93d-f9fe-495e-b029-a139c5666ac3",
      name: "Sony Xperia 1 IV",
      description: "Sony Xperia 1 IV with stunning display",
      price: 999.99,
      quantity: 45,
      createdAt: "2026-02-10T10:54:10.704Z",
      updatedAt: "2026-02-10T10:54:10.704Z",
      userId: "7400e5d6-9809-4129-9be3-fc423869c291",
      user: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
      },
    },
    {
      id: "d451fc70-a2ae-4cf6-870e-29392269861b",
      name: "Motorola Edge 30 Pro",
      description: "Motorola Edge 30 Pro with sleek design",
      price: 799.99,
      quantity: 67,
      createdAt: "2026-02-10T10:54:10.704Z",
      updatedAt: "2026-02-10T10:54:10.704Z",
      userId: "7400e5d6-9809-4129-9be3-fc423869c291",
      user: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
      },
    },
    {
      id: "19e1ef61-befb-409e-a0ff-48071025fec3",
      name: "Nokia X30",
      description: "Nokia X30 with durable build",
      price: 499.99,
      quantity: 78,
      createdAt: "2026-02-10T10:54:10.704Z",
      updatedAt: "2026-02-10T10:54:10.704Z",
      userId: "7400e5d6-9809-4129-9be3-fc423869c291",
      user: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
      },
    },
    {
      id: "05d4f114-5fde-4e90-b415-61b371553406",
      name: "Xiaomi 13 Pro",
      description: "Xiaomi 13 Pro with fast charging",
      price: 899.99,
      quantity: 23,
      createdAt: "2026-02-10T10:54:10.710Z",
      updatedAt: "2026-02-10T10:54:10.710Z",
      userId: "492c00a3-875c-45f1-a78c-ac5426bf5a92",
      user: {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
      },
    },
    {
      id: "eb38a547-ba89-401d-a457-d2167787e8ee",
      name: "Oppo Find X5 Pro",
      description: "Oppo Find X5 Pro with sleek design",
      price: 999.99,
      quantity: 45,
      createdAt: "2026-02-10T10:54:10.710Z",
      updatedAt: "2026-02-10T10:54:10.710Z",
      userId: "492c00a3-875c-45f1-a78c-ac5426bf5a92",
      user: {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
      },
    },
    {
      id: "3e2506d4-fed0-4f80-aecb-9f1e58a3009a",
      name: "Asus ROG Phone 6",
      description: "Asus ROG Phone 6 for gaming enthusiasts",
      price: 1099.99,
      quantity: 34,
      createdAt: "2026-02-10T10:54:10.710Z",
      updatedAt: "2026-02-10T10:54:10.710Z",
      userId: "492c00a3-875c-45f1-a78c-ac5426bf5a92",
      user: {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
      },
    },
  ]);
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-foreground font-bold text-2xl"> Search Product </h1>
      <Input type="search" placeholder="Search Product Here..." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((item) => (
          <Card key={item.id}>
            <div className="flex h-48 flex-col justify-between">
              <span className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-foreground">
                  {item.name}
                </h1>
                <h2 className="text-primary font-bold"> {item.price}$ </h2>
              </span>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
              <h5 className="text-secondary text-sm font-bold">
                {item.user.name} - {item.user.email}
              </h5>
              <span className="flex justify-between items-center">
                <h1
                  className={
                    item.quantity < 10
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }
                >
                  {item.quantity} unit
                </h1>
                <Button onClick={() => alert({ userId: item.userId })}>
                  BUY
                </Button>
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
