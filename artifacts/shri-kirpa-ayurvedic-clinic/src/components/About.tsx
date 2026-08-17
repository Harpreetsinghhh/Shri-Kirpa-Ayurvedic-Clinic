import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-20 sm:py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden">
              <img 
                src="/about-image.jpg" 
                alt="Clinic Interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
            
            {/* Experience Badge */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
              className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 lg:bottom-12 lg:-right-12 bg-primary text-primary-foreground p-5 sm:p-8 rounded-full w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 flex flex-col items-center justify-center text-center shadow-xl border-4 border-background"
            >
              <span className="text-4xl font-serif font-bold mb-1">15+</span>
              <span className="text-xs uppercase tracking-wider opacity-90 font-medium">Years of<br/>Experience</span>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Leaf className="text-accent" size={20} />
                <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">About Our Clinic</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground leading-[1.2] mb-6 sm:mb-8">
                A Legacy of <br/><span className="text-primary italic">Holistic Natural Healing</span>
              </h2>
              
              <div className="space-y-6 text-foreground/80 leading-relaxed text-base sm:text-lg">
                <p>
                  At Shri Kirpa Ayurvedic Clinic, we believe that true health is not merely the absence of disease, but a state of absolute physical, mental, and spiritual well-being.
                </p>
                <p>
                  For over 15 years, we have been dedicated to treating the root cause of ailments rather than just the symptoms. Our approach combines ancient Ayurvedic wisdom with a refined, modern clinical practice to provide personalized healing protocols.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="border-l-2 border-primary/30 pl-6">
                  <h4 className="font-serif text-xl text-foreground mb-2">Our Mission</h4>
                  <p className="text-sm text-muted-foreground">To bring authentic Ayurvedic healing to the modern world through personalized, natural, and effective treatments.</p>
                </div>
                <div className="border-l-2 border-accent/30 pl-6">
                  <h4 className="font-serif text-xl text-foreground mb-2">Our Vision</h4>
                  <p className="text-sm text-muted-foreground">To be the most trusted sanctuary for holistic wellness, fostering a healthier society through natural living.</p>
                </div>
              </div>
              
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}