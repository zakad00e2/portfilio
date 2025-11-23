export const About = () => {
  return (
    <section id="about" className="mb-16 scroll-mt-16 lg:mb-36">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-light">
          About
        </h2>
      </div>
      
      <div className="space-y-4 text-slate leading-relaxed">
        <p>
          I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering. My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability.
        </p>
        
        <p>
          Currently, I'm a Senior Front-End Engineer at{" "}
          <a href="https://www.klaviyo.com/" target="_blank" rel="noopener noreferrer" className="inline-link">
            Klaviyo
          </a>
          , specializing in accessibility. I contribute to the creation and maintenance of UI components that power Klaviyo's frontend, ensuring our platform meets web accessibility standards and best practices to deliver an inclusive user experience.
        </p>
        
        <p>
          In the past, I've had the opportunity to develop software across a variety of settings — from{" "}
          <a href="#" className="inline-link">advertising agencies</a> and{" "}
          <a href="#" className="inline-link">large corporations</a> to{" "}
          <a href="#" className="inline-link">start-ups</a> and{" "}
          <a href="#" className="inline-link">small digital product studios</a>. Additionally, I also released a{" "}
          <a href="#" className="inline-link">comprehensive video course</a> a few years ago, guiding learners through building a web app with the Spotify API.
        </p>
        
        <p>
          In my spare time, I'm usually climbing, playing tennis, hanging out with my wife and two cats, or running around Hyrule searching for{" "}
          <span className="group/korok relative inline-block cursor-help whitespace-nowrap">
            <span className="inline-link">Korok seeds</span>
          </span>
          .
        </p>
      </div>
    </section>
  );
};
