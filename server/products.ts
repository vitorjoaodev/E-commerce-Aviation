import { Product } from "@shared/schema";

// Produtos masculinos
const menProducts: Product[] = [
  {
    id: 1,
    name: "Avro Lancaster Long Sleeve T-Shirt",
    description: "The Avro Lancaster is one of the most iconic aircraft deployed in the Second World War. Its unmistakable shape and the roar of its four Rolls Royce Merlin engines can only be experienced by seeing the two remaining airworthy examples in the world fly. One is in England and another is based at the Canadian Warplane Heritage Museum in Hamilton, Ontario. We are lucky to see the Canadian Lanc fly regularly around Toronto and were inspired to celebrate this incredible piece of Aviation History with our long sleeve cotton crew neck shirt. It features the tail colours of CGVRA on the left upper arm and comes in our Airforce Blue colour.",
    price: 47.99,
    imageUrl: "https://redcanoebrands.com/wp-content/uploads/2022/05/M-LST-AVL-NY_front.jpg",
    category: "mens",
    brand: "Aviator Store",
    popularity: 90,
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    availableColors: ["navy"],
    additionalImages: [
      "https://redcanoebrands.com/wp-content/uploads/2019/10/M-LST-AVL-NY_lifestyle1.jpg",
      "https://redcanoebrands.com/wp-content/uploads/2023/01/M-LST-AVL-NY_lifestyle1-591x622.jpg"
    ],
    materialsCare: "Made of 100% cotton. Ribbed crew neckline. Washed after printing for vintage character. Pre-shrunk.",
    details: "Colour: Navy",
    rating: 4.8,
    numReviews: 45,
    inStock: true,
    featured: true,
    createdAt: new Date("2023-04-01T00:00:00Z"),
    updatedAt: new Date("2023-04-01T00:00:00Z")
  },
  {
    id: 2,
    name: "Avro Lancaster T-shirt",
    description: "The Avro Lancaster is one of the most iconic aircraft deployed in the Second World War. Its unmistakable shape and the roar of its four Rolls Royce Merlin engines can only be experienced by seeing the two remaining airworthy examples in the world fly. One is in England and another is based at the Canadian Warplane Heritage Museum in Hamilton, Ontario. We are lucky to see the Canadian Lanc fly regularly around Toronto and were inspired to celebrate this incredible piece of Aviation History with our short sleeve cotton crew neck shirt. It features the tail colours of CGVRA on the left upper arm.",
    price: 36.99,
    imageUrl: "https://redcanoebrands.com/wp-content/uploads/2022/03/M-SST-AVL-KH_front.jpg",
    category: "mens",
    brand: "Aviator Store",
    popularity: 85,
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    availableColors: ["khaki"],
    additionalImages: [
      "https://redcanoebrands.com/wp-content/uploads/2023/09/M-SST-AVL-KI_lifestyle2.jpg",
      "https://redcanoebrands.com/wp-content/uploads/2014/09/M-SST-AVL-KI_lifestyle3.jpg"
    ],
    materialsCare: "Made of 100% cotton. Ribbed crew neckline. Washed after printing for vintage character. Pre-shrunk.",
    details: "Colour: Khaki",
    rating: 4.7,
    numReviews: 38,
    inStock: true,
    featured: true,
    createdAt: new Date("2023-04-05T00:00:00Z"),
    updatedAt: new Date("2023-04-05T00:00:00Z")
  },
  {
    id: 3,
    name: "Beechcraft T-shirt",
    description: "The Beechcraft collection has quickly become a crowd (and staff) favourite. Our founder, bush pilot Dax Wilkinson, came across the logo on the side of a Beechcraft King Air and we've been working with it ever since. Beechcraft was started in Kansas in 1932 by husband and wife team Walter Beech and Olive Ann Beech. At the time, Olive Ann Beech earned more awards, appointments and citations than any other woman in aviation history.",
    price: 36.99,
    imageUrl: "https://redcanoebrands.com/wp-content/uploads/2015/10/M-SST-BEECHCA-NY_front.jpg",
    category: "mens",
    brand: "Aviator Store",
    popularity: 80,
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    availableColors: ["navy"],
    additionalImages: [
      "https://redcanoebrands.com/wp-content/uploads/2023/09/M-SST-BEECH-NY_lifestyle1.jpg",
      "https://redcanoebrands.com/wp-content/uploads/2015/10/M-SST-BEECH-01-NY-LG_detail.jpg"
    ],
    materialsCare: "Made of 100% cotton. Washed after printing to eliminate shrinkage and add vintage appeal.",
    details: "Colour: Navy",
    rating: 4.6,
    numReviews: 42,
    inStock: true,
    featured: true,
    createdAt: new Date("2023-04-10T00:00:00Z"),
    updatedAt: new Date("2023-04-10T00:00:00Z")
  },
  {
    id: 4,
    name: "B17 Long Sleeve T-shirt",
    description: "Celebrate the heritage of one of the toughest planes of the 20th century. Made of 100% cotton with contrast seam tape, ribbed crew neckline, and hem label. Washed after printing to eliminate shrinkage and add vintage appeal.",
    price: 47.99,
    imageUrl: "https://redcanoebrands.com/wp-content/uploads/2022/05/M-LST-B17-GY_front.jpg",
    category: "mens",
    brand: "Aviator Store",
    popularity: 82,
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    availableColors: ["grey"],
    additionalImages: [
      "https://redcanoebrands.com/wp-content/uploads/2022/05/M-LST-B17-GY_back.jpg",
      "https://redcanoebrands.com/wp-content/uploads/2018/10/M-LST-B17CA-GY-MD_lifestyle2.jpg"
    ],
    materialsCare: "Made of 100% cotton. Pre-shrunk.",
    details: "Colour: Grey",
    rating: 4.7,
    numReviews: 35,
    inStock: true,
    featured: false,
    createdAt: new Date("2023-04-15T00:00:00Z"),
    updatedAt: new Date("2023-04-15T00:00:00Z")
  },
  {
    id: 5,
    name: "Boeing Flight Cardigan",
    description: "Made of our favourite 100% cotton yarn, our Boeing Flight Sweater provides reliable warmth and durable construction. Wear all year round over a t-shirt or a button-up. Features the Boeing vintage winged logo.",
    price: 119.99,
    imageUrl: "https://redcanoebrands.com/wp-content/uploads/2020/06/M-SWZ-BOEING-NY-MD_front.jpg",
    category: "mens",
    brand: "Aviator Store",
    popularity: 88,
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    availableColors: ["navy"],
    additionalImages: [
      "https://redcanoebrands.com/wp-content/uploads/2020/06/M-SWZ-BOEING-NY-MD_detail.jpg",
      "https://redcanoebrands.com/wp-content/uploads/2020/06/M-SWZ-BOEING-NY-MD_detail2.jpg",
      "https://redcanoebrands.com/wp-content/uploads/2022/02/M-SWZ-BOEING-NY_lifestyle1.jpg"
    ],
    materialsCare: "Made of 100% cotton. Easy maintenance.",
    details: "Stand-up collar, YKK Zipper front closure, Washed twill shoulder patches. Colour: Navy",
    rating: 4.9,
    numReviews: 52,
    inStock: true,
    featured: true,
    createdAt: new Date("2023-04-20T00:00:00Z"),
    updatedAt: new Date("2023-04-20T00:00:00Z")
  },
  {
    id: 6,
    name: "Boeing T-Shirt",
    description: "The Boeing 747 'Jumbo Jet' changed the world, encouraging air travel to the masses and allowing non-stop flights between distant cities across the globe. In February 1969, the first 747 – serial number 001 took flight over Western Washington State. Celebrate and share this giant milestone in Aviation with our Boeing RA001 T-shirt.",
    price: 36.99,
    imageUrl: "https://redcanoebrands.com/wp-content/uploads/2018/11/M-SST-BOEING-CA-SL-MD_front.jpg",
    category: "mens",
    brand: "Aviator Store",
    popularity: 87,
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    availableColors: ["slate"],
    additionalImages: [
      "https://redcanoebrands.com/wp-content/uploads/2018/11/M-SST-BOEING-CA-SL_lifestyle1.jpg",
      "https://redcanoebrands.com/wp-content/uploads/2018/11/M-SST-BOEING-CA-SL-MD_back.jpg"
    ],
    materialsCare: "Made of 100% cotton. Ribbed crew neckline. Washed after printing for vintage character. Pre-shrunk.",
    details: "Colour: Slate",
    rating: 4.6,
    numReviews: 40,
    inStock: true,
    featured: false,
    createdAt: new Date("2023-04-25T00:00:00Z"),
    updatedAt: new Date("2023-04-25T00:00:00Z")
  }
];

// Produtos femininos
const womenProducts: Product[] = [
  {
    id: 7,
    name: "Women's B17 T-shirt",
    description: "Celebrate the heritage of one of the toughest planes of the 20th century with this women's B17 t-shirt. Made of 100% cotton with a stylish fit that's perfect for aviation enthusiasts.",
    price: 36.99,
    imageUrl: "https://redcanoebrands.com/wp-content/uploads/2016/02/L-SST-B17CA-GY-MD_front-1.jpg",
    category: "womens",
    brand: "Aviator Store",
    popularity: 83,
    availableSizes: ["XS", "S", "M", "L", "XL"],
    availableColors: ["grey"],
    additionalImages: [
      "https://redcanoebrands.com/wp-content/uploads/2016/02/L-SST-B17CA-GY_lifestyle1.jpg",
      "https://redcanoebrands.com/wp-content/uploads/2016/02/L-SST-B17CA-GY-MD_lifestyle.jpg",
      "https://redcanoebrands.com/wp-content/uploads/2016/02/L-SST-B17CA-GY-MD_lifestyle2.jpg",
      "https://redcanoebrands.com/wp-content/uploads/2016/02/L-SST-B17CA-GY-MD_back-2.jpg"
    ],
    materialsCare: "Made of 100% cotton. Made in North America.",
    details: "Slim fit with vintage-style print.",
    rating: 4.7,
    numReviews: 38,
    inStock: true,
    featured: true,
    createdAt: new Date("2023-05-01T00:00:00Z"),
    updatedAt: new Date("2023-05-01T00:00:00Z")
  },
  {
    id: 8,
    name: "Women's RCAF 100 Short Sleeve T-Shirt",
    description: "Red Canoe has proudly collaborated with the RCAF for the past two decades. We are excited to be selected to create the 'RCAF 100' collection of products celebrating the centennial year of our Air Force. Things will be ramping up for 2024 but let's start celebrating early with this first RCAF 100 short sleeve t-shirt to get us through spring!",
    price: 19.99,
    imageUrl: "https://redcanoebrands.com/wp-content/uploads/2023/03/L-SST-100RCAF-SE_front.jpg",
    category: "womens",
    brand: "Aviator Store",
    popularity: 80,
    availableSizes: ["XS", "S", "M", "L", "XL"],
    availableColors: ["stone"],
    additionalImages: [
      "https://redcanoebrands.com/wp-content/uploads/2023/05/L-SST-100RCAF-SE_detail2.jpg",
      "https://redcanoebrands.com/wp-content/uploads/2023/05/M-SST-100RCAF-SE_detail1.jpg"
    ],
    materialsCare: "Made of 100% jersey cotton. Washed after printing. Pre-shrunk.",
    details: "Colour: Stone. Original price was: $36.99.",
    rating: 4.5,
    numReviews: 30,
    inStock: true,
    featured: true,
    createdAt: new Date("2023-05-05T00:00:00Z"),
    updatedAt: new Date("2023-05-05T00:00:00Z")
  },
  {
    id: 9,
    name: "Women's RCAF 100 Long Sleeve T-Shirt",
    description: "Red Canoe has proudly collaborated with the RCAF for the past two decades. We are excited to be selected to create the 'RCAF 100' collection of products celebrating the centennial year of our Air Force. Things will be ramping up for 2024 but let's start celebrating early with this first RCAF 100 long sleeve shirt to get us through spring!",
    price: 39.99,
    imageUrl: "https://redcanoebrands.com/wp-content/uploads/2023/04/L-LST-100RCAF-NY_front.jpg",
    category: "womens",
    brand: "Aviator Store",
    popularity: 81,
    availableSizes: ["XS", "S", "M", "L", "XL"],
    availableColors: ["navy"],
    additionalImages: [],
    materialsCare: "Made of 100% jersey cotton. Contrast seam tape. Ribbed crew neckline. Hem Label. Washed after printing. Pre-shrunk.",
    details: "Colour: Navy. Original price was: $47.99.",
    rating: 4.6,
    numReviews: 32,
    inStock: true,
    featured: false,
    createdAt: new Date("2023-05-10T00:00:00Z"),
    updatedAt: new Date("2023-05-10T00:00:00Z")
  },
  {
    id: 10,
    name: "Women's Boeing t-shirt",
    description: "The Boeing 747 'Jumbo Jet' changed the world, encouraging air travel to the masses and allowing non-stop flights between distant cities across the globe. In February 1969, the first 747 – serial number 001 took flight over Western Washington State. Celebrate and share this giant milestone in Aviation with our Women's Boeing RA001 T-shirt. A new staple for Aviation fans. Made of 100% jersey cotton, with a slim fit and classic cap sleeves. This will be a summer go-to and is perfect for layering in the fall. Washed after printing for more vintage character.",
    price: 36.99,
    imageUrl: "https://redcanoebrands.com/wp-content/uploads/2020/07/L-SST-BOEING-SL-SM_front.jpg",
    category: "womens",
    brand: "Aviator Store",
    popularity: 85,
    availableSizes: ["XS", "S", "M", "L", "XL"],
    availableColors: ["slate"],
    additionalImages: [
      "https://redcanoebrands.com/wp-content/uploads/2020/07/L-SST-BOEING-SL-SM_back-1.jpg"
    ],
    materialsCare: "Made of 100% cotton. Contrast seam tape. Ribbed crew neckline. Hem Label. Washed after printing. Pre-shrunk.",
    details: "Colour: Slate. Made in Canada.",
    rating: 4.7,
    numReviews: 36,
    inStock: true,
    featured: true,
    createdAt: new Date("2023-05-15T00:00:00Z"),
    updatedAt: new Date("2023-05-15T00:00:00Z")
  },
  {
    id: 11,
    name: "Women's Boeing Flight Jacket",
    description: "Fly in style with our Ladies Boeing Airplane Company logo Flight Jacket. Cotton rich blend with a stylish fit and premium detailing.",
    price: 69.99,
    imageUrl: "https://redcanoebrands.com/wp-content/uploads/2021/03/Womens-BOEING-flight-jacket.jpg",
    category: "womens",
    brand: "Aviator Store",
    popularity: 90,
    availableSizes: ["XS", "S", "M", "L", "XL"],
    availableColors: ["charcoal"],
    additionalImages: [
      "https://redcanoebrands.com/wp-content/uploads/2021/03/Womens-Boeing-flight-jacket-still.jpg",
      "https://redcanoebrands.com/wp-content/uploads/2021/03/L-JKT-BOEING-CH-LG_lifestyle.jpg"
    ],
    materialsCare: "Made of cotton rich blend. Nylon lining.",
    details: "Colour: Charcoal. Shoulder and an interior pocket feature brushed metal zippers. Original price was: $129.99.",
    rating: 4.9,
    numReviews: 48,
    inStock: true,
    featured: true,
    createdAt: new Date("2023-05-20T00:00:00Z"),
    updatedAt: new Date("2023-05-20T00:00:00Z")
  }
];

// Acessórios
const accessoriesProducts: Product[] = [
  {
    id: 12,
    name: "Boeing Leather Zip Wallet",
    description: "Premium leather wallet featuring the Boeing logo. A stylish and practical accessory for aviation enthusiasts.",
    price: 69.99,
    imageUrl: "https://redcanoebrands.com/wp-content/uploads/2022/10/U-WAL-BOEING-TN_front.jpg",
    category: "accessories",
    brand: "Aviator Store",
    popularity: 80,
    availableSizes: ["One Size"],
    availableColors: ["tan"],
    additionalImages: [
      "https://redcanoebrands.com/wp-content/uploads/2022/10/U-WAL-VINTAGELOGO-TN_lifestyle2.jpg"
    ],
    materialsCare: "Made of cowhide.",
    details: "Dimensions: 5″ L x 4 ″ W x 0.75″ D. Colour: Tan. Original price was: $89.99.",
    rating: 4.7,
    numReviews: 35,
    inStock: true,
    featured: true,
    createdAt: new Date("2023-05-25T00:00:00Z"),
    updatedAt: new Date("2023-05-25T00:00:00Z")
  },
  {
    id: 13,
    name: "Beechcraft Cap",
    description: "The Beechcraft collection has quickly become a crowd favourite. Our founder, bush pilot Dax Wilkinson, came across the logo on the side of a Beechcraft King Air and we've been working with it ever since. Beechcraft started in Kansas in 1932 by husband and wife team Walter Beech and Olive Ann Beech. At the time, Olive Ann Beech earned more awards, appointments and citations than any other woman in aviation history.",
    price: 34.99,
    imageUrl: "https://redcanoebrands.com/wp-content/uploads/2015/10/U-CAP-BEECH-01-NY_front-1.jpg",
    category: "accessories",
    brand: "Aviator Store",
    popularity: 82,
    availableSizes: ["One Size"],
    availableColors: ["navy"],
    additionalImages: [
      "https://redcanoebrands.com/wp-content/uploads/2015/10/U-CAP-BEECH-NY_lifestyle1.jpg",
      "https://redcanoebrands.com/wp-content/uploads/2015/10/U-CAP-BEECH-01-NY_back-1.jpg"
    ],
    materialsCare: "Made of 100% brushed cotton twill.",
    details: "Colour: Navy. Adjustable velcro back strap for one size fits most. Woven patch and direct embroidery.",
    rating: 4.6,
    numReviews: 40,
    inStock: true,
    featured: true,
    createdAt: new Date("2023-06-01T00:00:00Z"),
    updatedAt: new Date("2023-06-01T00:00:00Z")
  },
  {
    id: 14,
    name: "Boeing 3D Cap",
    description: "Our new Boeing cap features the iconic \"Boeing\" logo 3D embroidered on the front. This is the same logo seen on planes manufactured today. Red Canoe shield and woven U.S.A flag on the back.",
    price: 34.99,
    imageUrl: "https://redcanoebrands.com/wp-content/uploads/2018/10/Boeing_cap_NY.jpg",
    category: "accessories",
    brand: "Aviator Store",
    popularity: 85,
    availableSizes: ["One Size"],
    availableColors: ["navy"],
    additionalImages: [
      "https://redcanoebrands.com/wp-content/uploads/2023/01/U-CAP-BOEING3D-NY_lifestyle2.jpg",
      "https://redcanoebrands.com/wp-content/uploads/2018/10/U-CAP-BOEING3D-NY-B_back.jpg"
    ],
    materialsCare: "Made of 100% brushed cotton twill. Spot clean.",
    details: "Colour: Navy. Adjustable velcro back strap for one size fits most. Embroidered ventilation holes.",
    rating: 4.8,
    numReviews: 45,
    inStock: true,
    featured: true,
    createdAt: new Date("2023-06-05T00:00:00Z"),
    updatedAt: new Date("2023-06-05T00:00:00Z")
  }
];

// Combinando todos os produtos
export const allProducts: Product[] = [
  ...menProducts,
  ...womenProducts,
  ...accessoriesProducts
];