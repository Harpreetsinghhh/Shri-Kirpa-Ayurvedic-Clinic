import { motion } from 'framer-motion';
import { Stethoscope, Droplets, Activity, Sparkles, Coffee, Brain, Scale, Heart } from 'lucide-react';

const treatments = [
  { icon: Stethoscope, title: 'General Consultation', desc: 'Comprehensive Nadi Pariksha and personalized health assessment.' },
  { icon: Droplets, title: 'Panchakarma Therapy', desc: 'Deep detoxification and rejuvenation of the body\'s vital systems.' },
  { icon: Activity, title: 'Joint Pain Treatment', desc: 'Natural relief for arthritis, spondylosis, and musculoskeletal disorders.' },
  { icon: Sparkles, title: 'Skin Disorders', desc: 'Holistic remedies for psoriasis, eczema, acne, and glowing skin.' },
  { icon: Coffee, title: 'Digestive Problems', desc: 'Restoring gut health, managing acidity, IBS, and metabolism issues.' },
  { icon: Brain, title: 'Stress Management', desc: 'Calming therapies like Shirodhara for anxiety, insomnia, and mental clarity.' },
  { icon: Scale, title: 'Weight Management', desc: 'Sustainable, natural approaches to healthy weight loss and maintenance.' },
  { icon: Heart, title: 'Lifestyle Disorders', desc: 'Managing diabetes, hypertension, and thyroid issues naturally.' },
];

export function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="services" className="py-24 lg:py-32 bg-card relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium tracking-widest uppercase text-primary mb-4 block"
          >
            Our Treatments
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-serif text-foreground mb-6"
          >
            Specialized Ayurvedic Care
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            We offer authentic therapies tailored to your unique dosha profile, aiming to restore balance and vitality.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {treatments.map((treatment, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group bg-background rounded-2xl p-8 border border-border hover:border-primary/30 transition-colors duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
                  <treatment.icon size={28} className="text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                </div>
                
                <h3 className="text-xl font-serif text-foreground font-medium mb-3">
                  {treatment.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {treatment.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Decorative SVG Blob */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-1/2 z-0 opacity-50 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-background">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}