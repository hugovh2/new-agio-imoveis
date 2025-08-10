"use client";

import { motion } from "framer-motion";
import { Home, Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto py-8 px-4">
        {/* Skeleton do breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            <span>/</span>
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            <span>/</span>
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>

        {/* Skeleton do header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
              <div className="flex items-center gap-6">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skeleton da coluna principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skeleton da galeria */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-video bg-gray-200 animate-pulse relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Home className="w-12 h-12 text-gray-400" />
                  </motion.div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-20 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skeleton das características */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="h-7 bg-gray-200 rounded w-40 mb-6 animate-pulse"></div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skeleton da descrição */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="h-7 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/6 animate-pulse"></div>
              </div>
            </div>

            {/* Skeleton da localização */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="h-7 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
              <div className="mb-4">
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-gray-200 rounded mr-3 mt-1 animate-pulse"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-xl h-64 animate-pulse"></div>
            </div>
          </div>

          {/* Skeleton da sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Skeleton do card de preços */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-center mb-6">
                  <div className="bg-gray-100 rounded-xl p-4 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-1 animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded w-32 mx-auto mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div>
                  </div>
                  
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                        <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-3 animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                </div>
              </div>

              {/* Skeleton das dicas */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <div className="h-5 bg-blue-200 rounded w-32 mb-3 animate-pulse"></div>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start">
                      <div className="w-4 h-4 bg-blue-200 rounded mr-2 mt-0.5 animate-pulse"></div>
                      <div className="h-4 bg-blue-200 rounded flex-1 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading indicator centralizado */}
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-4"
          >
            <Loader2 className="w-12 h-12 text-[#3EA76F] mx-auto" />
          </motion.div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Carregando imóvel...
          </h3>
          <p className="text-gray-600">
            Aguarde enquanto buscamos as informações
          </p>
        </motion.div>
      </div>
    </div>
  );
}