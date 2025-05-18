import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { Instagram } from 'lucide-react';

// Importe as imagens do Instagram
const instagramImages = [
  "https://aviationdepot.com/cdn/shop/files/L-SST-B17CA-GY-MD_lifestyle2.jpg?v=1707262681",
  "/instagram-feed/image1.jpeg",
  "/instagram-feed/image2.jpeg",
  "/instagram-feed/image3.jpeg",
  "/instagram-feed/image4.jpeg",
  "/instagram-feed/image5.jpeg"
];

export default function InstagramFeed() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">{t('instagram.title')}</h2>
          <p className="text-muted-foreground mb-5">{t('instagram.subtitle')}</p>
          <a 
            href="https://www.instagram.com/aviatorstore" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-md transition-colors font-medium"
          >
            <Instagram className="w-5 h-5 mr-2" />
            {t('instagram.followUs')}
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {instagramImages.map((image, index) => (
            <a 
              key={index}
              href="https://www.instagram.com/aviatorstore" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-lg aspect-square shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img 
                src={image} 
                alt={`Instagram post ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                <div className="flex items-center text-white">
                  <Instagram className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">@aviatorstore</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}