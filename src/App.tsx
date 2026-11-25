import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { buildLocalizedPath, getStoredLanguage, isLanguage, isLegacySection } from "@/i18n/locales";
import { SmoothScroll } from "@/components/SmoothScroll";
import { getBlogPage } from "@/blog/posts";
import Blog from "./pages/Blog";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const RootRedirect = () => {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      navigate({ pathname: buildLocalizedPath(getStoredLanguage()), search, hash }, { replace: true });
    }
  }, [hash, navigate, pathname, search]);

  if (pathname !== "/") {
    return <NotFound />;
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="mb-4 text-2xl font-bold text-slate-light">Zakaria Safi</h1>
      <nav className="flex gap-4" aria-label="Portfolio language">
        <Link className="text-primary underline" to="/en" lang="en">English</Link>
        <Link className="text-primary underline" to="/ar" lang="ar" dir="rtl">العربية</Link>
      </nav>
    </main>
  );
};

const LocalizedRoute = () => {
  const { lang, section } = useParams();
  const { pathname } = useLocation();
  const legacySection = section && isLegacySection(section) ? section : undefined;

  if (!isLanguage(lang) || (section && !legacySection) || pathname !== buildLocalizedPath(lang, legacySection)) {
    return <NotFound />;
  }

  return <Index />;
};

const BlogRoute = () => {
  const { pathname } = useLocation();
  const page = getBlogPage(pathname);
  return page ? <Blog page={page} /> : <NotFound />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SmoothScroll>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/:lang" element={<LocalizedRoute />} />
          <Route path="/:lang/blog" element={<BlogRoute />} />
          <Route path="/:lang/blog/:slug" element={<BlogRoute />} />
          <Route path="/:lang/:section" element={<LocalizedRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SmoothScroll>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
