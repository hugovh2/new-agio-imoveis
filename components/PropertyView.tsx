"use client";

import React, { useState } from 'react';
import { Heart, Share2, Bed, Bath, Ruler, Car, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Map from '@/components/Map';
import WhatsAppButton from '@/components/whatsapp-button';

interface Property {
  id: number;
  usuario_id: number;
  tipo_imovel: string;
  area: number;
  quartos: number;
  banheiros: number;
  garagem: number;
  endereco: string;
  bairro: string;
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
}

interface PropertyViewProps {
  property: Property;
}

const PropertyView: React.FC<PropertyViewProps> = ({ property }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!property) return null;

  const { 
    tipo_imovel, area, quartos, banheiros, garagem, endereco, bairro, descricao, 
    valor_agio, valor_parcela_atual, parcelas_restantes, valor_total_financiado, 
    cidade, estado, cep
  } = property;

  // Garante que 'fotos' seja sempre um array para evitar erros de renderização
  const fotos = Array.isArray(property.fotos) ? property.fotos : [];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        {/* Galeria de Imagens Melhorada */}
        <div className="mb-8">
          <div className="mb-4">
                      {fotos.length > 0 ? (
            <img 
              src={fotos[selectedImage]} 
              alt={`Foto principal do ${tipo_imovel}`} 
              className="w-full h-[500px] object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-[500px] bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Nenhuma imagem disponível</p>
            </div>
          )}
          </div>
          <div className="grid grid-cols-5 gap-2">
            {fotos.map((foto, index) => (
              <img 
                key={index} 
                src={foto} 
                alt={`Thumbnail ${index + 1} do ${tipo_imovel}`} 
                className={`w-full h-24 object-cover rounded-lg cursor-pointer transition-all duration-200 ${selectedImage === index ? 'ring-4 ring-primary' : 'hover:opacity-80'}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna de Informações */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{tipo_imovel} em {cidade}</h1>
                  <p className="text-gray-600">{endereco}, {bairro}</p>
                  <p className="text-sm text-gray-500">{cidade} - {estado} | CEP: {cep}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="icon"><Heart className="h-5 w-5" /></Button>
                  <Button variant="outline" size="icon"><Share2 className="h-5 w-5" /></Button>
                </div>
              </div>

              {/* Características */}
              <div className="flex items-center flex-wrap gap-4 border-t border-b border-gray-200 py-4 my-4">
                  <div className="flex items-center space-x-2"><Ruler className="h-5 w-5 text-primary"/><span>{area} m²</span></div>
                  <div className="flex items-center space-x-2"><Bed className="h-5 w-5 text-primary"/><span>{quartos} Quartos</span></div>
                  <div className="flex items-center space-x-2"><Bath className="h-5 w-5 text-primary"/><span>{banheiros} Banheiros</span></div>
                  {garagem > 0 && <div className="flex items-center space-x-2"><Car className="h-5 w-5 text-primary"/><span>{garagem} Garagem{garagem > 1 ? 's' : ''}</span></div>}
              </div>

              {/* Descrição */}
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Descrição</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{descricao}</p>
              </div>

              {/* Localização (Mapa) */}
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Localização</h2>
                <Map address={`${endereco}, ${cidade}, ${estado}, ${cep}`} />
              </div>
            </div>
          </div>

          {/* Coluna de Ações e Preço */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Valor do Ágio</h2>
              <p className="text-4xl font-extrabold text-primary mb-4">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor_agio || 0)}
              </p>
              
              <div className="text-sm text-gray-600 space-y-2 mb-6">
                <p>Parcela atual: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor_parcela_atual || 0)}</strong></p>
                <p>Parcelas restantes: <strong>{parcelas_restantes}</strong></p>
                <p>Saldo devedor: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor_total_financiado || 0)}</strong></p>
              </div>

              <div className="flex flex-col space-y-3">
                <Button 
                  size="lg" 
                  onClick={() => {
                    const message = `Olá! Tenho interesse no ${tipo_imovel} localizado em ${endereco}, ${bairro}, ${cidade}. Gostaria de agendar uma visita.`;
                    const url = `https://wa.me/556198116408?text=${encodeURIComponent(message)}`;
                    window.open(url, "_blank");
                  }}
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Agendar Visita
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => {
                    const message = `Olá! Gostaria de mais informações sobre o ${tipo_imovel} no valor de ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor_agio)} localizado em ${endereco}, ${bairro}.`;
                    const url = `https://wa.me/556198116408?text=${encodeURIComponent(message)}`;
                    window.open(url, "_blank");
                  }}
                  className="flex items-center justify-center gap-2"
                >
                  <Phone className="h-5 w-5" />
                  Entrar em Contato
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Seção de Economia */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">💰 Economia com Ágio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Valor do Ágio</h3>
              <p className="text-2xl font-bold text-green-600">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor_agio)}
              </p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Saldo Devedor</h3>
              <p className="text-2xl font-bold text-blue-600">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor_total_financiado)}
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800">Economia Total</h3>
              <p className="text-2xl font-bold text-purple-600">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor_total_financiado - valor_agio)}
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Você economiza <strong>{Math.round(((valor_total_financiado - valor_agio) / valor_total_financiado) * 100)}%</strong> comprando este imóvel através do ágio!
            </p>
          </div>
        </div>
      </div>
      
      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};

export default PropertyView;
