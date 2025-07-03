"use client";

import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Camera, 
  DollarSign, 
  Home, 
  Upload, 
  Loader2, 
  MapPin, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  Save,
  Calculator,
  FileText,
  Image as ImageIcon,
  Eye,
  X,
  GripVertical
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  tipo_imovel: string;
  area: string;
  quartos: string;
  banheiros: string;
  descricao: string;
  cep: string;
  endereco: string;
  complemento: string;
  estado: string;
  cidade: string;
  fotos: File[];
  valor_total_imovel: string;
  valor_agio: string;
  saldo_devedor: string;
  valor_parcela_atual: string;
  parcelas_restantes: string;
  taxa_juros: string;
  documentacao: string[];
}

const steps = [
  {
    id: 1,
    title: "Informações Básicas",
    description: "Dados principais do imóvel",
    icon: Home
  },
  {
    id: 2,
    title: "Valores e Condições",
    description: "Informações financeiras do ágio",
    icon: DollarSign
  },
  {
    id: 3,
    title: "Fotos e Mídia",
    description: "Imagens do seu imóvel",
    icon: Camera
  },
  {
    id: 4,
    title: "Revisão",
    description: "Confirme os dados antes de publicar",
    icon: Eye
  }
];

const propertyTemplates = {
  apartamento: "Apartamento moderno com excelente localização, próximo a comércios e transporte público. Ideal para quem busca praticidade e conforto no dia a dia.",
  casa: "Casa espaçosa em bairro residencial tranquilo, perfeita para famílias. Ambiente aconchegante com boa ventilação e iluminação natural.",
  terreno: "Terreno plano em localização privilegiada, ideal para construção. Ótima oportunidade de investimento em área em valorização.",
  comercial: "Imóvel comercial em ponto estratégico com alto fluxo de pessoas. Excelente oportunidade para diversos tipos de negócio."
};

const documentosNecessarios = [
  "Contrato original de financiamento",
  "Certidão de ônus do imóvel",
  "Comprovante de quitação das parcelas",
  "IPTU em dia",
  "Certidão negativa de débitos",
  "Escritura ou promessa de compra e venda",
  "Matrícula atualizada do imóvel"
];

export default function AnunciarPage() {
  const router = useRouter();
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [step, setStep] = useState(1);
  const [isPublishing, setIsPublishing] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');

  const [formData, setFormData] = useState<FormData>({
    tipo_imovel: "Apartamento",
    area: "",
    quartos: "",
    banheiros: "",
    descricao: "",
    cep: "",
    endereco: "",
    complemento: "",
    estado: "",
    cidade: "",
    fotos: [],
    valor_total_imovel: "",
    valor_agio: "",
    saldo_devedor: "",
    valor_parcela_atual: "",
    parcelas_restantes: "",
    taxa_juros: "8.5",
    documentacao: []
  });

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setTimeout(() => {
      if (step > 1) {
        setAutoSaveStatus('saving');
        localStorage.setItem('anuncio_rascunho', JSON.stringify(formData));
        setTimeout(() => setAutoSaveStatus('saved'), 1000);
      }
    }, 2000);

    return () => clearTimeout(autoSave);
  }, [formData, step]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('anuncio_rascunho');
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        setFormData(parsedDraft);
        toast.info('Rascunho carregado automaticamente');
      } catch (error) {
        console.error('Erro ao carregar rascunho:', error);
      }
    }
  }, []);

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setTimeout(() => {
        toast.error("Você precisa estar logado para anunciar.");
        router.push("/auth/login");
      }, 2000);
    } else {
      setIsLoadingAuth(false);
    }
  }, [router]);

  const formatCurrency = (value: string) => {
    let cleaned = value.replace(/[^\d,]/g, "");
    if (!cleaned) return "";
    const numericValue = parseFloat(cleaned.replace(",", "."));
    if (isNaN(numericValue)) return "";
    return numericValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const parseCurrency = (value: string) => {
    return value.replace(/[R$\s.]/g, "").replace(",", ".");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCepBlur = async () => {
    const cep = formData.cep.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            endereco: data.logradouro || "",
            complemento: data.complemento || "",
            cidade: data.localidade || "",
            estado: data.uf || "",
          }));
        } else {
          toast.error("CEP não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        toast.error("Erro ao buscar CEP. Tente novamente.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      
      // Validate file types and sizes
      const validFiles = files.filter(file => {
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} não é uma imagem válida`);
          return false;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} é muito grande (máximo 5MB)`);
          return false;
        }
        return true;
      });

      setFormData((prev) => ({ 
        ...prev, 
        fotos: [...prev.fotos, ...validFiles].slice(0, 20) // Limit to 20 photos
      }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index)
    }));
  };

  const reorderPhotos = (startIndex: number, endIndex: number) => {
    const result = Array.from(formData.fotos);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setFormData(prev => ({ ...prev, fotos: result }));
  };

  const calculateValues = () => {
    const valorTotal = parseFloat(parseCurrency(formData.valor_total_imovel)) || 0;
    const valorAgio = parseFloat(parseCurrency(formData.valor_agio)) || 0;
    const saldoDevedor = valorTotal - valorAgio;
    
    setFormData(prev => ({
      ...prev,
      saldo_devedor: formatCurrency(saldoDevedor.toString())
    }));
  };

  const useTemplate = () => {
    const template = propertyTemplates[formData.tipo_imovel.toLowerCase() as keyof typeof propertyTemplates];
    if (template) {
      setFormData(prev => ({ ...prev, descricao: template }));
      toast.success('Template aplicado com sucesso!');
    }
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.tipo_imovel || !formData.area || !formData.quartos || !formData.banheiros || !formData.descricao) {
          toast.error('Preencha todos os campos obrigatórios');
          return false;
        }
        break;
      case 2:
        if (!formData.valor_total_imovel || !formData.valor_agio || !formData.valor_parcela_atual || !formData.parcelas_restantes) {
          toast.error('Preencha todos os valores financeiros');
          return false;
        }
        break;
      case 3:
        if (formData.fotos.length === 0) {
          toast.error('Adicione pelo menos uma foto do imóvel');
          return false;
        }
        break;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setIsPublishing(true);
    try {
      const token = localStorage.getItem("authToken");
      const data = new FormData();
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'fotos') {
          formData.fotos.forEach((file) => {
            data.append("fotos[]", file);
          });
        } else if (key === 'documentacao') {
          data.append(key, JSON.stringify(value));
        } else if (typeof value === 'string') {
          data.append(key, key.includes('valor') ? parseCurrency(value) : value);
        }
      });

      const response = await fetch("https://agio-imoveis.onrender.com/api/imoveis", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: data,
      });

      if (response.ok) {
        toast.success("Anúncio publicado com sucesso!");
        localStorage.removeItem('anuncio_rascunho');
        router.push("/meus-imoveis");
      } else {
        const errorData = await response.json();
        toast.error("Erro: " + errorData.message);
      }
    } catch (error) {
      console.error("Erro ao enviar anúncio:", error);
      toast.error("Ocorreu um erro ao enviar o anúncio. Tente novamente.");
    } finally {
      setIsPublishing(false);
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin h-10 w-10 text-[#3EA76F]" />
        <p className="mt-4 text-lg">Verificando autenticação...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Anunciar Imóvel - Ágio Imóveis</title>
        <meta name="description" content="Anuncie seu imóvel com ágio de forma rápida e segura" />
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Header */}
        <section className="bg-gradient-to-r from-[#3EA76F] to-[#48C78E] py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl font-bold mb-4">Anuncie seu Imóvel</h1>
              <p className="text-xl opacity-90">
                Publique seu anúncio em poucos passos e alcance milhares de interessados
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                {steps.map((stepItem, index) => {
                  const Icon = stepItem.icon;
                  const isActive = step >= stepItem.id;
                  const isCurrent = step === stepItem.id;
                  
                  return (
                    <div key={stepItem.id} className="flex-1 relative">
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                          isActive 
                            ? 'bg-[#3EA76F] text-white shadow-lg' 
                            : 'bg-gray-200 text-gray-500'
                        } ${isCurrent ? 'ring-4 ring-[#3EA76F]/20' : ''}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="text-center">
                          <p className={`font-medium text-sm ${isActive ? 'text-[#3EA76F]' : 'text-gray-500'}`}>
                            {stepItem.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {stepItem.description}
                          </p>
                        </div>
                      </div>
                      
                      {index < steps.length - 1 && (
                        <div className={`absolute top-6 left-1/2 w-full h-0.5 -translate-y-1/2 ${
                          step > stepItem.id ? 'bg-[#3EA76F]' : 'bg-gray-200'
                        }`} style={{ left: '50%', width: 'calc(100% - 3rem)' }} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Auto-save indicator */}
              <div className="flex justify-end">
                <div className="flex items-center text-sm text-gray-500">
                  <Save className="w-4 h-4 mr-1" />
                  {autoSaveStatus === 'saving' && 'Salvando rascunho...'}
                  {autoSaveStatus === 'saved' && 'Rascunho salvo automaticamente'}
                  {autoSaveStatus === 'error' && 'Erro ao salvar rascunho'}
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Informações Básicas */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Informações Básicas</h2>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={useTemplate}
                          className="text-[#3EA76F] border-[#3EA76F]"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Usar Template
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Imóvel *
                        </label>
                        <select
                          name="tipo_imovel"
                          value={formData.tipo_imovel}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
                        >
                          <option value="Apartamento">Apartamento</option>
                          <option value="Casa">Casa</option>
                          <option value="Terreno">Terreno</option>
                          <option value="Comercial">Comercial</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Área (m²) *
                        </label>
                        <Input
                          name="area"
                          type="number"
                          placeholder="Ex: 100"
                          value={formData.area}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quartos *
                        </label>
                        <Input
                          name="quartos"
                          type="number"
                          placeholder="Ex: 3"
                          value={formData.quartos}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Banheiros *
                        </label>
                        <Input
                          name="banheiros"
                          type="number"
                          placeholder="Ex: 2"
                          value={formData.banheiros}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CEP *
                        </label>
                        <Input
                          name="cep"
                          type="text"
                          placeholder="Ex: 01001000"
                          value={formData.cep}
                          onChange={handleInputChange}
                          onBlur={handleCepBlur}
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cidade *
                        </label>
                        <Input
                          name="cidade"
                          type="text"
                          placeholder="Cidade"
                          value={formData.cidade}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Endereço Completo *
                        </label>
                        <Input
                          name="endereco"
                          type="text"
                          placeholder="Logradouro, número, bairro"
                          value={formData.endereco}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição do Imóvel *
                      </label>
                      <textarea
                        name="descricao"
                        className="w-full rounded-lg border border-gray-300 p-3 h-32 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent"
                        placeholder="Descreva as características e diferenciais do imóvel..."
                        value={formData.descricao}
                        onChange={handleInputChange}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {formData.descricao.length}/500 caracteres
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Valores e Condições */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Valores e Condições do Ágio</h2>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={calculateValues}
                        className="text-[#3EA76F] border-[#3EA76F]"
                      >
                        <Calculator className="w-4 h-4 mr-2" />
                        Calcular Automaticamente
                      </Button>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <h3 className="font-medium text-blue-900 mb-2">💡 Dica sobre Ágio</h3>
                      <p className="text-sm text-blue-800">
                        O ágio é o valor que você recebe pela transferência do financiamento. 
                        Geralmente representa a diferença entre o valor de mercado atual e o saldo devedor.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor Total do Imóvel *
                        </label>
                        <Input
                          name="valor_total_imovel"
                          type="text"
                          placeholder="R$ 0,00"
                          value={formData.valor_total_imovel}
                          onChange={handleInputChange}
                          onBlur={(e) => {
                            const formatted = formatCurrency(e.target.value);
                            setFormData((prev) => ({ ...prev, valor_total_imovel: formatted }));
                          }}
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor do Ágio *
                        </label>
                        <Input
                          name="valor_agio"
                          type="text"
                          placeholder="R$ 0,00"
                          value={formData.valor_agio}
                          onChange={handleInputChange}
                          onBlur={(e) => {
                            const formatted = formatCurrency(e.target.value);
                            setFormData((prev) => ({ ...prev, valor_agio: formatted }));
                          }}
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Saldo Devedor
                        </label>
                        <Input
                          name="saldo_devedor"
                          type="text"
                          placeholder="R$ 0,00"
                          value={formData.saldo_devedor}
                          onChange={handleInputChange}
                          className="h-12 bg-gray-50"
                          readOnly
                        />
                        <p className="text-xs text-gray-500 mt-1">Calculado automaticamente</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor da Parcela Atual *
                        </label>
                        <Input
                          name="valor_parcela_atual"
                          type="text"
                          placeholder="R$ 0,00"
                          value={formData.valor_parcela_atual}
                          onChange={handleInputChange}
                          onBlur={(e) => {
                            const formatted = formatCurrency(e.target.value);
                            setFormData((prev) => ({ ...prev, valor_parcela_atual: formatted }));
                          }}
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Parcelas Restantes *
                        </label>
                        <Input
                          name="parcelas_restantes"
                          type="number"
                          placeholder="Ex: 120"
                          value={formData.parcelas_restantes}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Taxa de Juros (% a.a.) *
                        </label>
                        <Input
                          name="taxa_juros"
                          type="number"
                          step="0.1"
                          placeholder="Ex: 8.5"
                          value={formData.taxa_juros}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Documentação Disponível
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {documentosNecessarios.map((doc, index) => (
                          <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.documentacao.includes(doc)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData(prev => ({
                                    ...prev,
                                    documentacao: [...prev.documentacao, doc]
                                  }));
                                } else {
                                  setFormData(prev => ({
                                    ...prev,
                                    documentacao: prev.documentacao.filter(d => d !== doc)
                                  }));
                                }
                              }}
                              className="rounded border-gray-300 text-[#3EA76F] focus:ring-[#3EA76F]"
                            />
                            <span className="text-sm text-gray-700">{doc}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Fotos e Mídia */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Fotos do Imóvel</h2>

                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#3EA76F] transition-colors">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Arraste suas fotos aqui ou clique para selecionar
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => fileInputRef.current?.click()}
                        className="mb-2"
                      >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Selecionar Fotos
                      </Button>
                      <p className="text-sm text-gray-500">
                        PNG, JPG até 5MB cada • Máximo 20 fotos
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="hidden"
                      />
                    </div>

                    {formData.fotos.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium">
                            Fotos Selecionadas ({formData.fotos.length}/20)
                          </h3>
                          <p className="text-sm text-gray-500">
                            Arraste para reordenar • Primeira foto será a capa
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {formData.fotos.map((file, index) => (
                            <div
                              key={index}
                              className="relative group bg-gray-100 rounded-lg overflow-hidden aspect-square"
                              draggable
                              onDragStart={() => setDraggedIndex(index)}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => {
                                e.preventDefault();
                                if (draggedIndex !== null && draggedIndex !== index) {
                                  reorderPhotos(draggedIndex, index);
                                }
                                setDraggedIndex(null);
                              }}
                            >
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              
                              {index === 0 && (
                                <div className="absolute top-2 left-2 bg-[#3EA76F] text-white px-2 py-1 rounded text-xs font-medium">
                                  Capa
                                </div>
                              )}
                              
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => removePhoto(index)}
                                  className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              
                              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <GripVertical className="w-4 h-4 text-white bg-black/50 rounded" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 4: Revisão */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Revisão do Anúncio</h2>

                    <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Informações do Imóvel</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Tipo:</span>
                            <span className="ml-2 font-medium">{formData.tipo_imovel}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Área:</span>
                            <span className="ml-2 font-medium">{formData.area} m²</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Quartos:</span>
                            <span className="ml-2 font-medium">{formData.quartos}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Banheiros:</span>
                            <span className="ml-2 font-medium">{formData.banheiros}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Valores</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Valor Total:</span>
                            <span className="ml-2 font-medium">{formData.valor_total_imovel}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Valor do Ágio:</span>
                            <span className="ml-2 font-medium text-[#3EA76F]">{formData.valor_agio}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Parcela Mensal:</span>
                            <span className="ml-2 font-medium">{formData.valor_parcela_atual}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Parcelas Restantes:</span>
                            <span className="ml-2 font-medium">{formData.parcelas_restantes}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Localização</h3>
                        <p className="text-sm text-gray-700">
                          {formData.endereco}, {formData.cidade} - {formData.estado}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Fotos ({formData.fotos.length})</h3>
                        <div className="flex space-x-2 overflow-x-auto">
                          {formData.fotos.slice(0, 5).map((file, index) => (
                            <img
                              key={index}
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                            />
                          ))}
                          {formData.fotos.length > 5 && (
                            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-sm text-gray-600">
                              +{formData.fotos.length - 5}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                        <div>
                          <h4 className="font-medium text-green-900">Pronto para publicar!</h4>
                          <p className="text-sm text-green-800 mt-1">
                            Seu anúncio será publicado imediatamente e ficará visível para milhares de interessados.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>

                {step < 4 ? (
                  <Button
                    onClick={nextStep}
                    className="bg-[#3EA76F] hover:bg-[#48C78E] flex items-center"
                  >
                    Próximo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isPublishing}
                    className="bg-[#3EA76F] hover:bg-[#48C78E] flex items-center"
                  >
                    {isPublishing ? (
                      <>
                        <Loader2 className="animate-spin mr-2 h-5 w-5" />
                        Publicando...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Publicar Anúncio
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />

        {/* Publishing Overlay */}
        {isPublishing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
              <Loader2 className="animate-spin h-12 w-12 text-[#3EA76F] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Publicando seu anúncio...</h3>
              <p className="text-gray-600">
                Estamos processando suas informações e otimizando as imagens.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}