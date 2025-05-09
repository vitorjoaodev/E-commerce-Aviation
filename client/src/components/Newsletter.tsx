import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { isValidEmail } from "@/lib/utils";
import { MapPin } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you would send this to your API
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source: "footer" }),
      });

      if (response.ok) {
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for joining our adventure. Keep an eye on your inbox for exclusive offers.",
        });
        
        setEmail("");
      } else {
        throw new Error("Failed to subscribe");
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-card p-8 md:p-12 rounded-lg border border-border relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-adventure text-primary mb-4">Join The Adventure</h2>
              <p className="text-foreground">
                Subscribe to receive exclusive offers, early access to new collections, 
                and adventure stories from around the world.
              </p>
            </div>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type="submit" 
                  className="bg-primary hover:bg-opacity-90 text-primary-foreground py-3 px-8 rounded font-adventure uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
              <p className="text-muted-foreground text-sm text-center">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </form>
          </div>
          
          <div className="absolute right-0 bottom-0 opacity-10">
            <MapPin className="h-48 w-48 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
