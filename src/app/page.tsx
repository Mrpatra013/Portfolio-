import StarFieldClient from "@/components/StarFieldClient";
import FloatingPlanetsClient from "@/components/FloatingPlanetsClient";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";


export default function Home() {
  return (
    <div className="relative">
      {/* Dark space background with minimal stars */}
      <StarFieldClient starCount={80} maxSize={2} darkBackground={true} />
      
      {/* Floating planets with smaller orbits */}
      <FloatingPlanetsClient />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* About Section */}
        <About />
        
        {/* Skills Section */}
        <Skills />
        
        {/* Projects Section */}
        <Projects />
        
        {/* Contact Section */}
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />

    </div>
  );
}
