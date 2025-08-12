"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Trash2, Home, Building2, Warehouse, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Property {
  id: number;
  tipo_imovel: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  valor_agio: number;
  fotos: string[] | null;
}

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  property: Property | null;
  onClose: () => void;
  onConfirm: (id: number) => void;
  isLoading?: boolean;
}

export default function DeleteConfirmationModal({
  isOpen,
  property,
  onClose,
  onConfirm,
  isLoading = false
}: DeleteConfirmationModalProps) {
  if (!property) return null;

  const getPropertyIcon = (tipo_imovel: string) => {
    switch (tipo_imovel.toLowerCase()) {
      case 'apartamento': return <Building2 className="h-6 w-6" />;
      case 'casa': return <Home className="h-6 w-6" />;
      case 'comercial': return <Warehouse className="h-6 w-6" />;
      case 'terreno': return <Map className="h-6 w-6" />;
      default: return <Home className="h-6 w-6" />;
    }
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  const handleConfirm = () => {
    onConfirm(property.id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-red-50 px-6 py-4 border-b border-red-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-900">
                      Confirmar Exclusão
                    </h3>
                    <p className="text-sm text-red-700">
                      Esta ação não pode ser desfeita
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-red-100 rounded-full transition-colors"
                  disabled={isLoading}
                >
                  <X className="h-5 w-5 text-red-600" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Property Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-4">
                  {/* Property Image or Icon */}
                  <div className="flex-shrink-0">
                    {property.fotos && property.fotos.length > 0 ? (
                      <img
                        src={property.fotos[0]}
                        alt="Imóvel"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                        {getPropertyIcon(property.tipo_imovel)}
                      </div>
                    )}
                  </div>

                  {/* Property Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {property.tipo_imovel}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900 truncate">
                      {property.endereco}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {property.bairro}, {property.cidade} - {property.estado}
                    </p>
                    <p className="text-sm font-semibold text-[#3EA76F] mt-1">
                      {formatCurrency(property.valor_agio)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Warning Message */}
              <div className="text-center mb-6">
                <p className="text-gray-700 mb-2">
                  Tem certeza que deseja excluir este imóvel?
                </p>
                <p className="text-sm text-gray-500">
                  Todos os dados, fotos e informações relacionadas serão permanentemente removidos.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1"
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Excluindo...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Trash2 className="h-4 w-4" />
                      Excluir Imóvel
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
