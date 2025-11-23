import { Button } from "@/components/ui/button";

export const Contact = () => {
  return (
    <section id="contact" className="mb-32 scroll-mt-16 animate-fade-in-up">
      <h2 className="section-heading">
        <span className="section-number">04.</span>
        Get In Touch
      </h2>

      <div className="max-w-lg">
        <p className="text-slate leading-relaxed mb-8">
          I'm currently looking for new opportunities and my inbox is always open. 
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        <Button
          asChild
          className="bg-transparent border-2 border-primary text-primary hover:bg-primary/10 font-mono text-sm px-8 py-6 transition-all duration-300"
        >
          <a href="mailto:email@example.com">Say Hello</a>
        </Button>
      </div>

      <footer className="mt-20 pt-8 border-t border-card">
        <p className="text-slate text-sm text-center">
          Built with React & Tailwind CSS
        </p>
      </footer>
    </section>
  );
};
