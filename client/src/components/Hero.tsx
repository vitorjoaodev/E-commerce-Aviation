import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();
  
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
          src="/hero-background.jpeg" 
          alt="Aviation-themed hero background" 
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center px-4 md:px-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl text-primary mb-4 font-adventure leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-foreground text-lg md:text-xl mb-8 max-w-md">
            {t('hero.subtitle')}
          </p>
          <div className="flex gap-4">
            <Link href="/products">
              <div className="bg-primary hover:bg-opacity-90 text-primary-foreground py-3 px-8 rounded font-adventure uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-center cursor-pointer">
                {t('hero.cta')}
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
