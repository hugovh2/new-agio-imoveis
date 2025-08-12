"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, MapPin, Bed, Bath, Maximize, TrendingDown, Clock } from "lucide-react";
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateSavings = () => {
    return property.valor_total_financiado - property.valor_agio;
  };

  const getSavingsPercentage = () => {
    return Math.round((calculateSavings() / property.valor_total_financiado) * 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
    >
      <div className="relative cursor-pointer">
        <Link href={`/detalhes-imoveis?id=${property.id}`}>
          {photos.length > 0 ? (
            <div className="relative h-64 overflow-hidden">
              <Image
                src={photos[currentImageIndex]}
                alt={property.tipo_imovel}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Badge de economia */}
              <div className="absolute top-4 left-4">
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  {getSavingsPercentage()}% OFF
                </div>
              </div>

              {/* Tipo de imóvel */}
              <div className="absolute top-4 right-4">
                <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  {property.tipo_imovel}
                </span>
              </div>

              {/* Navegação de imagens */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.preventDefault(); previousImage(); }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); nextImage(); }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-700" />
                  </button>

                  {/* Indicadores */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {photos.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Botão de favorito */}
              <button
                onClick={(e) => { e.preventDefault(); setIsFavorite(!isFavorite); }}
                className="absolute top-4 right-16 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                  }`}
                />
              </button>
            </div>
          ) : (
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Sem imagem disponível</span>
            </div>
          )}
        </Link>
      </div>
      <div className="p-6">
        {/* Localização */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{property.cidade}</span>
        </div>

        {/* Título */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {property.endereco}
        </h3>

        {/* Características */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span>{property.quartos} quartos</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{property.banheiros} banheiros</span>
          </div>
          <div className="flex items-center">
            <Maximize className="w-4 h-4 mr-1" />
            <span>{property.area} m²</span>
          </div>
        </div>

        {/* Informações financeiras */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Valor do Ágio:</span>
            <span className="text-2xl font-bold text-[#3EA76F]">
              {formatCurrency(property.valor_agio)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Parcela Mensal:</span>
            <span className="text-lg font-semibold text-gray-900">
              {formatCurrency(property.valor_parcela_atual)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Parcelas Restantes:</span>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-gray-400" />
              <span className="text-sm font-medium">{property.parcelas_restantes} meses</span>
            </div>
          </div>
        </div>

        {/* Economia */}
        <div className="bg-green-50 rounded-lg p-3 mb-4">
          <div className="text-center">
            <p className="text-sm text-green-700 mb-1">Economia Total</p>
            <p className="text-xl font-bold text-green-800">
              {formatCurrency(calculateSavings())}
            </p>
          </div>
        </div>

        {/* Botão */}
        <Link href={`/detalhes-imoveis?id=${property.id}`}>
          <Button className="w-full bg-[#3EA76F] hover:bg-[#48C78E] transition-all duration-300 text-lg py-3">
            Ver Detalhes
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}