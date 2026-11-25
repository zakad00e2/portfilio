import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
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
      <h1 className="mb-4 text-2xl font-bold text-slate-light">زكريا صافي</h1>
      <a className="text-primary underline" href="/ar">زيارة الموقع</a>
    </main>
  );
};

const LocalizedRoute = () => {
  const { lang, section } = useParams();
  const { pathname, search, hash } = useLocation();
  const legacySection = section && isLegacySection(section) ? section : undefined;

  if (lang === "en") {
    return <Navigate to={{ pathname: buildLocalizedPath("ar", legacySection), search, hash }} replace />;
  }

  if (!isLanguage(lang) || (section && !legacySection) || pathname !== buildLocalizedPath(lang, legacySection)) {
    return <NotFound />;
  }

  return <Index />;
};

const BlogRoute = () => {
  const { pathname, search, hash } = useLocation();
  if (pathname.startsWith("/en/")) {
    return <Navigate to={{ pathname: pathname.replace(/^\/en/, "/ar"), search, hash }} replace />;
  }
  const page = getBlogPage(pathname);
  return page ? <Blog page={page} /> : <NotFound />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Analytics />
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
