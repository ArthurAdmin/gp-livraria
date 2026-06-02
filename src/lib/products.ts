export type Book = {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  price: number;
  category: "Devocionais" | "Teologia" | "Vida Cristã" | "Bíblia";
  cover: {
    gradientFrom: string;
    gradientTo: string;
    accent: string;
    label: string;
  };
  badges?: string[];
  description: string;
  pages: number;
  language: string;
  stock: number;
};

export const books: Book[] = [
  {
    id: "gp-001",
    title: "Silêncio que Cura",
    subtitle: "Devocional para dias lentos",
    author: "Mariana Costa",
    price: 69.9,
    category: "Devocionais",
    cover: {
      gradientFrom: "#D6C6B3",
      gradientTo: "#C7A896",


      accent: "#E6D7B5",
      label: "Devocional",
    },
    badges: ["Novo"],
    description:
      "Uma experiência contemplativa em pequenas leituras diárias. Escrita com delicadeza editorial, para acompanhar a alma em cada estação.",
    pages: 192,
    language: "Português",
    stock: 18,
  },
  {
    id: "gp-002",
    title: "Graça em Movimento",
    subtitle: "Leituras sobre discipulado",
    author: "Rafael Almeida",
    price: 79.9,
    category: "Vida Cristã",
    cover: {
      gradientFrom: "#1E1E1E",
      gradientTo: "#C6A994",

      accent: "#E6D7B5",
      label: "Vida",
    },
    badges: ["Edição Premium"],
    description:
      "Uma abordagem viva e prática para caminhar com Jesus no cotidiano. Profunda sem ser pesada, clara sem perder o mistério.",
    pages: 240,
    language: "Português",
    stock: 9,
  },
  {
    id: "gp-003",
    title: "Teologia do Encontro",
    subtitle: "Raízes bíblicas para o hoje",
    author: "Elisa Fernandes",
    price: 99.9,
    category: "Teologia",
    cover: {
      gradientFrom: "#C7A896",
      gradientTo: "#1E1E1E",


      accent: "#E7B8B1",
      label: "Teologia",
    },
    badges: ["Curadoria GP"],
    description:
      "Reflexões que respeitam a beleza do texto e apontam para a vida real. Um livro para voltar, sublinhar e respirar.",
    pages: 320,
    language: "Português",
    stock: 6,
  },
  {
    id: "gp-004",
    title: "Bíblia — Edição Acolhedora",
    subtitle: "Leituras e notas de descanso",
    author: "Tradução pessoal (editorial)",
    price: 149.9,
    category: "Bíblia",
    cover: {
      gradientFrom: "#1E1E1E",
      gradientTo: "#D6C6B3",

      accent: "#E6D7B5",
      label: "Bíblia",
    },
    badges: ["Mais vendido"],
    description:
      "Uma edição pensada para acompanhar o leitor com conforto visual, margens generosas e acabamento que convida ao toque.",
    pages: 1240,
    language: "Português",
    stock: 4,
  },
];

export type CartLine = { bookId: string; quantity: number };

export const initialCart: CartLine[] = [];

