import { useTranslation } from 'react-i18next';
import { Product } from '@shared/schema';

interface ProductTranslationsMap {
  [key: string]: {
    name: string;
    description: string;
  };
}

// Mapeamento de traduções para produtos
const productTranslations: {[id: number]: ProductTranslationsMap} = {
  // Produtos masculinos
  1: {
    'en': {
      name: "Avro Lancaster Long Sleeve T-Shirt",
      description: "The Avro Lancaster is one of the most iconic aircraft deployed in the Second World War. Its unmistakable shape and the roar of its four Rolls Royce Merlin engines can only be experienced by seeing the two remaining airworthy examples in the world fly."
    },
    'pt': {
      name: "Camiseta Manga Longa Avro Lancaster",
      description: "O Avro Lancaster é uma das aeronaves mais icônicas implantadas na Segunda Guerra Mundial. Sua forma inconfundível e o rugido de seus quatro motores Rolls Royce Merlin só podem ser experimentados ao ver os dois exemplares ainda em condições de voo no mundo."
    }
  },
  2: {
    'en': {
      name: "Avro Lancaster T-shirt",
      description: "The Avro Lancaster is one of the most iconic aircraft deployed in the Second World War. Its unmistakable shape and the roar of its four Rolls Royce Merlin engines can only be experienced by seeing the two remaining airworthy examples in the world fly."
    },
    'pt': {
      name: "Camiseta Avro Lancaster",
      description: "O Avro Lancaster é uma das aeronaves mais icônicas implantadas na Segunda Guerra Mundial. Sua forma inconfundível e o rugido de seus quatro motores Rolls Royce Merlin só podem ser experimentados ao ver os dois exemplares ainda em condições de voo no mundo."
    }
  },
  3: {
    'en': {
      name: "Beechcraft T-shirt",
      description: "The Beechcraft collection has quickly become a crowd (and staff) favourite. Our founder, bush pilot Dax Wilkinson, came across the logo on the side of a Beechcraft King Air and we've been working with it ever since."
    },
    'pt': {
      name: "Camiseta Beechcraft",
      description: "A coleção Beechcraft rapidamente se tornou favorita do público (e da equipe). Nosso fundador, o piloto de bush Dax Wilkinson, encontrou o logotipo na lateral de um Beechcraft King Air e estamos trabalhando com ele desde então."
    }
  },
  4: {
    'en': {
      name: "B17 Long Sleeve T-shirt",
      description: "Celebrate the heritage of one of the toughest planes of the 20th century. Made of 100% cotton with contrast seam tape, ribbed crew neckline, and hem label."
    },
    'pt': {
      name: "Camiseta Manga Longa B17",
      description: "Celebre a herança de um dos aviões mais resistentes do século XX. Feito em 100% algodão com fita de costura contrastante, gola careca canelada e etiqueta na bainha."
    }
  },
  5: {
    'en': {
      name: "Boeing Flight Cardigan",
      description: "Made of our favourite 100% cotton yarn, our Boeing Flight Sweater provides reliable warmth and durable construction. Wear all year round over a t-shirt or a button-up."
    },
    'pt': {
      name: "Cardigan de Voo Boeing",
      description: "Feito com nosso fio de algodão 100% favorito, nosso Suéter de Voo Boeing proporciona aquecimento confiável e construção durável. Use durante todo o ano sobre uma camiseta ou camisa."
    }
  },
  6: {
    'en': {
      name: "Boeing T-Shirt",
      description: "The Boeing 747 'Jumbo Jet' changed the world, encouraging air travel to the masses and allowing non-stop flights between distant cities across the globe."
    },
    'pt': {
      name: "Camiseta Boeing",
      description: "O Boeing 747 'Jumbo Jet' mudou o mundo, incentivando viagens aéreas para as massas e permitindo voos sem escalas entre cidades distantes em todo o mundo."
    }
  },
  // Produtos femininos
  7: {
    'en': {
      name: "Women's B17 T-shirt",
      description: "Celebrate the heritage of one of the toughest planes of the 20th century. Made of 100% cotton with a stylish fit."
    },
    'pt': {
      name: "Camiseta B17 Feminina",
      description: "Celebre a herança de um dos aviões mais resistentes do século XX. Feito em 100% algodão com um corte elegante."
    }
  },
  8: {
    'en': {
      name: "Women's RCAF 100 Short Sleeve T-Shirt",
      description: "Part of the 'RCAF 100' collection celebrating the centennial year of our Air Force. Made of 100% jersey cotton and pre-shrunk."
    },
    'pt': {
      name: "Camiseta RCAF 100 Manga Curta Feminina",
      description: "Parte da coleção 'RCAF 100' que celebra o ano centenário da nossa Força Aérea. Feita de 100% algodão jersey e pré-encolhida."
    }
  },
  9: {
    'en': {
      name: "Women's RCAF 100 Long Sleeve T-Shirt",
      description: "Long sleeve version from the 'RCAF 100' collection celebrating the centennial year of our Air Force. Made of 100% jersey cotton with contrast seam tape."
    },
    'pt': {
      name: "Camiseta RCAF 100 Manga Longa Feminina",
      description: "Versão de manga longa da coleção 'RCAF 100' que celebra o ano centenário da nossa Força Aérea. Feita de 100% algodão jersey com fita de costura contrastante."
    }
  },
  10: {
    'en': {
      name: "Women's Boeing t-shirt",
      description: "Inspired by the iconic Boeing 747 'Jumbo Jet' that changed aviation history. Made of 100% jersey cotton with a slim fit and classic cap sleeves."
    },
    'pt': {
      name: "Camiseta Boeing Feminina",
      description: "Inspirada no icônico Boeing 747 'Jumbo Jet' que mudou a história da aviação. Feita de 100% algodão jersey com um corte ajustado e mangas estilo cap clássicas."
    }
  },
  11: {
    'en': {
      name: "Women's Boeing Flight Jacket",
      description: "Fly in style with our Ladies Boeing Airplane Company logo Flight Jacket. Cotton rich blend with a stylish fit and premium detailing."
    },
    'pt': {
      name: "Jaqueta de Voo Boeing Feminina",
      description: "Voe com estilo com nossa Jaqueta de Voo com o logotipo da Boeing Airplane Company. Mistura rica em algodão com um corte elegante e detalhes premium."
    }
  },
  // Acessórios
  12: {
    'en': {
      name: "Boeing Leather Zip Wallet",
      description: "Premium leather wallet featuring the Boeing logo. A stylish and practical accessory for aviation enthusiasts."
    },
    'pt': {
      name: "Carteira de Couro Boeing com Zíper",
      description: "Carteira de couro premium com o logotipo da Boeing. Um acessório elegante e prático para entusiastas da aviação."
    }
  },
  13: {
    'en': {
      name: "Beechcraft Cap",
      description: "A fan favorite featuring the iconic Beechcraft logo. Made of 100% brushed cotton twill with adjustable strap for comfortable fit."
    },
    'pt': {
      name: "Boné Beechcraft",
      description: "Um favorito dos fãs apresentando o icônico logotipo da Beechcraft. Feito de 100% sarja de algodão escovado com alça ajustável para um ajuste confortável."
    }
  },
  14: {
    'en': {
      name: "Boeing 3D Cap",
      description: "Features the iconic Boeing logo in 3D embroidery on the front. Includes Red Canoe shield and woven U.S.A flag on the back."
    },
    'pt': {
      name: "Boné Boeing 3D",
      description: "Apresenta o icônico logotipo da Boeing em bordado 3D na frente. Inclui escudo Red Canoe e bandeira dos EUA tecida nas costas."
    }
  }
};

export function useProductTranslation() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'pt';
  
  // Função para traduzir um produto
  const translateProduct = (product: Product): Product => {
    // Se não houver tradução para o produto, retorna o produto original
    if (!productTranslations[product.id] || !productTranslations[product.id][currentLanguage]) {
      return product;
    }
    
    // Traduz o produto
    const translation = productTranslations[product.id][currentLanguage];
    return {
      ...product,
      name: translation.name,
      description: translation.description
    };
  };
  
  return { translateProduct, currentLanguage };
}