import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Building2, MapPin, BedDouble, Bath, Square } from "lucide-react";
import PropertyCard from "@/components/property-card";
import SearchFilters from "@/components/search-filters";
import FeaturedProperties from "@/components/featured-properties";
import HowItWorks from "@/components/how-it-works";
import HeroCarousel from "@/components/hero-carousel";
import StatsSection from "@/components/ui/stats-section";
import TestimonialsSection from "@/components/ui/testimonials-section";
import Link from "next/link";
import UltimasPropriedades from "@/components/ultimas-propriedades";
import FAQSection from "@/components/faq-section";
import LocationSection from "@/components/location-section"; // Importa a seção de localização

export default function Home() {
  return (
    <>
      <Head>
        <title>Agio Imóveis - Encontre seu novo lar</title>
        <meta
          name="description"
          content="Agio Imóveis - Encontre as melhores oportunidades em imóveis para comprar ou alugar. Anuncie seu imóvel e alcance milhares de interessados."
        />
        <meta
          name="keywords"
          content="imóveis, agio imoveis, casas, apartamentos, terrenos, comercial, anunciar imóvel, comprar imóvel"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.agiomoveis.com.br" />
        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content="Agio Imóveis - Encontre seu novo lar"
        />
        <meta
          property="og:description"
          content="Encontre as melhores oportunidades em imóveis para comprar ou alugar. Anuncie seu imóvel e alcance milhares de interessados."
        />
        <meta property="og:url" content="https://www.agiomoveis.com.br" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Agio Imóveis - Encontre seu novo lar"
        />
        <meta
          name="twitter:description"
          content="Encontre as melhores oportunidades em imóveis para comprar ou alugar."
        />
        <meta name="twitter:image" content="/images/og-image.jpg" />
      </Head>

      <div className="min-h-screen">
        {/* Seção Hero com Carrossel e Filtros de Busca */}
        <section className="relative">
          <HeroCarousel />
          <div className="absolute left-0 right-0 bottom-32 z-10">
            <div className="container mx-auto px-4">
              <SearchFilters />
            </div>
          </div>
        </section>

        {/* Estatísticas */}
        <StatsSection />

        {/* Imóveis em Destaque */}
        <FeaturedProperties />

        {/* Como Funciona */}
        <HowItWorks />

        {/* Depoimentos */}
        <TestimonialsSection />

        {/* Últimas Propriedades */}
        {/* <UltimasPropriedades /> */}

        {/* Seção de Localização */}
        <LocationSection />

        {/* Perguntas Frequentes */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Perguntas Frequentes
            </h2>
            <FAQSection />
          </div>
        </section>

        {/* Call-to-Action para Anunciar Imóvel */}
        <section className="py-16 bg-[#3EA76F]">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Quer Anunciar Seu Imóvel?
            </h2>
            <p className="text-xl mb-8">
              Cadastre-se gratuitamente e alcance milhares de compradores
              interessados.
            </p>
            <Link href={`/anunciar`}>
              <Button size="lg" variant="secondary">
                Anunciar Agora
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
