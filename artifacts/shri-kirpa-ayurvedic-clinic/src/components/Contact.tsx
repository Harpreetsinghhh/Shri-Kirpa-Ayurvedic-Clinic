import { MapPin, Phone, MessageCircle, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif text-foreground mb-6">Visit Us</h2>
          <p className="text-muted-foreground text-lg">
            Our clinic is a peaceful sanctuary located in the heart of Jalandhar. We look forward to welcoming you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-3xl border border-border shadow-sm"
            >
              <h3 className="font-serif text-2xl mb-6">Contact Info</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Address</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      4FMM+768, near Dominick Pizza,<br/>
                      inside Bhalla Enclave Jalandhar,<br/>
                      Bypass Rd, Nakodar, Punjab 144040
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Phone</h4>
                    <a href="tel:+919877892649" className="text-muted-foreground text-sm hover:text-primary transition-colors block">
                      +91 9877892649
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <a 
                  href="tel:+919877892649"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  <Phone size={18} /> Call Now
                </a>
                <a 
                  href="https://wa.me/919877892649"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-medium hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle size={18} /> WhatsApp
                </a>
                <a 
                  href="https://maps.google.com/?q=4FMM%2B768%2C%20near%20Dominick%20Pizza%2C%20inside%20Bhalla%20Enclave%20Jalandhar%2C%20Bypass%20Rd%2C%20Nakodar%2C%20Punjab%20144040"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-card border border-border text-foreground py-3 rounded-xl font-medium hover:bg-accent/10 transition-colors"
                >
                  <Navigation size={18} /> Get Directions
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8 h-[320px] sm:h-[420px] lg:h-[500px] bg-card rounded-3xl overflow-hidden border border-border shadow-sm"
          >
            <iframe 
              src="https://www.google.com/maps?q=4FMM%2B768%2C%20near%20Dominick%20Pizza%2C%20inside%20Bhalla%20Enclave%20Jalandhar%2C%20Bypass%20Rd%2C%20Nakodar%2C%20Punjab%20144040&z=16&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  );
}