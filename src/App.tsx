import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { buildLocalizedPath, getStoredLanguage, isLanguage, isSectionSlug } from "@/i18n/locales";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const RootRedirect = () => <Navigate to={buildLocalizedPath(getStoredLanguage())} replace />;

const LocalizedRoute = () => {
  const { lang, section } = useParams();

  if (!isLanguage(lang) || (section && !isSectionSlug(section))) {
    return <NotFound />;
  }

  return <Index />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/:lang" element={<LocalizedRoute />} />
          <Route path="/:lang/:section" element={<LocalizedRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
