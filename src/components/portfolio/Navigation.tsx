import { useState, useEffect } from "react";

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="hidden lg:block">
      <ul className="space-y-4">
        {navItems.map((item, index) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`group flex items-center gap-4 transition-all duration-300 ${
                activeSection === item.id ? "text-slate-light" : "text-slate"
              }`}
            >
              <span
                className={`h-px bg-slate transition-all duration-300 ${
                  activeSection === item.id
                    ? "w-16 bg-slate-light"
                    : "w-8 group-hover:w-16 group-hover:bg-slate-light"
                }`}
              />
              <span className="text-xs font-bold uppercase tracking-widest group-hover:text-slate-light transition-colors duration-300">
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
