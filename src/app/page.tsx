"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';

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
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    specs: "500m² • 5 Suites"
  },
  {
    id: 2,
    name: "MAJORELLE",
    tagline: "Botanical Poetry",
    price: "From €2.1M",
    image: "https://images.unsplash.com/photo-1590059390047-6dfdc09cc441?q=80&w=2069&auto=format&fit=crop",
    specs: "450m² • 4 Suites"
  },
  {
    id: 3,
    name: "MENARA",
    tagline: "Water & Reflection",
    price: "From €1.8M",
    image: "https://images.unsplash.com/photo-1572295283477-8d0739f50625?q=80&w=2070&auto=format&fit=crop",
    specs: "400m² • 4 Suites"
  },
  {
    id: 4,
    name: "AGAFAY",
    tagline: "Earthborn Architecture",
    price: "From €1.5M",
    image: "https://images.unsplash.com/photo-1539667468225-eebb663053e6?q=80&w=2055&auto=format&fit=crop",
    specs: "320m² • 3 Suites"
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

/* ----------------------------------------------------------------------
   COMPONENTS
   ---------------------------------------------------------------------- */

// Custom Luxury Cursor
const Cursor = () => {
  const { x, y } = useMousePosition();
  return (
    <>
      <div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#2C241B] pointer-events-none z-[100] transition-transform duration-100 ease-out hidden md:block"
        style={{ transform: `translate(${x - 16}px, ${y - 16}px)` }}
      />
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-[#2C241B] rounded-full pointer-events-none z-[100] transition-transform duration-75 ease-out hidden md:block"
        style={{ transform: `translate(${x - 4}px, ${y - 4}px)` }}
      />
    </>
  );
};

const MagneticButton = ({ children, className = "", variant = "dark" }: { children: React.ReactNode; className?: string; variant?: "dark" | "light" }) => {
  const styles = {
    dark: {
      border: "border-[#D4AF37]/30",
      textHover: "group-hover:text-black",
      bgFill: "bg-[#D4AF37]"
    },
    light: {
      border: "border-[#2C241B]/30",
      textHover: "group-hover:text-[#F5F2EB]",
      bgFill: "bg-[#2C241B]"
    }
  };

  const currentStyle = styles[variant] || styles.dark;

  return (
    <button className={`group relative px-8 py-4 overflow-hidden rounded-full border transition-all hover:border-transparent ${currentStyle.border} ${className}`}>
      <span className={`relative z-10 font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-500 ${currentStyle.textHover}`}>
        {children}
      </span>
      <div className={`absolute inset-0 ${currentStyle.bgFill} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out`} />
    </button>
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
          src="https://images.unsplash.com/photo-1544985336-397c88b0a996?q=80&w=2070&auto=format&fit=crop" 
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
            {['Residences', 'Longevity', 'Experience', 'Enquire'].map(item => (
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

const Philosophy = () => {
  return (
    <section className="py-32 bg-[#F5F2EB] text-[#2C241B] px-6 md:px-16 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-20 items-start">
        <div className="md:w-1/3 pt-4">
          <span className="text-[#BC9E73] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">The Vision</span>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
            Not built on the land,<br/> but <span className="italic font-light">of the land.</span>
          </h2>
          <MagneticButton variant="light">Read the Story</MagneticButton>
        </div>
        
        <div className="md:w-2/3 relative">
          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            <div className="relative overflow-hidden rounded-[40px_10px_40px_10px]">
              <img src="https://images.unsplash.com/photo-1512958779360-18c65856be8b?q=80&w=1000&auto=format&fit=crop" alt="Architecture" className="w-full object-cover hover:scale-105 transition-transform duration-1000 ease-out" />
            </div>
            <div className="relative p-8 bg-white border border-[#BC9E73]/20 rounded-[10px_40px_10px_40px] mt-12">
               <p className="font-serif text-2xl italic text-[#BC9E73] mb-4">&ldquo;A return to origins&rdquo;</p>
               <p className="font-sans text-sm font-light leading-relaxed text-gray-600">
                 Inspired by Javier Senosiain&apos;s organic expressionism, Ksar Nujum creates a dialogue between the stark beauty of the Agafay desert and the fluidity of life. Curves replace corners. Light replaces walls.
               </p>
            </div>
            <div className="relative overflow-hidden rounded-[100px_100px_0_0] h-64 md:h-96">
               <img src="https://images.unsplash.com/photo-1590523278191-995cbcda646b?q=80&w=1000&auto=format&fit=crop" alt="Texture" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Residences = () => {
  const [activeVilla, setActiveVilla] = useState(0);

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
              onMouseEnter={() => setActiveVilla(index)}
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
              className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeVilla === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
            >
              <img src={villa.image} alt={villa.name} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5D4037]/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-12 left-12 md:left-24 max-w-md text-[#F5F2EB]">
                <p className="text-white font-serif italic text-2xl mb-2">{villa.tagline}</p>
                <p className="text-white/80 font-light text-sm leading-relaxed mb-6">{villa.specs} — {villa.price}</p>
                <button className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors">
                  View Floorplans <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Longevity = () => {
  return (
    <section id="longevity" className="py-32 bg-[#F5F2EB] px-6 md:px-16">
      <div className="border-l border-[#BC9E73] pl-8 md:pl-24 relative">
        <span className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-[#BC9E73] rounded-full" />
        <span className="text-[#BC9E73] text-xs font-bold tracking-[0.2em] uppercase mb-8 block">Longevity Clinic</span>
        
        <h2 className="font-serif text-5xl md:text-8xl text-[#2C241B] mb-16 leading-[0.9]">
          The Science of <br/> <span className="italic text-[#BC9E73]">Time Travel</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { level: "Level -1", title: "Sanctuary", desc: "Subterranean spa, cryotherapy chambers, and sensory deprivation tanks sculpted from local stone." },
            { level: "Level 0", title: "Diagnostics", desc: "Advanced bio-hacking lab, IV lounges, and genetic analysis center for personalized health." },
            { level: "Level 1", title: "Performance", desc: "Panoramic technogym, altitude training, and yoga terrace facing the Atlas peaks." }
          ].map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="h-[1px] w-full bg-[#2C241B]/10 mb-6 group-hover:bg-[#BC9E73] transition-colors duration-500" />
              <span className="text-xs text-[#BC9E73] uppercase tracking-widest block mb-2">{item.level}</span>
              <h3 className="font-serif text-3xl mb-4 group-hover:translate-x-2 transition-transform duration-300 text-[#2C241B]">{item.title}</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed max-w-xs">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 h-[400px] w-full rounded-[2rem] overflow-hidden relative">
          <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Clinic Interior" />
          <div className="absolute inset-0 flex items-center justify-center">
            <MagneticButton variant="light" className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white hover:text-[#2C241B]">
              Explore Treatments
            </MagneticButton>
          </div>
        </div>
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
      <Philosophy />
      <Residences />
      <Longevity />
      <Footer />
    </div>
  );
}
