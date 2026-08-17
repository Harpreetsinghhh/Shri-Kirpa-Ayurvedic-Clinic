import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required').optional().or(z.literal('')),
  treatment: z.string().min(1, 'Please select a treatment'),
  date: z.string().min(1, 'Please select a preferred date'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const treatments = [
  'General Consultation',
  'Panchakarma Therapy',
  'Joint Pain Treatment',
  'Skin Disorders',
  'Digestive Problems',
  'Stress Management',
  'Weight Management',
  'Lifestyle Disorders'
];

export function BookAppointment() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
    setIsSuccess(true);
    reset();
    
    // Reset success state after a few seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <section id="book" className="py-24 lg:py-32 bg-card relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto bg-background rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side - Info */}
          <div className="bg-primary text-primary-foreground p-6 sm:p-8 md:p-10 md:w-2/5 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-serif mb-4">Book Your Visit</h3>
              <p className="text-primary-foreground/80 mb-8">
                Take the first step towards holistic healing. Schedule a consultation with our Ayurvedic experts.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="mt-1 text-accent" size={20} />
                  <div>
                    <h5 className="font-medium text-lg">Opening Hours</h5>
                    <p className="text-sm text-primary-foreground/70 mt-1">Mon–Sat: 10:00 AM – 2:00 PM</p>
                    <p className="text-sm text-primary-foreground/70">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-6 sm:p-8 md:p-10 md:w-3/5 relative">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 bg-background z-10"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="text-primary w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-serif text-foreground mb-2">Request Received</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. Our team will contact you shortly to confirm your appointment time.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-primary font-medium hover:underline"
                  >
                    Book another appointment
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <User size={14} className="text-muted-foreground"/> Full Name
                      </label>
                      <input 
                        {...register('name')}
                        className="w-full bg-card border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        placeholder="John Doe"
                      />
                      {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Phone size={14} className="text-muted-foreground"/> Phone Number
                      </label>
                      <input 
                        {...register('phone')}
                        className="w-full bg-card border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        placeholder="+91 XXXXX XXXXX"
                      />
                      {errors.phone && <span className="text-xs text-destructive">{errors.phone.message}</span>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail size={14} className="text-muted-foreground"/> Email (Optional)
                    </label>
                    <input 
                      {...register('email')}
                      type="email"
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="john@example.com"
                    />
                    {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">Treatment Type</label>
                      <select 
                        {...register('treatment')}
                        className="w-full bg-card border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
                      >
                        <option value="">Select Treatment</option>
                        {treatments.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      {errors.treatment && <span className="text-xs text-destructive">{errors.treatment.message}</span>}
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Calendar size={14} className="text-muted-foreground"/> Preferred Date
                      </label>
                      <input 
                        type="date"
                        {...register('date')}
                        className="w-full bg-card border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      />
                      {errors.date && <span className="text-xs text-destructive">{errors.date.message}</span>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MessageSquare size={14} className="text-muted-foreground"/> Additional Message
                    </label>
                    <textarea 
                      {...register('message')}
                      rows={3}
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                      placeholder="Briefly describe your symptoms or concerns..."
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm Appointment'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}