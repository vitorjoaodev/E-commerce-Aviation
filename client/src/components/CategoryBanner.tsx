import CategoryCard from "./CategoryCard";

export default function CategoryBanner() {
  const categories = [
    {
      title: "Aviator Jackets",
      description: "Timeless designs crafted for adventure",
      imageUrl: "https://redcanoebrands.com/wp-content/uploads/2021/03/Womens-BOEING-flight-jacket.jpg",
      link: "/products/womens"
    },
    {
      title: "Flight Apparel",
      description: "Functional designs with aviation heritage",
      imageUrl: "https://redcanoebrands.com/wp-content/uploads/2022/05/M-LST-AVL-NY_front.jpg",
      link: "/products/mens"
    },
    {
      title: "Travel Essentials",
      description: "Ready for any expedition",
      imageUrl: "https://redcanoebrands.com/wp-content/uploads/2022/10/U-WAL-BOEING-TN_front.jpg",
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
