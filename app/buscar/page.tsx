"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PropertyCard from "@/components/property-card";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Filter,
  X,
  Loader2,
  Home,
  Building2,
  Store,
  SlidersHorizontal,
  RefreshCcw
} from "lucide-react";

interface Property {
  id: number;
  tipo_imovel: string;
  area: number;
  quartos: number;
  banheiros: number;
  endereco: string;
  descricao: string;
  fotos: string[];
  valor_agio: number;
  valor_parcela_atual: number;
  parcelas_restantes: number;
  valor_total_financiado: number;
  cep: string;
  cidade: string;
}

const propertyTypes = [
  { id: 'all', label: 'Todos', icon: Home },
  { id: 'apartment', label: 'Apartamento', icon: Building2 },
  { id: 'house', label: 'Casa', icon: Home },
  { id: 'commercial', label: 'Comercial', icon: Store },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const filterLocation = searchParams.get("location") || "";
  const filterPropertyType = searchParams.get("propertyType") || "";
  const filterPriceRange = searchParams.get("priceRange") || "";

  const [properties, setProperties] = useState<Property[]>([]);
  // Alterado o valor máximo para 1.000.000 para incluir todos os imóveis
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [areaRange, setAreaRange] = useState([0, 5000]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  const [filters, setFilters] = useState({
    location: filterLocation,
    type: filterPropertyType || "all",
    bedrooms: "any",
    bathrooms: "any",
    sortBy: "recent",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 20;

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  // Atualiza o contador de filtros ativos
  useEffect(() => {
    let count = 0;
    if (filters.location) count++;
    if (filters.type !== "all") count++;
    if (filters.bedrooms !== "any") count++;
    if (filters.bathrooms !== "any") count++;
    // Atualizado para comparar com 1.000.000
    if (priceRange[0] > 0 || priceRange[1] < 1000000) count++;
    if (areaRange[0] > 0 || areaRange[1] < 5000) count++;
    setActiveFilters(count);
  }, [filters, priceRange, areaRange]);

  const resetFilters = () => {
    setFilters({
      location: "",
      type: "all",
      bedrooms: "any",
      bathrooms: "any",
      sortBy: "recent",
    });
    setPriceRange([0, 1000000]); // Resetando para o novo valor máximo
    setAreaRange([0, 5000]);
    setCurrentPage(1);
  };

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("https://agio-imoveis.onrender.com/api/imoveis");
        if (res.ok) {
          const data = await res.json();
          const normalizedData = data.map((property: any) => ({
            ...property,
            fotos: property.fotos && property.fotos.length ? property.fotos : ["/placeholder.jpg"],
          }));
          setProperties(normalizedData);
        }
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const search = filters.location.toLowerCase();
      const matchesLocation =
        property.endereco.toLowerCase().includes(search) ||
        property.cidade.toLowerCase().includes(search);
      const matchesType =
        filters.type === "all" ||
        property.tipo_imovel.toLowerCase() === filters.type;
      let matchesBedrooms = true;
      if (filters.bedrooms !== "any") {
        if (filters.bedrooms === "3+") {
          matchesBedrooms = property.quartos >= 3;
        } else {
          matchesBedrooms = property.quartos === parseInt(filters.bedrooms, 10);
        }
      }
      let matchesBathrooms = true;
      if (filters.bathrooms !== "any") {
        if (filters.bathrooms === "3+") {
          matchesBathrooms = property.banheiros >= 3;
        } else {
          matchesBathrooms = property.banheiros === parseInt(filters.bathrooms, 10);
        }
      }
      const matchesPrice =
        property.valor_agio >= priceRange[0] &&
        property.valor_agio <= priceRange[1];
      const matchesArea =
        property.area >= areaRange[0] &&
        property.area <= areaRange[1];
      return (
        matchesLocation &&
        matchesType &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesPrice &&
        matchesArea
      );
    });
  }, [properties, filters, priceRange, areaRange]);

  const sortedProperties = useMemo(() => {
    const sorted = [...filteredProperties].sort((a, b) => {
      if (filters.sortBy === "recent") {
        return b.id - a.id;
      } else if (filters.sortBy === "price-asc") {
        return a.valor_agio - b.valor_agio;
      } else if (filters.sortBy === "price-desc") {
        return b.valor_agio - a.valor_agio;
      }
      return 0;
    });
    return sorted;
  }, [filteredProperties, filters.sortBy]);

  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);
  const paginatedProperties = useMemo(() => {
    return sortedProperties.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [sortedProperties, currentPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin h-12 w-12 text-[#3EA76F]" />
        <p className="mt-4 text-lg font-medium text-gray-600">Carregando imóveis...</p>
        <p className="text-sm text-gray-500">Aguarde um momento</p>
      </div>
    );
  }

  const FilterSection = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center">
          <SlidersHorizontal className="w-5 h-5 mr-2" />
          Filtros
          {activeFilters > 0 && (
            <span className="ml-2 px-2 py-1 bg-[#3EA76F] text-white text-xs rounded-full">
              {activeFilters}
            </span>
          )}
        </h3>
        {activeFilters > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-gray-500 hover:text-[#3EA76F]"
          >
            <RefreshCcw className="w-4 h-4 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Tipo de Imóvel</label>
          <div className="grid grid-cols-2 gap-2">
            {propertyTypes.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleFilterChange("type", id)}
                className={`p-3 text-sm rounded-lg border flex items-center justify-center gap-2 transition-all ${
                  filters.type === id
                    ? "border-[#3EA76F] bg-[#3EA76F]/10 text-[#3EA76F]"
                    : "border-gray-200 hover:border-[#3EA76F] hover:bg-[#3EA76F]/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Quartos</label>
          <div className="grid grid-cols-4 gap-2">
            {["any", "1", "2", "3+"].map((value) => (
              <button
                key={value}
                onClick={() => handleFilterChange("bedrooms", value)}
                className={`p-2 text-sm rounded-lg border transition-all ${
                  filters.bedrooms === value
                    ? "border-[#3EA76F] bg-[#3EA76F]/10 text-[#3EA76F]"
                    : "border-gray-200 hover:border-[#3EA76F] hover:bg-[#3EA76F]/5"
                }`}
              >
                {value === "any" ? "Todos" : value}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Banheiros</label>
          <div className="grid grid-cols-4 gap-2">
            {["any", "1", "2", "3+"].map((value) => (
              <button
                key={value}
                onClick={() => handleFilterChange("bathrooms", value)}
                className={`p-2 text-sm rounded-lg border transition-all ${
                  filters.bathrooms === value
                    ? "border-[#3EA76F] bg-[#3EA76F]/10 text-[#3EA76F]"
                    : "border-gray-200 hover:border-[#3EA76F] hover:bg-[#3EA76F]/5"
                }`}
              >
                {value === "any" ? "Todos" : value}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
              Valor do Ágio
              <span className="text-xs text-gray-500">
                R$ {priceRange[0].toLocaleString()} - R$ {priceRange[1].toLocaleString()}
              </span>
            </label>
            {/* Alterado o max para 1.000.000 */}
            <Slider
              max={1000000}
              step={10000}
              value={priceRange}
              onValueChange={setPriceRange}
              className="my-6"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
              Área
              <span className="text-xs text-gray-500">
                {areaRange[0]} m² - {areaRange[1]} m²
              </span>
            </label>
            <Slider
              max={5000}
              step={10}
              value={areaRange}
              onValueChange={setAreaRange}
              className="my-6"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    // Adicione um padding-top para compensar a altura do header fixo
    <div className="min-h-screen bg-gray-50 pt-24">
      <section className="bg-gradient-to-r from-[#3EA76F] to-[#48C78E] py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-white text-center mb-8">
              Encontre o Imóvel Ideal para Você
            </h1>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Busque por cidade, bairro ou região"
                    className="pl-10 h-12 text-lg"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  variant="outline"
                  className="h-12 md:w-auto relative"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                  {activeFilters > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#3EA76F] text-white text-xs rounded-full flex items-center justify-center">
                      {activeFilters}
                    </span>
                  )}
                </Button>
                <Button className="h-12 bg-[#3EA76F] hover:bg-[#48C78E] text-lg">
                  <Search className="w-5 h-5 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.aside
            className="hidden lg:block w-80 bg-white p-6 rounded-2xl shadow-lg h-fit sticky top-24"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FilterSection />
          </motion.aside>

          <AnimatePresence>
            {isFiltersOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 bg-black/50 z-50"
                onClick={() => setIsFiltersOpen(false)}
              >
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Filtros</h3>
                    <button
                      onClick={() => setIsFiltersOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <FilterSection mobile />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-gray-600">
                  <span className="font-semibold text-[#3EA76F]">
                    {sortedProperties.length}
                  </span>{" "}
                  {sortedProperties.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
                </p>
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600">Ordenar por:</label>
                  <select
                    className="rounded-lg border border-gray-200 bg-white px-4 h-10 text-sm focus:border-[#3EA76F] focus:ring focus:ring-[#3EA76F]/20"
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  >
                    <option value="recent">Mais recentes</option>
                    <option value="price-asc">Menor preço</option>
                    <option value="price-desc">Maior preço</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedProperties.map((property) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="hover:bg-[#3EA76F] hover:text-white"
                  >
                    Anterior
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      onClick={() => setCurrentPage(i + 1)}
                      className={
                        currentPage === i + 1
                          ? "bg-[#3EA76F] text-white hover:bg-[#48C78E]"
                          : "hover:bg-[#3EA76F] hover:text-white"
                      }
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="hover:bg-[#3EA76F] hover:text-white"
                  >
                    Próxima
                  </Button>
                </nav>
              </div>
            )}

            {paginatedProperties.length === 0 && (
              <div className="text-center py-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-8 shadow-sm"
                >
                  <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Nenhum imóvel encontrado
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Tente ajustar seus filtros para ver mais opções
                  </p>
                  <Button onClick={resetFilters} className="bg-[#3EA76F] hover:bg-[#48C78E]">
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Limpar filtros
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
