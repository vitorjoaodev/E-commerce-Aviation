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
import { allProducts } from "./products";

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
    
    // Initialize with products
    this.initializeProducts();
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
      // Produtos específicos para a categoria 'mens' - 6 produtos conforme solicitado
      if (category === 'mens') {
        // Avro Lancaster Long Sleeve T-Shirt, Boeing Flight Cardigan, Boeing T-shirt, 
        // Avro Lancaster T-shirt, B17 Long Sleeve T-shirt, Beechcraft T-shirt
        const specificMensProductIds = [1, 2, 3, 4, 5, 6];
        return products.filter(product => 
          specificMensProductIds.includes(product.id)
        );
      }
      
      // Produtos específicos para a categoria 'womens' - 5 produtos conforme solicitado
      if (category === 'womens') {
        // Boeing Flight Jacket, Boeing T-shirt, B17 T-shirt, RCAF 100 Long/Short Sleeve T-Shirts
        const specificWomensProductIds = [7, 8, 9, 10, 11];
        return products.filter(product => 
          specificWomensProductIds.includes(product.id)
        );
      }
      
      // Produtos específicos para a categoria 'accessories' - apenas 3 produtos conforme solicitado
      if (category === 'accessories') {
        // Boeing Leather Zip Wallet, Beechcraft Cap, Boeing 3D Cap
        const accessoriesProductIds = [12, 13, 14];
        return products.filter(product => 
          accessoriesProductIds.includes(product.id)
        );
      }
      
      // Removemos a categoria 'hats' conforme solicitado
      
      // Para as demais categorias, filtro normal
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

  // Initialize products for the store
  private initializeProducts() {
    // Use the imported products from products.ts
    for (const product of allProducts) {
      this.products.set(product.id, product);
      
      // Update the productIdCounter to be greater than the highest product ID
      if (product.id >= this.productIdCounter) {
        this.productIdCounter = product.id + 1;
      }
    }
  }
}

export const storage = new MemStorage();