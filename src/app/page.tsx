"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Play, MapPin, Diamond, Activity, Hourglass, X, Utensils, Coffee, Waves, Sparkles, Dumbbell, Flower, User, Droplets, Thermometer, Wind, Armchair } from 'lucide-react';
import { useTranslation, LanguageSelector } from '@/i18n';

/* ----------------------------------------------------------------------
   DESIGN SYSTEM & ASSETS
   ---------------------------------------------------------------------- */
const COLORS = {
  ochre: '#BC9E73',
  darkBrown: '#2C241B',
  gold: '#D4AF37',
  sand: '#F5F2EB',
  white: '#FFFFFF'
};

const VILLA_IMAGES = {
  atlas: {
    image: "/images/villas/atlas-exterior.png",
    interiorImage: "/images/villas/atlas-interior.png",
  },
  majorelle: {
    image: "/images/villas/majorelle-exterior.png",
    interiorImage: "/images/villas/majorelle-interior.png",
  },
  menara: {
    image: "/images/villas/menara-exterior.jpg",
    interiorImage: "/images/villas/menara-interior.png",
  },
  agafay: {
    image: "/images/villas/agafay-exterior.jpg",
    interiorImage: "/images/villas/agafay-interior.png",
  }
};

const EXPERIENCE_IMAGES = {
  gastronomy: '/images/gastronomy.jpg',
  longevityClinic: '/images/longevity-clinic.webp',
  dailyRituals: '/images/daily-rituals.jpg',
  resortLiving: '/images/resort-living.jpg',
};

const EXPERIENCE_MODAL_IMAGES = {
  gastronomy: '/images/gastronomy-modal.avif',
  dailyRituals: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2000&auto=format&fit=crop',
  resortLiving: '/images/resort-modal.jpg',
};

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

interface ModalFeature {
  title: string;
  desc: string;
}

interface ExperienceModalProps {
  title: string;
  headline: string;
  description: string;
  features: ModalFeature[];
  detailImage: string;
  icon: React.ReactNode;
  onClose: () => void;
}

const ExperienceModal = ({ title, headline, description, features, detailImage, icon, onClose }: ExperienceModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[#2C241B]/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      ></div>

      <div className="relative bg-[#F5F2EB] w-full max-w-6xl h-[85vh] md:h-[80vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-[fadeIn_0.5s_ease-out]">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/20 hover:bg-[#2C241B] hover:text-white transition-colors duration-300"
        >
          <X size={24} />
        </button>

        <div className="w-full md:w-1/2 h-48 md:h-full relative">
          <img
            src={detailImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F5F2EB]/10 md:to-transparent"></div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto flex flex-col justify-center">
          <div className="mb-2 flex items-center gap-2 text-[#BC9E73] font-bold tracking-widest text-xs uppercase">
            {icon}
            <span>{title}</span>
          </div>
          <h3 className="font-serif text-4xl md:text-5xl text-[#2C241B] mb-6 leading-tight">
            {headline}
          </h3>
          <p className="font-sans text-gray-600 font-light leading-relaxed mb-12">
            {description}
          </p>

          <div className="space-y-8 mb-12">
            {features.map((feature, i) => (
              <div key={i} className="border-l-2 border-[#BC9E73]/30 pl-6">
                <h4 className="font-serif text-xl text-[#2C241B] mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-500 font-light">{feature.desc}</p>
              </div>
            ))}
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
  const { t, isRTL } = useTranslation();
  
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#BC9E73] text-[#2C241B]">
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

      <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-16">
        <nav className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="font-serif text-2xl tracking-widest text-[#2C241B] font-bold">{t('hero.brand')}</div>
          <div className="flex items-center gap-6">
            <div className={`hidden md:flex gap-12 text-xs uppercase tracking-[0.2em] font-medium text-[#2C241B] ${isRTL ? 'flex-row-reverse' : ''}`}>
              {['vision', 'residences', 'longevity', 'experience', 'contact'].map(item => (
                <a key={item} href={`#${item}`} className="hover:text-white transition-colors">{t(`nav.${item}`)}</a>
              ))}
            </div>
            <LanguageSelector variant="dark" />
          </div>
        </nav>

        <div className={`flex flex-col md:flex-row items-end justify-between pb-12 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <div className="max-w-4xl">
            <h1 className={`font-serif text-6xl md:text-9xl leading-[0.9] mb-8 text-[#2C241B] ${isRTL ? 'text-right' : ''}`}>
              {t('hero.headline1')} <br/>
              <span className="italic text-white mix-blend-soft-light opacity-100">{t('hero.headline2')}</span>
            </h1>
            <div className={`flex items-center gap-4 text-sm font-medium tracking-wide max-w-md text-[#2C241B] ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
              <span className="block w-12 h-[1px] bg-[#2C241B]" />
              <p>{t('hero.tagline')}</p>
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
  const { t, tObject, isRTL } = useTranslation();
  
  const pillars = [
    { key: 'luxury', icon: <Diamond size={32} strokeWidth={1} />, hoverImage: "/images/luxury-artisan.jpg" },
    { key: 'longevity', icon: <Activity size={32} strokeWidth={1} />, hoverImage: "/images/longevity-redlight.png" },
    { key: 'legacy', icon: <Hourglass size={32} strokeWidth={1} />, hoverImage: "/images/legacy-courtyard.png" }
  ];

  const mapLocations = ['airport', 'medina', 'atlas'] as const;

  return (
    <section id="vision" className="py-24 md:py-32 bg-[#F5F2EB] text-[#2C241B] px-6 md:px-16 overflow-hidden">
      <div className="text-center max-w-4xl mx-auto mb-20">
        <FadeIn>
          <span className="text-[#BC9E73] text-xs font-bold tracking-[0.3em] uppercase mb-6 block">{t('vision.sectionLabel')}</span>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight">
            {t('vision.quote')}
          </h2>
        </FadeIn>
      </div>

      <div className={`grid md:grid-cols-2 gap-16 items-center mb-24 ${isRTL ? 'md:grid-flow-dense' : ''}`}>
        <FadeIn delay={200}>
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl group h-[500px] cursor-pointer">
             <img 
               src="/images/courtyard-1.png" 
               alt="Ksar Nujum Courtyard" 
               className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-105" 
             />
             <img 
               src="/images/courtyard-2.png" 
               alt="Ksar Nujum Courtyard" 
               className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out group-hover:scale-105" 
             />
             <div className="absolute inset-0 bg-[#2C241B]/10 mix-blend-overlay pointer-events-none"></div>
          </div>
        </FadeIn>
        
        <FadeIn delay={400}>
          <div className={`space-y-8 pl-0 md:pl-12 border-l border-[#BC9E73]/30 ${isRTL ? 'md:pl-0 md:pr-12 border-l-0 border-r text-right' : ''}`}>
            <h3 className="font-serif text-3xl md:text-4xl text-[#2C241B] leading-tight">
              {t('vision.title')} <br/><span className="italic text-[#BC9E73]">{t('vision.titleAccent')}</span>
            </h3>
            <p className="font-sans text-lg font-light leading-relaxed text-[#2C241B]/80">
              {t('vision.description1')}
            </p>
            <p className="font-sans text-lg font-light leading-relaxed text-[#2C241B]/80">
              {t('vision.description2')}
            </p>
            <MagneticButton variant="light">{t('vision.cta')}</MagneticButton>
          </div>
        </FadeIn>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-32">
        {pillars.map((pillar, i) => {
          const pillarData = tObject<{ title: string; subtitle: string; desc: string }>(`vision.pillars.${pillar.key}`);
          return (
            <FadeIn key={i} delay={i * 150}>
              <div className="group relative p-8 h-full min-h-[300px] border border-[#BC9E73]/20 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white">
                {pillar.hoverImage && (
                  <>
                    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <img src={pillar.hoverImage} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-[#2C241B]/60"></div>
                    </div>
                  </>
                )}
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="text-[#BC9E73] group-hover:text-white transition-colors duration-500 mb-6">
                      {pillar.icon}
                    </div>
                    <h4 className="font-serif text-3xl mb-2 text-[#2C241B] group-hover:text-white transition-colors duration-500">{pillarData.title}</h4>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#BC9E73] group-hover:text-white/80 transition-colors duration-500 block mb-4">
                      {pillarData.subtitle}
                    </span>
                  </div>
                  <p className="text-sm font-light text-[#2C241B]/70 leading-relaxed group-hover:text-white/90 transition-colors duration-500 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    {pillarData.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn delay={600}>
        <div className="relative w-full rounded-[3rem] overflow-hidden bg-[#E6E0D4] shadow-inner group">
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
                <span className="text-[#BC9E73] text-xs font-bold tracking-[0.3em] uppercase">{t('vision.map.label')}</span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 w-full max-w-5xl mt-8">
               {mapLocations.map((loc, idx) => {
                 const locData = tObject<{ time: string; location: string; sub: string }>(`vision.map.${loc}`);
                 return (
                   <div key={idx} className="flex flex-col items-center group/marker">
                     <div className="relative mb-6">
                       <div className="w-4 h-4 bg-[#BC9E73] rounded-full animate-ping absolute inset-0 opacity-20"></div>
                       <div className="w-16 h-16 rounded-full border border-[#2C241B] bg-[#F5F2EB] flex items-center justify-center relative z-10 group-hover/marker:bg-[#2C241B] group-hover/marker:text-[#F5F2EB] transition-colors duration-300 shadow-lg">
                         <MapPin size={24} strokeWidth={1.5} />
                       </div>
                     </div>
                     <span className="font-serif text-4xl md:text-5xl text-[#2C241B] mb-2">{locData.time}</span>
                     <span className="text-xs font-bold uppercase tracking-widest text-[#2C241B] mb-1">{locData.location}</span>
                     <span className="font-serif italic text-gray-500 text-sm">{locData.sub}</span>
                   </div>
                 );
               })}
             </div>
           </div>
        </div>
      </FadeIn>
    </section>
  );
};

const Residences = () => {
  const { t, tObject, isRTL } = useTranslation();
  const [activeVilla, setActiveVilla] = useState(0);
  const [showInterior, setShowInterior] = useState(false);

  const villaKeys = ['atlas', 'majorelle', 'menara', 'agafay'] as const;

  const handleVillaChange = (index: number) => {
    setActiveVilla(index);
    setShowInterior(false);
  };

  return (
    <section id="residences" className="py-24 bg-[#BC9E73] text-[#2C241B] px-6 md:px-0 relative">
      <div className={`md:px-16 mb-12 flex justify-between items-end ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h2 className="font-serif text-5xl md:text-7xl">{t('residences.title')}</h2>
        <span className="text-white text-xs tracking-[0.2em] uppercase hidden md:block">{t('residences.subtitle')}</span>
      </div>

      <div className={`flex flex-col md:flex-row min-h-[80vh] md:h-[80vh] ${isRTL ? 'md:flex-row-reverse' : ''}`}>
        <div className="md:w-5/12 flex flex-col justify-center border-t border-[#2C241B]/10 order-2 md:order-1">
          {villaKeys.map((key, index) => {
            const villa = tObject<{ name: string; tagline: string; price: string; specs: string }>(`residences.villas.${key}`);
            return (
              <div 
                key={key}
                onMouseEnter={() => handleVillaChange(index)}
                className={`group flex items-center justify-between py-10 px-8 md:px-16 border-b border-[#2C241B]/10 cursor-pointer transition-all duration-500 ${activeVilla === index ? 'bg-[#2C241B]/5' : 'hover:bg-[#2C241B]/5'} ${isRTL ? 'flex-row-reverse text-right' : ''}`}
              >
                <div>
                  <span className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${activeVilla === index ? 'text-white' : 'text-[#2C241B]/60'}`}>
                    0{index + 1}
                  </span>
                  <h3 className={`font-serif text-3xl md:text-4xl mt-2 transition-transform duration-500 ${isRTL ? 'group-hover:-translate-x-4' : 'group-hover:translate-x-4'}`}>
                    {villa.name}
                  </h3>
                </div>
                <div className={`transition-opacity duration-500 ${activeVilla === index ? 'opacity-100' : 'opacity-0'}`}>
                  <ArrowRight className={`text-white ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full h-[50vh] md:h-auto md:w-7/12 relative overflow-hidden bg-[#A88B60] order-1 md:order-2">
          {villaKeys.map((key, index) => {
            const villa = tObject<{ name: string; tagline: string; price: string; specs: string }>(`residences.villas.${key}`);
            const images = VILLA_IMAGES[key];
            return (
              <div 
                key={key}
                className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeVilla === index ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 pointer-events-none'}`}
              >
                <img 
                  src={images.image} 
                  alt={`${villa.name} Exterior`} 
                  className={`absolute inset-0 w-full h-full object-cover mix-blend-multiply transition-opacity duration-700 ${showInterior ? 'opacity-0' : 'opacity-90'}`} 
                />
                <img 
                  src={images.interiorImage} 
                  alt={`${villa.name} Interior`} 
                  className={`absolute inset-0 w-full h-full object-cover mix-blend-multiply transition-opacity duration-700 ${showInterior ? 'opacity-90' : 'opacity-0'}`} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5D4037]/80 via-transparent to-transparent" />
                
                <div className={`absolute bottom-12 ${isRTL ? 'right-12 md:right-24 text-right' : 'left-12 md:left-24'} max-w-md text-[#F5F2EB]`}>
                  <p className="text-white font-serif italic text-2xl mb-2">{villa.tagline}</p>
                  <p className="text-white/80 font-light text-sm leading-relaxed mb-6">{villa.specs} — {villa.price}</p>
                  <button 
                    onClick={() => setShowInterior(!showInterior)}
                    className={`flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    {showInterior ? t('residences.viewExterior') : t('residences.viewInteriors')} <ArrowUpRight size={14} className={isRTL ? 'rotate-90' : ''} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const { t, tArray, tObject, isRTL } = useTranslation();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const experiences = [
    { key: 'gastronomy', icon: <Utensils size={24} />, image: EXPERIENCE_IMAGES.gastronomy, action: 'modal' as const },
    { key: 'longevityClinic', icon: <Sparkles size={24} />, image: EXPERIENCE_IMAGES.longevityClinic, action: 'scroll' as const, target: 'longevity' },
    { key: 'dailyRituals', icon: <Coffee size={24} />, image: EXPERIENCE_IMAGES.dailyRituals, action: 'modal' as const },
    { key: 'resortLiving', icon: <Waves size={24} />, image: EXPERIENCE_IMAGES.resortLiving, action: 'modal' as const },
  ];

  const handleClick = (exp: typeof experiences[0]) => {
    if (exp.action === 'modal') {
      setActiveModal(exp.key);
    } else if (exp.action === 'scroll' && exp.target) {
      const element = document.getElementById(exp.target);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getModalContent = (key: string) => {
    const modal = tObject<{ headline: string; description: string; features: ModalFeature[] }>(`experience.${key}.modal`);
    const title = t(`experience.${key}.title`);
    const icon = experiences.find(e => e.key === key)?.icon;
    const detailImage = EXPERIENCE_MODAL_IMAGES[key as keyof typeof EXPERIENCE_MODAL_IMAGES] || '';
    return { ...modal, title, icon, detailImage };
  };

  return (
    <section id="experience" className="py-24 bg-[#F5F2EB] text-[#2C241B]">
      {activeModal && (
        <ExperienceModal
          {...getModalContent(activeModal)}
          onClose={() => setActiveModal(null)}
        />
      )}
      
      <div className="container mx-auto px-6 md:px-16">
        <div className="text-center mb-16">
          <span className="text-[#BC9E73] text-xs font-bold tracking-[0.3em] uppercase block mb-6">{t('experience.sectionLabel')}</span>
          <h2 className="font-serif text-4xl md:text-6xl text-[#2C241B]">{t('experience.headline')} <span className="italic text-[#BC9E73]">{t('experience.headlineAccent')}</span></h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 h-auto">
          {experiences.map((exp) => {
            const hoverList = tArray(`experience.${exp.key}.hoverList`);
            return (
              <div
                key={exp.key}
                className="group relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => handleClick(exp)}
              >
                <img
                  src={exp.image}
                  alt={t(`experience.${exp.key}.title`)}
                  className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-110 group-hover:brightness-[0.4]"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>

                <div className={`absolute bottom-0 ${isRTL ? 'right-0 text-right' : 'left-0'} p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-8`}>
                  <div className={`flex items-center gap-3 text-[#D4AF37] mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {exp.icon}
                    <span className="text-xs font-bold uppercase tracking-widest">{t(`experience.${exp.key}.title`)}</span>
                  </div>
                  <h3 className="font-serif text-3xl text-white mb-2">{t(`experience.${exp.key}.subtitle`)}</h3>
                  
                  <div className={`h-0 overflow-hidden group-hover:h-auto transition-all duration-500 opacity-0 group-hover:opacity-100 pt-4 border-t border-white/20 mt-4`}>
                    <ul className="space-y-2 mb-6">
                      {hoverList.map((item, idx) => (
                        <li key={idx} className={`text-white/80 text-sm font-light flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span className="w-1 h-1 rounded-full bg-[#D4AF37]"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className={`flex items-center text-[#D4AF37] text-xs uppercase tracking-[0.2em] group/btn ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {t(`experience.${exp.key}.cta`)}
                      <ArrowRight size={14} className={`${isRTL ? 'mr-2 transform group-hover/btn:-translate-x-2 rotate-180' : 'ml-2 transform group-hover/btn:translate-x-2'} transition-transform`} />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 border-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none scale-95 group-hover:scale-100"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Longevity = () => {
  const { t, tArray, tObject, isRTL } = useTranslation();
  const [activeLevel, setActiveLevel] = useState('level-3');
  const [isInSection, setIsInSection] = useState(false);
  const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const longevitySectionRef = useRef<HTMLElement | null>(null);

  const levelKeys = [
    { id: 'level-3', key: 'level3' },
    { id: 'level-1-2', key: 'level1-2' },
    { id: 'level-minus-1', key: 'levelMinus1' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const viewportMiddle = window.innerHeight / 2;
      
      if (longevitySectionRef.current) {
        const rect = longevitySectionRef.current.getBoundingClientRect();
        setIsInSection(rect.top <= viewportMiddle && rect.bottom >= viewportMiddle);
      }
      
      let closestId = 'level-3';
      let closestDistance = Infinity;
      
      Object.entries(sectionRefs.current).forEach(([id, ref]) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const sectionMiddle = rect.top + rect.height / 2;
          const distance = Math.abs(sectionMiddle - viewportMiddle);
          
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
    handleScroll();
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

  const privilegeItems = tObject<{ icon: string; title: string; sub: string }[]>('longevity.privileges.items');

  return (
    <section id="longevity" ref={longevitySectionRef} className="bg-[#F5F2EB] relative pb-32">
      {/* Sticky Sidebar Navigation */}
      <div className={`hidden md:block fixed ${isRTL ? 'right-8' : 'left-8'} top-1/2 transform -translate-y-1/2 z-30 transition-opacity duration-500`}
           style={{ opacity: isInSection ? 1 : 0, pointerEvents: isInSection ? 'auto' : 'none' }}>
        <div className="flex flex-col space-y-6">
          {levelKeys.map((level) => {
            const levelData = tObject<{ label: string; sub: string }>(`longevity.levels.${level.key}`);
            return (
              <button
                key={level.id}
                onClick={() => scrollToSection(level.id)}
                className={`group flex items-center space-x-4 text-${isRTL ? 'right' : 'left'} focus:outline-none ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div className={`w-3 h-3 rounded-full border border-[#2C241B] transition-all duration-300 ${activeLevel === level.id ? 'bg-[#BC9E73] scale-125 border-[#BC9E73]' : 'bg-transparent group-hover:border-[#BC9E73]'}`}></div>
                <div className={`transition-all duration-300 ${activeLevel === level.id ? 'opacity-100 translate-x-0' : `opacity-0 ${isRTL ? 'translate-x-4' : '-translate-x-4'} group-hover:opacity-100 group-hover:translate-x-0`}`}>
                  <span className="block text-[#2C241B] text-xs font-bold uppercase tracking-widest">{levelData.label}</span>
                  <span className="block text-gray-500 text-[10px] uppercase tracking-wider">{levelData.sub}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero / Header Section */}
      <div className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="/images/longevity-banner.png" alt="Longevity Clinic" className="w-full h-full object-cover" style={{ objectPosition: 'center 60%' }} />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 text-center text-[#F5F2EB] px-6 max-w-4xl">
          <span className="block text-[#D4AF37] text-sm font-bold tracking-[0.3em] uppercase mb-6">{t('longevity.sectionLabel')}</span>
          <h2 className="font-serif text-6xl md:text-8xl mb-8 leading-none">{t('longevity.headline')} <br/><span className="italic font-light">{t('longevity.headlineAccent')}</span></h2>
          <p className="text-xl font-light text-white/90 leading-relaxed max-w-2xl mx-auto">
            {t('longevity.intro')}
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
            <div className={`flex flex-col md:flex-row gap-16 items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/2 relative h-[600px] rounded-[2rem] overflow-hidden group">
                <img src="/images/fitness-level3.png" alt="Panoramic Fitness" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className={`md:w-1/2 space-y-8 ${isRTL ? 'text-right' : ''}`}>
                <div>
                  <span className="text-[#BC9E73] text-xs font-bold tracking-[0.2em] uppercase block mb-2">{t('longevity.levels.level3.label')}</span>
                  <h3 className="font-serif text-4xl md:text-5xl text-[#2C241B] mb-6">{t('longevity.levels.level3.title')}</h3>
                  <p className="font-serif italic text-2xl text-[#BC9E73] mb-6">{t('longevity.levels.level3.quote')}</p>
                  <p className="text-gray-600 font-light leading-relaxed mb-8">
                    {t('longevity.levels.level3.description')}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {tArray('longevity.levels.level3.features').map((feat, i) => {
                    const icons = [<Dumbbell key="d" size={24}/>, <Flower key="f" size={24}/>, <User key="u" size={24}/>];
                    return (
                      <div key={i} className="flex flex-col items-center text-center p-4 border border-[#BC9E73]/20 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
                        <div className="text-[#BC9E73] mb-3">{icons[i]}</div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#2C241B]">{feat}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Levels 1-2: Treatments */}
        <div id="level-1-2" ref={el => { sectionRefs.current['level-1-2'] = el; }} className="scroll-mt-32">
          <FadeIn>
            <div className={`flex flex-col md:flex-row gap-16 items-center ${isRTL ? '' : 'md:flex-row-reverse'}`}>
              <div className="md:w-1/2 relative h-[700px] rounded-[2rem] overflow-hidden group">
                <img src="/images/treatment-floors.png" alt="Treatment Room" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className={`md:w-1/2 space-y-8 ${isRTL ? 'text-right' : ''}`}>
                <div>
                  <span className="text-[#BC9E73] text-xs font-bold tracking-[0.2em] uppercase block mb-2">{t('longevity.levels.level1-2.label')}</span>
                  <h3 className="font-serif text-4xl md:text-5xl text-[#2C241B] mb-6">{t('longevity.levels.level1-2.title')}</h3>
                  <p className="font-serif italic text-2xl text-[#BC9E73] mb-6">{t('longevity.levels.level1-2.quote')}</p>
                  <p className="text-gray-600 font-light leading-relaxed mb-8">
                    {t('longevity.levels.level1-2.description')}
                  </p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#BC9E73]/10">
                  <h4 className="text-[#2C241B] font-serif text-xl mb-6">{t('longevity.levels.level1-2.treatmentsTitle')}</h4>
                  <div className="grid md:grid-cols-2 gap-y-6 gap-x-8">
                    {tObject<{ title: string; desc: string }[]>('longevity.levels.level1-2.treatments').map((item, i) => (
                      <div key={i} className={`flex gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
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
            <div className={`flex flex-col md:flex-row gap-16 items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/2 relative h-[600px] rounded-[2rem] overflow-hidden group">
                <img src="/images/spa-sanctuary.png" alt="Spa Sanctuary" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#2C241B]/20"></div>
              </div>
              <div className={`md:w-1/2 space-y-8 ${isRTL ? 'text-right' : ''}`}>
                <div>
                  <span className="text-[#BC9E73] text-xs font-bold tracking-[0.2em] uppercase block mb-2">{t('longevity.levels.levelMinus1.label')}</span>
                  <h3 className="font-serif text-4xl md:text-5xl text-[#2C241B] mb-6">{t('longevity.levels.levelMinus1.title')}</h3>
                  <p className="font-serif italic text-2xl text-[#BC9E73] mb-6">{t('longevity.levels.levelMinus1.quote')}</p>
                  <p className="text-gray-600 font-light leading-relaxed mb-8">
                    {t('longevity.levels.levelMinus1.description')}
                  </p>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {tArray('longevity.levels.levelMinus1.features').map((feat, i) => {
                    const icons = [<Droplets key="d" size={20}/>, <Thermometer key="t" size={20}/>, <Waves key="w" size={20}/>, <Wind key="wi" size={20}/>, <Armchair key="a" size={20}/>];
                    return (
                      <div key={i} className="flex flex-col items-center text-center p-3 border border-[#BC9E73]/20 rounded-lg hover:bg-[#2C241B] hover:text-[#F5F2EB] group transition-all duration-300">
                        <div className="text-[#BC9E73] mb-2 group-hover:text-[#D4AF37]">{icons[i]}</div>
                        <span className="text-[10px] font-bold uppercase tracking-wide">{feat}</span>
                      </div>
                    );
                  })}
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
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase block mb-6">{t('longevity.privileges.sectionLabel')}</span>
              <h3 className="font-serif text-3xl md:text-5xl mb-12">{t('longevity.privileges.headline')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                {privilegeItems.map((priv, i) => (
                  <div key={i} className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-[#D4AF37] transition-colors duration-300">
                    <div className="text-3xl mb-4">{priv.icon}</div>
                    <h4 className="font-bold text-sm uppercase tracking-wider mb-1">{priv.title}</h4>
                    <p className="text-xs text-white/50">{priv.sub}</p>
                  </div>
                ))}
              </div>
              <div className={`flex flex-col md:flex-row gap-6 justify-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                <MagneticButton variant="dark">{t('longevity.privileges.cta1')}</MagneticButton>
                <MagneticButton variant="outline">{t('longevity.privileges.cta2')}</MagneticButton>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t, isRTL } = useTranslation();
  
  return (
    <footer id="contact" className="bg-[#BC9E73] text-[#2C241B] pt-24 pb-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className={`grid md:grid-cols-3 gap-12 mb-16 ${isRTL ? 'text-right' : ''}`}>
          <div>
            <h3 className="font-serif text-3xl mb-4">{t('hero.brand')}</h3>
            <p className="text-[#2C241B]/70 font-light text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h4 className="text-[#2C241B] uppercase tracking-widest text-xs mb-6 font-bold">{t('footer.exploreTitle')}</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#vision" className="hover:text-white transition-colors">{t('nav.vision')}</a></li>
              <li><a href="#residences" className="hover:text-white transition-colors">{t('nav.residences')}</a></li>
              <li><a href="#longevity" className="hover:text-white transition-colors">{t('nav.longevity')}</a></li>
              <li><a href="#experience" className="hover:text-white transition-colors">{t('nav.experience')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#2C241B] uppercase tracking-widest text-xs mb-6 font-bold">{t('footer.contactTitle')}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:contact@darsociety.com" className="hover:text-white transition-colors">
                  contact@darsociety.com
                </a>
              </li>
              <li className="text-[#2C241B]/70">
                {t('footer.location')}
              </li>
            </ul>
          </div>
        </div>
        
        <div className={`flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#2C241B]/20 text-xs text-[#2C241B]/60 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <p>{t('footer.copyright')}</p>
          <p className="mt-4 md:mt-0">
            {t('footer.developedBy').split('Dar Society')[0]}
            <a href="https://darsociety.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Dar Society</a>
            {t('footer.developedBy').split('Dar Society')[1] || ''}
          </p>
        </div>
      </div>
    </footer>
  );
};

const PasswordGate = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('ksar-nujum-auth');
    if (auth === 'authenticated') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.toUpperCase() === 'JOINTHECIRCLE') {
      localStorage.setItem('ksar-nujum-auth', 'authenticated');
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setCode('');
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#BC9E73] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-[#BC9E73] flex items-center justify-center z-[10000] p-6">
        <div className="absolute top-6 right-6">
          <LanguageSelector variant="dark" />
        </div>
        <div className="max-w-md w-full text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-[#2C241B] mb-4">{t('passwordGate.title')}</h1>
          <p className="text-[#2C241B]/70 font-light mb-8">{t('passwordGate.subtitle')}</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(false); }}
              placeholder={t('passwordGate.placeholder')}
              className={`w-full px-6 py-4 bg-white/20 border ${error ? 'border-red-500' : 'border-[#2C241B]/20'} rounded-full text-center text-[#2C241B] placeholder:text-[#2C241B]/40 focus:outline-none focus:border-[#2C241B]/50 font-light tracking-widest uppercase`}
              autoFocus
            />
            {error && (
              <p className="text-red-700 text-sm">{t('passwordGate.invalidCode')}</p>
            )}
            <button
              type="submit"
              className="w-full px-6 py-4 bg-[#2C241B] text-white rounded-full font-light tracking-widest uppercase hover:bg-[#2C241B]/90 transition-colors"
            >
              {t('passwordGate.enter')}
            </button>
          </form>
          
          <p className="mt-12 text-[#2C241B]/50 text-xs tracking-widest uppercase">
            {t('passwordGate.byInvitation')}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default function Home() {
  const { isRTL } = useTranslation();
  
  return (
    <PasswordGate>
      <div className={`bg-[#F5F2EB] selection:bg-[#2C241B] selection:text-white cursor-none ${isRTL ? 'font-arabic' : ''}`}>
        <Cursor />
        <Hero />
        <Vision />
        <Residences />
        <Experience />
        <Longevity />
        <Footer />
      </div>
    </PasswordGate>
  );
}
