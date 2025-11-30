import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Navigation } from "@/components/portfolio/Navigation";
import { MouseFollower } from "@/components/portfolio/MouseFollower";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <MouseFollower />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground"
      >
        Skip to Content
      </a>
      
      <div className="lg:flex lg:justify-between lg:gap-4">
        {/* Fixed Left Sidebar */}
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:pt-24 lg:pb-12 px-6 pt-12 pb-0 md:px-12 lg:pl-40 lg:pr-24">
          <div>
            <Hero />
            <Navigation />
          </div>
        </header>

        {/* Scrollable Right Content */}
        <main id="content" className="lg:w-1/2 lg:pt-24 lg:pb-12 px-6 pb-12 md:px-12 lg:pl-6 lg:pr-32">
          <About />
          <Experience />
          <Projects />
        </main>
      </div>
    </div>
  );
};

export default Index;
