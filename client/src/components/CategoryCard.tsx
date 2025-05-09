import { Link } from "wouter";
import { useState } from "react";

interface CategoryCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

export default function CategoryCard({ title, description, imageUrl, link }: CategoryCardProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div 
      className="relative rounded-lg overflow-hidden group h-96"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img 
        src={imageUrl} 
        alt={`${title} collection`} 
        className={`w-full h-full object-cover transition-transform duration-700 ${isHovering ? 'scale-110' : 'scale-100'}`} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-xl font-adventure text-primary mb-2">{title}</h3>
        <p className="text-foreground mb-4 text-sm">{description}</p>
        <Link href={link}>
          <a className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-black px-4 py-2 text-sm uppercase tracking-wider font-adventure transition-colors duration-300">
            Explore
          </a>
        </Link>
      </div>
    </div>
  );
}
