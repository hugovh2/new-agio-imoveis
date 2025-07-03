"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Home, DollarSign } from "lucide-react";

export default function SearchFilters() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (location) queryParams.append("location", location);
    if (propertyType) queryParams.append("propertyType", propertyType);
    if (priceRange) queryParams.append("priceRange", priceRange);

    router.push(`/buscar?${queryParams.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-5xl mx-auto border border-white/20"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Encontre Seu Imóvel dos Sonhos
        </h2>
        <p className="text-gray-600">
          Busque entre milhares de oportunidades de ágio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Cidade, bairro ou região"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-12 h-14 text-lg border-gray-200 focus:border-[#3EA76F] focus:ring-[#3EA76F]"
          />
        </div>

        <div className="relative">
          <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full h-14 pl-12 pr-4 text-lg rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-[#3EA76F] focus:border-[#3EA76F] appearance-none"
          >
            <option value="">Tipo de Imóvel</option>
            <option value="apartment">Apartamento</option>
            <option value="house">Casa</option>
            <option value="commercial">Comercial</option>
            <option value="terreno">Terreno</option>
          </select>
        </div>

        <div className="relative">
          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full h-14 pl-12 pr-4 text-lg rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-[#3EA76F] focus:border-[#3EA76F] appearance-none"
          >
            <option value="">Faixa de Ágio</option>
            <option value="0-50000">Até R$ 50.000</option>
            <option value="50000-100000">R$ 50.000 - R$ 100.000</option>
            <option value="100000-200000">R$ 100.000 - R$ 200.000</option>
            <option value="200000+">Acima de R$ 200.000</option>
          </select>
        </div>

        <Button
          className="h-14 bg-gradient-to-r from-[#3EA76F] to-[#48C78E] hover:from-[#48C78E] hover:to-[#3EA76F] text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={handleSearch}
        >
          <Search className="w-5 h-5 mr-2" />
          Buscar Agora
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <span className="text-sm text-gray-600">Buscas populares:</span>
        {["Apartamento 2 quartos", "Casa com quintal", "Ágio baixo", "Brasília DF"].map((term) => (
          <button
            key={term}
            onClick={() => {
              setLocation(term);
              handleSearch();
            }}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-[#3EA76F] hover:text-white rounded-full transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </motion.div>
  );
}