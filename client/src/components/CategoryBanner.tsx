import CategoryCard from "./CategoryCard";

export default function CategoryBanner() {
  const categories = [
    {
      title: "Aviator Jackets",
      description: "Timeless designs crafted for adventure",
      imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/products/jackets"
    },
    {
      title: "Flight Apparel",
      description: "Functional designs with aviation heritage",
      imageUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/products/apparel"
    },
    {
      title: "Travel Essentials",
      description: "Ready for any expedition",
      imageUrl: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/products/accessories"
    }
  ];

  return (
    <section id="main-content" className="py-16 container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-adventure text-primary mb-4">
          Explore Our Collections
        </h2>
        <div className="adventure-divider mx-auto w-40 my-4"></div>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Inspired by the golden age of aviation and the spirit of adventure that defines us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.title}
            description={category.description}
            imageUrl={category.imageUrl}
            link={category.link}
          />
        ))}
      </div>
    </section>
  );
}
