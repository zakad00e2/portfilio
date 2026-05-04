export const resources = {
  en: {
    translation: {
      seo: {
        title: "Zakaria Safi | Front-End Engineer",
        description:
          "Portfolio of Zakaria Safi, a front-end engineer building accessible, pixel-perfect web experiences with React, TypeScript, and modern UI systems.",
        author: "Zakaria Safi",
        siteName: "Zakaria Safi Portfolio",
      },
      common: {
        skipToContent: "Skip to Content",
        technologiesUsed: "Technologies used",
        externalLink: "Opens in a new tab",
        languageSwitcher: "Switch language",
      },
      navigation: {
        ariaLabel: "In-page navigation",
        about: "ABOUT",
        experience: "EXPERIENCE",
        projects: "PROJECTS",
      },
      hero: {
        name: "Zakaria Safi",
        title: "Front End Engineer",
        intro: "I build accessible, pixel-perfect digital experiences for the web.",
      },
      about: {
        sectionTitle: "About",
        paragraphs: [
          "I am a passionate Front-End Developer who loves crafting accessible, pixel-perfect user interfaces that combine thoughtful design with solid engineering. I enjoy working at the intersection of design and development, where creativity meets precision, and I take pride in building digital experiences that are visually refined, intuitive, and optimized for performance and usability.",
          "Currently, I work as a Freelance Front-End Developer, delivering custom web solutions for clients across different industries. I focus on creating high-quality, user-friendly interfaces that adhere to modern web standards, with a strong emphasis on accessibility to ensure an inclusive experience for all users. My work includes designing and developing polished UI components, optimizing performance, and integrating front-end applications with APIs to deliver complete, professional solutions.",
          "Recently, I graduated with Distinction in Software Engineering, a journey that provided me with a solid foundation in software development principles, system design, and data structures. Throughout my studies, I worked on multiple hands-on projects that allowed me to apply theoretical knowledge in real development environments, further strengthening my passion for building interactive, high-quality web experiences.",
        ],
      },
      experience: {
        sectionTitle: "Experience",
        linkLabel: "{{title}} at {{company}}",
        viewFullResume: "View Full Resume",
        items: [
          {
            period: "2024 - PRESENT",
            title: "Freelance Front-End Developer",
            company: "Forlanso",
            url: "https://www.forlanso.com/ar/zkrya-safy",
            description:
              "Delivered responsive and modern web interfaces for local clients, enhancing user engagement and overall visual appeal while optimizing performance for portfolio and business websites to improve load times and accessibility. Additionally, collaborated closely with clients to implement custom UI solutions, increasing satisfaction and encouraging repeat visits.",
            technologies: ["JavaScript", "TypeScript", "React", "Tailwind CSS", "Next.js"],
          },
          {
            period: "2023 - 2024",
            title: "Front-End Developer",
            company: "Personal & Open-Source Projects",
            description:
              "Built multiple personal and open-source projects to strengthen front-end fundamentals, including responsive landing pages, interactive UI components, and API-powered applications. Focused on clean architecture, reusable components, and modern JavaScript patterns. Contributed to improving accessibility, performance, and cross-browser compatibility across several projects.",
            technologies: ["JavaScript", "Git", "CSS3", "REST APIs"],
          },
          {
            period: "2023",
            title: "Front-End Volunteer Developer",
            company: "Community Projects",
            description:
              "Collaborated with a small team to develop user-friendly pages for community and student initiatives. Helped design responsive layouts, fix UI bugs, and implement features such as contact forms, simple dashboards, and blog layouts. Ensured smooth deployment workflows and continuous updates based on user feedback.",
            technologies: ["HTML", "CSS", "Bootstrap", "UI Debugging", "GitHub"],
          },
          {
            period: "2022 - 2024",
            title: "Web Development Intern",
            description:
              "Assisted in maintaining front-end components and improving overall website speed for academic and small business projects, while supporting the debugging of JavaScript features and contributing to enhanced front-end performance and stability.",
            technologies: ["React", "HTML", "CSS", "Git", "JavaScript"],
          },
        ],
      },
      projects: {
        sectionTitle: "Projects",
        items: [
          {
            image: "/athr.png",
            title: "Athr",
            description:
              "Athr is a bilingual Portfolio & CMS web platform created for Dema to showcase her work in creative consulting, event design, and brand experience production. The site pairs a modern Arabic/English interface with smooth interactive motion, and includes public pages for projects and workshops plus a custom admin panel for managing content and events.",
            technologies: ["React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "Vite"],
            url: "https://www.leaveanathr.com/",
          },
          {
            image: "/oday-tourism.png",
            title: "Oday Tourism",
            description:
              "A multilingual tourism web platform that lets users browse and book hotels, travel programs, and airport reception services with ease. It includes a booking cart and a complete admin dashboard, with a strong focus on performance, responsive user experience, and SEO-friendly delivery.",
            technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
            url: "https://www.odaytourism.com/ar",
          },
          {
            image: "/architectural-portfolio.png",
            title: "Architectural Portfolio",
            description:
              "A modern interactive website for a studio specializing in residential space renovation and improvement services. It presents the studio's services, previous work gallery, and client contact flow through a polished interface designed to communicate quality, function, and visual refinement.",
            technologies: ["React.js", "Vite", "Tailwind CSS", "TypeScript"],
            url: "https://archeng.vercel.app/",
          },
          {
            image: "/Screenshot 2026-02-11 231128.png",
            title: "Maisam",
            description:
              "Design and development of a full-featured website for coach Maisam, offering personalized health and nutrition services for women. The site presents services in a modern, engaging style, including programs for pregnant and breastfeeding women, health workshops, and personal coaching, with a strong focus on a comfortable user experience that reflects the vision of a balanced, healthy lifestyle.",
            technologies: ["React", "TypeScript", "Tailwind CSS", "Figma"],
            url: "https://www.withmaysam.com/",
          },
          {
            image: "/Screenshot 2026-02-11 225245.png",
            title: "SakanGaza",
            description:
              "Sakan Gaza is a volunteer housing platform that helps displaced people in Gaza find homes for rent or purchase. It features a fully Arabic RTL interface built with React and TypeScript, uses Supabase for authentication and storage, and includes listing management, image uploads, search filters, and admin moderation tools.",
            technologies: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Supabase"],
            url: "https://sakangaza.com/",
          },
          {
            image: "/market.png",
            title: "MarketPro",
            description:
              "Interactive multi-vendor e-commerce UI. Includes product/category pages, dynamic cart, vendor pages, seller dashboard, and key support pages, focused on clean architecture and a smooth user experience.",
            technologies: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
            url: "https://arise-market-core.vercel.app/",
          },
          {
            image: "/stayle.png",
            title: "ELARA - Timeless Fashion & Conscious Design.",
            description:
              "Designed and developed a full e-commerce website for a luxury fashion brand, delivering a modern, elegant UI and a seamless shopping experience. The site includes product and collection pages, a complete shopping cart system, and robust state management, with responsive performance across all devices.",
            technologies: ["React", "TypeScript", "Tailwind CSS"],
            url: "https://style-blueprint.vercel.app/",
          },
          {
            image: "/art.png",
            title: "Artist Lens Hub",
            description:
              "Portfolio for a contemporary visual artist, designed to showcase abstract artworks in an elegant, gallery-inspired layout. Built with React, Vite, and Tailwind CSS, it features a captivating hero section, a curated gallery experience, and a dedicated contact area for inquiries and commission requests, all optimized for a smooth and immersive user experience.",
            technologies: ["React", "API", "Tailwind CSS"],
            url: "https://artist-lens-hub-kqu1.vercel.app/",
          },
          {
            image: "/Screenshot 2025-12-01 122458.png",
            title: "Vertex AI",
            description:
              "Vertex AI is a modern website designed for a digital agency specializing in artificial intelligence solutions and web development. It delivers a fast, contemporary user experience with elegant interfaces and smooth animations that reflect the agency's technological identity.",
            technologies: ["React", "Tailwind CSS", "TypeScript", "shadcn/ui", "Framer Motion", "TanStack Query"],
            url: "https://vertex-ai-peach.vercel.app/",
          },
          {
            image: "/1.png",
            title: "Digital Library",
            description:
              "A modern digital publishing platform built with React and TypeScript. It combines a social blog feed, knowledge wiki, and digital bookstore within a sleek, high-performance interface. The platform features a fully responsive Tailwind-powered design, multi-language support (i18n), and a content-focused user experience.",
            technologies: ["React", "Tailwind CSS", "TypeScript", "i18n"],
            url: "https://pure-scribe-muse2.vercel.app/",
          },
          {
            image: "/2.png",
            title: "Dashboard",
            description:
              "An administrative dashboard designed for data visualization, management, and monitoring of key performance indicators (KPIs). It features charts, tables, and user management tools.",
            technologies: ["React", "Material UI", "Chart.js"],
            url: "https://dashboard-swart-two-88.vercel.app/",
          },
          {
            image: "/3.png",
            title: "Tshtri",
            description:
              "Tshtri is a comprehensive e-commerce platform that offers a seamless shopping experience. It features a user-friendly interface, secure payment gateways, and robust inventory management, making it easy for businesses to sell products online.",
            technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
            url: "https://tshtri.vercel.app/",
          },
        ],
      },
      notFound: {
        title: "404",
        message: "Oops! Page not found",
        homeLink: "Return to Home",
      },
    },
  },
  ar: {
    translation: {
      seo: {
        title: "زكريا صافي | مهندس واجهات أمامية",
        description:
          "معرض أعمال زكريا صافي، مهندس واجهات أمامية يبني تجارب ويب دقيقة، سهلة الوصول، وسريعة باستخدام React وTypeScript وأنظمة واجهات حديثة.",
        author: "زكريا صافي",
        siteName: "معرض أعمال زكريا صافي",
      },
      common: {
        skipToContent: "تجاوز إلى المحتوى",
        technologiesUsed: "التقنيات المستخدمة",
        externalLink: "يفتح في تبويب جديد",
        languageSwitcher: "تغيير اللغة",
      },
      navigation: {
        ariaLabel: "التنقل داخل الصفحة",
        about: "نبذة عني",
        experience: "الخبرات",
        projects: "المشاريع",
      },
      hero: {
        name: "زكريا صافي",
        title: "مهندس واجهات أمامية",
        intro: "أبني تجارب رقمية سهلة الوصول، دقيقة بصرياً، ومصممة بعناية للويب.",
      },
      about: {
        sectionTitle: "نبذة عني",
        paragraphs: [
          "أنا مطور واجهات أمامية شغوف ببناء واجهات مستخدم سهلة الوصول ودقيقة في تفاصيلها، تجمع بين التصميم المدروس والهندسة المتينة. أعمل في المساحة التي يلتقي فيها التصميم بالتطوير، حيث تتحول الأفكار الإبداعية إلى تجارب واضحة، أنيقة، وسريعة الاستخدام.",
          "أعمل حالياً كمطور واجهات أمامية مستقل، وأقدم حلول ويب مخصصة لعملاء من قطاعات مختلفة. أركز على بناء واجهات عالية الجودة وسهلة الاستخدام ومتوافقة مع معايير الويب الحديثة، مع اهتمام خاص بإمكانية الوصول حتى تكون التجربة شاملة ومريحة لجميع المستخدمين.",
          "تخرجت مؤخراً بتقدير امتياز في هندسة البرمجيات، وهي تجربة منحتني أساساً قوياً في مبادئ تطوير البرمجيات، تصميم الأنظمة، وهياكل البيانات. خلال الدراسة عملت على مشاريع تطبيقية متعددة ساعدتني على تحويل المعرفة النظرية إلى حلول عملية، وزادت شغفي ببناء تجارب ويب تفاعلية واحترافية.",
        ],
      },
      experience: {
        sectionTitle: "الخبرات",
        linkLabel: "{{title}} لدى {{company}}",
        viewFullResume: "عرض السيرة الذاتية كاملة",
        items: [
          {
            period: "2024 - الآن",
            title: "مطور واجهات أمامية مستقل",
            company: "Forlanso",
            url: "https://www.forlanso.com/ar/zkrya-safy",
            description:
              "نفذت واجهات ويب حديثة ومتجاوبة لعملاء محليين، مع تحسين التفاعل البصري وتجربة المستخدم ورفع أداء مواقع الأعمال ومعارض الأعمال من حيث سرعة التحميل وإمكانية الوصول. كما تعاونت بشكل مباشر مع العملاء لتنفيذ حلول واجهات مخصصة تعكس أهدافهم وتزيد رضا المستخدمين.",
            technologies: ["JavaScript", "TypeScript", "React", "Tailwind CSS", "Next.js"],
          },
          {
            period: "2023 - 2024",
            title: "مطور واجهات أمامية",
            company: "مشاريع شخصية ومفتوحة المصدر",
            description:
              "بنيت عدة مشاريع شخصية ومفتوحة المصدر لتعميق مهارات الواجهات الأمامية، شملت صفحات هبوط متجاوبة، مكونات تفاعلية، وتطبيقات تعتمد على واجهات API. ركزت على بنية نظيفة، مكونات قابلة لإعادة الاستخدام، وأنماط JavaScript حديثة، مع تحسين إمكانية الوصول والأداء والتوافق بين المتصفحات.",
            technologies: ["JavaScript", "Git", "CSS3", "REST APIs"],
          },
          {
            period: "2023",
            title: "مطور واجهات أمامية متطوع",
            company: "مشاريع مجتمعية",
            description:
              "تعاونت مع فريق صغير لتطوير صفحات سهلة الاستخدام لمبادرات مجتمعية وطلابية. ساعدت في تصميم تخطيطات متجاوبة، معالجة مشاكل الواجهة، وتنفيذ ميزات مثل نماذج التواصل، لوحات بسيطة، وتخطيطات للمدونات، مع متابعة النشر والتحديثات بناءً على ملاحظات المستخدمين.",
            technologies: ["HTML", "CSS", "Bootstrap", "UI Debugging", "GitHub"],
          },
          {
            period: "2022 - 2024",
            title: "متدرب في تطوير الويب",
            description:
              "ساهمت في صيانة مكونات الواجهة وتحسين سرعة المواقع لمشاريع أكاديمية ومشاريع أعمال صغيرة، مع دعم إصلاح مشاكل JavaScript وتحسين أداء الواجهة الأمامية واستقرارها.",
            technologies: ["React", "HTML", "CSS", "Git", "JavaScript"],
          },
        ],
      },
      projects: {
        sectionTitle: "المشاريع",
        items: [
          {
            image: "/athr.png",
            title: "أثر",
            description:
              "منصة ثنائية اللغة تجمع بين معرض أعمال ونظام إدارة محتوى، صممت لديما لعرض أعمالها في الاستشارات الإبداعية، تصميم الفعاليات، وإنتاج تجارب العلامات التجارية. يجمع الموقع بين واجهة عربية/إنجليزية حديثة وحركة تفاعلية سلسة، مع صفحات عامة للمشاريع والورش ولوحة إدارة مخصصة للمحتوى والفعاليات.",
            technologies: ["React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "Vite"],
            url: "https://www.leaveanathr.com/",
          },
          {
            image: "/oday-tourism.png",
            title: "عدي للسياحة",
            description:
              "منصة سياحية متعددة اللغات تتيح للمستخدمين تصفح وحجز الفنادق والبرامج السياحية وخدمات الاستقبال في المطار بسهولة. تضم سلة حجز ولوحة إدارة متكاملة، مع تركيز واضح على الأداء، التجاوب، وتحسين الظهور في محركات البحث.",
            technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
            url: "https://www.odaytourism.com/ar",
          },
          {
            image: "/architectural-portfolio.png",
            title: "معرض أعمال معماري",
            description:
              "موقع تفاعلي حديث لاستوديو متخصص في تجديد وتحسين المساحات السكنية. يعرض الخدمات، نماذج الأعمال السابقة، ومسار تواصل العملاء من خلال واجهة مصقولة تعكس الجودة والوظيفة والاهتمام بالتفاصيل البصرية.",
            technologies: ["React.js", "Vite", "Tailwind CSS", "TypeScript"],
            url: "https://archeng.vercel.app/",
          },
          {
            image: "/Screenshot 2026-02-11 231128.png",
            title: "ميسم",
            description:
              "تصميم وتطوير موقع متكامل للمدربة ميسم، يعرض خدمات الصحة والتغذية المخصصة للنساء. يقدم الموقع البرامج والخدمات بأسلوب حديث وجذاب، بما في ذلك برامج الحوامل والمرضعات، الورش الصحية، والتدريب الشخصي، مع تجربة استخدام مريحة تعكس رؤية حياة صحية ومتوازنة.",
            technologies: ["React", "TypeScript", "Tailwind CSS", "Figma"],
            url: "https://www.withmaysam.com/",
          },
          {
            image: "/Screenshot 2026-02-11 225245.png",
            title: "سكن غزة",
            description:
              "منصة إسكان تطوعية تساعد النازحين في غزة على العثور على منازل للإيجار أو الشراء. تعتمد واجهة عربية كاملة باتجاه RTL مبنية بـ React وTypeScript، وتستخدم Supabase للمصادقة والتخزين، مع إدارة إعلانات، رفع صور، فلاتر بحث، وأدوات إشراف للإدارة.",
            technologies: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Supabase"],
            url: "https://sakangaza.com/",
          },
          {
            image: "/market.png",
            title: "MarketPro",
            description:
              "واجهة تجارة إلكترونية تفاعلية متعددة البائعين، تشمل صفحات المنتجات والتصنيفات، سلة ديناميكية، صفحات البائعين، لوحة تحكم للبائع، وصفحات دعم أساسية، مع تركيز على بنية واضحة وتجربة استخدام سلسة.",
            technologies: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
            url: "https://arise-market-core.vercel.app/",
          },
          {
            image: "/stayle.png",
            title: "إيلارا - أزياء خالدة وتصميم واع",
            description:
              "تصميم وتطوير متجر إلكتروني كامل لعلامة أزياء فاخرة، بواجهة أنيقة وحديثة وتجربة تسوق سلسة. يضم الموقع صفحات منتجات ومجموعات، نظام سلة متكامل، وإدارة حالة قوية، مع أداء متجاوب على مختلف الأجهزة.",
            technologies: ["React", "TypeScript", "Tailwind CSS"],
            url: "https://style-blueprint.vercel.app/",
          },
          {
            image: "/art.png",
            title: "Artist Lens Hub",
            description:
              "معرض أعمال لفنان بصري معاصر، صمم لعرض الأعمال التجريدية ضمن تجربة أنيقة مستوحاة من صالات العرض. بُني باستخدام React وVite وTailwind CSS، ويضم قسماً افتتاحياً جذاباً، تجربة معرض منتقاة، ومنطقة تواصل للاستفسارات وطلبات الأعمال الفنية، مع أداء سلس وتجربة غامرة.",
            technologies: ["React", "API", "Tailwind CSS"],
            url: "https://artist-lens-hub-kqu1.vercel.app/",
          },
          {
            image: "/Screenshot 2025-12-01 122458.png",
            title: "Vertex AI",
            description:
              "موقع حديث لوكالة رقمية متخصصة في حلول الذكاء الاصطناعي وتطوير الويب. يقدم تجربة سريعة ومعاصرة بواجهات أنيقة وحركات سلسة تعكس الهوية التقنية للوكالة.",
            technologies: ["React", "Tailwind CSS", "TypeScript", "shadcn/ui", "Framer Motion", "TanStack Query"],
            url: "https://vertex-ai-peach.vercel.app/",
          },
          {
            image: "/1.png",
            title: "المكتبة الرقمية",
            description:
              "منصة نشر رقمية حديثة مبنية بـ React وTypeScript، تجمع بين موجز اجتماعي للمدونات، موسوعة معرفية، ومتجر كتب رقمي داخل واجهة سريعة وأنيقة. تتميز بتصميم متجاوب بالكامل باستخدام Tailwind، دعم تعدد اللغات، وتجربة موجهة للمحتوى.",
            technologies: ["React", "Tailwind CSS", "TypeScript", "i18n"],
            url: "https://pure-scribe-muse2.vercel.app/",
          },
          {
            image: "/2.png",
            title: "لوحة تحكم",
            description:
              "لوحة إدارة مخصصة لعرض البيانات وإدارتها ومراقبة مؤشرات الأداء الرئيسية. تضم عادةً مخططات، جداول، وأدوات لإدارة المستخدمين ضمن تجربة عملية ومنظمة.",
            technologies: ["React", "Material UI", "Chart.js"],
            url: "https://dashboard-swart-two-88.vercel.app/",
          },
          {
            image: "/3.png",
            title: "Tshtri",
            description:
              "منصة تجارة إلكترونية شاملة تقدم تجربة تسوق سلسة، بواجهة سهلة الاستخدام، بوابات دفع آمنة، وإدارة مخزون قوية، مما يساعد الأعمال على بيع منتجاتها عبر الإنترنت بسهولة.",
            technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
            url: "https://tshtri.vercel.app/",
          },
        ],
      },
      notFound: {
        title: "404",
        message: "الصفحة غير موجودة",
        homeLink: "العودة إلى الرئيسية",
      },
    },
  },
} as const;
