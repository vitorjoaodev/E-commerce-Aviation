import Hero from "@/components/Hero";
import CategoryBanner from "@/components/CategoryBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeritageBanner from "@/components/HeritageBanner";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import InstagramFeed from "@/components/InstagramFeed";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'pt';
  
  return (
    <>
      <Helmet>
        <title>Aviator Store - {currentLanguage === 'pt' ? 'Roupas Inspiradas em Aviação' : 'Aviation-Themed Clothing'}</title>
        <meta name="description" content={currentLanguage === 'pt' 
          ? "Descubra nossa coleção de roupas inspiradas na aviação para o explorador moderno. Vestuário premium projetado para aqueles que buscam aventura."
          : "Discover our collection of aviation-inspired clothing for the modern explorer. Premium apparel designed for those who seek adventure."} 
        />
        <meta property="og:title" content="Aviator Store" />
        <meta property="og:description" content={currentLanguage === 'pt' 
          ? "Vestuário premium inspirado na aviação para aventureiros modernos"
          : "Premium aviation-inspired clothing for modern adventurers"} 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.aviatorstore.com" />
        <meta property="og:image" content="https://redcanoebrands.com/wp-content/uploads/2019/10/M-LST-AVL-NY_lifestyle1.jpg" />
        <link rel="canonical" href="https://www.aviatorstore.com" />
        <meta name="keywords" content="aviação, roupas, aventura, piloto, camisetas, jaquetas, voo" />
      </Helmet>
      
      <Hero />
      <CategoryBanner />
      <FeaturedProducts />
      <HeritageBanner />
      <InstagramFeed />
      <Testimonials />
      <Newsletter />
    </>
  );
}
