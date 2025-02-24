// // app/exibir-imoveis/[id]/page.tsx

// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
// import { FaBed, FaBath, FaMapMarkerAlt, FaMoneyBillAlt, FaHome } from 'react-icons/fa';

// interface Property {
//   id: number;
//   tipo_imovel: string;
//   area: number;
//   quartos: number;
//   banheiros: number;
//   endereco: string;
//   descricao: string;
//   fotos?: string[];
//   valor_agio: number;
//   valor_parcela_atual: number;
//   parcelas_restantes: number;
//   valor_total_financiado: number;
//   cep: string;
//   cidade: string;
// }

// // Gera os parâmetros estáticos para cada rota dinâmica
// export async function generateStaticParams() {
//   const res = await fetch("http://127.0.0.1:8000/api/imoveis");
//   const properties: Property[] = await res.json();

//   return properties.map((property) => ({
//     id: property.id.toString(),
//   }));
// }

// // Função auxiliar para buscar os dados do imóvel utilizando o endpoint público
// async function getProperty(id: string): Promise<Property | null> {
//   try {
//     // Faz a requisição para a rota pública de listagem
//     const res = await fetch("http://127.0.0.1:8000/api/imoveis");
//     if (!res.ok) return null;
//     const properties: Property[] = await res.json();
//     // Encontra o imóvel com o id correspondente
//     const property = properties.find((prop) => prop.id.toString() === id) || null;
//     return property;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

// // Componente de detalhes do imóvel (Server Component)
// export default async function PropertyDetails({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const property = await getProperty(params.id);

//   if (!property) {
//     return <p>Imóvel não encontrado.</p>;
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         {/* Carrossel de Imagens */}
//         {property.fotos && property.fotos.length > 0 && (
//           <div className="relative">
//             <div className="flex overflow-x-auto snap-x">
//               {property.fotos.map((foto, index) => (
//                 <div key={index} className="snap-start w-full shrink-0">
//                   <Image
//                     src={`http://127.0.0.1:8000/storage/${foto}`}
//                     alt={`Foto ${index + 1}`}
//                     width={1200} // Ajuste conforme necessário
//                     height={700} // Ajuste conforme necessário
//                     className="object-cover w-full h-[500px]"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="p-6">
//           {/* Título e Preço */}
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-2xl font-bold text-gray-800">{property.tipo_imovel}</h1>
//             <div className="text-xl font-semibold text-green-600">
//               R$ {property.valor_agio.toLocaleString()}
//             </div>
//           </div>

//           {/* Endereço */}
//           <div className="flex items-center text-gray-600 mb-2">
//             <FaMapMarkerAlt className="mr-2" />
//             {property.endereco}, {property.cidade} - {property.cep}
//           </div>

//           {/* Descrição Resumida */}
//           <p className="text-gray-700 mb-4">{property.descricao.substring(0, 150)}...</p>

//           <Separator className="my-4" />

//           {/* Detalhes Rápidos */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//             <div className="flex items-center">
//               <FaHome className="mr-2 text-gray-500" />
//               Área: <span className="font-semibold">{property.area} m²</span>
//             </div>
//             <div className="flex items-center">
//               <FaBed className="mr-2 text-gray-500" />
//               Quartos: <span className="font-semibold">{property.quartos}</span>
//             </div>
//             <div className="flex items-center">
//               <FaBath className="mr-2 text-gray-500" />
//               Banheiros: <span className="font-semibold">{property.banheiros}</span>
//             </div>
//           </div>

//           <Separator className="my-4" />

//           {/* Detalhes Financeiros */}
//           <div className="mb-4">
//             <h2 className="text-lg font-semibold text-gray-800 mb-2">Detalhes Financeiros</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//               <div>
//                 <span className="text-gray-600">Valor da Parcela:</span>
//                 <span className="font-semibold"> R$ {property.valor_parcela_atual.toLocaleString()}</span>
//               </div>
//               <div>
//                 <span className="text-gray-600">Parcelas Restantes:</span>
//                 <span className="font-semibold"> {property.parcelas_restantes}</span>
//               </div>
//               <div>
//                 <span className="text-gray-600">Valor Total Financiado:</span>
//                 <span className="font-semibold"> R$ {property.valor_total_financiado.toLocaleString()}</span>
//               </div>
//             </div>
//           </div>

//           <Separator className="my-4" />

//           {/* Descrição Completa */}
//           <div>
//             <h2 className="text-lg font-semibold text-gray-800 mb-2">Descrição Completa</h2>
//             <p className="text-gray-700">{property.descricao}</p>
//           </div>

//           <Separator className="my-4" />

//           {/* Ações */}
//           <div className="flex justify-between items-center">
//             <Link href="/" passHref>
//               <Button variant="outline">Voltar</Button>
//             </Link>
//             <Button>Tenho Interesse</Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }