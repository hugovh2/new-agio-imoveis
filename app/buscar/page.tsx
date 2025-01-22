"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PropertyCard from "@/components/property-card";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Home,
  Building2,
  BedDouble,
  Bath,
  Square,
  ArrowUpDown,
  Filter,
  X,
} from "lucide-react";

export default function SearchPage() {
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    type: "all",
    bedrooms: "any",
    bathrooms: "any",
    sortBy: "recent",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Search Header */}
      <section className="bg-gradient-to-r from-[#3EA76F] to-[#48C78E] py-8 lg:py-12">
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
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Busque por cidade, bairro ou região"
                    className="pl-10 h-12"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  variant="outline"
                  className="h-12 md:w-auto"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
                <Button className="h-12 bg-[#3EA76F] hover:bg-[#48C78E]">
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <motion.aside
            className="hidden lg:block w-80 space-y-6 bg-white p-6 rounded-xl shadow-lg h-fit sticky top-24"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filtros
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Tipo de Imóvel
                    </label>
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 h-10"
                      value={filters.type}
                      onChange={(e) => handleFilterChange("type", e.target.value)}
                    >
                      <option value="all">Todos</option>
                      <option value="apartment">Apartamento</option>
                      <option value="house">Casa</option>
                      <option value="commercial">Comercial</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Quartos
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {["any", "1", "2", "3+"].map((value) => (
                        <button
                          key={value}
                          onClick={() => handleFilterChange("bedrooms", value)}
                          className={`p-2 text-sm rounded-md border transition-colors ${
                            filters.bedrooms === value
                              ? "border-[#3EA76F] bg-[#3EA76F]/10 text-[#3EA76F]"
                              : "border-gray-200 hover:border-[#3EA76F]"
                          }`}
                        >
                          {value === "any" ? "Todos" : value}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Banheiros
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {["any", "1", "2", "3+"].map((value) => (
                        <button
                          key={value}
                          onClick={() => handleFilterChange("bathrooms", value)}
                          className={`p-2 text-sm rounded-md border transition-colors ${
                            filters.bathrooms === value
                              ? "border-[#3EA76F] bg-[#3EA76F]/10 text-[#3EA76F]"
                              : "border-gray-200 hover:border-[#3EA76F]"
                          }`}
                        >
                          {value === "any" ? "Todos" : value}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Valor do Ágio (R$)
                    </label>
                    <Slider
                      defaultValue={[0, 500000]}
                      max={500000}
                      step={10000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-6"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>R$ {priceRange[0].toLocaleString()}</span>
                      <span>R$ {priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Mobile Filters Modal */}
          {isFiltersOpen && (
            <div className="lg:hidden fixed inset-0 bg-black/50 z-50">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 overflow-y-auto"
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
                {/* Mobile filters content - same as desktop */}
                <div className="space-y-6">
                  {/* Copy the filter content from desktop version */}
                </div>
              </motion.div>
            </div>
          )}

          {/* Properties Grid */}
          <motion.div
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Sort Controls */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                <span className="font-semibold">247</span> imóveis encontrados
              </p>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Ordenar por:</label>
                <select
                  className="rounded-md border border-input bg-background px-3 h-10"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                >
                  <option value="recent">Mais recentes</option>
                  <option value="price-asc">Menor preço</option>
                  <option value="price-desc">Maior preço</option>
                </select>
              </div>
            </div>

            {/* Properties */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <motion.div key={i} variants={itemVariants}>
                  <PropertyCard index={i - 1} />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center gap-2">
                <Button variant="outline" disabled>
                  Anterior
                </Button>
                <Button variant="outline" className="bg-[#3EA76F] text-white">
                  1
                </Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Próxima</Button>
              </nav>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}