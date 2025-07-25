'use client';

import { useState } from 'react';
import { ReactElement } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactItem {
  icon: ReactElement;
  title: string;
  value: string;
  link: string | null;
}

interface SocialLink {
  name: string;
  icon: ReactElement;
  url: string;
}
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import GlowButton from '../ui/GlowButton';
import { Mail, Github, Linkedin, Twitter, Send, MapPin, Phone } from 'lucide-react';

// Social media links
const socialLinks = [
  { name: 'GitHub', icon: <Github size={20} />, url: 'https://github.com' },
  { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://linkedin.com' },
  { name: 'Twitter', icon: <Twitter size={20} />, url: 'https://twitter.com' },
];

// Contact info items
const contactInfo: ContactItem[] = [
  { 
    icon: <Mail className="text-accent-primary" size={24} />, 
    title: 'Email', 
    value: 'patrasahil013@gmail.com',
    link: 'mailto:patrasahil013@gmail.com'
  },
  { 
    icon: <MapPin className="text-accent-secondary" size={24} />, 
    title: 'Location', 
    value: 'Remote, Worldwide',
    link: null
  },
  { 
    icon: <Phone className="text-accent-tertiary" size={24} />, 
    title: 'Phone', 
    value: '+91 8287486474',
    link: 'tel:+918287486474'
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const sendToWhatsApp = (data: FormData) => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER 
      || '918287486474'; // Fallback number
    
    if (!whatsappNumber.match(/^\d{10,15}$/)) {
      throw new Error('Invalid WhatsApp number configuration');
    }

    const message = `
*New Contact Form Submission*
------------------------
*Name:* ${data.name}
*Email:* ${data.email}
*Subject:* ${data.subject}
*Message:* ${data.message}
    `.trim();

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const whatsappUrl = sendToWhatsApp(formData);
      const newWindow = window.open(whatsappUrl, '_blank');
      
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        throw new Error('Popup blocked - Please allow popups for this site');
      }

      // Clear form and show success message
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
  // @ts-ignore
  } catch (error) {
    console.error('Error sending message:', error);
    // @ts-ignore
    const errorMessage = error?.message || 'Failed to send message';
    alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-accent-primary">Touch</span>
          </h2>
          <div className="h-1 w-20 bg-accent-secondary mx-auto rounded-full mb-6"></div>
          <p className="max-w-2xl mx-auto text-foreground/80">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-xl font-bold mb-6 text-accent-highlight">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-foreground/80">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-space-dark/50 border border-white/10 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-foreground/80">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-space-dark/50 border border-white/10 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1 text-foreground/80">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-space-dark/50 border border-white/10 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1 text-foreground/80">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg bg-space-dark/50 border border-white/10 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-colors resize-none"
                  />
                </div>
                
                <div className="pt-2">
                  <GlowButton 
                    variant="primary" 
                    className="w-full justify-center"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-space-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send size={18} className="mr-2" />
                        Send Message
                      </span>
                    )}
                  </GlowButton>
                  
                  {submitSuccess && (
                    <motion.p 
                      className="mt-4 text-center text-accent-highlight"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      Message sent successfully! ✨
                    </motion.p>
                  )}
                </div>
              </form>
            </GlassCard>
          </motion.div>
          
          {/* Contact info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            {/* Contact details */}
            <GlassCard className="p-8" glowColor="var(--accent-tertiary)" glowIntensity="low">
              <h3 className="text-xl font-bold mb-6 text-accent-highlight">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={item.title}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="p-3 rounded-full bg-space-dark/70 border border-white/10">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-foreground/80 text-sm">{item.title}</h4>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          className="text-foreground hover:text-accent-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
            
            {/* Social links */}
            <GlassCard className="p-8" glowColor="var(--accent-highlight)" glowIntensity="low">
              <h3 className="text-xl font-bold mb-6 text-accent-highlight">Follow Me</h3>
              
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-space-dark/70 border border-white/10 hover:border-accent-primary hover:text-accent-primary transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                  >
                    {social.icon}
                    <span>{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-1/4 -left-20 w-40 h-40 bg-accent-highlight/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-20 w-60 h-60 bg-accent-primary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />
    </section>
  );
}