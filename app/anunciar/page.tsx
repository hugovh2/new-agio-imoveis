"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, DollarSign, Home, Upload } from "lucide-react";

export default function AnunciarPage() {
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Atualiza os campos padrão do formulário
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Consulta a API ViaCEP para preencher automaticamente os dados do endereço a partir do CEP
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
            estado: data.estado || "",
          }));
        } else {
          alert("CEP não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  // Trata a seleção de arquivos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, fotos: files }));
    }
  };

  // Envia os dados para o backend via FormData
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
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
      data.append("valor_agio", formData.valor_agio);
      data.append("valor_parcela_atual", formData.valor_parcela_atual);
      data.append("parcelas_restantes", formData.parcelas_restantes);
      data.append("valor_total_financiado", formData.valor_total_financiado);

      const response = await fetch("http://127.0.0.1:8000/api/imoveis", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: data,
      });

      if (response.ok) {
        alert("Anúncio enviado com sucesso!");
        // Limpe o formulário ou redirecione conforme necessário
      } else {
        const errorData = await response.json();
        alert("Erro: " + errorData.message);
      }
    } catch (error) {
      console.error("Erro ao enviar anúncio:", error);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#3EA76F] to-[#48C78E] py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Anuncie seu Imóvel</h1>
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
                <div
                  className={`w-8 h-8 rounded-full ${
                    step >= 1 ? "bg-[#3EA76F]" : "bg-gray-200"
                  } flex items-center justify-center mx-auto mb-2`}
                >
                  <Home className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">Dados do Imóvel</span>
              </div>
              <div className={`flex-1 text-center ${step >= 2 ? "text-[#3EA76F]" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full ${
                    step >= 2 ? "bg-[#3EA76F]" : "bg-gray-200"
                  } flex items-center justify-center mx-auto mb-2`}
                >
                  <Home className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">Dados do Endereço</span>
              </div>
              <div className={`flex-1 text-center ${step >= 3 ? "text-[#3EA76F]" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full ${
                    step >= 3 ? "bg-[#3EA76F]" : "bg-gray-200"
                  } flex items-center justify-center mx-auto mb-2`}
                >
                  <Camera className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">Fotos</span>
              </div>
              <div className={`flex-1 text-center ${step >= 4 ? "text-[#3EA76F]" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full ${
                    step >= 4 ? "bg-[#3EA76F]" : "bg-gray-200"
                  } flex items-center justify-center mx-auto mb-2`}
                >
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
                  {/* Tipo de Imóvel */}
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
                  {/* Área */}
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
                  {/* Quartos */}
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
                  {/* Banheiros */}
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
                {/* Descrição */}
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
                  {/* CEP */}
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
                  {/* Endereço */}
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
                  {/* Complemento */}
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
                  {/* Estado */}
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
                  {/* Cidade */}
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
                  <p className="text-gray-600 mb-2">Arraste suas fotos aqui ou</p>
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
                  <div className="mt-4">
                    <strong>Arquivos selecionados:</strong>
                    <ul className="list-disc list-inside">
                      {formData.fotos.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
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
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    Voltar
                  </Button>
                  <Button onClick={handleSubmit}>Publicar Anúncio</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
