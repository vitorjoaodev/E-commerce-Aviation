import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Package, Settings, Clock, Eye } from "lucide-react";

// Define interface for order type
interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "canceled";
  total: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }>;
}

// Define interface for user profile
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string | null;
}

// Profile update form schema
const profileFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
});

// Password change form schema
const passwordFormSchema = z.object({
  currentPassword: z.string().min(6, { message: "Current password is required" }),
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(8),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function Account() {
  const [activeTab, setActiveTab] = useState("orders");
  const { toast } = useToast();
  
  // Fetch user profile data
  const { 
    data: profile, 
    isLoading: isLoadingProfile,
    refetch: refetchProfile
  } = useQuery<UserProfile>({
    queryKey: ["/api/profile"],
  });

  // Fetch user orders
  const { 
    data: orders, 
    isLoading: isLoadingOrders 
  } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
  });

  // Profile update form setup
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    mode: "onChange",
  });

  // Password change form setup
  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Update form values when profile data is loaded
  useEffect(() => {
    if (profile) {
      profileForm.reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone || "",
        address: profile.address || "",
        city: profile.city || "",
        state: profile.state || "",
        zipCode: profile.zipCode || "",
        country: profile.country || "",
      });
    }
  }, [profile, profileForm]);

  // Handler for profile update
  const onProfileSubmit = async (data: z.infer<typeof profileFormSchema>) => {
    try {
      await apiRequest('PUT', '/api/profile', data);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
      
      refetchProfile();
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handler for password change
  const onPasswordSubmit = async (data: z.infer<typeof passwordFormSchema>) => {
    try {
      await apiRequest('PUT', '/api/profile/password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
      
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was a problem changing your password. Please verify your current password.",
        variant: "destructive",
      });
    }
  };

  // Helper function to get status badge color
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30";
      case 'processing':
        return "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30";
      case 'shipped':
        return "bg-purple-500/20 text-purple-500 hover:bg-purple-500/30";
      case 'delivered':
        return "bg-green-500/20 text-green-500 hover:bg-green-500/30";
      case 'canceled':
        return "bg-red-500/20 text-red-500 hover:bg-red-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>My Account - AviatorX</title>
        <meta name="description" content="Manage your AviatorX account, view orders, and update your profile." />
      </Helmet>
      
      <h1 className="text-3xl md:text-4xl font-adventure text-primary mb-2">My Account</h1>
      <div className="adventure-divider w-40 my-4"></div>
      
      <Tabs 
        defaultValue="orders" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="mt-8"
      >
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
          <TabsTrigger value="orders" className="font-adventure">
            <Package className="mr-2 h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="profile" className="font-adventure">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="settings" className="font-adventure">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        {/* Orders Tab Content */}
        <TabsContent value="orders">
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-2xl font-adventure text-primary mb-6">Order History</h2>
            
            {isLoadingOrders ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-muted p-4 rounded-lg">
                    <div className="flex flex-col sm:flex-row justify-between mb-4">
                      <div>
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <Skeleton className="h-5 w-20 mb-2" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center">
                      <Skeleton className="h-16 w-16 rounded mr-4" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : !orders || orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-adventure text-primary mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't placed any orders yet. Start shopping to see your orders here.
                </p>
                <Link href="/products">
                  <a className="inline-block bg-primary hover:bg-opacity-90 text-primary-foreground py-3 px-8 rounded font-adventure uppercase tracking-wider transition-all duration-300">
                    Browse Products
                  </a>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(order => (
                  <div key={order.id} className="bg-muted rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-lg font-semibold text-foreground mr-3">
                            Order #{order.orderNumber}
                          </h3>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">
                          <Clock className="inline-block h-3 w-3 mr-1" />
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0 flex items-center">
                        <p className="text-primary font-semibold mr-4">
                          {formatPrice(order.total)}
                        </p>
                        <Link href={`/orders/${order.id}`}>
                          <a className="inline-flex items-center text-primary hover:underline text-sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </a>
                        </Link>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex flex-wrap gap-4">
                      {order.items.slice(0, 3).map(item => (
                        <div key={item.id} className="flex items-center">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded mr-3" 
                          />
                          <div>
                            <p className="text-foreground font-medium">{item.name}</p>
                            <p className="text-muted-foreground text-sm">
                              Qty: {item.quantity} · {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {order.items.length > 3 && (
                        <div className="flex items-center text-muted-foreground">
                          <span>+{order.items.length - 3} more items</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Profile Tab Content */}
        <TabsContent value="profile">
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-2xl font-adventure text-primary mb-6">Personal Information</h2>
            
            {isLoadingProfile ? (
              <div className="space-y-4">
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-10 w-full mb-6" />
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-10 w-full mb-6" />
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-10 w-full mb-6" />
                <Skeleton className="h-10 w-32" />
              </div>
            ) : (
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={profileForm.control}
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
                      control={profileForm.control}
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
                  
                  <FormField
                    control={profileForm.control}
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
                    control={profileForm.control}
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
                  
                  <h3 className="text-xl font-adventure text-primary mt-8 mb-4">Address Information</h3>
                  
                  <FormField
                    control={profileForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Adventure Ave" {...field} className="bg-muted" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    <FormField
                      control={profileForm.control}
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
                      control={profileForm.control}
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
                      control={profileForm.control}
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
                    control={profileForm.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="United States" {...field} className="bg-muted" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-opacity-90 text-primary-foreground py-2 px-6 rounded font-adventure uppercase tracking-wider transition-all duration-300"
                    disabled={!profileForm.formState.isDirty}
                  >
                    Update Profile
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </TabsContent>
        
        {/* Settings Tab Content */}
        <TabsContent value="settings">
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-2xl font-adventure text-primary mb-6">Change Password</h2>
            
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6 max-w-md">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} className="bg-muted" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} className="bg-muted" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} className="bg-muted" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-opacity-90 text-primary-foreground py-2 px-6 rounded font-adventure uppercase tracking-wider transition-all duration-300"
                >
                  Update Password
                </Button>
              </form>
            </Form>
            
            <Separator className="my-8" />
            
            <h2 className="text-2xl font-adventure text-primary mb-6">Notification Preferences</h2>
            
            <div className="space-y-6 max-w-md">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-foreground font-semibold">Order Updates</h3>
                  <p className="text-muted-foreground text-sm">Receive notifications about your order status</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="order-updates" 
                    className="appearance-none w-4 h-4 rounded border border-border checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultChecked
                  />
                  <label htmlFor="order-updates" className="cursor-pointer"></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-foreground font-semibold">Promotional Emails</h3>
                  <p className="text-muted-foreground text-sm">Receive emails about sales, new products, and more</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="promotional-emails" 
                    className="appearance-none w-4 h-4 rounded border border-border checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultChecked
                  />
                  <label htmlFor="promotional-emails" className="cursor-pointer"></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-foreground font-semibold">Product Reviews</h3>
                  <p className="text-muted-foreground text-sm">Receive reminders to review your purchased products</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="product-reviews" 
                    className="appearance-none w-4 h-4 rounded border border-border checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultChecked
                  />
                  <label htmlFor="product-reviews" className="cursor-pointer"></label>
                </div>
              </div>
              
              <Button 
                className="bg-primary hover:bg-opacity-90 text-primary-foreground py-2 px-6 rounded font-adventure uppercase tracking-wider transition-all duration-300"
                onClick={() => {
                  toast({
                    title: "Preferences saved",
                    description: "Your notification preferences have been updated.",
                  });
                }}
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
