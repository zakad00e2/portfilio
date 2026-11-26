import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/use-locale";
import { sections } from "@/i18n/locales";

export const MobileNavigation = () => {
  const { t } = useTranslation();
  const { direction } = useLocale();

  return (
    <div className="lg:hidden">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            type="button"
            aria-label={t("navigation.menu")}
            className="flex h-11 w-11 items-center justify-center rounded-full text-slate-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="mobile-menu-overlay fixed inset-0 z-50" />
          <Dialog.Content dir={direction} aria-describedby={undefined} className="mobile-menu-content fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-6 text-slate-light focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 motion-reduce:animate-none">
            <Dialog.Title className="sr-only">{t("navigation.menu")}</Dialog.Title>
            <Dialog.Close asChild>
              <button type="button" aria-label={direction === "rtl" ? "إغلاق القائمة" : "Close menu"} className="absolute left-4 top-[calc(1rem+env(safe-area-inset-top))] flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <Menu aria-hidden="true" className="mobile-menu-icon-open absolute h-5 w-5" />
                <X aria-hidden="true" className="mobile-menu-icon-close absolute h-5 w-5" />
              </button>
            </Dialog.Close>
            <nav aria-label={t("navigation.ariaLabel")} className="mobile-menu-links flex flex-col items-center gap-2 text-center">
              {sections.map((section) => (
                <Dialog.Close asChild key={section}>
                  <Link to={`#${section}`} className="rounded-lg px-6 py-3 text-xl transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    {t(`navigation.${section}`)}
                  </Link>
                </Dialog.Close>
              ))}
              <Dialog.Close asChild>
                <Link to="#blog" className="rounded-lg px-6 py-3 text-xl transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  {t("navigation.blog")}
                </Link>
              </Dialog.Close>
            </nav>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
