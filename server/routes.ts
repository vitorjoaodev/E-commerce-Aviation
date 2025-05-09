import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertProductSchema, 
  insertOrderSchema, 
  insertEmailSubscriptionSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Prefix all routes with /api
  
  // Product Routes
  app.get("/api/products", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const search = req.query.search as string | undefined;
      
      // Get all products first
      const products = await storage.getProducts(category);
      
      // If search parameter is provided, filter products
      if (search && search.trim() !== '') {
        const searchTerm = search.toLowerCase();
        const filteredProducts = products.filter(product => 
          product.name.toLowerCase().includes(searchTerm) || 
          product.description.toLowerCase().includes(searchTerm) ||
          (product.category && product.category.toLowerCase().includes(searchTerm))
        );
        return res.json(filteredProducts);
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (req, res) => {
    try {
      const featuredProducts = await storage.getFeaturedProducts();
      res.json(featuredProducts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/related/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const relatedProducts = await storage.getRelatedProducts(productId);
      res.json(relatedProducts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch related products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const product = await storage.getProduct(productId);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  // Order Routes
  app.post("/api/orders", async (req, res) => {
    try {
      // Create a simplified validation schema for the order API
      const orderAPISchema = z.object({
        customer: z.object({
          firstName: z.string(),
          lastName: z.string(),
          email: z.string().email(),
          phone: z.string().optional(),
          address: z.string(),
          city: z.string(),
          state: z.string(),
          zipCode: z.string(),
          country: z.string(),
        }),
        items: z.array(
          z.object({
            productId: z.string(),
            name: z.string(),
            price: z.number(),
            quantity: z.number().int().positive(),
            size: z.string().optional(),
            color: z.string().optional(),
          })
        ),
        payment: z.object({
          method: z.string(),
          total: z.number(),
          subtotal: z.number(),
          shipping: z.number(),
          tax: z.number(),
        }),
      });

      const orderData = orderAPISchema.parse(req.body);
      
      // Format the data to match our schema
      const formattedOrderData = {
        userId: null, // Set to user ID if logged in
        orderNumber: `ORD-${Date.now().toString().slice(-8)}`,
        status: "pending",
        total: orderData.payment.total,
        shippingAddress: {
          firstName: orderData.customer.firstName,
          lastName: orderData.customer.lastName,
          address: orderData.customer.address,
          city: orderData.customer.city,
          state: orderData.customer.state,
          zipCode: orderData.customer.zipCode,
          country: orderData.customer.country,
          phone: orderData.customer.phone,
        },
        paymentMethod: orderData.payment.method,
        paymentStatus: "pending",
      };

      const order = await storage.createOrder(formattedOrderData);

      // Create order items
      const orderItems = orderData.items.map(item => ({
        orderId: order.id,
        productId: parseInt(item.productId),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        imageUrl: "", // This would be populated from the product data
      }));

      await Promise.all(orderItems.map(item => storage.createOrderItem(item)));

      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getOrders();
      
      // Get order items for each order
      const ordersWithItems = await Promise.all(
        orders.map(async (order) => {
          const items = await storage.getOrderItems(order.id);
          return { ...order, items };
        })
      );
      
      res.json(ordersWithItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      const order = await storage.getOrder(orderId);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      const items = await storage.getOrderItems(orderId);
      
      res.json({ ...order, items });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  // Email Subscription Routes
  app.post("/api/subscribe", async (req, res) => {
    try {
      const schema = z.object({
        email: z.string().email(),
        source: z.string(),
      });

      const { email, source } = schema.parse(req.body);
      
      const subscription = await storage.createEmailSubscription({
        email,
        source,
        isActive: true,
      });
      
      // In a real app, you would send an email with discount code
      // and handle discount tracking
      
      res.status(201).json({
        message: "Successfully subscribed",
        discountCode: "ADVENTURE15",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid email", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to subscribe" });
    }
  });

  // Profile Routes (Mock implementation)
  app.get("/api/profile", async (req, res) => {
    try {
      const profile = {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "(555) 123-4567",
        address: "123 Adventure Ave",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
      };
      
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.put("/api/profile", async (req, res) => {
    try {
      const schema = z.object({
        firstName: z.string().min(2),
        lastName: z.string().min(2),
        email: z.string().email(),
        phone: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zipCode: z.string().optional(),
        country: z.string().optional(),
      });

      const profileData = schema.parse(req.body);
      
      // In a real app, you would update the user profile in the database
      
      res.json({
        id: "1",
        ...profileData,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid profile data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  app.put("/api/profile/password", async (req, res) => {
    try {
      const schema = z.object({
        currentPassword: z.string().min(6),
        newPassword: z.string().min(8),
      });

      const passwordData = schema.parse(req.body);
      
      // In a real app, you would validate the current password
      // and update to the new password in the database
      
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid password data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update password" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
