"use client";

import { FaCircle, FaHouse, FaTriangleExclamation } from "react-icons/fa6";
import Link from "next/link";
import { Button, Card } from "@/components/ui";
import { useTranslations } from "next-intl";
import usePlatform, { PLATFORM } from "@/hooks/usePlatform";

export default function NotFoundCard() {
  const t = useTranslations("NotFound");
  const platform = usePlatform();
  const isMobile = platform === PLATFORM.MOBILE;
  const stripes = Array.from({ length: isMobile ? 10 : 18 }, (_, index) => index);
  const numberOfLights = Array.from({ length: 2 }, (_, index) => index);

  return (
    <Card
      role="alert"
      aria-labelledby="not-found-heading"
      aria-describedby="not-found-description"
      hoverEffect={false}
      disableHover={true}
    >
      <Card.Header className="text-center relative">
        <div className="flex items-center justify-center gap-2">

          <div className="banner-1 absolute top-0 left-0 w-full h-4 bg-yellow-400">
            <div className="overflow-hidden flex gap-2">
              {stripes.map((stripe) => (
                <div key={stripe} className="stripe w-1/4 h-4 bg-black rotate-125" />
              ))}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-around">
              {numberOfLights.map((light, index) => (
                <div key={light} className="w-15 h-15 relative">
                  <FaCircle className={`size-full text-amber-600 border-3 border-yellow-400 rounded-full absolute top-0 left-0 ${index === 0 ? "" : "delay-500"}`} />
                  <FaCircle className={`size-full text-yellow-400 animate-ping rounded-full absolute top-0 left-0 ${index === 0 ? "" : "delay-500"}`} />
                </div>
              ))}
            </div>
          </div>

          <FaTriangleExclamation className="text-6xl text-amber-400 mt-8" />
        </div>
        <h1 id="not-found-heading" className="text-4xl font-bold mb-2">
          {t("heading")}
        </h1>
        <h2 className="text-xl text-foreground/80 mb-4">{t("subheading")}</h2>
      </Card.Header>
      <Card.Content>
        <p id="not-found-description" className="text-foreground/60 mb-8 text-center">
          {t("description")}
        </p>
      </Card.Content>
      <Card.Footer className="relative">
        <Link href="/">
          <Button
            size="lg"
            variant="default"
            aria-label={t("label")}
            className="w-full bg-yellow-400/90 text-black hover:bg-yellow-400 mb-6"
          >
            <FaHouse />
            {t("button")}
          </Button>
        </Link>

        <div className="absolute bottom-0 left-0 w-full h-4 bg-yellow-400">
            <div className="overflow-hidden flex gap-2">
              {stripes.map((stripe) => (
                <div key={stripe} className="stripe w-1/4 h-4 bg-black rotate-125" />
              ))}
            </div>
          </div>
      </Card.Footer>
    </Card>
  );
}
