import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ObjectiveVision from "@/components/ObjectiveVision";
import Services from "@/components/Services";
import Network from "@/components/Network";
import CTA, { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <About />
      <ObjectiveVision />
      <Services />
      <Network />
      <CTA />
      <Footer />
    </main>
  );
}
