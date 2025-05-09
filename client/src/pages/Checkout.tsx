import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { clearCart } from "@/store/cartSlice";
import { Link, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { formatPrice } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, ShoppingBag, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "ZIP code is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  paymentMethod: z.enum(["credit-card", "paypal"]),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  savePaymentInfo: z.boolean().default(false),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { items } = useSelector((state: RootState) => state.cart);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      paymentMethod: "credit-card",
      savePaymentInfo: false,
      agreeToTerms: false,
    },
  });

  // Watch payment method to conditionally render fields
  const paymentMethod = form.watch("paymentMethod");

  // Handle checkout submission
  const onSubmit = async (data: FormValues) => {
    if (items.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you would send this to your API
      const orderData = {
        customer: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
        },
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        payment: {
          method: data.paymentMethod,
          total: total,
          subtotal: subtotal,
          shipping: shipping,
          tax: tax,
        },
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const order = await response.json();
        setOrderId(order.id);
        setOrderComplete(true);
        dispatch(clearCart());
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      toast({
        title: "Checkout failed",
        description: "An error occurred during checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // If the order is complete, show the success page
  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Helmet>
          <title>Order Confirmation - AviatorX</title>
          <meta name="description" content="Thank you for your order at AviatorX. Your aviation-inspired clothing is on its way!" />
        </Helmet>
        
        <div className="bg-card p-8 rounded-lg border border-border text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-primary" />
          </div>
          
          <h1 className="text-3xl font-adventure text-primary mb-4">Order Complete!</h1>
          <p className="text-foreground mb-6">
            Thank you for your order. We've sent a confirmation email to your inbox.
          </p>
          
          {orderId && (
            <div className="mb-6 p-4 bg-muted rounded-md">
              <p className="text-muted-foreground text-sm mb-1">Order Reference:</p>
              <p className="text-primary font-mono">{orderId}</p>
            </div>
          )}
          
          <div className="adventure-divider w-40 mx-auto my-6"></div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              className="bg-primary hover:bg-opacity-90 text-primary-foreground font-adventure uppercase tracking-wider"
              onClick={() => setLocation("/")}
            >
              Continue Shopping
            </Button>
            
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-adventure uppercase tracking-wider"
              onClick={() => setLocation("/account")}
            >
              View My Account
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Checkout - AviatorX</title>
        <meta name="description" content="Complete your purchase of aviation-inspired clothing at AviatorX. Secure checkout process with multiple payment options." />
      </Helmet>
      
      <h1 className="text-3xl md:text-4xl font-adventure text-primary mb-2">Checkout</h1>
      <div className="adventure-divider w-40 my-4"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Customer Information */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="text-xl font-adventure text-primary mb-4">Customer Information</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} className="bg-muted" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} className="bg-muted" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" {...field} className="bg-muted" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} className="bg-muted" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {/* Shipping Address */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="text-xl font-adventure text-primary mb-4">Shipping Address</h2>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Adventure Ave" {...field} className="bg-muted" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} className="bg-muted" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="NY" {...field} className="bg-muted" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="10001" {...field} className="bg-muted" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="United States" {...field} className="bg-muted" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Payment Information */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="text-xl font-adventure text-primary mb-4">Payment Information</h2>
                
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="credit-card" id="credit-card" />
                            <label htmlFor="credit-card" className="flex items-center">
                              <span className="mr-2">Credit Card</span>
                              <div className="flex items-center space-x-1">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" alt="Visa" className="h-8 w-auto" />
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg" alt="Mastercard" className="h-8 w-auto" />
                              </div>
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <label htmlFor="paypal" className="flex items-center">
                              <span className="mr-2">PayPal</span>
                              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg" alt="PayPal" className="h-6 w-auto" />
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {paymentMethod === "credit-card" && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <Input placeholder="4242 4242 4242 4242" {...field} className="bg-muted" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="cardExpiry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiration Date</FormLabel>
                            <FormControl>
                              <Input placeholder="MM/YY" {...field} className="bg-muted" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cardCvc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVC</FormLabel>
                            <FormControl>
                              <Input placeholder="123" {...field} className="bg-muted" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="savePaymentInfo"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Save this card for future purchases</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                
                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the{" "}
                          <Link href="/terms">
                            <a className="text-primary hover:underline">Terms and Conditions</a>
                          </Link>
                          {" "}and{" "}
                          <Link href="/privacy">
                            <a className="text-primary hover:underline">Privacy Policy</a>
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting || items.length === 0}
                className="w-full bg-primary hover:bg-opacity-90 text-primary-foreground py-3 rounded font-adventure uppercase tracking-wider transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Complete Purchase</>
                )}
              </Button>
            </form>
          </Form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card p-6 rounded-lg border border-border sticky top-24">
            <h2 className="text-xl font-adventure text-primary mb-4">Order Summary</h2>
            
            <div className="max-h-96 overflow-y-auto mb-4 pr-2">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img 
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <p className="text-foreground font-medium">{item.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {item.size && `Size: ${item.size}`} 
                          {item.color && item.size && ' / '} 
                          {item.color && `Color: ${item.color}`}
                        </p>
                        <div className="flex justify-between mt-1">
                          <p className="text-muted-foreground text-sm">Qty: {item.quantity}</p>
                          <p className="text-primary">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="text-foreground">{formatPrice(tax)}</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between font-semibold">
              <span className="text-foreground">Total</span>
              <span className="text-primary text-xl">{formatPrice(total)}</span>
            </div>
            
            <div className="mt-6 bg-muted p-4 rounded-md">
              <p className="text-sm text-muted-foreground">
                <span className="text-primary font-semibold">Free shipping</span> on all orders over $100
              </p>
            </div>
            
            <Button 
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting || items.length === 0}
              className="w-full mt-6 bg-primary hover:bg-opacity-90 text-primary-foreground py-3 rounded font-adventure uppercase tracking-wider transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Complete Purchase</>
              )}
            </Button>
            
            <div className="mt-4 text-center">
              <Link href="/products">
                <a className="text-primary hover:underline text-sm">
                  Continue Shopping
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
