import About from "@/components/About";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import News from "@/components/News";
import Projects from "@/components/Projects";
import Qualifications from "@/components/Qualifications";
import QuickAccess from "@/components/QuickAccess";
import ScrollAnimations from "@/components/ScrollAnimations";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Header variant="overhang-round" />
      <main>
        <Hero />
        <QuickAccess />
        <Qualifications />
        <Services />
        <About />
        <Projects />
        <News />
      </main>
      <Footer />
      <ScrollAnimations />
    </>
  );
}
