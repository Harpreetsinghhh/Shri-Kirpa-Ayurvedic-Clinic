import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const images = [
  { src: '/gallery-1.jpg', alt: 'Shirodhara treatment', desktopClass: 'md:col-span-1 md:row-span-2' },
  { src: '/gallery-2.jpg', alt: 'Ayurvedic herbs', desktopClass: 'md:col-span-2 md:row-span-1' },
  { src: '/about-image.jpg', alt: 'Clinic Interior', desktopClass: 'md:col-span-1 md:row-span-1' },
  { src: '/gallery-3.jpg', alt: 'Consultation room', desktopClass: 'md:col-span-1 md:row-span-1' },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close on Escape, and lock body scroll while the lightbox is open
  useEffect(() => {
    if (!selectedImage) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };

    document.addEventListener('keydown', onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedImage]);

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl lg:text-5xl font-serif text-foreground mb-6">Our Sanctuary</h2>
            <p className="text-muted-foreground text-lg">
              Take a glimpse into our serene clinic environment, designed to promote calm and facilitate natural healing.
            </p>
          </div>
        </div>

        {/*
          Mobile: simple single-column stack, auto height, each image gets a fixed
          aspect ratio so the page doesn't jump as images load.
          Desktop (md+): true 3-col x 2-row bento grid. The four spans below add up
          to exactly 6 cells (2 + 2 + 1 + 1), so nothing overflows into a 3rd row.
        */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 md:h-[800px]">
          {images.map((img, idx) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer aspect-[4/3] md:aspect-auto ${img.desktopClass}`}
              onClick={() => setSelectedImage(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              aria-label="Close image"
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Enlarged gallery image"
              className="max-w-full max-h-[90vh] rounded-lg object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}