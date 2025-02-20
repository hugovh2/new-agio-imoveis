"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PropertyCard from "@/components/property-card";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Search, MapPin, Filter, X } from "lucide-react";

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
}

export default function SearchPage() {
  const [properties, setProperties] = useState<Property[]>([]);
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

  // Busca todos os imóveis cadastrados via API
  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/imoveis");
        if (res.ok) {
          const data = await res.json();
          // Normaliza os dados para que "fotos" seja sempre um array
          const normalizedData = data.map((property: any) => ({
            ...property,
            fotos: property.fotos || [],
          }));
          setProperties(normalizedData);
        }
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      }
    }
    fetchProperties();
  }, []);

  // Aplica os filtros aos imóveis
  const filteredProperties = properties.filter((property) => {
    const matchesLocation = property.endereco
      .toLowerCase()
      .includes(filters.location.toLowerCase());
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

    return (
      matchesLocation &&
      matchesType &&
      matchesBedrooms &&
      matchesBathrooms &&
      matchesPrice
    );
  });

  // Ordena os imóveis conforme o critério selecionado
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (filters.sortBy === "recent") {
      // Ordena pelos mais recentes (supondo que id maior seja mais recente)
      return b.id - a.id;
    } else if (filters.sortBy === "price-asc") {
      return a.valor_agio - b.valor_agio;
    } else if (filters.sortBy === "price-desc") {
      return b.valor_agio - a.valor_agio;
    }
    return 0;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Cabeçalho da Busca */}
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
                    onChange={(e) =>
                      handleFilterChange("location", e.target.value)
                    }
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
          {/* Sidebar de Filtros - Desktop */}
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
                      onChange={(e) =>
                        handleFilterChange("type", e.target.value)
                      }
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
                          onClick={() =>
                            handleFilterChange("bedrooms", value)
                          }
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
                          onClick={() =>
                            handleFilterChange("bathrooms", value)
                          }
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

          {/* Modal de Filtros - Mobile */}
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
                <div className="space-y-6">
                  {/* Mesmo conteúdo de filtros do desktop */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Tipo de Imóvel
                    </label>
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 h-10"
                      value={filters.type}
                      onChange={(e) =>
                        handleFilterChange("type", e.target.value)
                      }
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
                          onClick={() =>
                            handleFilterChange("bedrooms", value)
                          }
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
                          onClick={() =>
                            handleFilterChange("bathrooms", value)
                          }
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
              </motion.div>
            </div>
          )}

          {/* Grid de Propriedades */}
          <motion.div
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Controles de Ordenação */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                <span className="font-semibold">{sortedProperties.length}</span> imóveis encontrados
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

            {/* Exibe as propriedades */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProperties.map((property) => (
                <motion.div key={property.id} variants={itemVariants}>
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>

            {/* Paginação (exemplo estático) */}
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
