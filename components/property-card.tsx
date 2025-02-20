"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";

interface Property {
  id: number;
  tipo_imovel: string;
  area: number;
  quartos: number;
  banheiros: number;
  endereco: string;
  descricao: string;
  fotos?: string[];
  valor_agio: number;
  valor_parcela_atual: number;
  parcelas_restantes: number;
  valor_total_financiado: number;
  cep: string;
  cidade: string;
}

export default function PropertyCard({ property }: { property?: Property }) {
  if (!property) return null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const photos = property.fotos || [];
  const [isFavorite, setIsFavorite] = useState(false);

  const nextImage = () => {
    if (photos.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === photos.length - 1 ? 0 : prev + 1
      );
    }
  };

  const previousImage = () => {
    if (photos.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? photos.length - 1 : prev - 1
      );
    }
  };

  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        {photos.length > 0 ? (
          <Image
            src={`http://127.0.0.1:8000/storage/${photos[currentImageIndex]}`}
            alt={property.tipo_imovel}
            width={400}
            height={300}
            className="w-full h-[200px] object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <Image
            src="/default-image.jpg"
            alt="Imagem padrão"
            width={400}
            height={300}
            className="w-full h-[200px] object-cover transition-transform group-hover:scale-105"
          />
        )}

        {photos.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}

        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-500"
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
        <h3 className="text-lg font-semibold mb-2">{property.cidade}</h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-[#3EA76F]">
              R$ {property.valor_agio.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 block">
              Valor do ágio
            </span>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500 block">
              Parcela atual
            </span>
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
        <Link href={`/exibir-imoveis/${property.id}`}>
          <Button className="w-full">Ver Detalhes</Button>
        </Link>
      </div>
    </Card>
  );
}
