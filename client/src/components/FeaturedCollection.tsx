import { Link } from "wouter";
import { Check } from "lucide-react";

export default function FeaturedCollection() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img 
          src="https://i.ytimg.com/vi/BKaQBV-xEcU/mqdefault.jpg?sqp=-oaymwEFCJQBEFM&rs=AMzJL3mbuAMG8HSDf3iwky1FPdj7LEZing" 
          alt="Airplane video thumbnail" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-8 md:mb-0 md:pr-12">
            <h2 className="text-3xl md:text-4xl font-adventure text-primary mb-4">
              Explorer Collection
            </h2>
            <div className="adventure-divider w-40 my-4"></div>
            <p className="text-white mb-6">
              Designed for modern adventurers who embrace the spirit of exploration. 
              Each piece combines historical aviation elements with contemporary functionality.
            </p>
            <ul className="space-y-3 mb-8 text-white">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                Premium materials built to last
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                Authentic vintage-inspired details
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                Limited edition pieces
              </li>
            </ul>
            <Link href="/products/collections/explorer">
              <a className="inline-block bg-primary hover:bg-opacity-90 text-primary-foreground py-3 px-8 rounded font-adventure uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                Explore Collection
              </a>
            </Link>
          </div>
          
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Collection Item 1 */}
            <div className="relative rounded-lg overflow-hidden group h-80">
              <img 
                src="https://pixabay.com/get/g82ea414c8f35a005fcc8f23960a602388c996d2f9f23365699e55d99bcc6a64e9abe4e766f71226478707a0efce3f284a067d1759bd1866e2ce9e520251baa47_1280.jpg" 
                alt="Explorer leather jacket with aviation patches" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-adventure text-primary mb-2">Explorer Jacket</h3>
                <p className="text-foreground mb-3 text-sm">$349.00</p>
                <Link href="/product/explorer-jacket">
                  <a className="text-sm border-b border-primary text-primary hover:border-white hover:text-white transition-colors duration-300">
                    View Details
                  </a>
                </Link>
              </div>
            </div>

            {/* Collection Item 2 */}
            <div className="relative rounded-lg overflow-hidden group h-80">
              <img 
                src="https://images.unsplash.com/photo-1511105043137-7e66f28270e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Expedition Jumpsuit inspired by flight suits" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-adventure text-primary mb-2">Expedition Jumpsuit</h3>
                <p className="text-foreground mb-3 text-sm">$189.00</p>
                <Link href="/product/expedition-jumpsuit">
                  <a className="text-sm border-b border-primary text-primary hover:border-white hover:text-white transition-colors duration-300">
                    View Details
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
