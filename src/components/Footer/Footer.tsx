import { FaHeart } from "react-icons/fa6";
import Socials from "@/components/Footer/Socials";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="p-6 text-sm flex flex-col gap-6 justify-center items-center bg-card text-muted-foreground">
      <div className="container">
        <div className="flex justify-center md:justify-end items-center gap-2 mb-4">
          <Socials />
        </div>
        <small className="flex justify-center md:justify-end items-center gap-2">
          <span>{t("madeWith")}</span>
          <FaHeart className="text-pink-500" aria-label={t("love")} />
          <span>
            {t("by")} · © {new Date().getFullYear()}
          </span>
        </small>
      </div>
    </footer>
  );
}
