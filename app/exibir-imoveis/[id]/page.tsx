import { notFound } from "next/navigation";

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

// 🚀 Função para pré-gerar as páginas estáticas (SSR)
export async function generateStaticParams() {
  const res = await fetch("http://127.0.0.1:8000/api/imoveis");
  const properties = await res.json();

  console.log("📌 Lista de imóveis para geração estática:", properties);

  return properties.map((property: any) => ({
    id: property.id.toString(),
  }));
}


// 🚀 Função para buscar detalhes do imóvel no servidor
export async function getProperty(id: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/imoveis/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Erro ao buscar imóvel ${id}: Status ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar imóvel:", error);
    return null;
  }
}



// Página principal sem "use client"
export default async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id);

  if (!property) return notFound(); // Exibe erro 404 se o imóvel não for encontrado

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">{property.tipo_imovel}</h1>
        <p className="text-gray-600">{property.endereco}</p>
        <ClientComponent property={property} />
      </div>
    </div>
  );
}

// Importa o componente do cliente
import ClientComponent from "./ClientComponent";
