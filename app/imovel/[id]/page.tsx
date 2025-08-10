import React from 'react';
import PropertyView from '@/components/PropertyView';
import { notFound } from 'next/navigation';

const API_BASE_URL = 'https://agio-imoveis.onrender.com/api';

interface Property {
  id: number;
  usuario_id: number;
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
  created_at: string;
  cidade: string;
  cep: string;
  estado: string;
  complemento?: string;
  bairro?: string;
  garagem?: number;
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE_URL}/imoveis`, { 
      cache: 'no-store',
      next: { revalidate: 3600 } // Revalidar a cada hora
    });
    
    if (!res.ok) {
      console.warn('Falha ao buscar imóveis para generateStaticParams');
      return [];
    }
    
    const properties: Property[] = await res.json();

    return properties.map((property) => ({
      id: property.id.toString(),
    }));
  } catch (error) {
    console.error('Erro em generateStaticParams:', error);
    return [];
  }
}

async function getPropertyData(id: string): Promise<Property | null> {
  try {
    console.log(`Buscando imóvel com ID: ${id}`);
    
    const res = await fetch(`${API_BASE_URL}/imoveis/${id}`, {
      cache: 'no-store',
      next: { revalidate: 300 } // Revalidar a cada 5 minutos
    });
    
    console.log(`Status da resposta: ${res.status}`);
    
    if (!res.ok) {
      if (res.status === 404) {
        console.log('Imóvel não encontrado (404)');
        return null;
      }
      
      const errorText = await res.text();
      console.error(`Erro da API (${res.status}):`, errorText);
      return null;
    }
    
    const property = await res.json();
    console.log('Dados do imóvel recebidos:', property);
    
    // Validar se os dados essenciais estão presentes
    if (!property.id || !property.tipo_imovel) {
      console.error('Dados do imóvel incompletos:', property);
      return null;
    }
    
    return property;
  } catch (error) {
    console.error(`Erro ao buscar imóvel com ID ${id}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const property = await getPropertyData(params.id);
  
  if (!property) {
    return {
      title: 'Imóvel não encontrado - Ágio Imóveis',
      description: 'O imóvel solicitado não foi encontrado.',
    };
  }

  return {
    title: `${property.tipo_imovel} em ${property.cidade} - Ágio Imóveis`,
    description: `${property.tipo_imovel} com ${property.quartos} quartos, ${property.banheiros} banheiros e ${property.area}m² por R$ ${property.valor_agio.toLocaleString('pt-BR')} de ágio.`,
    keywords: `${property.tipo_imovel}, ${property.cidade}, ${property.estado}, ágio, imóvel, ${property.quartos} quartos`,
    openGraph: {
      title: `${property.tipo_imovel} em ${property.cidade}`,
      description: property.descricao?.substring(0, 160) || `${property.tipo_imovel} disponível para ágio`,
      images: property.fotos && property.fotos.length > 0 ? [property.fotos[0]] : [],
    },
  };
}

const PropertyDetailsPage = async ({ params }: { params: { id: string } }) => {
  // Validar se o ID é um número válido
  const propertyId = parseInt(params.id);
  if (isNaN(propertyId) || propertyId <= 0) {
    console.error('ID do imóvel inválido:', params.id);
    notFound();
  }

  const property = await getPropertyData(params.id);

  if (!property) {
    notFound();
  }

  // Garantir que fotos seja sempre um array
  const normalizedProperty = {
    ...property,
    fotos: Array.isArray(property.fotos) ? property.fotos : [],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PropertyView property={normalizedProperty} />
    </div>
  );
};

export default PropertyDetailsPage;