// app/exibir-imoveis/[id]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Property {
  id: number;
  tipo_imovel: string;
  area: number;
  quartos: number;
  banheiros: number;
  endereco: string;
  descricao: string;
  fotos?: string[];
  valor_agio: number;
  valor_parcela_atual: number;
  parcelas_restantes: number;
  valor_total_financiado: number;
  cep: string;
  cidade: string;
}

// Gera os parâmetros estáticos para cada rota dinâmica
export async function generateStaticParams() {
  const res = await fetch("http://127.0.0.1:8000/api/imoveis");
  const properties: Property[] = await res.json();

  return properties.map((property) => ({
    id: property.id.toString(),
  }));
}

// Função auxiliar para buscar os dados do imóvel utilizando o endpoint público
async function getProperty(id: string): Promise<Property | null> {
  try {
    // Faz a requisição para a rota pública de listagem
    const res = await fetch("http://127.0.0.1:8000/api/imoveis");
    if (!res.ok) return null;
    const properties: Property[] = await res.json();
    // Encontra o imóvel com o id correspondente
    const property = properties.find((prop) => prop.id.toString() === id) || null;
    return property;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Componente de detalhes do imóvel (Server Component)
export default async function PropertyDetails({
  params,
}: {
  params: { id: string };
}) {
  const property = await getProperty(params.id);

  if (!property) {
    return <p>Imóvel não encontrado.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{property.tipo_imovel}</h1>
      <p>
        {property.endereco} - {property.cidade} / {property.cep}
      </p>

      {property.fotos && property.fotos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {property.fotos.map((foto, index) => (
            <Image
              key={index}
              src={`http://127.0.0.1:8000/storage/${foto}`}
              alt={`Foto ${index + 1}`}
              width={500}
              height={300}
              className="object-cover"
            />
          ))}
        </div>
      )}

      <p className="mt-4">{property.descricao}</p>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Detalhes</h2>
        <p>Área: {property.area} m²</p>
        <p>Quartos: {property.quartos}</p>
        <p>Banheiros: {property.banheiros}</p>
        <p>Valor do Ágio: R$ {property.valor_agio.toLocaleString()}</p>
        <p>
          Parcela Atual: R$ {property.valor_parcela_atual.toLocaleString()} /mês
        </p>
        <p>Parcelas Restantes: {property.parcelas_restantes}</p>
        <p>
          Valor Total Financiado: R$ {property.valor_total_financiado.toLocaleString()}
        </p>
      </div>

      <div className="mt-4">
        <Link href="/" passHref>
          <Button>Voltar</Button>
        </Link>
      </div>
    </div>
  );
}
