"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";

// Imagens de fallback para o caso do imóvel não ter fotos
const fallbackImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
];

export interface Property {
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

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Seleciona a imagem: se houver fotos cadastradas, usa a primeira; caso contrário, usa uma imagem de fallback
  const imageUrl =
    property.fotos && property.fotos.length > 0
      ? property.fotos[0]
      : fallbackImages[0];

  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={property.tipo_imovel}
          width={400}
          height={300}
          className="w-full h-[200px] object-cover transition-transform group-hover:scale-105"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
            }`}
          />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#3EA76F]">
            {property.tipo_imovel}
          </span>
          <span className="text-sm text-gray-500">
            {property.endereco}
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-2">
          {property.descricao}
        </h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-[#3EA76F]">
              R$ {property.valor_agio.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 block">Valor do ágio</span>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500 block">Parcela atual</span>
            <span className="font-semibold">
              R$ {property.valor_parcela_atual.toLocaleString()}/mês
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>{property.quartos} quartos</span>
          <span>{property.banheiros} banheiros</span>
          <span>{property.area} m²</span>
        </div>
        <Button className="w-full">Ver Detalhes</Button>
      </div>
    </Card>
  );
}
