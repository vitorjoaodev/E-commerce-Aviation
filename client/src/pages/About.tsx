import { Helmet } from "react-helmet";
import { Plane, Compass, Shield, Clock } from "lucide-react";

export default function About() {
  return (
    <>
      <Helmet>
        <title>Our Story - Aviator Store</title>
        <meta name="description" content="Learn about the rich aviation heritage behind Aviator Store and our commitment to adventure-inspired clothing with historical significance." />
      </Helmet>
      
      {/* Hero section with historical background */}
      <section className="relative h-[500px] md:h-[600px]">
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 opacity-60 bg-gradient-to-r from-black via-transparent to-black"></div>
          <img 
            className="w-full h-full object-cover" 
            src="https://d63oxfkn1m8sf.cloudfront.net/7617/1653/8046/A_Airfix_Aerodrome_marks_the_debut_Old_Warden_airfield_appearence_of_the_worlds_only_airworthy_Hawker_Fury_fighter_at_this_years_Shuttleworth_Best_of_British_Airshow.jpg" 
            alt="Old Warden airfield with vintage aircraft" 
          />
        </div>

        <div className="relative h-full flex items-center px-4 md:px-10">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl text-primary mb-4 font-adventure leading-tight">
              Our Aviation Heritage
            </h1>
            <p className="text-foreground text-lg md:text-xl mb-4">
              Inspired by the golden age of flight and the pioneering spirit of early aviators.
            </p>
            <div className="adventure-divider w-40 my-4"></div>
          </div>
        </div>
      </section>

      {/* Our story section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-adventure text-primary mb-6 text-center">
              The Aviator Store Story
            </h2>
            <div className="adventure-divider w-40 mx-auto my-6"></div>
            
            <div className="prose prose-lg prose-invert mx-auto">
              <p className="text-foreground">
                The Aviator Store was born from a passion for aviation history and the spirit of adventure. 
                Our founders, themselves pilots and historians, were captivated by the golden age of flight – 
                an era when brave men and women took to the skies in leather jackets and goggles, charting new 
                territories and pushing the boundaries of human achievement.
              </p>
              
              <p className="text-foreground">
                In 2015, what began as a small collection of authentic flight jackets has evolved into a 
                comprehensive line of aviation-inspired clothing and accessories. Each piece in our collection 
                tells a story, drawing design elements from historical aircraft, navigation tools, and the 
                functional gear of pioneering aviators.
              </p>

              <p className="text-foreground">
                Our design philosophy blends historical accuracy with contemporary comfort and style. We meticulously 
                research aviation archives, visit museums, and collaborate with historians to ensure that every detail 
                – from stitching patterns to hardware – honors the legacy of flight while meeting modern standards 
                of quality and sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-adventure text-primary mb-6 text-center">
            Our Core Values
          </h2>
          <div className="adventure-divider w-40 mx-auto my-6"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-adventure text-primary mb-2">Adventure</h3>
              <p className="text-muted-foreground">
                We create clothing for those who seek new horizons and embrace the spirit of exploration.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-adventure text-primary mb-2">Heritage</h3>
              <p className="text-muted-foreground">
                We honor aviation history through authentic designs with historical significance and accuracy.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-adventure text-primary mb-2">Quality</h3>
              <p className="text-muted-foreground">
                We use premium materials and craftsmanship to create clothing that lasts, just like the legends who inspire us.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-adventure text-primary mb-2">Timelessness</h3>
              <p className="text-muted-foreground">
                We design beyond trends, creating pieces that become more meaningful with every wear and adventure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join the adventure CTA */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-adventure text-primary mb-6">
            Join Our Journey
          </h2>
          <p className="text-foreground text-lg max-w-2xl mx-auto mb-8">
            Every Aviator Store piece is more than clothing – it's an invitation to carry the spirit of aviation
            pioneers into your everyday adventures. From city streets to mountain peaks, our collection is designed
            for those who see the world as a map waiting to be explored.
          </p>
          <a 
            href="/products" 
            className="inline-block bg-primary hover:bg-opacity-90 text-primary-foreground py-3 px-8 rounded font-adventure uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Explore Our Collection
          </a>
        </div>
      </section>
    </>
  );
}