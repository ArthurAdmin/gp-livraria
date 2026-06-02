import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.product.count();
  if (existing > 0) return;

  // Seed mínimo usando os livros mock do frontend
  const products = [
    {
      id: "gp-001",
      title: "Silêncio que Cura",
      author: "Mariana Costa",
      category: "Devocionais",
      price: 69.9,
      stock: 18,
      image: null,
      description:
        "Uma experiência contemplativa em pequenas leituras diárias. Escrita com delicadeza editorial, para acompanhar a alma em cada estação.",
      active: true,
    },
    {
      id: "gp-002",
      title: "Graça em Movimento",
      author: "Rafael Almeida",
      category: "Vida Cristã",
      price: 79.9,
      stock: 9,
      image: null,
      description:
        "Uma abordagem viva e prática para caminhar com Jesus no cotidiano. Profunda sem ser pesada, clara sem perder o mistério.",
      active: true,
    },
    {
      id: "gp-003",
      title: "Teologia do Encontro",
      author: "Elisa Fernandes",
      category: "Teologia",
      price: 99.9,
      stock: 6,
      image: null,
      description:
        "Reflexões que respeitam a beleza do texto e apontam para a vida real. Um livro para voltar, sublinhar e respirar.",
      active: true,
    },
    {
      id: "gp-004",
      title: "Bíblia — Edição Acolhedora",
      author: "Tradução pessoal (editorial)",
      category: "Bíblia",
      price: 149.9,
      stock: 4,
      image: null,
      description:
        "Uma edição pensada para acompanhar o leitor com conforto visual, margens generosas e acabamento que convida ao toque.",
      active: true,
    },
  ];

  await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

