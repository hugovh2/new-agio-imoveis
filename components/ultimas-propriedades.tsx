"use client";

import { useEffect, useState } from "react";
import PropertyCard from "./property-card";

export default function FeaturedProperties() {
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

  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("https://agio-imoveis.onrender.com/api/imoveis");
        if (res.ok) {
          const data = await res.json();
          // Normaliza os dados e ordena do mais recente para o mais antigo
          const normalizedData = data
            .map((property: Property) => ({
              ...property,
              fotos: property.fotos || [],
            }))
            .sort((a, b) => b.id - a.id) // Ordena por ID decrescente
            .slice(0, 3); // Pega os 3 últimos imóveis

          setProperties(normalizedData);
        }
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      }
    }
    fetchProperties();
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Últimas Oportunidades
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
