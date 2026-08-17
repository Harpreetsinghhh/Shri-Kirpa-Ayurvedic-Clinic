import { useState, useEffect } from 'react';
import Lenis from 'lenis';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Statistics } from '@/components/Statistics';
import { Testimonials } from '@/components/Testimonials';
import { Gallery } from '@/components/Gallery';
import { BookAppointment } from '@/components/BookAppointment';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // If loading screen is active, block scroll
    if (isLoading) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <div className={`min-h-screen flex flex-col bg-background font-sans transition-opacity duration-1000 overflow-x-hidden ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <Services />
          <WhyChooseUs />
          <Statistics />
          <Testimonials />
          <Gallery />
          <BookAppointment />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}