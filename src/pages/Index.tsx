import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";
import { Navigation } from "@/components/portfolio/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="lg:flex">
        {/* Fixed Left Sidebar */}
        <div className="lg:sticky lg:top-0 lg:h-screen lg:w-1/2 lg:flex lg:flex-col lg:justify-between p-8 lg:p-24">
          <Hero />
          <Navigation />
        </div>

        {/* Scrollable Right Content */}
        <div className="lg:w-1/2 p-8 lg:p-24 lg:pt-24">
          <About />
          <Experience />
          <Projects />
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default Index;
