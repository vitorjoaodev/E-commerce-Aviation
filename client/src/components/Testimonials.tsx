import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatarUrl: string;
  rating: number;
  text: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Michael Thompson",
      role: "Pilot & Adventurer",
      avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      rating: 5,
      text: "\"The Explorer Jacket has become my go-to for every flight. The attention to historical detail combined with modern functionality is unmatched. It's stood up to challenging conditions from Alaska to Patagonia.\""
    },
    {
      id: 2,
      name: "Sarah Reynolds",
      role: "Travel Photographer",
      avatarUrl: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      rating: 5,
      text: "\"As a photographer always on the move, the Navigator Button-Down is perfect. The pockets are thoughtfully placed for my equipment, and the vintage aesthetic always draws compliments while I'm shooting on location.\""
    },
    {
      id: 3,
      name: "David Chen",
      role: "Aviation Historian",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      rating: 5,
      text: "\"The historical accuracy in their collection is impressive. From the stitching patterns to the hardware choices, AviatorX respects aviation heritage while creating practical modern clothing. I wear my Vintage Pilot Cap to every aviation event.\""
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-adventure text-primary mb-4">
            Adventure Stories
          </h2>
          <div className="adventure-divider mx-auto w-40 my-4"></div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Hear from fellow adventurers who've taken our gear to the skies and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img 
                    className="h-12 w-12 rounded-full object-cover" 
                    src={testimonial.avatarUrl} 
                    alt={`${testimonial.name} profile`} 
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-foreground font-semibold">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-5 w-5" 
                      fill={i < testimonial.rating ? "currentColor" : "none"} 
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-foreground">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
