import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLocale } from "@/hooks/use-locale";
import { sections } from "@/i18n/locales";

export const MobileNavigation = () => {
  const { t } = useTranslation();
  const { direction } = useLocale();

  return (
    <div className="lg:hidden">
      <DropdownMenu modal={false} dir={direction}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label={t("navigation.menu")}
            className="flex h-11 w-11 items-center justify-center rounded-full text-slate-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={8} className="min-w-44 border-slate-light/10 bg-navy-light p-2 text-slate-light motion-reduce:animate-none">
          {sections.map((section) => (
            <DropdownMenuItem key={section} asChild className="cursor-pointer px-4 py-3 text-base focus:bg-slate-light/10 focus:text-primary">
              <Link to={`#${section}`}>{t(`navigation.${section}`)}</Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem asChild className="cursor-pointer px-4 py-3 text-base focus:bg-slate-light/10 focus:text-primary">
            <Link to="#blog">{t("navigation.blog")}</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
