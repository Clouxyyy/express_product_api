const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.product.count();

  if (count === 0) {
    await prisma.product.createMany({
      data: [
        { name: "Buku", price: 15000 },
        { name: "Pulpen", price: 5000 },
      ],
    });
    console.log("Database seeded successfully with initial products.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
