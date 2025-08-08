import React from 'react';
import PropertyView from '@/components/PropertyView';

const API_BASE_URL = 'https://agio-imoveis.onrender.com/api';

interface Property {
  id: number;
  // Adicione outros campos da sua API conforme necessário
  [key: string]: any;
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE_URL}/imoveis`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Falha ao buscar imóveis da API');
    }
    const properties: Property[] = await res.json();

    return properties.map((property) => ({
      id: property.id.toString(),
    }));
  } catch (error) {
    console.error('Erro em generateStaticParams:', error);
    // Retorna um array vazio em caso de erro para não quebrar o build
    return [];
  }
}

async function getPropertyData(id: string) {
  try {
    console.log(`Buscando imóvel com ID: ${id} na URL: ${API_BASE_URL}/imoveis/${id}`);
    const res = await fetch(`${API_BASE_URL}/imoveis/${id}`);
    
    console.log(`Status da resposta: ${res.status} ${res.statusText}`);
    
    if (!res.ok) {
      // Log mais detalhado do erro
      const errorText = await res.text();
      console.error(`Erro da API (${res.status}):`, errorText);
      
      if (res.status === 404) {
        console.log('Imóvel não encontrado (404)');
        return null;
      }
      console.error(`A API retornou um erro não tratado: ${res.status}`);
      return null;
    }
    
    const property = await res.json();
    console.log('Dados do imóvel recebidos:', property);
    return property;
  } catch (error) {
    console.error(`Erro ao buscar imóvel com ID ${id}:`, error);
    return null;
  }
}

const PropertyDetailsPage = async ({ params }: { params: { id: string } }) => {
  const property = await getPropertyData(params.id);

  if (!property) {
    return <div className="text-center py-10">Imóvel não encontrado.</div>;
  }

  return <PropertyView property={property} />;
};

export default PropertyDetailsPage;

