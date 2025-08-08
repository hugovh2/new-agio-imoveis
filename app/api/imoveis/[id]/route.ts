import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://agio-imoveis.onrender.com/api';

interface Property {
  id: number;
  [key: string]: any;
}

// Adicionado para suportar `output: 'export'` em rotas de API dinâmicas
export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE_URL}/imoveis`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Falha ao buscar imóveis da API para gerar parâmetros');
    }
    const properties: Property[] = await res.json();

    return properties.map((property) => ({
      id: property.id.toString(),
    }));
  } catch (error) {
    console.error('Erro em generateStaticParams (API Route):', error);
    return [];
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const apiResponse = await fetch(`${API_BASE_URL}/imoveis/${id}`);

    if (!apiResponse.ok) {
      // Repassa o status de erro da API original
      return new NextResponse(apiResponse.statusText, { status: apiResponse.status });
    }

    const propertyData = await apiResponse.json();
    return NextResponse.json(propertyData);

  } catch (error) {
    console.error(`Erro ao fazer proxy da requisição para o imóvel ${id}:`, error);
    return new NextResponse('Erro interno do servidor ao buscar dados do imóvel.', { status: 500 });
  }
}
