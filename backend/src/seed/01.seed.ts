import { prisma } from "../lib/prisma.js";
import argon2 from "argon2";

const main = async () => {
  const createBulkUser = await prisma.$transaction([
    prisma.user.create({
      data: {
        name: "John Doe",
        email: "jhon.doe@example.com",
        password: await argon2.hash("jhon.doe"),
        role: "admin",
        products: {
          createMany: {
            data: [
              {
                name: "iphone 14 pro max",
                description: "Apple iPhone 14 Pro Max with advanced features",
                price: 1099.99,
              },
              {
                name: "Samsung Galaxy S23 Ultra",
                description:
                  "Samsung Galaxy S23 Ultra with cutting-edge technology",
                price: 1199.99,
              },
              {
                name: "Google Pixel 7 Pro",
                description:
                  "Google Pixel 7 Pro with exceptional camera capabilities",
                price: 899.99,
              },
            ],
          },
        },
      },
      include: {
        products: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: await argon2.hash("jane.smith"),
        role: "user",
        products: {
          createMany: {
            data: [
              {
                name: "OnePlus 11",
                description: "OnePlus 11 with high performance",
                price: 699.99,
              },
              {
                name: "Sony Xperia 1 IV",
                description: "Sony Xperia 1 IV with stunning display",
                price: 999.99,
              },
              {
                name: "Motorola Edge 30 Pro",
                description: "Motorola Edge 30 Pro with sleek design",
                price: 799.99,
              },
              {
                name: "Nokia X30",
                description: "Nokia X30 with durable build",
                price: 499.99,
              },
            ],
          },
        },
      },
      include: {
        products: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        password: await argon2.hash("alice.johnson"),
        role: "user",
        products: {
          createMany: {
            data: [
              {
                name: "Xiaomi 13 Pro",
                description: "Xiaomi 13 Pro with fast charging",
                price: 899.99,
              },
              {
                name: "Oppo Find X5 Pro",
                description: "Oppo Find X5 Pro with sleek design",
                price: 999.99,
              },
              {
                name: "Asus ROG Phone 6",
                description: "Asus ROG Phone 6 for gaming enthusiasts",
                price: 1099.99,
              },
              {
                name: "Vivo X80 Pro",
                description: "Vivo X80 Pro with excellent camera",
                price: 799.99,
              },
              {
                name: "Huawei P50 Pro",
                description: "Huawei P50 Pro with advanced photography",
                price: 899.99,
              },
            ],
          },
        },
      },
      include: {
        products: true,
      },
    }),
  ]);
  console.log("create bulk user:", createBulkUser);

  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  console.log("all users:", allUsers);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Error seeding data:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
