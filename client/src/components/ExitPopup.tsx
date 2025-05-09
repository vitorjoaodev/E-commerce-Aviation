import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { showExitPopup } from "@/store/uiSlice";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isValidEmail } from "@/lib/utils";

export default function ExitPopup() {
  const { isExitPopupOpen } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    dispatch(showExitPopup(false));
  };

  const handleSubscribe = async (e: React.FormEvent) => {
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
        body: JSON.stringify({ email, source: "exit_popup" }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your 15% discount code has been sent to your email.",
        });
        
        handleClose();
        
        // Save in localStorage that user has subscribed
        localStorage.setItem("hasSubscribed", "true");
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

  if (!isExitPopupOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={handleClose}
      ></div>
      
      <div className="relative max-w-md w-full mx-4 bg-card p-6 rounded-lg shadow-xl">
        <button 
          className="absolute top-4 right-4 text-foreground hover:text-primary"
          onClick={handleClose}
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="flex justify-center mb-4">
          <img 
            src="https://pixabay.com/get/g46b8c4696751b9d620bea776d50dde9fef6251c1ca9a5b2fded5209a00480b5e466a0fd7c1276edeb931c1ff2ed7b124cbcc1f425543e452fad63adc62341fdb_1280.jpg" 
            alt="Vintage aviation goggles" 
            className="h-32 object-contain" 
          />
        </div>
        
        <h3 className="text-2xl font-adventure text-primary text-center mb-2">Wait! Don't Miss Out</h3>
        <p className="text-foreground text-center mb-6">
          Subscribe to our newsletter and receive a <span className="text-accent font-semibold">15% DISCOUNT</span> on your first order!
        </p>
        
        <form className="space-y-4" onSubmit={handleSubscribe}>
          <input 
            type="email" 
            placeholder="Your email address" 
            className="w-full px-4 py-3 rounded bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-opacity-90 text-primary-foreground py-3 rounded font-adventure uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Get 15% Discount"}
          </button>
          <p className="text-muted-foreground text-xs text-center">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </form>
        
        <button 
          className="w-full text-muted-foreground hover:text-foreground text-sm text-center mt-4 transition-colors duration-300"
          onClick={handleClose}
        >
          No thanks, I'll pay full price
        </button>
      </div>
    </div>
  );
}
