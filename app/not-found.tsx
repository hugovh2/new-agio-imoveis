"use client";

import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3EA76F]/5 via-white to-[#48C78E]/5 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Ilustração 404 */}
          <div className="relative mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-8xl md:text-9xl font-bold text-[#3EA76F]/20 select-none"
            >
              404
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <Home className="w-16 h-16 text-[#3EA76F]" />
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Imóvel não encontrado
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-600 mb-8 leading-relaxed"
          >
            O imóvel que você está procurando pode ter sido removido, 
            teve seu ID alterado ou está temporariamente indisponível.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button className="bg-[#3EA76F] hover:bg-[#48C78E] px-8 py-3 text-lg">
                <Home className="w-5 h-5 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
            
            <Link href="/buscar">
              <Button variant="outline" className="border-[#3EA76F] text-[#3EA76F] hover:bg-[#3EA76F] hover:text-white px-8 py-3 text-lg">
                <Search className="w-5 h-5 mr-2" />
                Buscar Imóveis
              </Button>
            </Link>
          </motion.div>

          {/* Sugestões */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Que tal explorar outras opções?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <Link href="/buscar?propertyType=apartamento" className="p-3 bg-gray-50 rounded-lg hover:bg-[#3EA76F]/10 transition-colors">
                <div className="font-medium text-gray-900">Apartamentos</div>
                <div className="text-gray-600">Ver apartamentos disponíveis</div>
              </Link>
              <Link href="/buscar?propertyType=casa" className="p-3 bg-gray-50 rounded-lg hover:bg-[#3EA76F]/10 transition-colors">
                <div className="font-medium text-gray-900">Casas</div>
                <div className="text-gray-600">Ver casas disponíveis</div>
              </Link>
              <Link href="/buscar?priceRange=0-100000" className="p-3 bg-gray-50 rounded-lg hover:bg-[#3EA76F]/10 transition-colors">
                <div className="font-medium text-gray-900">Ágio Baixo</div>
                <div className="text-gray-600">Até R$ 100.000</div>
              </Link>
              <Link href="/buscar?location=brasilia" className="p-3 bg-gray-50 rounded-lg hover:bg-[#3EA76F]/10 transition-colors">
                <div className="font-medium text-gray-900">Brasília</div>
                <div className="text-gray-600">Imóveis em Brasília</div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}