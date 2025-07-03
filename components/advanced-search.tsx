"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Home, DollarSign, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface SearchFilters {
  location: string;
  propertyType: string;
  priceRange: number[];
  areaRange: number[];
  bedrooms: string;
  bathrooms: string;
  agioRange: number[];
  installmentsRemaining: number[];
}

export default function AdvancedSearch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    propertyType: "",
    priceRange: [0, 1000000],
    areaRange: [0, 500],
    bedrooms: "",
    bathrooms: "",
    agioRange: [0, 200000],
    installmentsRemaining: [0, 360]
  });

  const propertyTypes = [
    { value: "", label: "Todos os tipos" },
    { value: "apartamento", label: "Apartamento" },
    { value: "casa", label: "Casa" },
    { value: "terreno", label: "Terreno" },
    { value: "comercial", label: "Comercial" }
  ];

  const roomOptions = [
    { value: "", label: "Qualquer" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4+", label: "4+" }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleSearch = () => {
    // Implementar lógica de busca
    console.log("Filtros aplicados:", filters);
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      propertyType: "",
      priceRange: [0, 1000000],
      areaRange: [0, 500],
      bedrooms: "",
      bathrooms: "",
      agioRange: [0, 200000],
      installmentsRemaining: [0, 360]
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Busca Básica */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Cidade, bairro ou região"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="pl-10 h-12"
            />
          </div>

          <select
            value={filters.propertyType}
            onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
            className="h-12 px-4 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
          >
            {propertyTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-12 border-gray-300 hover:border-[#3EA76F]"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtros Avançados
          </Button>

          <Button
            onClick={handleSearch}
            className="h-12 bg-[#3EA76F] hover:bg-[#48C78E]"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </Button>
        </div>
      </div>

      {/* Filtros Avançados */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 border-t border-gray-100">
          <div className="pt-6 space-y-6">
            {/* Faixa de Preço do Ágio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Valor do Ágio: {formatCurrency(filters.agioRange[0])} - {formatCurrency(filters.agioRange[1])}
              </label>
              <Slider
                value={filters.agioRange}
                onValueChange={(value) => setFilters({ ...filters, agioRange: value })}
                max={500000}
                min={0}
                step={10000}
                className="w-full"
              />
            </div>

            {/* Valor Total do Imóvel */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Valor Total: {formatCurrency(filters.priceRange[0])} - {formatCurrency(filters.priceRange[1])}
              </label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                max={2000000}
                min={0}
                step={50000}
                className="w-full"
              />
            </div>

            {/* Área */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Área: {filters.areaRange[0]}m² - {filters.areaRange[1]}m²
              </label>
              <Slider
                value={filters.areaRange}
                onValueChange={(value) => setFilters({ ...filters, areaRange: value })}
                max={1000}
                min={0}
                step={10}
                className="w-full"
              />
            </div>

            {/* Parcelas Restantes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Parcelas Restantes: {filters.installmentsRemaining[0]} - {filters.installmentsRemaining[1]} meses
              </label>
              <Slider
                value={filters.installmentsRemaining}
                onValueChange={(value) => setFilters({ ...filters, installmentsRemaining: value })}
                max={420}
                min={0}
                step={12}
                className="w-full"
              />
            </div>

            {/* Quartos e Banheiros */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quartos
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {roomOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setFilters({ ...filters, bedrooms: option.value })}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        filters.bedrooms === option.value
                          ? "border-[#3EA76F] bg-[#3EA76F] text-white"
                          : "border-gray-300 hover:border-[#3EA76F]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banheiros
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {roomOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setFilters({ ...filters, bathrooms: option.value })}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        filters.bathrooms === option.value
                          ? "border-[#3EA76F] bg-[#3EA76F] text-white"
                          : "border-gray-300 hover:border-[#3EA76F]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="w-4 h-4 mr-2" />
                Limpar Filtros
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsExpanded(false)}
                >
                  Fechar
                </Button>
                <Button
                  onClick={handleSearch}
                  className="bg-[#3EA76F] hover:bg-[#48C78E]"
                >
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}