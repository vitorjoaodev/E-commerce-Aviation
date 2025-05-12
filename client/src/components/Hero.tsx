import { Link } from "wouter";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollToContent = () => {
    document.getElementById('main-content')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="relative h-screen">
      {/* Background image */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 opacity-60 bg-gradient-to-r from-black via-transparent to-black"></div>
        <img 
          className="w-full h-full object-cover" 
          src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
          alt="Vintage aircraft flying over mountains" 
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center px-4 md:px-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl text-primary mb-4 font-adventure leading-tight">
            Adventure Awaits Above The Clouds
          </h1>
          <p className="text-foreground text-lg md:text-xl mb-8 max-w-md">
            Discover our collection of aviation-inspired clothing for the modern explorer. 
            Designed for those who seek adventure.
          </p>
          <div className="flex gap-4">
            <Link href="/products">
              <div className="bg-primary hover:bg-opacity-90 text-primary-foreground py-3 px-8 rounded font-adventure uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-center cursor-pointer">
                Explore Collection
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <button 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-primary focus:outline-none"
        onClick={scrollToContent}
        aria-label="Scroll down"
      >
        <ChevronDown className="h-10 w-10" />
      </button>
    </section>
  );
}
