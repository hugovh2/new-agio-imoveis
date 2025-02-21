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
  Info,
  Edit,
  Trash2,
  XCircle,
  Filter,
  SlidersHorizontal,
  Loader2
} from 'lucide-react';

interface Property {
  estado: string;
  id: number;
  usuario_id: number;
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

function PropertyCard({
  property,
  onEdit,
  onDelete,
}: {
  property: Property;
  onEdit: (prop: Property) => void;
  onDelete: (id: number) => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
      currency: 'BRL',
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
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      {/* Galeria de Imagens */}
      <div className="relative h-64">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
          </div>
        )}
        <img
          src={
            property.fotos && property.fotos[currentImageIndex]
              ? `http://127.0.0.1:8000/storage/${property.fotos[currentImageIndex]}`
              : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80'
          }
          alt={property.descricao || 'Imagem do imóvel'}
          className="w-full h-full object-cover"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {property.fotos && property.fotos.length > 1 && (
          <>
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
          </>
        )}

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
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          {property.cidade}
        </h3>
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
        <p className="text-gray-600 mb-6 line-clamp-2">{property.descricao}</p>

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

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(property)}
            className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-1 group"
          >
            <Edit className="h-4 w-4 group-hover:scale-110 transition-transform" /> 
            Editar
          </button>
          <button
            onClick={() => onDelete(property.id)}
            className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-1 group"
          >
            <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform" /> 
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

function EditPropertyModal({
  property,
  onClose,
  onSave,
}: {
  property: Property;
  onClose: () => void;
  onSave: (updated: Property) => void;
}) {
  const [formData, setFormData] = useState({
    tipo_imovel: property.tipo_imovel,
    cep: property.cep,
    endereco: property.endereco,
    complemento: '',
    estado: property.estado,
    cidade: property.cidade,
    area: property.area,
    quartos: property.quartos,
    banheiros: property.banheiros,
    descricao: property.descricao,
    valor_agio: property.valor_agio,
    valor_parcela_atual: property.valor_parcela_atual,
    parcelas_restantes: property.parcelas_restantes,
    valor_total_financiado: property.valor_total_financiado,
  });

  const [newPhotos, setNewPhotos] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const value =
      e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewPhotos(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          data.append(key, value.toString());
        }
      });

      if (newPhotos) {
        // Alterado: utilizando 'fotos' em vez de 'fotos[]'
        Array.from(newPhotos).forEach((file) => {
          data.append('fotos', file);
        });
      }

      const token = localStorage.getItem('token');
      const res = await fetch(
        `http://127.0.0.1:8000/api/imoveis/${property.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
          body: data,
        }
      );

      if (res.ok) {
        const updated = await res.json();
        onSave(updated.imovel);
        onClose();
      } else {
        console.error('Erro ao atualizar imóvel');
      }
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative shadow-lg max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <XCircle className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Editar Imóvel</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tipo de Imóvel</label>
              <select
                name="tipo_imovel"
                value={formData.tipo_imovel}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              >
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Terreno">Terreno</option>
                <option value="Comercial">Comercial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CEP</label>
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Endereço</label>
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Estado</label>
              <input
                type="text"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cidade</label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Área (m²)</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quartos</label>
              <input
                type="number"
                name="quartos"
                value={formData.quartos}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Banheiros</label>
              <input
                type="number"
                name="banheiros"
                value={formData.banheiros}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Valor Ágio</label>
              <input
                type="number"
                name="valor_agio"
                value={formData.valor_agio}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Parcela Atual</label>
              <input
                type="number"
                name="valor_parcela_atual"
                value={formData.valor_parcela_atual}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Parcelas Restantes</label>
              <input
                type="number"
                name="parcelas_restantes"
                value={formData.parcelas_restantes}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Valor Total Financiado</label>
              <input
                type="number"
                name="valor_total_financiado"
                value={formData.valor_total_financiado}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nova(s) Foto(s)</label>
            <input
              type="file"
              name="fotos"
              onChange={handlePhotoChange}
              multiple
              accept="image/*"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-[#3EA76F] text-white rounded-lg hover:bg-[#359660] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Salvando...
              </>
            ) : (
              'Salvar Alterações'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function MeusImoveisPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'area-asc' | 'area-desc'>('price-desc');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://127.0.0.1:8000/api/imoveis', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setProperties(data);
      }
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (property.estado &&
        property.estado.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType =
      propertyType === 'all' ||
      property.tipo_imovel.toLowerCase() === propertyType.toLowerCase();

    return matchesSearch && matchesType;
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

  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);
  const paginatedProperties = sortedProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este imóvel?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://127.0.0.1:8000/api/imoveis/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setProperties((prev) => prev.filter((property) => property.id !== id));
      } else {
        console.error('Erro ao excluir o imóvel.');
      }
    } catch (error) {
      console.error('Erro ao excluir o imóvel:', error);
    }
  };

  const handleSave = (updatedProperty: Property) => {
    setProperties((prev) =>
      prev.map((property) =>
        property.id === updatedProperty.id ? updatedProperty : property
      )
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-[#3EA76F]" />
          <span className="text-gray-600">Carregando imóveis...</span>
        </div>
      </div>
    );
  }

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
                placeholder="Buscar por cidade, endereço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent appearance-none"
              >
                <option value="all">Todos os tipos</option>
                <option value="apartamento">Apartamento</option>
                <option value="casa">Casa</option>
                <option value="terreno">Terreno</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>

            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent appearance-none"
              >
                <option value="price-desc">Maior preço</option>
                <option value="price-asc">Menor preço</option>
                <option value="area-desc">Maior área</option>
                <option value="area-asc">Menor área</option>
              </select>
            </div>
          </div>
        </div>

        {paginatedProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Nenhum imóvel encontrado.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Anterior
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg ${
                        currentPage === page
                          ? 'bg-[#3EA76F] text-white'
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                      } transition-colors`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {editingProperty && (
        <EditPropertyModal
          property={editingProperty}
          onClose={() => setEditingProperty(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
