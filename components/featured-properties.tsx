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
  const [loading, setLoading] = useState(true);

  // Mock data as fallback
  const mockProperties: Property[] = [
    {
      id: 1,
      tipo_imovel: "Apartamento",
      area: 85,
      quartos: 3,
      banheiros: 2,
      endereco: "Rua das Flores, 123",
      descricao: "Apartamento moderno com vista para o mar, localizado em área nobre da cidade.",
      fotos: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
      ],
      valor_agio: 45000,
      valor_parcela_atual: 2800,
      parcelas_restantes: 180,
      valor_total_financiado: 320000,
      cep: "01234-567",
      cidade: "São Paulo"
    },
    {
      id: 2,
      tipo_imovel: "Casa",
      area: 120,
      quartos: 4,
      banheiros: 3,
      endereco: "Av. Central, 456",
      descricao: "Casa espaçosa com quintal amplo, ideal para famílias grandes.",
      fotos: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop"
      ],
      valor_agio: 65000,
      valor_parcela_atual: 3200,
      parcelas_restantes: 200,
      valor_total_financiado: 450000,
      cep: "02345-678",
      cidade: "Rio de Janeiro"
    },
    {
      id: 3,
      tipo_imovel: "Cobertura",
      area: 150,
      quartos: 3,
      banheiros: 3,
      endereco: "Rua do Sol, 789",
      descricao: "Cobertura luxuosa com terraço e piscina privativa.",
      fotos: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop"
      ],
      valor_agio: 85000,
      valor_parcela_atual: 4500,
      parcelas_restantes: 150,
      valor_total_financiado: 680000,
      cep: "03456-789",
      cidade: "Belo Horizonte"
    }
  ];

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const res = await fetch("https://agio-imoveis.onrender.com/api/imoveis", {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          // Normaliza os dados para garantir que o campo 'fotos' seja um array
          const normalizedData = data.map((property: Property) => ({
            ...property,
            fotos: property.fotos || [],
          }));
          setProperties(normalizedData);
        } else {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
      } catch (error) {
        console.warn("API indisponível, usando dados de exemplo:", error);
        // Use mock data as fallback
        setProperties(mockProperties);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Destaques</h2>
          <p className="text-gray-600 text-center mb-12">
            Carregando propriedades...
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Destaques</h2>
        <p className="text-gray-600 text-center mb-12">
          Confira nossa seleção especial de propriedades
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.slice(0, 3).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}