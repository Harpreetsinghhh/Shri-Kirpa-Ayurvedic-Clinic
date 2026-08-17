import { Leaf, Instagram, Facebook, Youtube } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-foreground text-background py-16 lg:py-20 border-t-8 border-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="text-primary" size={28} />
              <span className="font-serif text-2xl font-medium tracking-wide">
                Dutta<span className="text-primary">.</span>
              </span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              An internationally-caliber wellness brand treating Ayurveda as a refined, modern discipline. Healing naturally, living better.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors text-background">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors text-background">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors text-background">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 border-b border-background/20 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Treatments', 'Testimonials', 'Gallery', 'Contact'].map((link) => (
                <li key={link}>
                  <button 
                    onClick={() => scrollTo(`#${link.toLowerCase() === 'home' ? 'home' : link.toLowerCase()}`)}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 border-b border-background/20 pb-2 inline-block">Contact Info</h4>
            <ul className="space-y-4 text-sm text-background/70">
              <li>4FMM+768, near dominick Pizza,<br/>inside Bhalla Enclave Jalandhar,<br/>Bypass Rd, Nakodar, Punjab 144040</li>
              <li><a href="tel:+919877892649" className="hover:text-primary transition-colors">+91 9877892649</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 border-b border-background/20 pb-2 inline-block">Working Hours</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex justify-between"><span>Monday</span> <span>10:00 AM – 2:00 PM</span></li>
              <li className="flex justify-between"><span>Tuesday</span> <span>10:00 AM – 2:00 PM</span></li>
              <li className="flex justify-between"><span>Wednesday</span> <span>10:00 AM – 2:00 PM</span></li>
              <li className="flex justify-between"><span>Thursday</span> <span>10:00 AM – 2:00 PM</span></li>
              <li className="flex justify-between"><span>Friday</span> <span>10:00 AM – 2:00 PM</span></li>
              <li className="flex justify-between"><span>Saturday</span> <span>10:00 AM – 2:00 PM</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span className="text-red-400">Closed</span></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/50 text-center md:text-left">
          <p>&copy; {currentYear} Shri Kirpa Ayurvedic Clinic. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}