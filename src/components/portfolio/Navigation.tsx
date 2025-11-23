import { useState, useEffect } from "react";

const navItems = [
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
];

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.offsetTop;
          
          if (scrollPosition >= sectionTop) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="hidden lg:block mt-16" aria-label="In-page navigation">
      <ul className="space-y-6">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`group flex items-center gap-4 transition-all duration-200 ${
                activeSection === item.id ? "" : ""
              }`}
            >
              <span
                className={`h-px transition-all duration-200 ${
                  activeSection === item.id
                    ? "w-16 bg-slate-light"
                    : "w-8 bg-slate group-hover:w-16 group-hover:bg-slate-light"
                }`}
              />
              <span
                className={`text-xs font-bold tracking-widest transition-colors duration-200 ${
                  activeSection === item.id
                    ? "text-slate-light"
                    : "text-slate group-hover:text-slate-light"
                }`}
              >
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
