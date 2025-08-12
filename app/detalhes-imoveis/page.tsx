"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyView from '@/components/PropertyView';
import { motion } from 'framer-motion';

// Interface dos dados do imóvel baseada na API Laravel
interface Imovel {
  id: number;
  usuario_id: number;
  tipo_imovel: string;
  cep: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  area: number;
  quartos: number;
  banheiros: number;
  garagem: number;
  descricao: string;
  fotos: string[];
  valor_agio: number;
  valor_parcela_atual: number;
  parcelas_restantes: number;
  valor_total_financiado: number;
  created_at: string;
}

const API_BASE_URL = 'https://agio-imoveis.onrender.com/api';

export default function DetalhesImovelPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [imovel, setImovel] = useState<Imovel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID do imóvel não fornecido');
      setLoading(false);
      return;
    }

    const fetchImovel = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/imoveis/${id}`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: Imóvel não encontrado`);
        }
        
        const data = await response.json();
        
        // Garantir que fotos seja sempre um array
        if (data.fotos && typeof data.fotos === 'string') {
          try {
            data.fotos = JSON.parse(data.fotos);
          } catch {
            data.fotos = [data.fotos];
          }
        } else if (!Array.isArray(data.fotos)) {
          data.fotos = [];
        }
        
        setImovel(data);
      } catch (err) {
        console.error('Erro ao buscar imóvel:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados do imóvel');
      } finally {
        setLoading(false);
      }
    };

    fetchImovel();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3EA76F] mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Carregando detalhes do imóvel...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto p-6"
        >
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Ops! Algo deu errado</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-[#3EA76F] hover:bg-[#48C78E] text-white px-6 py-2 rounded-lg transition-colors"
          >
            Voltar
          </button>
        </motion.div>
      </div>
    );
  }

  if (!imovel) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Imóvel não encontrado</h1>
          <p className="text-gray-600 mb-4">O imóvel que você está procurando não existe ou foi removido.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-[#3EA76F] hover:bg-[#48C78E] text-white px-6 py-2 rounded-lg transition-colors"
          >
            Voltar
          </button>
        </motion.div>
      </div>
    );
  }

  return <PropertyView property={imovel} />;
}
