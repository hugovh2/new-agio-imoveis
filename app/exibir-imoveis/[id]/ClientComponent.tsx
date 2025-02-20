"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

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

// Componente que pode usar useState, useEffect, etc.
export default function ClientComponent({ property }: { property: Property }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 text-gray-600 mb-6">
            <MapPin className="w-5 h-5" />
            <span>{property.endereco}</span>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-gray-600" />
              <span>{property.quartos} Quartos</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-5 h-5 text-gray-600" />
              <span>{property.banheiros} Banheiros</span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="w-5 h-5 text-gray-600" />
              <span>{property.area}m²</span>
            </div>
          </div>
          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-semibold mb-4">Descrição</h2>
            <p>{property.descricao}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6">Informações Financeiras</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Valor do Ágio</span>
              <span className="font-semibold">R$ {property.valor_agio.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Parcela Atual</span>
              <span className="font-semibold">R$ {property.valor_parcela_atual.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Parcelas Restantes</span>
              <span className="font-semibold">{property.parcelas_restantes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Valor Total Financiado</span>
              <span className="font-semibold">R$ {property.valor_total_financiado.toLocaleString()}</span>
            </div>
            <Button
              className="w-full bg-[#3EA76F] hover:bg-[#48C78E] mt-6"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
