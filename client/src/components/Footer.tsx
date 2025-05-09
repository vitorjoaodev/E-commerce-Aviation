import { Link } from "wouter";
import { Compass, Mail, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="relative w-12 h-12 mr-2 border-2 border-primary rounded-full flex items-center justify-center overflow-hidden">
                {/* Compass face */}
                <div className="absolute inset-0 bg-card"></div>
                
                {/* Compass ring with markings */}
                <div className="absolute inset-0 border-4 border-primary rounded-full"></div>
                
                {/* North marker */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-accent"></div>
                
                {/* Compass needle */}
                <div className="absolute top-1/2 left-1/2 w-8 h-1 bg-primary origin-center animate-[compass-spin_8s_linear_infinite]" 
                     style={{ transform: 'translate(-50%, -50%)' }}>
                  <div className="absolute right-0 w-4 h-1 bg-accent"></div>
                </div>
                
                {/* Central pivot */}
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <span className="text-xl font-adventure text-primary">Aviator Store</span>
            </div>
            <p className="text-muted-foreground mb-6">Aviation-inspired clothing for modern adventurers who embrace the spirit of exploration and discovery.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground hover:text-primary">
                <Compass className="h-6 w-6" />
              </a>
              <a href="#" className="text-foreground hover:text-primary">
                <Mail className="h-6 w-6" />
              </a>
              <a href="#" className="text-foreground hover:text-primary">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-adventure text-primary mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/products/mens" className="text-foreground hover:text-primary">Men's Collection</Link></li>
              <li><Link href="/products/womens" className="text-foreground hover:text-primary">Women's Collection</Link></li>
              <li><Link href="/products/accessories" className="text-foreground hover:text-primary">Accessories</Link></li>
              <li><Link href="/products/limited-edition" className="text-foreground hover:text-primary">Limited Edition</Link></li>
              <li><Link href="/gift-cards" className="text-foreground hover:text-primary">Gift Cards</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-adventure text-primary mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-foreground hover:text-primary">Our Story</Link></li>
              <li><Link href="/heritage" className="text-foreground hover:text-primary">Aviation Heritage</Link></li>
              <li><Link href="/sustainability" className="text-foreground hover:text-primary">Sustainability</Link></li>
              <li><Link href="/careers" className="text-foreground hover:text-primary">Careers</Link></li>
              <li><Link href="/press" className="text-foreground hover:text-primary">Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-adventure text-primary mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="/shipping-returns" className="text-foreground hover:text-primary">Shipping & Returns</Link></li>
              <li><Link href="/faq" className="text-foreground hover:text-primary">FAQs</Link></li>
              <li><Link href="/size-guide" className="text-foreground hover:text-primary">Size Guide</Link></li>
              <li><Link href="/privacy" className="text-foreground hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="adventure-divider mx-auto w-full my-8"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-left">
            <p className="text-muted-foreground text-sm mb-1">© 2023 Aviator Store. All rights reserved.</p>
            <p className="text-muted-foreground text-xs">Developed by John Vitor Belasque</p>
          </div>
          <div className="flex space-x-4 items-center mt-4 md:mt-0">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 w-auto" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 w-auto" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-6 w-auto" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 w-auto bg-white px-1 rounded" />
          </div>
        </div>
      </div>
    </footer>
  );
}
