"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Play, MapPin, Diamond, Activity, Hourglass, X, Utensils, Coffee, Waves, Sparkles, Dumbbell, Flower, User, Droplets, Thermometer, Wind, Armchair } from 'lucide-react';

/* ----------------------------------------------------------------------
   DESIGN SYSTEM & ASSETS
   ---------------------------------------------------------------------- */
const COLORS = {
  ochre: '#BC9E73', // Ocre Sable Doré (remplace le noir)
  darkBrown: '#2C241B', // Texte foncé pour contraste sur ocre
  gold: '#D4AF37',
  sand: '#F5F2EB',
  white: '#FFFFFF'
};

const VILLAS = [
  {
    id: 1,
    name: "ATLAS",
    tagline: "The Mountain Sanctum",
    price: "From €2.5M",
    image: "/images/villas/atlas-exterior.png",
    interiorImage: "/images/villas/atlas-interior.png",
    specs: "500m² • 5 Suites"
  },
  {
    id: 2,
    name: "MAJORELLE",
    tagline: "Botanical Poetry",
    price: "From €2.1M",
    image: "/images/villas/majorelle-exterior.png",
    interiorImage: "/images/villas/majorelle-interior.png",
    specs: "450m² • 4 Suites"
  },
  {
    id: 3,
    name: "MENARA",
    tagline: "Water & Reflection",
    price: "From €1.8M",
    image: "/images/villas/menara-exterior.jpg",
    interiorImage: "/images/villas/menara-interior.png",
    specs: "400m² • 4 Suites"
  },
  {
    id: 4,
    name: "AGAFAY",
    tagline: "Earthborn Architecture",
    price: "From €1.5M",
    image: "/images/villas/agafay-exterior.jpg",
    interiorImage: "/images/villas/agafay-interior.png",
    specs: "320m² • 3 Suites"
  }
];

const EXPERIENCES = [
  {
    id: 'gastronomy',
    title: 'Gastronomy',
    subtitle: 'From Michelin stars to farm-fresh grills',
    icon: <Utensils size={24} />,
    image: '/images/gastronomy.jpg',
    hoverList: ['The Signature Restaurant', 'The Garden Table', 'Private Chef Service'],
    cta: 'Explore Dining',
    action: 'modal' as const,
    modalContent: {
      headline: 'Two Culinary Journeys',
      description: 'At Ksar Nujum, dining is an exploration of terroir. Our Michelin-starred chef reinterprets Moroccan classics with avant-garde techniques, while our organic garden provides the soul for our farm-to-table grills.',
      features: [
        { title: 'The Signature', desc: 'Fine dining tasting menus paired with rare vintages.' },
        { title: 'The Garden Table', desc: 'Al fresco grilling in the heart of our organic potager.' },
        { title: 'In-Villa Dining', desc: 'A private chef and sommelier, exclusively for you.' }
      ],
      detailImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop'
    }
  },
  {
    id: 'longevity-exp',
    title: 'Longevity Clinic',
    subtitle: 'Science meets serenity',
    icon: <Sparkles size={24} />,
    image: '/images/longevity-clinic.webp',
    hoverList: ['400m² Wellness Sanctuary', '3 Levels of Care', 'Bio-hacking Lab'],
    cta: 'Discover',
    action: 'scroll' as const,
    target: 'longevity',
    modalContent: null
  },
  {
    id: 'daily',
    title: 'Daily Rituals',
    subtitle: 'The social heart of Ksar Nujum',
    icon: <Coffee size={24} />,
    image: '/images/daily-rituals.jpg',
    hoverList: ['Specialty Coffee', 'Artisan Bakery', 'Co-working Lounge'],
    cta: 'View Menu',
    action: 'modal' as const,
    modalContent: {
      headline: 'The Morning Ritual',
      description: 'Start your day at The Nujum Café. Whether it\'s a single-origin pour-over or a warm sourdough loaf fresh from the oven, we believe in the luxury of simple things done perfectly.',
      features: [
        { title: 'The Roastery', desc: 'Beans sourced directly from sustainable farms.' },
        { title: 'The Bakery', desc: 'French pastries with a Moroccan twist, baked hourly.' },
        { title: 'The Terrace', desc: 'Panoramic views of the Atlas for your morning read.' }
      ],
      detailImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2000&auto=format&fit=crop'
    }
  },
  {
    id: 'resort',
    title: 'Resort Living',
    subtitle: '365-day hotel service included',
    icon: <Waves size={24} />,
    image: '/images/resort-living.jpg',
    hoverList: ['24/7 Concierge', 'Housekeeping', 'Pool & Gardens'],
    cta: 'View Services',
    action: 'modal' as const,
    modalContent: {
      headline: 'Effortless Ownership',
      description: 'Live like a guest in your own home. Our dedicated team handles every detail, from stocking your fridge before arrival to managing rental yields when you are away.',
      features: [
        { title: 'Concierge', desc: 'Flights, excursions, and reservations managed 24/7.' },
        { title: 'Housekeeping', desc: 'Daily or weekly service tailored to your preference.' },
        { title: 'Maintenance', desc: 'Pool, garden, and technical support included.' }
      ],
      detailImage: 'https://images.unsplash.com/photo-1571896349842-6e53ce41e887?q=80&w=2000&auto=format&fit=crop'
    }
  }
];

/* ----------------------------------------------------------------------
   HOOKS & UTILS
   ---------------------------------------------------------------------- */
const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrollY;
};

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);
  return mousePosition;
};

// Animation Hook: Fade In on Scroll
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ----------------------------------------------------------------------
   COMPONENTS
   ---------------------------------------------------------------------- */

// Custom Luxury Cursor
const Cursor = () => {
  const { x, y } = useMousePosition();
  return (
    <>
      <div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#2C241B] pointer-events-none z-[9999] transition-transform duration-100 ease-out hidden md:block"
        style={{ transform: `translate(${x - 16}px, ${y - 16}px)` }}
      />
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-[#2C241B] rounded-full pointer-events-none z-[9999] transition-transform duration-75 ease-out hidden md:block"
        style={{ transform: `translate(${x - 4}px, ${y - 4}px)` }}
      />
    </>
  );
};

const MagneticButton = ({ children, className = "", variant = "dark", onClick }: { children: React.ReactNode; className?: string; variant?: "dark" | "light" | "outline"; onClick?: () => void }) => {
  const styles = {
    dark: {
      border: "border-[#D4AF37]/30",
      textHover: "group-hover:text-black",
      bgFill: "bg-[#D4AF37]",
      textBase: "text-[#2C241B]"
    },
    light: {
      border: "border-[#2C241B]/30",
      textHover: "group-hover:text-[#F5F2EB]",
      bgFill: "bg-[#2C241B]",
      textBase: "text-[#2C241B]"
    },
    outline: {
      border: "border-white/30",
      textHover: "group-hover:text-black",
      bgFill: "bg-white",
      textBase: "text-white"
    }
  };

  const currentStyle = styles[variant] || styles.dark;

  return (
    <button onClick={onClick} className={`group relative px-8 py-4 overflow-hidden rounded-full border transition-all hover:border-transparent ${currentStyle.border} ${className}`}>
      <span className={`relative z-10 font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-500 ${currentStyle.textBase} ${currentStyle.textHover}`}>
        {children}
      </span>
      <div className={`absolute inset-0 ${currentStyle.bgFill} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out`} />
    </button>
  );
};

type ExperienceItem = typeof EXPERIENCES[number];

const ExperienceModal = ({ item, onClose }: { item: ExperienceItem | null; onClose: () => void }) => {
  if (!item || !item.modalContent) return null;
  const { modalContent } = item;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#2C241B]/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#F5F2EB] w-full max-w-6xl h-[85vh] md:h-[80vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-[fadeIn_0.5s_ease-out]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/20 hover:bg-[#2C241B] hover:text-white transition-colors duration-300"
        >
          <X size={24} />
        </button>

        {/* Left: Image */}
        <div className="w-full md:w-1/2 h-48 md:h-full relative">
          <img
            src={modalContent.detailImage}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F5F2EB]/10 md:to-transparent"></div>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto flex flex-col justify-center">
          <div className="mb-2 flex items-center gap-2 text-[#BC9E73] font-bold tracking-widest text-xs uppercase">
            {item.icon}
            <span>{item.title}</span>
          </div>
          <h3 className="font-serif text-4xl md:text-5xl text-[#2C241B] mb-6 leading-tight">
            {modalContent.headline}
          </h3>
          <p className="font-sans text-gray-600 font-light leading-relaxed mb-12">
            {modalContent.description}
          </p>

          <div className="space-y-8 mb-12">
            {modalContent.features.map((feature, i) => (
              <div key={i} className="border-l-2 border-[#BC9E73]/30 pl-6">
                <h4 className="font-serif text-xl text-[#2C241B] mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-500 font-light">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div>
            <MagneticButton variant="light" className="w-full md:w-auto">Make a Reservation</MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------
   SECTIONS
   ---------------------------------------------------------------------- */

const Hero = () => {
  const scrollY = useScroll();
  
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#BC9E73] text-[#2C241B]">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-multiply"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <img 
          src="/images/hero.jpg" 
          alt="Ksar Nujum Landscape" 
          className="w-full h-[120%] object-cover object-center sepia-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#BC9E73]/20 via-transparent to-[#BC9E73]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-16">
        <nav className="flex justify-between items-start">
          <div className="font-serif text-2xl tracking-widest text-[#2C241B] font-bold">KSAR NUJUM</div>
          <div className="hidden md:flex gap-12 text-xs uppercase tracking-[0.2em] font-medium text-[#2C241B]">
            {['Vision', 'Residences', 'Longevity', 'Experience', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">{item}</a>
            ))}
          </div>
        </nav>

        <div className="flex flex-col md:flex-row items-end justify-between pb-12">
          <div className="max-w-4xl">
            <h1 className="font-serif text-6xl md:text-9xl leading-[0.9] mb-8 text-[#2C241B]">
              Legacy Meets <br/>
              <span className="italic text-white mix-blend-soft-light opacity-100">Longevity</span>
            </h1>
            <div className="flex items-center gap-4 text-sm font-medium tracking-wide max-w-md text-[#2C241B]">
              <span className="block w-12 h-[1px] bg-[#2C241B]" />
              <p>An organic architectural sanctuary in Marrakech. Where ultra-luxury living integrates with the science of eternal youth.</p>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="w-32 h-32 rounded-full border border-[#2C241B]/20 flex items-center justify-center backdrop-blur-sm animate-[spin_10s_linear_infinite] hover:bg-[#2C241B] hover:border-[#2C241B] hover:text-[#BC9E73] transition-all cursor-pointer group">
              <Play className="fill-current w-8 h-8 group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Vision = () => {
  return (
    <section id="vision" className="py-24 md:py-32 bg-[#F5F2EB] text-[#2C241B] px-6 md:px-16 overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-20">
        <FadeIn>
          <span className="text-[#BC9E73] text-xs font-bold tracking-[0.3em] uppercase mb-6 block">The Vision</span>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight">
            &ldquo;A sanctuary where time bends <br/> <span className="italic text-[#BC9E73]">to your rhythm&rdquo;</span>
          </h2>
        </FadeIn>
      </div>

      {/* Main Content: Image + Text */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
        <FadeIn delay={200}>
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl group h-[500px] cursor-pointer">
             {/* Base image */}
             <img 
               src="/images/courtyard-1.png" 
               alt="Ksar Nujum Courtyard" 
               className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-105" 
             />
             {/* Hover image with dissolve effect */}
             <img 
               src="/images/courtyard-2.png" 
               alt="Ksar Nujum Courtyard" 
               className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out group-hover:scale-105" 
             />
             <div className="absolute inset-0 bg-[#2C241B]/10 mix-blend-overlay pointer-events-none"></div>
          </div>
        </FadeIn>
        
        <FadeIn delay={400}>
          <div className="space-y-8 pl-0 md:pl-12 border-l border-[#BC9E73]/30">
            <h3 className="font-serif text-3xl md:text-4xl text-[#2C241B] leading-tight">
              Ksar Nujum — <br/><span className="italic text-[#BC9E73]">Palace of Stars</span>
            </h3>
            <p className="font-sans text-lg font-light leading-relaxed text-[#2C241B]/80">
              A modern ksar: a community of extraordinary homes united by longevity, beauty, and the art of living well. 
              Here, we redefine the very essence of luxury, moving away from opulence towards harmony.
            </p>
            <p className="font-sans text-lg font-light leading-relaxed text-[#2C241B]/80">
              Far from the noise, we return to the essential—earth, light, and silence.
            </p>
            <MagneticButton variant="light">Discover the Story</MagneticButton>
          </div>
        </FadeIn>
      </div>

      {/* Three Pillars Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-32">
        {[
          { icon: <Diamond size={32} strokeWidth={1} />, title: "Luxury", subtitle: "Craftsmanship in every detail", desc: "Materials sourced from the Atlas, shaped by master artisans into forms that breathe.", hoverImage: "/images/luxury-artisan.jpg" },
          { icon: <Activity size={32} strokeWidth={1} />, title: "Longevity", subtitle: "Wellness woven into daily life", desc: "A home designed to extend your healthspan with integrated bio-hacking amenities.", hoverImage: "/images/longevity-redlight.png" },
          { icon: <Hourglass size={32} strokeWidth={1} />, title: "Legacy", subtitle: "Homes for generations", desc: "A timeless architecture that grows more beautiful with age, preserving your story.", hoverImage: "/images/legacy-courtyard.png" }
        ].map((pillar, i) => (
          <FadeIn key={i} delay={i * 150}>
            <div className="group relative p-8 h-full min-h-[300px] border border-[#BC9E73]/20 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white">
              {/* Hover Background Effect */}
              {pillar.hoverImage ? (
                <>
                  <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <img src={pillar.hoverImage} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#2C241B]/60"></div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 bg-[#BC9E73] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              )}
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="text-[#BC9E73] group-hover:text-white transition-colors duration-500 mb-6">
                    {pillar.icon}
                  </div>
                  <h4 className="font-serif text-3xl mb-2 text-[#2C241B] group-hover:text-white transition-colors duration-500">{pillar.title}</h4>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#BC9E73] group-hover:text-white/80 transition-colors duration-500 block mb-4">
                    {pillar.subtitle}
                  </span>
                </div>
                <p className="text-sm font-light text-[#2C241B]/70 leading-relaxed group-hover:text-white/90 transition-colors duration-500 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  {pillar.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Stylized Map Section */}
      <FadeIn delay={600}>
        <div className="relative w-full rounded-[3rem] overflow-hidden bg-[#E6E0D4] shadow-inner group">
           {/* Map Background Image (Stylized) */}
           <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=2000" 
               alt="Marrakech Map" 
               className="w-full h-full object-cover opacity-20 mix-blend-multiply grayscale contrast-125 transition-transform duration-[20s] group-hover:scale-110"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#F5F2EB] via-transparent to-[#F5F2EB]/50"></div>
           </div>
           
           <div className="relative z-10 flex flex-col items-center justify-center py-24 px-6 text-center">
             <div className="bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full border border-[#BC9E73]/20 mb-8">
                <span className="text-[#BC9E73] text-xs font-bold tracking-[0.3em] uppercase">Marrakech • The Red City</span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 w-full max-w-5xl mt-8">
               {[
                 { time: "15 min", loc: "International Airport", sub: "Global Connectivity" },
                 { time: "20 min", loc: "The Medina", sub: "Cultural Heart" },
                 { time: "45 min", loc: "Atlas Mountains", sub: "Ski & Hiking" }
               ].map((item, idx) => (
                 <div key={idx} className="flex flex-col items-center group/marker">
                   <div className="relative mb-6">
                     <div className="w-4 h-4 bg-[#BC9E73] rounded-full animate-ping absolute inset-0 opacity-20"></div>
                     <div className="w-16 h-16 rounded-full border border-[#2C241B] bg-[#F5F2EB] flex items-center justify-center relative z-10 group-hover/marker:bg-[#2C241B] group-hover/marker:text-[#F5F2EB] transition-colors duration-300 shadow-lg">
                       <MapPin size={24} strokeWidth={1.5} />
                     </div>
                   </div>
                   <span className="font-serif text-4xl md:text-5xl text-[#2C241B] mb-2">{item.time}</span>
                   <span className="text-xs font-bold uppercase tracking-widest text-[#2C241B] mb-1">{item.loc}</span>
                   <span className="font-serif italic text-gray-500 text-sm">{item.sub}</span>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </FadeIn>
    </section>
  );
};

const Residences = () => {
  const [activeVilla, setActiveVilla] = useState(0);
  const [showInterior, setShowInterior] = useState(false);

  // Reset to exterior when changing villa
  const handleVillaChange = (index: number) => {
    setActiveVilla(index);
    setShowInterior(false);
  };

  return (
    <section id="residences" className="py-24 bg-[#BC9E73] text-[#2C241B] px-6 md:px-0 relative">
      <div className="md:px-16 mb-12 flex justify-between items-end">
        <h2 className="font-serif text-5xl md:text-7xl">The Estates</h2>
        <span className="text-white text-xs tracking-[0.2em] uppercase hidden md:block">Select your sanctuary</span>
      </div>

      <div className="flex flex-col md:flex-row h-[80vh]">
        {/* Interactive List */}
        <div className="md:w-5/12 flex flex-col justify-center border-t border-[#2C241B]/10">
          {VILLAS.map((villa, index) => (
            <div 
              key={villa.id}
              onMouseEnter={() => handleVillaChange(index)}
              className={`group flex items-center justify-between py-10 px-8 md:px-16 border-b border-[#2C241B]/10 cursor-pointer transition-all duration-500 ${activeVilla === index ? 'bg-[#2C241B]/5' : 'hover:bg-[#2C241B]/5'}`}
            >
              <div>
                <span className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${activeVilla === index ? 'text-white' : 'text-[#2C241B]/60'}`}>
                  0{index + 1}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl mt-2 transition-transform duration-500 group-hover:translate-x-4">
                  {villa.name}
                </h3>
              </div>
              <div className={`transition-opacity duration-500 ${activeVilla === index ? 'opacity-100' : 'opacity-0'}`}>
                <ArrowRight className="text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Visual Preview */}
        <div className="md:w-7/12 relative overflow-hidden bg-[#A88B60]">
          {VILLAS.map((villa, index) => (
            <div 
              key={villa.id}
              className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeVilla === index ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 pointer-events-none'}`}
            >
              {/* Exterior Image */}
              <img 
                src={villa.image} 
                alt={`${villa.name} Exterior`} 
                className={`absolute inset-0 w-full h-full object-cover mix-blend-multiply transition-opacity duration-700 ${showInterior ? 'opacity-0' : 'opacity-90'}`} 
              />
              {/* Interior Image */}
              <img 
                src={villa.interiorImage} 
                alt={`${villa.name} Interior`} 
                className={`absolute inset-0 w-full h-full object-cover mix-blend-multiply transition-opacity duration-700 ${showInterior ? 'opacity-90' : 'opacity-0'}`} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5D4037]/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-12 left-12 md:left-24 max-w-md text-[#F5F2EB]">
                <p className="text-white font-serif italic text-2xl mb-2">{villa.tagline}</p>
                <p className="text-white/80 font-light text-sm leading-relaxed mb-6">{villa.specs} — {villa.price}</p>
                <button 
                  onClick={() => setShowInterior(!showInterior)}
                  className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors"
                >
                  {showInterior ? 'View Exterior' : 'View Interiors'} <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const [activeModal, setActiveModal] = useState<ExperienceItem | null>(null);

  const openModal = (exp: ExperienceItem) => {
    if (exp.action === 'modal') {
      setActiveModal(exp);
    } else if (exp.action === 'scroll' && exp.target) {
      const element = document.getElementById(exp.target);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="experience" className="py-24 bg-[#F5F2EB] text-[#2C241B]">
      {activeModal && <ExperienceModal item={activeModal} onClose={() => setActiveModal(null)} />}
      
      <div className="container mx-auto px-6 md:px-16">
        <div className="text-center mb-16">
          <span className="text-[#BC9E73] text-xs font-bold tracking-[0.3em] uppercase block mb-6">The Experience</span>
          <h2 className="font-serif text-4xl md:text-6xl text-[#2C241B]">&ldquo;Live like a guest. <span className="italic text-[#BC9E73]">Every day.&rdquo;</span></h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 h-auto">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="group relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => openModal(exp)}
            >
              {/* Background Image */}
              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-110 group-hover:brightness-[0.4]"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>

              {/* Initial Content (Bottom) */}
              <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-8">
                <div className="flex items-center gap-3 text-[#D4AF37] mb-2">
                  {exp.icon}
                  <span className="text-xs font-bold uppercase tracking-widest">{exp.title}</span>
                </div>
                <h3 className="font-serif text-3xl text-white mb-2">{exp.subtitle}</h3>
                
                {/* Hover Reveal Content */}
                <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500 opacity-0 group-hover:opacity-100 pt-4 border-t border-white/20 mt-4">
                  <ul className="space-y-2 mb-6">
                    {exp.hoverList.map((item, idx) => (
                      <li key={idx} className="text-white/80 text-sm font-light flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#D4AF37]"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center text-[#D4AF37] text-xs uppercase tracking-[0.2em] group/btn">
                    {exp.cta}
                    <ArrowRight size={14} className="ml-2 transform group-hover/btn:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Border Glow Effect */}
              <div className="absolute inset-0 border-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none scale-95 group-hover:scale-100"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Longevity = () => {
  const [activeLevel, setActiveLevel] = useState('level-3');
  const [isInSection, setIsInSection] = useState(false);
  const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const longevitySectionRef = useRef<HTMLElement | null>(null);

  // Scroll Spy Logic + Section Detection
  useEffect(() => {
    const handleScroll = () => {
      const viewportMiddle = window.innerHeight / 2;
      
      // Check if we're inside the longevity section
      if (longevitySectionRef.current) {
        const rect = longevitySectionRef.current.getBoundingClientRect();
        setIsInSection(rect.top <= viewportMiddle && rect.bottom >= viewportMiddle);
      }
      
      // Update active level - find which subsection is closest to viewport middle
      let closestId = 'level-3';
      let closestDistance = Infinity;
      
      Object.entries(sectionRefs.current).forEach(([id, ref]) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const sectionMiddle = rect.top + rect.height / 2;
          const distance = Math.abs(sectionMiddle - viewportMiddle);
          
          // Check if viewport middle is within section bounds OR find closest
          if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
            closestId = id;
            closestDistance = 0;
          } else if (distance < closestDistance && closestDistance !== 0) {
            closestDistance = distance;
            closestId = id;
          }
        }
      });
      
      setActiveLevel(closestId);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="longevity" ref={longevitySectionRef} className="bg-[#F5F2EB] relative pb-32">
      {/* Sticky Sidebar Navigation (Desktop Only) - Only visible in Longevity section */}
      <div className="hidden md:block fixed left-8 top-1/2 transform -translate-y-1/2 z-30 transition-opacity duration-500"
           style={{ opacity: isInSection ? 1 : 0, pointerEvents: isInSection ? 'auto' : 'none' }}>
        <div className="flex flex-col space-y-6">
          {[
            { id: 'level-3', label: 'Level 3', sub: 'Panoramic Fitness' },
            { id: 'level-1-2', label: 'Levels 1-2', sub: 'Treatments' },
            { id: 'level-minus-1', label: 'Level -1', sub: 'Spa Sanctuary' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group flex items-center space-x-4 text-left focus:outline-none"
            >
              <div className={`w-3 h-3 rounded-full border border-[#2C241B] transition-all duration-300 ${activeLevel === item.id ? 'bg-[#BC9E73] scale-125 border-[#BC9E73]' : 'bg-transparent group-hover:border-[#BC9E73]'}`}></div>
              <div className={`transition-all duration-300 ${activeLevel === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                <span className="block text-[#2C241B] text-xs font-bold uppercase tracking-widest">{item.label}</span>
                <span className="block text-gray-500 text-[10px] uppercase tracking-wider">{item.sub}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Hero / Header Section */}
      <div className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="/images/longevity-banner.png" alt="Longevity Clinic" className="w-full h-full object-cover object-top scale-110" />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 text-center text-[#F5F2EB] px-6 max-w-4xl">
          <span className="block text-[#D4AF37] text-sm font-bold tracking-[0.3em] uppercase mb-6">Longevity Clinic</span>
          <h2 className="font-serif text-6xl md:text-8xl mb-8 leading-none">The Science of <br/><span className="italic font-light">Time Travel</span></h2>
          <p className="text-xl font-light text-white/90 leading-relaxed max-w-2xl mx-auto">
            More than a spa. A comprehensive approach to longevity, combining ancestral Moroccan wellness with cutting-edge science. Three floors. One mission: help you live better, longer.
          </p>
          <div className="mt-12 animate-bounce">
            <ArrowRight className="transform rotate-90 mx-auto text-[#D4AF37]" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-24 pt-24 space-y-32">
        {/* Level 3: Panoramic Fitness */}
        <div id="level-3" ref={el => { sectionRefs.current['level-3'] = el; }} className="scroll-mt-32">
          <FadeIn>
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="md:w-1/2 relative h-[600px] rounded-[2rem] overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2075&auto=format&fit=crop" alt="Panoramic Fitness" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="md:w-1/2 space-y-8">
                <div>
                  <span className="text-[#BC9E73] text-xs font-bold tracking-[0.2em] uppercase block mb-2">Level 3</span>
                  <h3 className="font-serif text-4xl md:text-5xl text-[#2C241B] mb-6">Panoramic Fitness</h3>
                  <p className="font-serif italic text-2xl text-[#BC9E73] mb-6">&ldquo;Train with the Atlas as your horizon&rdquo;</p>
                  <p className="text-gray-600 font-light leading-relaxed mb-8">
                    The top floor is devoted to movement. Floor-to-ceiling windows frame the Atlas Mountains as you train with the finest Technogym Artis equipment and expert guidance.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: <Dumbbell size={24}/>, label: 'Technogym' },
                    { icon: <Flower size={24}/>, label: 'Yoga Terrace' },
                    { icon: <User size={24}/>, label: 'Personal Training' }
                  ].map((feat, i) => (
                    <div key={i} className="flex flex-col items-center text-center p-4 border border-[#BC9E73]/20 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
                      <div className="text-[#BC9E73] mb-3">{feat.icon}</div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#2C241B]">{feat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Levels 1-2: Treatments */}
        <div id="level-1-2" ref={el => { sectionRefs.current['level-1-2'] = el; }} className="scroll-mt-32">
          <FadeIn>
            <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
              <div className="md:w-1/2 relative h-[700px] rounded-[2rem] overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1974&auto=format&fit=crop" alt="Treatment Room" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="md:w-1/2 space-y-8">
                <div>
                  <span className="text-[#BC9E73] text-xs font-bold tracking-[0.2em] uppercase block mb-2">Levels 1-2</span>
                  <h3 className="font-serif text-4xl md:text-5xl text-[#2C241B] mb-6">Treatment Floors</h3>
                  <p className="font-serif italic text-2xl text-[#BC9E73] mb-6">&ldquo;Science-backed protocols. Artisanal touch.&rdquo;</p>
                  <p className="text-gray-600 font-light leading-relaxed mb-8">
                    Two floors of private treatment suites where our practitioners blend traditional Moroccan therapies with modern longevity protocols.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#BC9E73]/10">
                  <h4 className="text-[#2C241B] font-serif text-xl mb-6">Signature Treatments</h4>
                  <div className="grid md:grid-cols-2 gap-y-6 gap-x-8">
                    {[
                      { title: 'Longevity Assessment', desc: 'Biomarker testing + Protocol' },
                      { title: 'Moroccan Hammam', desc: 'Traditional cleanse Ritual' },
                      { title: 'IV Therapy', desc: 'NAD+, vitamins' },
                      { title: 'Cryotherapy', desc: 'Full-body chamber' },
                      { title: 'Aesthetic Medicine', desc: 'Non-invasive' },
                      { title: 'Therapeutic Massage', desc: 'Deep tissue, sports' }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#BC9E73] mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-bold text-[#2C241B] text-sm uppercase tracking-wide">{item.title}</p>
                          <p className="text-xs text-gray-500 font-light">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Level -1: Spa Sanctuary */}
        <div id="level-minus-1" ref={el => { sectionRefs.current['level-minus-1'] = el; }} className="scroll-mt-32">
          <FadeIn>
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="md:w-1/2 relative h-[600px] rounded-[2rem] overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop" alt="Spa Sanctuary" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#2C241B]/20"></div>
              </div>
              <div className="md:w-1/2 space-y-8">
                <div>
                  <span className="text-[#BC9E73] text-xs font-bold tracking-[0.2em] uppercase block mb-2">Level -1</span>
                  <h3 className="font-serif text-4xl md:text-5xl text-[#2C241B] mb-6">The Spa Sanctuary</h3>
                  <p className="font-serif italic text-2xl text-[#BC9E73] mb-6">&ldquo;Descend into stillness&rdquo;</p>
                  <p className="text-gray-600 font-light leading-relaxed mb-8">
                    Beneath the earth, time slows. Our subterranean spa draws from Morocco&apos;s ancient hammam tradition, reimagined for modern wellness seekers.
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { icon: <Droplets size={20}/>, label: 'Hammam' },
                    { icon: <Thermometer size={20}/>, label: 'Plunges' },
                    { icon: <Waves size={20}/>, label: 'Sauna' },
                    { icon: <Wind size={20}/>, label: 'Steam' },
                    { icon: <Armchair size={20}/>, label: 'Rest' }
                  ].map((feat, i) => (
                    <div key={i} className="flex flex-col items-center text-center p-3 border border-[#BC9E73]/20 rounded-lg hover:bg-[#2C241B] hover:text-[#F5F2EB] group transition-all duration-300">
                      <div className="text-[#BC9E73] mb-2 group-hover:text-[#D4AF37]">{feat.icon}</div>
                      <span className="text-[10px] font-bold uppercase tracking-wide">{feat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Resident Privileges Box */}
        <FadeIn>
          <div className="relative rounded-[2rem] overflow-hidden bg-[#2C241B] text-[#F5F2EB] p-8 md:p-16 text-center shadow-2xl">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cubes.png")` }}></div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase block mb-6">Resident Privileges</span>
              <h3 className="font-serif text-3xl md:text-5xl mb-12">Elevate your wellbeing. Extend your prime.</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                {[
                  { icon: '∞', title: 'Unlimited Access', sub: 'To Fitness & Spa' },
                  { icon: '⭐', title: 'Priority Booking', sub: 'For Treatments' },
                  { icon: '🎁', title: 'Annual Check', sub: 'Health Assessment' },
                  { icon: '🏠', title: 'In-Villa', sub: 'Private Treatments' }
                ].map((priv, i) => (
                  <div key={i} className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-[#D4AF37] transition-colors duration-300">
                    <div className="text-3xl mb-4">{priv.icon}</div>
                    <h4 className="font-bold text-sm uppercase tracking-wider mb-1">{priv.title}</h4>
                    <p className="text-xs text-white/50">{priv.sub}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <MagneticButton variant="dark">Enquire About Residences</MagneticButton>
                <MagneticButton variant="outline">Book a Private Tour</MagneticButton>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#BC9E73] text-[#2C241B] pt-32 pb-12 px-6 md:px-16 border-t border-[#2C241B]/10">
      <div className="grid md:grid-cols-2 gap-16 mb-24">
        <div>
          <h2 className="font-serif text-6xl md:text-7xl mb-8">Begin Your<br/>Legacy</h2>
          <div className="flex gap-4">
             <input type="email" placeholder="Email Address" className="bg-transparent border-b border-[#2C241B]/30 py-4 w-full md:w-96 outline-none focus:border-white transition-colors placeholder:text-[#2C241B]/40 font-light text-[#2C241B]" />
             <button className="text-white uppercase tracking-widest text-xs hover:text-[#2C241B] transition-colors font-medium">Submit</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-12 font-light text-sm text-[#2C241B]/80">
          <div>
            <h4 className="text-[#2C241B] uppercase tracking-widest text-xs mb-6 font-bold">Contact</h4>
            <p className="hover:text-white transition-colors cursor-pointer">private@ksarnujum.com</p>
            <p className="hover:text-white transition-colors cursor-pointer">+212 5 24 00 00 00</p>
            <p className="mt-4">Route d&apos;Amizmiz, Km 12<br/>Marrakech, Morocco</p>
          </div>
          <div>
             <h4 className="text-[#2C241B] uppercase tracking-widest text-xs mb-6 font-bold">Menu</h4>
             <ul className="space-y-2">
               <li className="hover:text-white cursor-pointer transition-colors">Residences</li>
               <li className="hover:text-white cursor-pointer transition-colors">Clinic</li>
               <li className="hover:text-white cursor-pointer transition-colors">Philosophy</li>
               <li className="hover:text-white cursor-pointer transition-colors">Press</li>
             </ul>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#2C241B]/10 text-[10px] uppercase tracking-[0.2em] text-[#2C241B]/50">
        <p>Ksar Nujum © 2024</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <span>Designed by Canvas</span>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className="bg-[#F5F2EB] selection:bg-[#2C241B] selection:text-white cursor-none">
      <Cursor />
      <Hero />
      <Vision />
      <Residences />
      <Experience />
      <Longevity />
      <Footer />
    </div>
  );
}
