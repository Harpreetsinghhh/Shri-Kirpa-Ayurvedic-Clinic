import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const reasons = [
  { title: 'Experienced Ayurvedic Care', desc: 'Led by seasoned practitioners with deep knowledge of ancient texts and modern science.' },
  { title: 'Personalized Treatments', desc: 'No generic remedies. Every treatment plan is uniquely crafted for your specific body type (Dosha).' },
  { title: '100% Natural Medicines', desc: 'We source premium, authentic herbs to prepare potent formulations without harmful chemicals.' },
  { title: 'Holistic Healing Approach', desc: 'We treat the whole person — body, mind, and spirit — not just the isolated symptoms.' },
  { title: 'Affordable Consultation', desc: 'Premium healthcare should be accessible. We offer transparent and reasonable pricing.' },
  { title: 'Trusted by Hundreds', desc: 'A proven track record of successful treatments and countless happy, healthier patients.' },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 lg:py-32 bg-background text-foreground">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-5xl font-serif mb-6 leading-tight">
                Why Choose <br/>
                <span className="italic text-primary">Shri Kirpa Ayurvedic?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                We bridge the gap between traditional Ayurvedic wisdom and clinical excellence, providing a sanctuary where true healing begins.
              </p>
            </motion.div>

            <div className="space-y-8">
              {reasons.map((reason, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex gap-4 group"
                >
                  <div className="mt-1">
                    <CheckCircle2 size={24} className="text-accent group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium font-serif mb-2">{reason.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{reason.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src="/gallery-4.jpg" 
              alt="Ayurvedic Herbs Preparation" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <p className="text-white/90 text-xl font-serif italic mb-4">
                "Healing is a matter of time, but it is sometimes also a matter of opportunity."
              </p>
              <p className="text-white/70 text-sm font-mono tracking-widest uppercase">— Hippocrates</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}