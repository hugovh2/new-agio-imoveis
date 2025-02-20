"use client";

import React, { useState, useEffect } from 'react';
import {
  Search,
  Home,
  Building2,
  Warehouse,
  Map,
  ChevronLeft,
  ChevronRight,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Info
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface Property {
  estado: any;
  id: number;
  usuario_id: number; // Added this field
  tipo_imovel: string;
  area: number;
  quartos: number;
  banheiros: number;
  endereco: string;
  cidade: string;
  cep: string;
  descricao: string;
  fotos: string[] | null;
  valor_agio: number;
  valor_parcela_atual: number;
  parcelas_restantes: number;
  valor_total_financiado: number;
}

function PropertyCard({ property }: { property: Property }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (property.fotos && property.fotos.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === property.fotos!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const previousImage = () => {
    if (property.fotos && property.fotos.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.fotos!.length - 1 : prev - 1
      );
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const getPropertyIcon = (tipo_imovel: string) => {
    switch (tipo_imovel.toLowerCase()) {
      case 'apartamento':
        return <Building2 className="h-5 w-5" />;
      case 'casa':
        return <Home className="h-5 w-5" />;
      case 'comercial':
        return <Warehouse className="h-5 w-5" />;
      case 'terreno':
        return <Map className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-md">
      {/* Galeria de Imagens */}
      <div className="relative h-64">
        <img
          src={
            property.fotos && property.fotos[currentImageIndex]
              ? `http://127.0.0.1:8000/storage/${property.fotos[currentImageIndex]}`
              : '/default-image.jpg'
          }
          alt={property.descricao || 'Imagem do imóvel'}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <button
          onClick={previousImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-gray-800" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-gray-800" />
        </button>

        {property.fotos && property.fotos.length > 0 && (
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded-full bg-black/60 text-white text-sm">
            {currentImageIndex + 1}/{property.fotos.length}
          </div>
        )}

        <div className="absolute top-2 left-2 px-3 py-1 rounded-full bg-white/90 text-gray-800 font-medium text-sm flex items-center gap-1">
          {getPropertyIcon(property.tipo_imovel)}
          <span className="capitalize">{property.tipo_imovel}</span>
        </div>
      </div>

      {/* Conteúdo do Cartão */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{property.cidade}</h3>
        <div className="flex items-center gap-4 mb-4 text-gray-600">
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{property.area}m²</span>
          </div>
          {property.quartos > 0 && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.quartos}</span>
            </div>
          )}
          {property.banheiros > 0 && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.banheiros}</span>
            </div>
          )}
        </div>
        <div className="flex items-start gap-2 mb-4 text-gray-600">
          <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
          <p>{property.endereco}</p>
        </div>
        <p className="text-gray-600 mb-6">{property.descricao}</p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Info className="h-5 w-5 text-[#3EA76F]" />
            Informações Financeiras
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Valor Ágio</p>
              <p className="font-semibold text-[#3EA76F]">
                {formatCurrency(property.valor_agio)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Parcela Atual</p>
              <p className="font-semibold text-[#3EA76F]">
                {formatCurrency(property.valor_parcela_atual)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Parcelas Restantes</p>
              <p className="font-semibold text-gray-800">
                {property.parcelas_restantes}x
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Valor Total</p>
              <p className="font-semibold text-gray-800">
                {formatCurrency(property.valor_total_financiado)}
              </p>
            </div>
          </div>
        </div>

        <button className="w-full py-3 bg-[#3EA76F] text-white rounded-lg hover:bg-[#48C78E] transition-colors font-medium">
          Entrar em Contato
        </button>
      </div>
    </div>
  );
}

export default function MeusImoveisPage() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'area-asc' | 'area-desc'>('price-desc');

  useEffect(() => {
    async function fetchProperties() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:8000/api/imoveis", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          // Filter properties to show only those belonging to the logged-in user
          const userProperties = data.filter((property: Property) => property.usuario_id === user?.id);
          setProperties(userProperties);
        }
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      }
    }
    if (user) {
      fetchProperties();
    }
  }, [user]);

  // Filtra os imóveis conforme a busca, o tipo selecionado e que possuem fotos válidas
  const filteredProperties = properties.filter(property => {
    const matchesSearch = 
      property.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (property.estado && property.estado.toLowerCase().includes(searchTerm.toLowerCase())); // Adicionado estado
  
    const matchesType = propertyType === 'all' || property.tipo_imovel.toLowerCase() === propertyType;
  
    const hasValidPhotos =
      property.fotos &&
      property.fotos.filter(photo => typeof photo === 'string' && photo.trim() !== '').length > 0;
  
    return matchesSearch && matchesType && hasValidPhotos;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.valor_total_financiado - b.valor_total_financiado;
      case 'price-desc':
        return b.valor_total_financiado - a.valor_total_financiado;
      case 'area-asc':
        return a.area - b.area;
      case 'area-desc':
        return b.area - a.area;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#3EA76F]">Meus Imóveis</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar imóveis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}