import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { showExitPopup } from "@/store/uiSlice";
import { X, Plane, Mail, TagIcon, CheckCircle2, Compass } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isValidEmail } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

export default function ExitPopup() {
  const { isExitPopupOpen } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleClose = () => {
    dispatch(showExitPopup(false));
    // Reset state after closing with a slight delay
    setTimeout(() => {
      setIsSuccess(false);
      setEmail("");
      setAgreed(false);
    }, 300);
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

    if (!agreed) {
      toast({
        title: "Agreement required",
        description: "Please agree to receive marketing communications.",
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
        setIsSuccess(true);
        toast({
          title: "Success!",
          description: "Your 15% discount code has been sent to your email.",
        });
        
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
        className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      
      {!isSuccess ? (
        <div className="relative max-w-3xl w-full mx-4 bg-card rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Left side - Image/Design area */}
          <div className="w-full md:w-5/12 bg-primary relative p-6 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/70">
              {/* Decorative elements - Compass lines */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/2 left-1/2 w-[200%] h-0.5 bg-white" style={{ transform: 'translate(-50%, -50%) rotate(45deg)' }}></div>
                <div className="absolute top-1/2 left-1/2 w-[200%] h-0.5 bg-white" style={{ transform: 'translate(-50%, -50%) rotate(90deg)' }}></div>
                <div className="absolute top-1/2 left-1/2 w-[200%] h-0.5 bg-white" style={{ transform: 'translate(-50%, -50%) rotate(135deg)' }}></div>
              </div>
            </div>
            
            <div className="relative z-[1] text-center py-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
                <TagIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-adventure text-white mb-2">15% OFF</h3>
              <p className="text-white/90 text-lg mb-4">Your First Order</p>
              
              <div className="w-24 h-24 mx-auto relative mt-6">
                <div className="absolute inset-0 border-4 border-white/30 rounded-full"></div>
                <div className="absolute inset-0 border border-white/20 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 h-16 w-1 bg-white/70 origin-bottom" 
                     style={{ transform: 'translate(-50%, -100%) rotate(45deg)' }}></div>
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          </div>
          
          {/* Right side - Form area */}
          <div className="w-full md:w-7/12 p-6 md:p-8">
            <button 
              className="absolute top-4 right-4 text-foreground hover:text-primary"
              onClick={handleClose}
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-adventure text-primary mb-2">Join Our Adventure</h3>
              <p className="text-foreground text-sm md:text-base">
                Subscribe to our newsletter and receive exclusive offers, early access to new collections, and a 15% discount on your first purchase.
              </p>
            </div>
            
            <form className="space-y-5" onSubmit={handleSubscribe}>
              <div className="space-y-2">
                <label htmlFor="email" className="text-foreground font-medium text-sm">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input 
                    id="email"
                    type="email" 
                    placeholder="youremail@example.com" 
                    className="w-full pl-10 pr-4 py-3 rounded bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={agreed} 
                  onCheckedChange={() => setAgreed(!agreed)} 
                  className="mt-1"
                />
                <label 
                  htmlFor="terms" 
                  className="text-sm text-muted-foreground leading-tight cursor-pointer"
                >
                  I agree to receive marketing communications from Aviator Store. You can unsubscribe at any time.
                </label>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-opacity-90 text-primary-foreground py-3 rounded font-adventure uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center space-x-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>Get 15% Off My Order</span>
                    <Plane className="h-4 w-4 ml-1" />
                  </>
                )}
              </button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                By signing up, you agree to our{" "}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and{" "}
                <a href="/terms" className="text-primary hover:underline">Terms of Service</a>.
              </p>
            </form>
            
            <button 
              className="w-full text-muted-foreground hover:text-foreground text-sm text-center mt-4 transition-colors duration-300"
              onClick={handleClose}
            >
              No thanks, I'll continue browsing
            </button>
          </div>
        </div>
      ) : (
        <div className="relative max-w-md w-full mx-4 bg-card p-8 rounded-lg shadow-xl">
          <button 
            className="absolute top-4 right-4 text-foreground hover:text-primary"
            onClick={handleClose}
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            
            <h3 className="text-2xl font-adventure text-primary mb-3">Ready for Takeoff!</h3>
            <p className="text-muted-foreground mb-6">
              Your discount code has been sent to your email. 
              Please check your inbox.
            </p>
            
            <div className="bg-muted p-4 rounded-md mb-6 mx-auto">
              <p className="text-sm text-muted-foreground mb-1">Use this code at checkout</p>
              <div className="font-mono text-lg font-bold text-primary tracking-wider border border-border rounded bg-card p-2">
                WELCOME15
              </div>
            </div>
            
            <button
              onClick={handleClose}
              className="w-full bg-primary hover:bg-opacity-90 text-primary-foreground py-3 rounded font-adventure uppercase tracking-wider transition-all duration-300 hover:shadow-lg"
            >
              Continue Shopping
            </button>
            
            <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
              <Plane className="h-4 w-4 mr-1" />
              <span>Check your spam folder if you don't see our email</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
