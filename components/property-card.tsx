"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Image as ImageIcon } from "lucide-react"; // Importa o ícone de imagem
import { useState } from "react";

export interface Property {
  cep: ReactNode;
  cidade: ReactNode;
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
  // Verifica se property foi definida para evitar erros de leitura
  if (!property) {
    return (
      <Card className="overflow-hidden group">
        <div className="p-4 flex items-center justify-center">
          <span className="text-sm font-medium text-[#3EA76F]">
            Imóvel não definido
          </span>
        </div>
      </Card>
    );
  }

  const [isFavorite, setIsFavorite] = useState(false);
  
  // Verifica se há imagens disponíveis utilizando optional chaining
  const hasImage = (property?.fotos ?? []).length > 0;
  const imageUrl = hasImage ? property.fotos[0] : null;

  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={property.tipo_imovel}
            width={400}
            height={300}
            className="w-full h-[200px] object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          // Caso não tenha foto, renderiza um ícone de imagem
          <div className="w-full h-[200px] flex items-center justify-center bg-gray-100">
            <ImageIcon className="w-12 h-12 text-gray-500" />
          </div>
        )}
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
          {property.cidade}
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
