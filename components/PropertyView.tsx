"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  Bed, 
  Bath, 
  Ruler, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  DollarSign,
  TrendingDown,
  Clock,
  Home,
  Car,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  AlertCircle,
  ExternalLink,
  MessageCircle,
  Star,
  Eye,
  Bookmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

interface Property {
  id: number;
  usuario_id: number;
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
  created_at: string;
  cidade: string;
  cep: string;
  estado: string;
  complemento?: string;
  bairro?: string;
  garagem?: number;
}

interface PropertyViewProps {
  property: Property;
}

const PropertyView: React.FC<PropertyViewProps> = ({ property }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Imóvel não encontrado</h2>
          <p className="text-gray-600 mb-6">O imóvel que você está procurando não existe ou foi removido.</p>
          <Link href="/buscar">
            <Button className="bg-[#3EA76F] hover:bg-[#48C78E]">
              Voltar à Busca
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { 
    tipo_imovel, area, quartos, banheiros, endereco, descricao, 
    valor_agio, valor_parcela_atual, parcelas_restantes, valor_total_financiado, 
    cidade, estado, cep, complemento, bairro, garagem, fotos
  } = property;

  // Garantir que fotos seja sempre um array
  const propertyPhotos = Array.isArray(fotos) ? fotos : [];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateSavings = () => {
    return valor_total_financiado - valor_agio;
  };

  const getSavingsPercentage = () => {
    return Math.round((calculateSavings() / valor_total_financiado) * 100);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${tipo_imovel} em ${cidade}`,
          text: `Confira este ${tipo_imovel} com ágio de ${formatCurrency(valor_agio)}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copiado para a área de transferência!');
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos');
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simular envio de mensagem
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Mensagem enviada com sucesso! O corretor entrará em contato em breve.');
      setShowContactForm(false);
      setContactForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % propertyPhotos.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + propertyPhotos.length) % propertyPhotos.length);
  };

  const amenities = [
    { icon: Home, label: tipo_imovel, available: true },
    { icon: Bed, label: `${quartos} Quartos`, available: quartos > 0 },
    { icon: Bath, label: `${banheiros} Banheiros`, available: banheiros > 0 },
    { icon: Ruler, label: `${area} m²`, available: area > 0 },
    { icon: Car, label: `${garagem || 0} Vagas`, available: (garagem || 0) > 0 },
  ].filter(amenity => amenity.available);

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="container mx-auto py-8 px-4">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#3EA76F]">Início</Link>
            <span>/</span>
            <Link href="/buscar" className="hover:text-[#3EA76F]">Buscar</Link>
            <span>/</span>
            <span className="text-gray-900">{tipo_imovel} em {cidade}</span>
          </div>
        </nav>

        {/* Header com título e ações */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-[#3EA76F]/10 text-[#3EA76F] px-3 py-1 rounded-full text-sm font-medium">
                  {tipo_imovel}
                </span>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  {getSavingsPercentage()}% OFF
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {tipo_imovel} em {cidade}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{endereco}, {bairro && `${bairro}, `}{cidade} - {estado}</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>234 visualizações</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Publicado em {new Date(property.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={handleFavorite}
                className={`transition-colors ${isFavorite ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
              >
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna principal - Galeria e informações */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Galeria de Imagens */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {propertyPhotos.length > 0 ? (
                <div className="relative">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={propertyPhotos[selectedImage]} 
                      alt={`Foto ${selectedImage + 1} do ${tipo_imovel}`} 
                      className="w-full h-full object-cover cursor-pointer transition-transform hover:scale-105"
                      onClick={() => setIsGalleryOpen(true)}
                    />
                    
                    {/* Navegação da galeria */}
                    {propertyPhotos.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                        
                        {/* Indicador de posição */}
                        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                          {selectedImage + 1} / {propertyPhotos.length}
                        </div>
                      </>
                    )}
                    
                    {/* Botão para abrir galeria completa */}
                    <button
                      onClick={() => setIsGalleryOpen(true)}
                      className="absolute bottom-4 left-4 bg-white/90 hover:bg-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver todas as fotos
                    </button>
                  </div>
                  
                  {/* Thumbnails */}
                  {propertyPhotos.length > 1 && (
                    <div className="p-4">
                      <div className="flex gap-2 overflow-x-auto">
                        {propertyPhotos.map((foto, index) => (
                          <img 
                            key={index} 
                            src={foto} 
                            alt={`Thumbnail ${index + 1}`} 
                            className={`w-20 h-16 object-cover rounded-lg cursor-pointer transition-all flex-shrink-0 ${
                              selectedImage === index 
                                ? 'ring-2 ring-[#3EA76F] opacity-100' 
                                : 'opacity-70 hover:opacity-100'
                            }`}
                            onClick={() => setSelectedImage(index)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Home className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma imagem disponível</p>
                  </div>
                </div>
              )}
            </div>

            {/* Características do Imóvel */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Características</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {amenities.map((amenity, index) => {
                  const Icon = amenity.icon;
                  return (
                    <div key={index} className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
                      <Icon className="w-8 h-8 text-[#3EA76F] mb-2" />
                      <span className="text-sm font-medium text-gray-700 text-center">
                        {amenity.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Descrição */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Descrição</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {descricao || 'Descrição não disponível para este imóvel.'}
                </p>
              </div>
            </div>

            {/* Localização */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Localização</h2>
              <div className="mb-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#3EA76F] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">{endereco}</p>
                    {complemento && <p className="text-gray-600">{complemento}</p>}
                    <p className="text-gray-600">{bairro && `${bairro}, `}{cidade} - {estado}</p>
                    <p className="text-gray-600">CEP: {cep}</p>
                  </div>
                </div>
              </div>
              
              {/* Mapa placeholder */}
              <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Mapa da localização</p>
                  <p className="text-sm">Em breve</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Preços e contato */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Card de preços */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-center mb-6">
                  <div className="bg-green-50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-green-700 mb-1">Economia Total</p>
                    <p className="text-3xl font-bold text-green-800">
                      {formatCurrency(calculateSavings())}
                    </p>
                    <p className="text-sm text-green-600">
                      {getSavingsPercentage()}% de desconto
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Valor do Ágio:</span>
                      <span className="text-2xl font-bold text-[#3EA76F]">
                        {formatCurrency(valor_agio)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Parcela Mensal:</span>
                      <span className="text-lg font-semibold">
                        {formatCurrency(valor_parcela_atual)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Parcelas Restantes:</span>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
                        <span className="font-medium">{parcelas_restantes} meses</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Valor Total:</span>
                      <span className="font-semibold">
                        {formatCurrency(valor_total_financiado)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botões de ação */}
                <div className="space-y-3">
                  <Button 
                    className="w-full h-12 bg-[#3EA76F] hover:bg-[#48C78E] text-lg font-semibold"
                    onClick={() => setShowContactForm(true)}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Entrar em Contato
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full h-12 border-[#3EA76F] text-[#3EA76F] hover:bg-[#3EA76F] hover:text-white"
                    onClick={() => window.open(`https://wa.me/556198116408?text=Olá! Tenho interesse no ${tipo_imovel} em ${cidade} (ID: ${property.id})`, '_blank')}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    WhatsApp
                  </Button>
                </div>

                {/* Informações do corretor */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-[#3EA76F] rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold">AC</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Ágio Corretor</p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">4.8 (127 avaliações)</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Especialista em negociações de ágio com mais de 5 anos de experiência.
                  </p>
                </div>
              </div>

              {/* Dicas de segurança */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Dicas de Segurança
                </h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                    Sempre verifique a documentação do imóvel
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                    Confirme a regularidade das parcelas
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                    Faça a transferência via cartório
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal da Galeria */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setIsGalleryOpen(false)}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <X className="w-8 h-8" />
              </button>
              
              {propertyPhotos.length > 0 && (
                <>
                  <img
                    src={propertyPhotos[selectedImage]}
                    alt={`Foto ${selectedImage + 1}`}
                    className="max-w-full max-h-full object-contain"
                    onClick={(e) => e.stopPropagation()}
                  />
                  
                  {propertyPhotos.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2"
                      >
                        <ChevronLeft className="w-8 h-8" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2"
                      >
                        <ChevronRight className="w-8 h-8" />
                      </button>
                      
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg">
                        {selectedImage + 1} / {propertyPhotos.length}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Contato */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowContactForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Entrar em Contato</h3>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent resize-none"
                    placeholder={`Olá! Tenho interesse no ${tipo_imovel} em ${cidade}. Gostaria de mais informações.`}
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1"
                    disabled={isLoading}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-[#3EA76F] hover:bg-[#48C78E]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Enviando...
                      </div>
                    ) : (
                      'Enviar Mensagem'
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default PropertyView;