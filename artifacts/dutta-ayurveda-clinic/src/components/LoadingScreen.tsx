import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf } from 'lucide-react';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      >
        <div className="flex flex-col items-center max-w-sm w-full px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8 text-primary"
          >
            <Leaf size={48} strokeWidth={1.5} className="animate-pulse" />
          </motion.div>
          
          <h1 className="text-2xl md:text-3xl font-serif text-primary mb-8 text-center">
            Dutta Ayurveda Clinic
          </h1>

          <div className="w-full h-[1px] bg-primary/20 overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.2 }}
            />
          </div>
          
          <div className="mt-4 flex justify-between w-full text-sm font-mono text-muted-foreground tracking-widest uppercase">
            <span>Loading</span>
            <span>{Math.min(100, progress)}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}