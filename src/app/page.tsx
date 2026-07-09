import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import { ScrollProgress } from "@/components/ScrollFx";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Showcase />
        <Projects />
        <About />
        <Experience />
      </main>
      <Contact />
    </SmoothScroll>
  );
}
