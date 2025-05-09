import { 
  User, 
  InsertUser, 
  Product, 
  InsertProduct, 
  Order, 
  InsertOrder, 
  OrderItem, 
  InsertOrderItem, 
  EmailSubscription, 
  InsertEmailSubscription 
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProducts(category?: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  getRelatedProducts(productId: number): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Order methods
  getOrders(): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: Omit<InsertOrder, "id">): Promise<Order>;
  
  // Order item methods
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: Omit<InsertOrderItem, "id">): Promise<OrderItem>;
  
  // Email subscription methods
  getEmailSubscription(email: string): Promise<EmailSubscription | undefined>;
  createEmailSubscription(subscription: Omit<InsertEmailSubscription, "id">): Promise<EmailSubscription>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private emailSubscriptions: Map<number, EmailSubscription>;
  
  private userIdCounter: number;
  private productIdCounter: number;
  private orderIdCounter: number;
  private orderItemIdCounter: number;
  private emailSubscriptionIdCounter: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.emailSubscriptions = new Map();
    
    this.userIdCounter = 1;
    this.productIdCounter = 1;
    this.orderIdCounter = 1;
    this.orderItemIdCounter = 1;
    this.emailSubscriptionIdCounter = 1;
    
    // Initialize with sample products
    this.initializeSampleProducts();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getProducts(category?: string): Promise<Product[]> {
    const products = Array.from(this.products.values());
    
    if (category) {
      return products.filter(product => product.category === category);
    }
    
    return products;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.featured);
  }

  async getRelatedProducts(productId: number): Promise<Product[]> {
    const product = this.products.get(productId);
    
    if (!product) {
      return [];
    }
    
    return Array.from(this.products.values())
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, 4);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const now = new Date();
    const product: Product = { 
      ...insertProduct, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.products.set(id, product);
    return product;
  }

  // Order methods
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(orderData: Omit<InsertOrder, "id">): Promise<Order> {
    const id = this.orderIdCounter++;
    const now = new Date();
    const order: Order = { 
      ...orderData, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.orders.set(id, order);
    return order;
  }

  // Order item methods
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      item => item.orderId === orderId
    );
  }

  async createOrderItem(orderItemData: Omit<InsertOrderItem, "id">): Promise<OrderItem> {
    const id = this.orderItemIdCounter++;
    const orderItem: OrderItem = { 
      ...orderItemData, 
      id
    };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  // Email subscription methods
  async getEmailSubscription(email: string): Promise<EmailSubscription | undefined> {
    return Array.from(this.emailSubscriptions.values()).find(
      sub => sub.email === email
    );
  }

  async createEmailSubscription(subscriptionData: Omit<InsertEmailSubscription, "id">): Promise<EmailSubscription> {
    const id = this.emailSubscriptionIdCounter++;
    const now = new Date();
    const subscription: EmailSubscription = { 
      ...subscriptionData, 
      id,
      createdAt: now
    };
    this.emailSubscriptions.set(id, subscription);
    return subscription;
  }

  // Initialize sample products for the store
  private initializeSampleProducts() {
    const sampleProducts: Omit<Product, "id">[] = [
      {
        name: "Vintage Aviator Bomber Jacket",
        description: "Premium leather with custom aviation patches",
        price: 299.00,
        imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "mens",
        brand: "AviatorX",
        popularity: 90,
        availableSizes: ["S", "M", "L", "XL"],
        availableColors: ["brown", "black", "tan"],
        additionalImages: [
          "https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        materialsCare: "Genuine leather exterior with cotton lining. Professional leather cleaning only.",
        details: "Inspired by the jackets worn by WWII fighter pilots, featuring authentic hardware and multiple utility pockets.",
        rating: 4.8,
        numReviews: 124,
        inStock: true,
        featured: true,
        createdAt: new Date("2023-01-15T00:00:00Z"),
        updatedAt: new Date("2023-01-15T00:00:00Z")
      },
      {
        name: "Women's Flight Jacket",
        description: "Lightweight with historical details",
        price: 249.00,
        imageUrl: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "womens",
        brand: "AviatorX",
        popularity: 85,
        availableSizes: ["XS", "S", "M", "L"],
        availableColors: ["olive", "navy", "burgundy"],
        additionalImages: [
          "https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1541840031508-7856a9a402f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        materialsCare: "Premium cotton and nylon blend with satin lining. Machine washable in cold water.",
        details: "Tailored fit with vintage-inspired styling, zippered pockets, and embroidered insignia patch.",
        rating: 4.7,
        numReviews: 98,
        inStock: true,
        featured: true,
        createdAt: new Date("2023-02-10T00:00:00Z"),
        updatedAt: new Date("2023-02-10T00:00:00Z")
      },
      {
        name: "Navigator Button-Down Shirt",
        description: "Professional with a vintage touch",
        price: 89.00,
        imageUrl: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "mens",
        brand: "AviatorX",
        popularity: 75,
        availableSizes: ["S", "M", "L", "XL", "XXL"],
        availableColors: ["white", "blue", "khaki"],
        additionalImages: [
          "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1566902249079-c79318e13f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        materialsCare: "100% premium cotton. Machine wash cold, tumble dry low.",
        details: "Tailored fit with epaulets, two chest pockets, and map-inspired print lining.",
        rating: 4.5,
        numReviews: 65,
        inStock: true,
        featured: true,
        createdAt: new Date("2023-03-05T00:00:00Z"),
        updatedAt: new Date("2023-03-05T00:00:00Z")
      },
      {
        name: "Vintage Pilot Leather Cap",
        description: "Genuine leather with cotton lining",
        price: 79.00,
        imageUrl: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "accessories",
        brand: "AviatorX",
        popularity: 70,
        availableSizes: ["S", "M", "L"],
        availableColors: ["brown", "black"],
        additionalImages: [
          "https://images.unsplash.com/photo-1590999659195-e64a988eaf6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1606485165292-f881567c077f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        materialsCare: "100% premium leather with cotton lining. Spot clean only.",
        details: "Authentic recreation of WWII aviator caps with adjustable chin strap and ear flaps.",
        rating: 4.6,
        numReviews: 52,
        inStock: true,
        featured: true,
        createdAt: new Date("2023-04-20T00:00:00Z"),
        updatedAt: new Date("2023-04-20T00:00:00Z")
      },
      {
        name: "Explorer Leather Jacket",
        description: "Premium adventure jacket with aviation patches",
        price: 349.00,
        imageUrl: "https://pixabay.com/get/g82ea414c8f35a005fcc8f23960a602388c996d2f9f23365699e55d99bcc6a64e9abe4e766f71226478707a0efce3f284a067d1759bd1866e2ce9e520251baa47_1280.jpg",
        category: "mens",
        brand: "AviatorX",
        popularity: 95,
        availableSizes: ["S", "M", "L", "XL", "XXL"],
        availableColors: ["brown", "distressed brown", "black"],
        additionalImages: [
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        materialsCare: "Full-grain leather with waterproof treatment. Professional cleaning recommended.",
        details: "Rugged explorer design with reinforced elbows, multiple pockets, and removable thermal lining.",
        rating: 4.9,
        numReviews: 156,
        inStock: true,
        featured: true,
        createdAt: new Date("2023-01-05T00:00:00Z"),
        updatedAt: new Date("2023-01-05T00:00:00Z")
      },
      {
        name: "Expedition Jumpsuit",
        description: "Vintage-inspired flight suit for modern adventures",
        price: 189.00,
        imageUrl: "https://images.unsplash.com/photo-1511105043137-7e66f28270e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "womens",
        brand: "AviatorX",
        popularity: 80,
        availableSizes: ["XS", "S", "M", "L", "XL"],
        availableColors: ["olive", "navy", "khaki"],
        additionalImages: [
          "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        materialsCare: "Cotton canvas with reinforced stitching. Machine wash cold, hang to dry.",
        details: "Inspired by pilot jumpsuits, featuring adjustable waist, multiple utility pockets and authentic hardware.",
        rating: 4.7,
        numReviews: 83,
        inStock: true,
        featured: true,
        createdAt: new Date("2023-02-15T00:00:00Z"),
        updatedAt: new Date("2023-02-15T00:00:00Z")
      },
      {
        name: "Aviator Sunglasses",
        description: "Classic pilot style with premium lenses",
        price: 129.00,
        imageUrl: "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "accessories",
        brand: "AviatorX",
        popularity: 85,
        availableSizes: ["One Size"],
        availableColors: ["gold/green", "silver/blue", "black/black"],
        additionalImages: [
          "https://images.unsplash.com/photo-1560324541-027a7ac2ffc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1590064661010-d542a9f45927?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        materialsCare: "Metal frame with scratch-resistant UV protection lenses. Includes cleaning cloth and case.",
        details: "Authentic pilot design with polarized lenses and adjustable nose pads.",
        rating: 4.8,
        numReviews: 112,
        inStock: true,
        featured: true,
        createdAt: new Date("2023-03-10T00:00:00Z"),
        updatedAt: new Date("2023-03-10T00:00:00Z")
      },
      {
        name: "Leather Flight Pants",
        description: "Durable aviation-inspired trousers",
        price: 179.00,
        imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "mens",
        brand: "AviatorX",
        popularity: 75,
        availableSizes: ["28", "30", "32", "34", "36", "38"],
        availableColors: ["brown", "black"],
        additionalImages: [
          "https://images.unsplash.com/photo-1548883354-7622d03aca27?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1598112152686-c6da9de67cba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        materialsCare: "Premium leather with stretch panels. Professional leather cleaning only.",
        details: "Motorcycle style with reinforced knees, zippered pockets, and adjustable ankle closure.",
        rating: 4.6,
        numReviews: 68,
        inStock: true,
        featured: false,
        createdAt: new Date("2023-04-05T00:00:00Z"),
        updatedAt: new Date("2023-04-05T00:00:00Z")
      }
    ];
    
    // Add each sample product to the storage
    sampleProducts.forEach(product => {
      const id = this.productIdCounter++;
      this.products.set(id, { ...product, id });
    });
  }
}

export const storage = new MemStorage();
