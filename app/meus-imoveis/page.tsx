"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  Loader2,
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';

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

// Componente responsável pela galeria de imagens (mesmo código)
function ImageGallery({ fotos, descricao }: { fotos: string[] | null; descricao: string; }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const nextImage = useCallback(() => {
    if (fotos && fotos.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === fotos.length - 1 ? 0 : prev + 1
      );
    }
  }, [fotos]);

  const previousImage = useCallback(() => {
    if (fotos && fotos.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? fotos.length - 1 : prev - 1
      );
    }
  }, [fotos]);

  return (
    <div className="relative h-64">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
        </div>
      )}
      <img
        src={
          fotos && fotos[currentImageIndex]
            ? fotos[currentImageIndex]
            : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80'
        }
        alt={descricao || 'Imagem do imóvel'}
        className="w-full h-full object-cover"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      {fotos && fotos.length > 1 && (
        <>
          <button
            onClick={previousImage}
            aria-label="Imagem anterior"
            title="Imagem anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-800" />
          </button>
          <button
            onClick={nextImage}
            aria-label="Próxima imagem"
            title="Próxima imagem"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-800" />
          </button>
        </>
      )}

      {fotos && fotos.length > 0 && (
        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-full bg-black/60 text-white text-sm">
          {currentImageIndex + 1}/{fotos.length}
        </div>
      )}
    </div>
  );
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
  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

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
      <div className="relative">
        <ImageGallery fotos={property.fotos} descricao={property.descricao} />
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
        <p className="text-gray-600 mb-6 line-clamp-2">
          {property.descricao}
        </p>

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
            aria-label="Editar imóvel"
            title="Editar imóvel"
            className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-1 group"
          >
            <Edit className="h-4 w-4 group-hover:scale-110 transition-transform" />
            Editar
          </button>
          <button
            onClick={() => onDelete(property.id)}
            aria-label="Excluir imóvel"
            title="Excluir imóvel"
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

interface EditFormData {
  tipo_imovel: string;
  cep: string;
  endereco: string;
  estado: string;
  cidade: string;
  area: number;
  quartos: number;
  banheiros: number;
  descricao: string;
  valor_agio: number;
  valor_parcela_atual: number;
  parcelas_restantes: number;
  valor_total_financiado: number;
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditFormData>({
    defaultValues: {
      tipo_imovel: property.tipo_imovel,
      cep: property.cep,
      endereco: property.endereco,
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
    },
  });

  // Estado para gerenciar as imagens atuais (que poderão ser removidas)
  const [currentImages, setCurrentImages] = useState<string[]>(property.fotos || []);
  const [newPhotos, setNewPhotos] = useState<FileList | null>(null);

  // Atualiza o estado de currentImages quando a propriedade mudar
  useEffect(() => {
    setCurrentImages(property.fotos || []);
    reset({
      tipo_imovel: property.tipo_imovel,
      cep: property.cep,
      endereco: property.endereco,
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
  }, [property, reset]);

  // Função para remover uma imagem do array currentImages
  const removeImage = (index: number) => {
    setCurrentImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Função para renderizar as imagens atuais com botão de exclusão
  const renderCurrentImages = () => {
    if (currentImages.length > 0) {
      return (
        <div className="flex gap-2 flex-wrap">
          {currentImages.map((foto, index) => (
            <div key={index} className="relative w-20 h-20">
              <img
                src={`https://agio-imoveis.onrender.com/storage/${foto}`}
                alt={`Imagem ${index + 1}`}
                className="w-full h-full object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                title="Excluir imagem"
                aria-label="Excluir imagem"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      );
    }
    return <p className="text-sm text-gray-500">Nenhuma imagem cadastrada.</p>;
  };

  const onSubmit = async (data: EditFormData) => {
    const formData = new FormData();
    // Adiciona o _method para que o Laravel trate a requisição como PUT
    formData.append('_method', 'PUT');

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    // Envia as imagens que o usuário deseja manter (currentImages)
    formData.append('fotos_keep', JSON.stringify(currentImages));

    // Usa a chave "fotos[]" para enviar os novos arquivos (se houver)
    if (newPhotos) {
      Array.from(newPhotos).forEach((file) => {
        formData.append('fotos[]', file);
      });
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `https://agio-imoveis.onrender.com/api/imoveis/${property.id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
          body: formData,
        }
      );

      if (res.ok) {
        const updated = await res.json();
        onSave(updated.imovel);
        toast.success('Imóvel atualizado com sucesso!');
        onClose();
      } else {
        toast.error('Erro ao atualizar o imóvel.');
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao atualizar o imóvel.');
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewPhotos(e.target.files);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative shadow-lg max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          title="Fechar modal"
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <XCircle className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Editar Imóvel</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Tipo de Imóvel
              </label>
              <select
                {...register('tipo_imovel', { required: true })}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              >
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Terreno">Terreno</option>
                <option value="Comercial">Comercial</option>
              </select>
              {errors.tipo_imovel && (
                <span className="text-red-500 text-xs">Campo obrigatório</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CEP</label>
              <input
                type="text"
                {...register('cep', { required: true })}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
              {errors.cep && (
                <span className="text-red-500 text-xs">Campo obrigatório</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Endereço</label>
            <input
              type="text"
              {...register('endereco', { required: true })}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
            />
            {errors.endereco && (
              <span className="text-red-500 text-xs">Campo obrigatório</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Estado</label>
              <input
                type="text"
                {...register('estado', { required: true })}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
              {errors.estado && (
                <span className="text-red-500 text-xs">Campo obrigatório</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cidade</label>
              <input
                type="text"
                {...register('cidade', { required: true })}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
              {errors.cidade && (
                <span className="text-red-500 text-xs">Campo obrigatório</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Área (m²)
              </label>
              <input
                type="number"
                {...register('area', { required: true, valueAsNumber: true })}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
              {errors.area && (
                <span className="text-red-500 text-xs">Campo obrigatório</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Quartos
              </label>
              <input
                type="number"
                {...register('quartos', { required: true, valueAsNumber: true })}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
              {errors.quartos && (
                <span className="text-red-500 text-xs">Campo obrigatório</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Banheiros
              </label>
              <input
                type="number"
                {...register('banheiros', { required: true, valueAsNumber: true })}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
              {errors.banheiros && (
                <span className="text-red-500 text-xs">Campo obrigatório</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Descrição
            </label>
            <textarea
              {...register('descricao', { required: true })}
              rows={4}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
            />
            {errors.descricao && (
              <span className="text-red-500 text-xs">Campo obrigatório</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Valor Ágio
              </label>
              <input
                type="number"
                {...register('valor_agio', { required: true, valueAsNumber: true })}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
              {errors.valor_agio && (
                <span className="text-red-500 text-xs">Campo obrigatório</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Parcela Atual
              </label>
              <input
                type="number"
                {...register('valor_parcela_atual', { required: true, valueAsNumber: true })}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
              {errors.valor_parcela_atual && (
                <span className="text-red-500 text-xs">Campo obrigatório</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Parcelas Restantes
              </label>
              <input
                type="number"
                {...register('parcelas_restantes', { required: true, valueAsNumber: true })}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
              {errors.parcelas_restantes && (
                <span className="text-red-500 text-xs">Campo obrigatório</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Valor Total Financiado
              </label>
              <input
                type="number"
                {...register('valor_total_financiado', { required: true, valueAsNumber: true })}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
              {errors.valor_total_financiado && (
                <span className="text-red-500 text-xs">Campo obrigatório</span>
              )}
            </div>
          </div>

          {/* Seção para exibir as imagens atuais com botão de exclusão */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Imagens Atuais
            </label>
            {renderCurrentImages()}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Nova(s) Foto(s)
            </label>
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

  const fetchProperties = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://agio-imoveis.onrender.com/api/meus-imoveis', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setProperties(data);
      } else {
        toast.error('Erro ao buscar imóveis.');
      }
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
      toast.error('Erro ao buscar imóveis.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
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
  }, [properties, searchTerm, propertyType]);

  const sortedProperties = useMemo(() => {
    return [...filteredProperties].sort((a, b) => {
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
  }, [filteredProperties, sortBy]);

  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);
  const paginatedProperties = useMemo(() => {
    return sortedProperties.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [sortedProperties, currentPage]);

  const handleEdit = useCallback((property: Property) => {
    setEditingProperty(property);
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este imóvel?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://agio-imoveis.onrender.com/api/imoveis/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setProperties((prev) =>
          prev.filter((property) => property.id !== id)
        );
        toast.success('Imóvel excluído com sucesso!');
      } else {
        toast.error('Erro ao excluir o imóvel.');
      }
    } catch (error) {
      console.error('Erro ao excluir o imóvel:', error);
      toast.error('Erro ao excluir o imóvel.');
    }
  }, []);

  const handleSave = useCallback((updatedProperty: Property) => {
    setProperties((prev) =>
      prev.map((property) =>
        property.id === updatedProperty.id ? updatedProperty : property
      )
    );
  }, []);

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
        {/* Painel de filtros */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por cidade, endereço..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={propertyType}
                onChange={(e) => {
                  setPropertyType(e.target.value);
                  setCurrentPage(1);
                }}
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
                onChange={(e) => {
                  setSortBy(e.target.value as typeof sortBy);
                  setCurrentPage(1);
                }}
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
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  aria-label="Página anterior"
                  className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Anterior
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        aria-label={`Página ${page}`}
                        className={`w-10 h-10 rounded-lg ${
                          currentPage === page
                            ? 'bg-[#3EA76F] text-white'
                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                        } transition-colors`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Próxima página"
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

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
