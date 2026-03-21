import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientMarquee from "@/components/ClientMarquee";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyUsSection from "@/components/WhyUsSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <ClientMarquee />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <WhyUsSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
