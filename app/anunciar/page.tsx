"use client";

import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, DollarSign, Home, Upload, Loader2, MapPin } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AnunciarPage() {
  const router = useRouter();

  // Hook de autenticação
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Estado para gerenciar a etapa atual (1 a 4)
  const [step, setStep] = useState(1);

  // Estado do formulário com todos os campos
  const [formData, setFormData] = useState({
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
    fotos: [] as File[],
    valor_agio: "",
    valor_parcela_atual: "",
    parcelas_restantes: "",
    valor_total_financiado: "",
  });

  // Estado para exibir loading ao publicar o imóvel
  const [isPublishing, setIsPublishing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Função para formatar a string de valor em moeda (ex: R$ 1.234,56)
  const formatCurrency = (value: string) => {
    let cleaned = value.replace(/[^\d,]/g, "");
    if (!cleaned) return "";
    const numericValue = parseFloat(cleaned.replace(",", "."));
    if (isNaN(numericValue)) return "";
    return numericValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  // Função para converter o valor formatado para número com ponto decimal (ex: 1234.56)
  const parseCurrency = (value: string) => {
    return value.replace(/[R$\s.]/g, "").replace(",", ".");
  };

  // Função para remover foto selecionada
  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index)
    }));
  };

  // Verifica se o usuário está logado
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

  // Enquanto estiver verificando a autenticação, exibe a tela de loading
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-[#3EA76F]" />
        <p className="mt-4 text-lg">Verificando autenticação, aguarde...</p>
      </div>
    );
  }

  // Função para atualizar os campos do formulário
  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Consulta a API ViaCEP para preencher os dados do endereço
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

  // Trata a seleção de arquivos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, fotos: [...prev.fotos, ...files] }));
    }
  };

  // Envia os dados para o backend via FormData
  const handleSubmit = async () => {
    setIsPublishing(true);
    try {
      const token = localStorage.getItem("authToken");
      const data = new FormData();
      data.append("tipo_imovel", formData.tipo_imovel);
      data.append("area", formData.area);
      data.append("quartos", formData.quartos);
      data.append("banheiros", formData.banheiros);
      data.append("descricao", formData.descricao);
      data.append("cep", formData.cep);
      data.append("endereco", formData.endereco);
      data.append("complemento", formData.complemento);
      data.append("estado", formData.estado);
      data.append("cidade", formData.cidade);
      
      formData.fotos.forEach((file) => {
        data.append("fotos[]", file);
      });

      data.append("valor_agio", parseCurrency(formData.valor_agio));
      data.append("valor_parcela_atual", parseCurrency(formData.valor_parcela_atual));
      data.append("parcelas_restantes", formData.parcelas_restantes);
      data.append("valor_total_financiado", parseCurrency(formData.valor_total_financiado));

      const response = await fetch("https://agio-imoveis.onrender.com/api/imoveis", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: data,
      });

      if (response.ok) {
        toast.success("Anúncio enviado com sucesso!");
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

  return (
    <>
      <Head>
        <title>Agio Imóveis - Anuncie Seu Imóvel</title>
        <meta
          name="description"
          content="Anuncie seu imóvel de forma rápida e segura no Agio Imóveis. Preencha os dados em etapas e alcance milhares de interessados."
        />
        <meta
          name="keywords"
          content="imóvel, anuncie imóvel, agio imoveis, agio, imóveis, cadastro de imóvel"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.agiomoveis.com.br/anunciar" />
        {/* Open Graph */}
        <meta property="og:title" content="Agio Imóveis - Anuncie Seu Imóvel" />
        <meta
          property="og:description"
          content="Anuncie seu imóvel de forma rápida e segura no Agio Imóveis. Preencha os dados em etapas e alcance milhares de interessados."
        />
        <meta property="og:url" content="https://www.agiomoveis.com.br/anunciar" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image-anunciar.jpg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Agio Imóveis - Anuncie Seu Imóvel" />
        <meta
          name="twitter:description"
          content="Anuncie seu imóvel de forma rápida e segura no Agio Imóveis."
        />
        <meta name="twitter:image" content="/images/og-image-anunciar.jpg" />
      </Head>
      <div className="min-h-screen pt-20 relative">
        <section className="bg-gradient-to-r from-[#3EA76F] to-[#48C78E] py-20">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Anuncie seu Imóvel
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Cadastre seu imóvel de forma rápida e segura, preenchendo os dados em etapas.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Progress Steps */}
              <div className="flex justify-between mb-12">
                <div className={`flex-1 text-center ${step >= 1 ? "text-[#3EA76F]" : "text-gray-400"}`}>
                  <div className={`w-8 h-8 rounded-full ${step >= 1 ? "bg-[#3EA76F]" : "bg-gray-200"} flex items-center justify-center mx-auto mb-2`}>
                    <Home className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm">Dados do Imóvel</span>
                </div>
                <div className={`flex-1 text-center ${step >= 2 ? "text-[#3EA76F]" : "text-gray-400"}`}>
                  <div className={`w-8 h-8 rounded-full ${step >= 2 ? "bg-[#3EA76F]" : "bg-gray-200"} flex items-center justify-center mx-auto mb-2`}>
                    <MapPin className="w-4 h-4 text-white" /> 
                  </div>
                  <span className="text-sm">Dados do Endereço</span>
                </div>
                <div className={`flex-1 text-center ${step >= 3 ? "text-[#3EA76F]" : "text-gray-400"}`}>
                  <div className={`w-8 h-8 rounded-full ${step >= 3 ? "bg-[#3EA76F]" : "bg-gray-200"} flex items-center justify-center mx-auto mb-2`}>
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm">Fotos</span>
                </div>
                <div className={`flex-1 text-center ${step >= 4 ? "text-[#3EA76F]" : "text-gray-400"}`}>
                  <div className={`w-8 h-8 rounded-full ${step >= 4 ? "bg-[#3EA76F]" : "bg-gray-200"} flex items-center justify-center mx-auto mb-2`}>
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm">Valores</span>
                </div>
              </div>

              {/* Step 1: Dados do Imóvel */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-6">Dados do Imóvel</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Imóvel
                      </label>
                      <select
                        name="tipo_imovel"
                        value={formData.tipo_imovel}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 p-2"
                      >
                        <option>Apartamento</option>
                        <option>Casa</option>
                        <option>Terreno</option>
                        <option>Comercial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Área (m²)
                      </label>
                      <Input
                        name="area"
                        type="number"
                        placeholder="Ex: 100"
                        value={formData.area}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quartos
                      </label>
                      <Input
                        name="quartos"
                        type="number"
                        placeholder="Ex: 3"
                        value={formData.quartos}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Banheiros
                      </label>
                      <Input
                        name="banheiros"
                        type="number"
                        placeholder="Ex: 2"
                        value={formData.banheiros}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição
                    </label>
                    <textarea
                      name="descricao"
                      className="w-full rounded-md border border-gray-300 p-2 h-32"
                      placeholder="Descreva as características do imóvel"
                      value={formData.descricao}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => setStep(2)}>Próximo</Button>
                  </div>
                </div>
              )}

              {/* Step 2: Dados do Endereço */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-6">Dados do Endereço</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CEP
                      </label>
                      <Input
                        name="cep"
                        type="text"
                        placeholder="Ex: 01001000"
                        value={formData.cep}
                        onChange={handleInputChange}
                        onBlur={handleCepBlur}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Endereço
                      </label>
                      <Input
                        name="endereco"
                        type="text"
                        placeholder="Logradouro, número, bairro"
                        value={formData.endereco}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Complemento
                      </label>
                      <Input
                        name="complemento"
                        type="text"
                        placeholder="Complemento"
                        value={formData.complemento}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estado
                      </label>
                      <Input
                        name="estado"
                        type="text"
                        placeholder="Estado"
                        value={formData.estado}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cidade
                      </label>
                      <Input
                        name="cidade"
                        type="text"
                        placeholder="Cidade"
                        value={formData.cidade}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Voltar
                    </Button>
                    <Button onClick={() => setStep(3)}>Próximo</Button>
                  </div>
                </div>
              )}

              {/* Step 3: Fotos do Imóvel */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-6">Fotos do Imóvel</h2>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Arraste suas fotos aqui ou
                    </p>
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                      Selecionar Arquivos
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG até 5MB</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    />
                  </div>
                  {formData.fotos.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {formData.fotos.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                            className="w-full h-32 object-cover rounded"
                          />
                          <button
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Voltar
                    </Button>
                    <Button onClick={() => setStep(4)}>Próximo</Button>
                  </div>
                </div>
              )}

              {/* Step 4: Valores */}
              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-6">Valores</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor do Ágio
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
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor da Parcela Atual
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
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Parcelas Restantes
                      </label>
                      <Input
                        name="parcelas_restantes"
                        type="number"
                        placeholder="Ex: 120"
                        value={formData.parcelas_restantes}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor Total Financiado
                      </label>
                      <Input
                        name="valor_total_financiado"
                        type="text"
                        placeholder="R$ 0,00"
                        value={formData.valor_total_financiado}
                        onChange={handleInputChange}
                        onBlur={(e) => {
                          const formatted = formatCurrency(e.target.value);
                          setFormData((prev) => ({ ...prev, valor_total_financiado: formatted }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(3)}>
                      Voltar
                    </Button>
                    <Button onClick={handleSubmit} disabled={isPublishing}>
                      {isPublishing ? (
                        <>
                          <Loader2 className="animate-spin mr-2 h-5 w-5" />
                          Publicar Anúncio
                        </>
                      ) : (
                        "Publicar Anúncio"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <ToastContainer />

        {/* Overlay de Loading ao Publicar */}
        {isPublishing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
            <Loader2 className="animate-spin h-10 w-10 text-white" />
            <p className="mt-4 text-white text-xl">Publicando...</p>
          </div>
        )}
      </div>
    </>
  );
}
