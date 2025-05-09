import Hero from "@/components/Hero";
import CategoryBanner from "@/components/CategoryBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeritageBanner from "@/components/HeritageBanner";
import FeaturedCollection from "@/components/FeaturedCollection";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>AviatorX - Aviation-Themed Clothing</title>
        <meta name="description" content="Discover our collection of aviation-inspired clothing for the modern explorer. Premium apparel designed for those who seek adventure." />
      </Helmet>
      
      <Hero />
      <CategoryBanner />
      <FeaturedProducts />
      <HeritageBanner />
      <FeaturedCollection />
      <Testimonials />
      <Newsletter />
    </>
  );
}
