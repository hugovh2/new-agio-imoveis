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

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <HeroCarousel />
        <div className="absolute left-0 right-0 bottom-32 z-10">
          <div className="container mx-auto px-4">
            <SearchFilters />
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Featured Properties */}
      <FeaturedProperties />

      {/* How it Works */}
      <HowItWorks />

      <TestimonialsSection />

      {/* Latest Properties */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Últimas Oportunidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <PropertyCard key={i} index={i - 1} />
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 bg-[#3EA76F]">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Quer Anunciar Seu Imóvel?</h2>
          <p className="text-xl mb-8">Cadastre-se gratuitamente e alcance milhares de compradores interessados</p>
          <Button size="lg" variant="secondary">
            Anunciar Agora
          </Button>
        </div>
      </section>
    </div>
  );
}