"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Erro na página do imóvel:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Ícone de erro */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Ops! Algo deu errado
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-600 mb-8 leading-relaxed"
          >
            Não foi possível carregar as informações do imóvel. 
            Isso pode ser um problema temporário de conexão ou o imóvel pode não estar mais disponível.
          </motion.p>

          {/* Detalhes do erro (apenas em desenvolvimento) */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left"
            >
              <h3 className="font-semibold text-red-900 mb-2">Detalhes do erro:</h3>
              <p className="text-sm text-red-700 font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-red-600 mt-2">
                  ID do erro: {error.digest}
                </p>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              onClick={reset}
              className="bg-[#3EA76F] hover:bg-[#48C78E] px-8 py-3 text-lg"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Tentar Novamente
            </Button>
            
            <Link href="/buscar">
              <Button variant="outline" className="border-[#3EA76F] text-[#3EA76F] hover:bg-[#3EA76F] hover:text-white px-8 py-3 text-lg">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar à Busca
              </Button>
            </Link>
          </motion.div>

          {/* Sugestões de ajuda */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              O que você pode fazer:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">Verifique sua conexão</div>
                <div className="text-gray-600">Certifique-se de que está conectado à internet</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">Tente mais tarde</div>
                <div className="text-gray-600">O problema pode ser temporário</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">Busque outros imóveis</div>
                <div className="text-gray-600">Explore outras oportunidades</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">Entre em contato</div>
                <div className="text-gray-600">Fale conosco se o problema persistir</div>
              </div>
            </div>
          </motion.div>

          {/* Link para página inicial */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8"
          >
            <Link href="/" className="inline-flex items-center text-[#3EA76F] hover:text-[#48C78E] transition-colors">
              <Home className="w-4 h-4 mr-2" />
              Voltar à página inicial
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}