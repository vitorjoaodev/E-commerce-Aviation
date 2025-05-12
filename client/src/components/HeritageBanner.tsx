import { Link } from "wouter";

export default function HeritageBanner() {
  return (
    <section className="py-20 relative">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src="https://t3.ftcdn.net/jpg/12/21/87/84/360_F_1221878411_EkZY7iknu0jrKXXhgiSsArE827Aq3avq.jpg" 
          alt="Vintage biplane against blue sky" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-adventure text-primary mb-6">
            Our Aviation Heritage
          </h2>
          <div className="adventure-divider mx-auto w-40 my-4"></div>
          <p className="text-foreground text-lg mb-8">
            Inspired by the pioneers of flight, our collection pays homage to the golden age 
            of aviation while embracing modern design and comfort.
          </p>
          <Link href="/heritage">
            <a className="inline-block bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground py-3 px-8 rounded font-adventure uppercase tracking-wider transition-all duration-300">
              Our Story
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
