import { prisma } from "../lib/prisma.js";

const main = async () => {
  const createBulkOrders = await prisma.order.createMany({
    data: [
      {
        userId: "c624cc40-81b2-45a2-ab35-8d0682d9835a",
        productId: "1886ab66-9c6d-4790-b5ff-4d0b87db79ac",
        quantity: 2,
        total: 699.99 * 2,
      },
      {
        userId: "7400e5d6-9809-4129-9be3-fc423869c291",
        productId: "14311964-1527-4b48-abb8-25afe9d3a3ee",
        quantity: 1,
        total: 1199.99 * 1,
      },
      {
        userId: "492c00a3-875c-45f1-a78c-ac5426bf5a92",
        productId: "9c71b93d-f9fe-495e-b029-a139c5666ac3",
        quantity: 1,
        total: 999.99 * 1,
      },
      {
        userId: "492c00a3-875c-45f1-a78c-ac5426bf5a92",
        productId: "14311964-1527-4b48-abb8-25afe9d3a3ee",
        quantity: 2,
        total: 1199.99 * 2,
      },
    ],
  });
  console.log("Created bulk orders:", createBulkOrders);

  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      orders: {
        select: {
          quantity: true,
          createdAt: true,
          total: true,
          products: {
            select: {
              name: true,
              price: true,
              description: true,
              user: {
                select: { name: true },
              },
            },
          },
        },
      },
    },
  });
  console.log("All users with their orders:", allUsers);
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
