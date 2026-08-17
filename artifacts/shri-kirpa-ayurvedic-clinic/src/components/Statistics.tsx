import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 1000, suffix: '+', label: 'Happy Patients' },
  { value: 93, suffix: '+', label: 'Google Reviews' },
  { value: 4.8, suffix: '★', label: 'Average Rating', decimals: 1 },
];

export function Statistics() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden" ref={ref}>
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-8 divide-x-0 md:divide-x divide-primary-foreground/20">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col items-center justify-center text-center px-4"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-2 text-accent">
                {inView ? (
                  <CountUp 
                    start={0} 
                    end={stat.value} 
                    duration={2.5} 
                    decimals={stat.decimals || 0}
                    separator=","
                  />
                ) : '0'}
                {stat.suffix}
              </div>
              <p className="text-sm md:text-base font-medium uppercase tracking-wider text-primary-foreground/80">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}