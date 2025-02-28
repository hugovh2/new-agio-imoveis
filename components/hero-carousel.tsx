"use client";

import Head from "next/head";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Encontre o Imóvel dos Seus Sonhos",
    subtitle: "As melhores oportunidades de ágio em um só lugar",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Apartamentos Modernos",
    subtitle: "Descubra as melhores opções de moradia",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Casas Exclusivas",
    subtitle: "Realize o sonho da casa própria",
  },
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    
    // Auto-play
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(autoplay);
    };
  }, [emblaApi, onSelect]);

  return (
    <>
      <Head>
        <title>Agio Imóveis - Carousel</title>
        <meta
          name="description"
          content="Descubra imóveis incríveis com o nosso Hero Carousel. Encontre o imóvel dos seus sonhos com as melhores oportunidades."
        />
        <meta
          name="keywords"
          content="imóveis, agio imoveis, carousel, hero, casas, apartamentos, ágio"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.agiomoveis.com.br" />
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Agio Imóveis - Carousel" />
        <meta
          property="og:description"
          content="Descubra imóveis incríveis com o nosso Hero Carousel. Encontre o imóvel dos seus sonhos com as melhores oportunidades."
        />
        <meta property="og:url" content="https://www.agiomoveis.com.br" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image-carousel.jpg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Agio Imóveis - Carousel" />
        <meta
          name="twitter:description"
          content="Descubra imóveis incríveis com o nosso Hero Carousel. Encontre o imóvel dos seus sonhos com as melhores oportunidades."
        />
        <meta name="twitter:image" content="/images/og-image-carousel.jpg" />
      </Head>
      <div className="relative h-[600px]">
        <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide, index) => (
              <div key={index} className="relative flex-[0_0_100%]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#3EA76F]/90 to-[#48C78E]/90" />
                <div className="relative h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-5xl font-bold mb-6">{slide.title}</h1>
                    <p className="text-xl mb-8">{slide.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={scrollNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedIndex ? "bg-white w-4" : "bg-white/50"
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
