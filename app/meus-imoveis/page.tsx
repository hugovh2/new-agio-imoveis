"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Grid3X3,
  List,
  Eye,
  Heart,
  MessageSquare,
  TrendingUp,
  Star,
  Play,
  Pause,
  MoreVertical,
  BarChart3,
  Download,
  Bell
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
  views?: number;
  favorites?: number;
  messages?: number;
  status?: 'ativo' | 'pausado' | 'vendido';
  created_at?: string;
}

interface DashboardStats {
  totalProperties: number;
  totalViews: number;
  totalContacts: number;
  totalFavorites: number;
  activeProperties: number;
  soldProperties: number;
}

function PropertyCard({
  property,
  viewMode,
  onEdit,
  onDelete,
  onToggleStatus,
  onBoost
}: {
  property: Property;
  viewMode: 'grid' | 'list';
  onEdit: (prop: Property) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onBoost: (id: number) => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showActions, setShowActions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800 border-green-200';
      case 'pausado': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'vendido': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPropertyIcon = (tipo_imovel: string) => {
    switch (tipo_imovel.toLowerCase()) {
      case 'apartamento': return <Building2 className="h-5 w-5" />;
      case 'casa': return <Home className="h-5 w-5" />;
      case 'comercial': return <Warehouse className="h-5 w-5" />;
      case 'terreno': return <Map className="h-5 w-5" />;
      default: return <Home className="h-5 w-5" />;
    }
  };

  const nextImage = useCallback(() => {
    if (property.fotos && property.fotos.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === property.fotos!.length - 1 ? 0 : prev + 1
      );
    }
  }, [property.fotos]);

  const previousImage = useCallback(() => {
    if (property.fotos && property.fotos.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.fotos!.length - 1 : prev - 1
      );
    }
  }, [property.fotos]);

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
      >
        <div className="flex items-center space-x-6">
          {/* Image */}
          <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
            {property.fotos && property.fotos.length > 0 ? (
              <img
                src={property.fotos[0]}
                alt={property.descricao}
                className="w-full h-full object-cover"
                onLoad={() => setIsLoading(false)}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <Home className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <div className="absolute top-2 left-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(property.status || 'ativo')}`}>
                {property.status || 'ativo'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {property.cidade}
                </h3>
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.endereco}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center">
                    {getPropertyIcon(property.tipo_imovel)}
                    <span className="ml-1">{property.tipo_imovel}</span>
                  </span>
                  <span>{property.area}m²</span>
                  <span>{property.quartos} quartos</span>
                  <span>{property.banheiros} banheiros</span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-[#3EA76F]">
                  {formatCurrency(property.valor_agio)}
                </p>
                <p className="text-sm text-gray-600">
                  {formatCurrency(property.valor_parcela_atual)}/mês
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <Eye className="w-4 h-4 mr-1" />
                <span>{property.views || 0} visualizações</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Heart className="w-4 h-4 mr-1" />
                <span>{property.favorites || 0} favoritos</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MessageSquare className="w-4 h-4 mr-1" />
                <span>{property.messages || 0} mensagens</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowActions(!showActions)}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
            
            <AnimatePresence>
              {showActions && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10"
                >
                  <button
                    onClick={() => onEdit(property)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </button>
                  <button
                    onClick={() => onToggleStatus(property.id)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                  >
                    {property.status === 'ativo' ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {property.status === 'ativo' ? 'Pausar' : 'Ativar'}
                  </button>
                  <button
                    onClick={() => onBoost(property.id)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Impulsionar
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={() => onDelete(property.id)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 group"
    >
      {/* Image Gallery */}
      <div className="relative h-48">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
          </div>
        )}
        
        <img
          src={
            property.fotos && property.fotos[currentImageIndex]
              ? property.fotos[currentImageIndex]
              : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80'
          }
          alt={property.descricao || 'Imagem do imóvel'}
          className="w-full h-full object-cover"
          onLoad={() => setIsLoading(false)}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(property.status || 'ativo')}`}>
            {property.status || 'ativo'}
          </span>
        </div>

        {/* Property Type */}
        <div className="absolute top-3 right-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center">
            {getPropertyIcon(property.tipo_imovel)}
            <span className="ml-1 text-sm font-medium capitalize">{property.tipo_imovel}</span>
          </div>
        </div>

        {/* Image Navigation */}
        {property.fotos && property.fotos.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4 text-gray-800" />
            </button>
            <div className="absolute bottom-3 right-3 px-2 py-1 rounded-full bg-black/60 text-white text-xs">
              {currentImageIndex + 1}/{property.fotos.length}
            </div>
          </>
        )}

        {/* Quick Actions */}
        <div className="absolute bottom-3 left-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(property)}
            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            title="Editar"
          >
            <Edit className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={() => onBoost(property.id)}
            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            title="Impulsionar"
          >
            <TrendingUp className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          {property.cidade}
        </h3>
        
        <div className="flex items-center gap-4 mb-4 text-gray-600">
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span className="text-sm">{property.area}m²</span>
          </div>
          {property.quartos > 0 && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span className="text-sm">{property.quartos}</span>
            </div>
          )}
          {property.banheiros > 0 && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span className="text-sm">{property.banheiros}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-start gap-2 mb-4 text-gray-600">
          <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
          <p className="text-sm">{property.endereco}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Eye className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-lg font-semibold text-gray-900">{property.views || 0}</p>
            <p className="text-xs text-gray-600">Visualizações</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Heart className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-lg font-semibold text-gray-900">{property.favorites || 0}</p>
            <p className="text-xs text-gray-600">Favoritos</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <MessageSquare className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-lg font-semibold text-gray-900">{property.messages || 0}</p>
            <p className="text-xs text-gray-600">Mensagens</p>
          </div>
        </div>

        {/* Financial Info */}
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

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={() => onEdit(property)}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
          <Button
            onClick={() => onToggleStatus(property.id)}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            {property.status === 'ativo' ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {property.status === 'ativo' ? 'Pausar' : 'Ativar'}
          </Button>
          <Button
            onClick={() => onDelete(property.id)}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function MeusImoveisPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'views' | 'price-asc' | 'price-desc'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalProperties: 0,
    totalViews: 0,
    totalContacts: 0,
    totalFavorites: 0,
    activeProperties: 0,
    soldProperties: 0
  });
  
  const itemsPerPage = viewMode === 'grid' ? 9 : 10;

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
        // Add mock data for demo
        const enrichedData = data.map((property: Property) => ({
          ...property,
          views: Math.floor(Math.random() * 500) + 50,
          favorites: Math.floor(Math.random() * 50) + 5,
          messages: Math.floor(Math.random() * 20) + 1,
          status: ['ativo', 'pausado', 'vendido'][Math.floor(Math.random() * 3)] as 'ativo' | 'pausado' | 'vendido'
        }));
        setProperties(enrichedData);
        
        // Calculate dashboard stats
        const stats = {
          totalProperties: enrichedData.length,
          totalViews: enrichedData.reduce((sum: number, p: Property) => sum + (p.views || 0), 0),
          totalContacts: enrichedData.reduce((sum: number, p: Property) => sum + (p.messages || 0), 0),
          totalFavorites: enrichedData.reduce((sum: number, p: Property) => sum + (p.favorites || 0), 0),
          activeProperties: enrichedData.filter((p: Property) => p.status === 'ativo').length,
          soldProperties: enrichedData.filter((p: Property) => p.status === 'vendido').length
        };
        setDashboardStats(stats);
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
        property.endereco.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = propertyType === 'all' || property.tipo_imovel.toLowerCase() === propertyType.toLowerCase();
      const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [properties, searchTerm, propertyType, statusFilter]);

  const sortedProperties = useMemo(() => {
    return [...filteredProperties].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return b.id - a.id;
        case 'views':
          return (b.views || 0) - (a.views || 0);
        case 'price-asc':
          return a.valor_agio - b.valor_agio;
        case 'price-desc':
          return b.valor_agio - a.valor_agio;
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
  }, [sortedProperties, currentPage, itemsPerPage]);

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
        setProperties((prev) => prev.filter((property) => property.id !== id));
        toast.success('Imóvel excluído com sucesso!');
      } else {
        toast.error('Erro ao excluir o imóvel.');
      }
    } catch (error) {
      console.error('Erro ao excluir o imóvel:', error);
      toast.error('Erro ao excluir o imóvel.');
    }
  }, []);

  const handleToggleStatus = useCallback((id: number) => {
    setProperties(prev => prev.map(property => 
      property.id === id 
        ? { ...property, status: property.status === 'ativo' ? 'pausado' : 'ativo' as 'ativo' | 'pausado' | 'vendido' }
        : property
    ));
    toast.success('Status atualizado com sucesso!');
  }, []);

  const handleBoost = useCallback((id: number) => {
    toast.info('Funcionalidade de impulsionamento em desenvolvimento!');
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-[#3EA76F]" />
          <span className="text-gray-600">Carregando seus imóveis...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meus Imóveis</h1>
              <p className="text-gray-600 mt-1">Gerencie seus anúncios e acompanhe o desempenho</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar Relatório
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button className="bg-[#3EA76F] hover:bg-[#48C78E]">
                <Home className="w-4 h-4 mr-2" />
                Novo Anúncio
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Imóveis</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalProperties}</p>
              </div>
              <Home className="w-8 h-8 text-[#3EA76F]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Visualizações</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalViews}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contatos</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalContacts}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Favoritos</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalFavorites}</p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ativos</p>
                <p className="text-2xl font-bold text-green-600">{dashboardStats.activeProperties}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Vendidos</p>
                <p className="text-2xl font-bold text-blue-600">{dashboardStats.soldProperties}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por cidade, endereço..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 h-12"
              />
            </div>

            <select
              value={propertyType}
              onChange={(e) => {
                setPropertyType(e.target.value);
                setCurrentPage(1);
              }}
              className="h-12 px-4 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
            >
              <option value="all">Todos os tipos</option>
              <option value="apartamento">Apartamento</option>
              <option value="casa">Casa</option>
              <option value="terreno">Terreno</option>
              <option value="comercial">Comercial</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-12 px-4 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
            >
              <option value="all">Todos os status</option>
              <option value="ativo">Ativo</option>
              <option value="pausado">Pausado</option>
              <option value="vendido">Vendido</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as typeof sortBy);
                setCurrentPage(1);
              }}
              className="h-12 px-4 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
            >
              <option value="recent">Mais recentes</option>
              <option value="views">Mais visualizados</option>
              <option value="price-desc">Maior preço</option>
              <option value="price-asc">Menor preço</option>
            </select>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-[#3EA76F] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-[#3EA76F] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-[#3EA76F]">{sortedProperties.length}</span> 
              {sortedProperties.length === 1 ? ' imóvel encontrado' : ' imóveis encontrados'}
            </p>
            
            {(searchTerm || propertyType !== 'all' || statusFilter !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setPropertyType('all');
                  setStatusFilter('all');
                  setCurrentPage(1);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Limpar filtros
              </Button>
            )}
          </div>
        </div>

        {/* Properties Grid/List */}
        {paginatedProperties.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Nenhum imóvel encontrado
              </h3>
              <p className="text-gray-600 mb-6">
                {properties.length === 0 
                  ? 'Você ainda não possui imóveis cadastrados.'
                  : 'Tente ajustar seus filtros para ver mais opções.'
                }
              </p>
              <Button className="bg-[#3EA76F] hover:bg-[#48C78E]">
                <Home className="w-4 h-4 mr-2" />
                Anunciar Primeiro Imóvel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              <AnimatePresence>
                {paginatedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    viewMode={viewMode}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleStatus={handleToggleStatus}
                    onBoost={handleBoost}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  Anterior
                </Button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "bg-[#3EA76F] text-white" : ""}
                      >
                        {page}
                      </Button>
                    );
                  })}
                  
                  {totalPages > 5 && (
                    <>
                      <span className="px-2">...</span>
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                  Próxima
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}