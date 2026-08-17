import { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Priya Sharma",
    condition: "Joint Pain",
    text: "After struggling with severe arthritis for years, the Panchakarma therapy here was life-changing. The doctors are incredibly patient and the pain has reduced drastically.",
    avatar: "/avatar-1.jpg"
  },
  {
    name: "Rajesh Kumar",
    condition: "Stress & Insomnia",
    text: "The Shirodhara treatments helped me manage my work stress and sleep better. It's a true sanctuary of peace. Highly recommend Shri Kirpa Ayurvedic Clinic.",
    avatar: "/avatar-2.jpg"
  },
  {
    name: "Anita Desai",
    condition: "Skin Disorder",
    text: "I had chronic eczema that no ointment could fix. The natural herbs and dietary changes prescribed here cleared my skin from within in just a few months.",
    avatar: "/avatar-3.jpg"
  },
  {
    name: "Vikram Singh",
    condition: "Digestive Issues",
    text: "Years of acidity and IBS sorted out through authentic Ayurvedic care. Their approach to healing is very systematic and deeply effective.",
    avatar: "/avatar-4.jpg"
  }
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', dragFree: true });

  useEffect(() => {
    if (!emblaApi) return;
    
    // Auto-scroll logic
    const autoplayId = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      }
    }, 4000);
    
    return () => clearInterval(autoplayId);
  }, [emblaApi]);

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-card relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 text-center mb-16 relative z-10">
        <h2 className="text-4xl lg:text-5xl font-serif text-foreground mb-6">Patient Stories</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Don't just take our word for it. Read what our patients have to say about their healing journeys.
        </p>
      </div>

      <div className="relative w-full max-w-[100vw] mx-auto overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y" style={{ backfaceVisibility: 'hidden' }}>
          {testimonials.map((t, idx) => (
            <div key={idx} className="flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_35%] pl-6">
              <div className="bg-background border border-border p-8 rounded-3xl h-full shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground/80 italic text-lg mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" />
                  <div>
                    <h4 className="font-serif font-medium text-foreground text-lg">{t.name}</h4>
                    <p className="text-sm text-primary">{t.condition}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}