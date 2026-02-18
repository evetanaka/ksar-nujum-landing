import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import Vision from "@/sections/Vision";
import Residences from "@/sections/Residences";
import Experience from "@/sections/Experience";
import Longevity from "@/sections/Longevity";
import Gallery from "@/sections/Gallery";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Vision />
      <Residences />
      <Experience />
      <Longevity />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
