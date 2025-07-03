import Head from "next/head";
import { Button } from "@/components/ui/button";
import SearchFilters from "@/components/search-filters";
import FeaturedProperties from "@/components/featured-properties";
import HowItWorks from "@/components/how-it-works";
import HeroCarousel from "@/components/hero-carousel";
import StatsSection from "@/components/ui/stats-section";
import TestimonialsSection from "@/components/ui/testimonials-section";
import FinancingSimulator from "@/components/financing-simulator";
import AdvancedSearch from "@/components/advanced-search";
import OpportunityHighlights from "@/components/opportunity-highlights";
import Link from "next/link";
import FAQSection from "@/components/faq-section";
import PlanosSection from "@/components/nossos-planos";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ágio Imóveis - Encontre seu novo lar com economia</title>
        <meta
          name="description"
          content="Ágio Imóveis - Encontre as melhores oportunidades em imóveis com ágio. Economize até 70% na compra do seu imóvel dos sonhos. Simuladores, filtros avançados e suporte especializado."
        />
        <meta
          name="keywords"
          content="imóveis, agio imoveis, casas, apartamentos, terrenos, comercial, anunciar imóvel, comprar imóvel, financiamento, economia, ágio baixo"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.agiomoveis.com.br" />
        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content="Ágio Imóveis - Encontre seu novo lar com economia"
        />
        <meta
          property="og:description"
          content="Encontre as melhores oportunidades em imóveis com ágio. Economize até 70% na compra do seu imóvel dos sonhos."
        />
        <meta property="og:url" content="https://www.agiomoveis.com.br" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Ágio Imóveis - Encontre seu novo lar com economia"
        />
        <meta
          name="twitter:description"
          content="Encontre as melhores oportunidades em imóveis com ágio. Economize até 70%."
        />
        <meta name="twitter:image" content="/images/og-image.jpg" />
      </Head>

      <div className="min-h-screen">
        {/* Seção Hero com Carrossel e Busca Avançada */}
        <section className="relative">
          <HeroCarousel />
          <div className="absolute left-0 right-0 bottom-32 z-10">
            <div className="container mx-auto px-4">
              <AdvancedSearch />
            </div>
          </div>
        </section>

        {/* Estatísticas */}
        <StatsSection />

        {/* Oportunidades em Destaque */}
        <OpportunityHighlights />

        {/* Simulador de Financiamento */}
        <FinancingSimulator />

        {/* Imóveis em Destaque */}
        <FeaturedProperties />

        {/* Como Funciona */}
        <HowItWorks />

        {/* Depoimentos */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">
              Perguntas Frequentes
            </h2>
            <div className="max-w-3xl mx-auto">
              <FAQSection />
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">
              Nossos Planos
            </h2>
            <PlanosSection />
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#3EA76F] to-[#48C78E] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80')] opacity-10" />
          <div className="container mx-auto px-4 text-center text-white relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Realize o Sonho da Casa Própria
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Cadastre-se gratuitamente e tenha acesso às melhores oportunidades de ágio. 
              Economize até 70% na compra do seu imóvel!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/anunciar">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6 hover:scale-105 transition-transform"
                >
                  Anunciar Meu Imóvel
                </Button>
              </Link>
              <Link href="/buscar">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-[#3EA76F] transition-all"
                >
                  Buscar Oportunidades
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}