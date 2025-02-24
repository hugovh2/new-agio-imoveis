"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Localização"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full"
        />
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2"
        >
          <option value="">Tipo de Imóvel</option>
          <option value="apartment">Apartamento</option>
          <option value="house">Casa</option>
          <option value="commercial">Comercial</option>
        </select>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2"
        >
          <option value="">Faixa de Preço</option>
          <option value="0-100000">Até R$ 100.000</option>
          <option value="100000-200000">R$ 100.000 - R$ 200.000</option>
          <option value="200000-300000">R$ 200.000 - R$ 300.000</option>
          <option value="300000+">Acima de R$ 300.000</option>
        </select>
        <Button
          className="w-full bg-[#48C78E] hover:bg-[#3EA76F]"
          onClick={handleSearch}
        >
          <Search className="w-4 h-4 mr-2" />
          Buscar
        </Button>
      </div>
    </div>
  );
}
