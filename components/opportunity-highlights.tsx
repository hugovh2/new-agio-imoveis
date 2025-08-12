"use client";

import { useEffect, useState } from 'react';
import PropertyCard from './property-card';
import { motion } from 'framer-motion';

// Definindo a interface do Imovel para corresponder à API
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
  views_count: number;
}

const API_BASE_URL = 'https://agio-imoveis.onrender.com/api';

const OpportunityHighlights = () => {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestaques = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/imoveis/destaques`, {
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Falha ao buscar os imóveis em destaque');
        }

        const data = await response.json();
        setImoveis(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocorreu um erro');
      } finally {
        setLoading(false);
      }
    };

    fetchDestaques();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800">Oportunidades em Destaque</h2>
          <p className="text-lg text-gray-600 mt-2">Os imóveis mais procurados da nossa plataforma.</p>
        </motion.div>

        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3EA76F] mx-auto"></div>
            <p className="mt-2">Carregando oportunidades...</p>
          </div>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {imoveis.map((imovel, index) => (
              <motion.div
                key={imovel.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PropertyCard property={imovel} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OpportunityHighlights;