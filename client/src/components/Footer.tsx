import { Link } from "wouter";
import { Compass, Mail, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="relative w-10 h-10 mr-2 border-2 border-primary rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-primary rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-primary" style={{ transform: 'translate(-50%, -50%) rotate(45deg)' }}></div>
                <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-primary" style={{ transform: 'translate(-50%, -50%) rotate(135deg)' }}></div>
              </div>
              <span className="text-xl font-adventure text-primary">AviatorX</span>
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
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">© 2023 AviatorX. All rights reserved.</p>
          <div className="flex space-x-4">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" alt="Visa" className="h-8 w-auto" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg" alt="Mastercard" className="h-8 w-auto" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" alt="Apple Pay" className="h-8 w-auto" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg" alt="PayPal" className="h-8 w-auto" />
          </div>
        </div>
      </div>
    </footer>
  );
}
