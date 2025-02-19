"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, MapPin, DollarSign, Home, Upload } from "lucide-react";

export default function AnunciarPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#3EA76F] to-[#48C78E] py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Anuncie seu Imóvel
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Anuncie seu ágio de imóveis e alcance milhares de compradores. Venda
            seu ágio de forma rápida e segura com nossa plataforma intuitiva.
            Maximize sua visibilidade e otimize negociações sem complicações.
            Cadastre-se agora e transforme seu negócio imobiliário!
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Progress Steps */}
            <div className="flex justify-between mb-12">
              <div
                className={`flex-1 text-center ${
                  step >= 1 ? "text-[#3EA76F]" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full ${
                    step >= 1 ? "bg-[#3EA76F]" : "bg-gray-200"
                  } flex items-center justify-center mx-auto mb-2`}
                >
                  <Home className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">Informações Básicas</span>
              </div>
              <div
                className={`flex-1 text-center ${
                  step >= 2 ? "text-[#3EA76F]" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full ${
                    step >= 2 ? "bg-[#3EA76F]" : "bg-gray-200"
                  } flex items-center justify-center mx-auto mb-2`}
                >
                  <Camera className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">Fotos</span>
              </div>
              <div
                className={`flex-1 text-center ${
                  step >= 3 ? "text-[#3EA76F]" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full ${
                    step >= 3 ? "bg-[#3EA76F]" : "bg-gray-200"
                  } flex items-center justify-center mx-auto mb-2`}
                >
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">Valores</span>
              </div>
            </div>

            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">
                  Informações do Imóvel
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Imóvel
                    </label>
                    <select className="w-full rounded-md border border-gray-300 p-2">
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
                    <Input type="number" placeholder="Ex: 100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quartos
                    </label>
                    <Input type="number" placeholder="Ex: 3" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Banheiros
                    </label>
                    <Input type="number" placeholder="Ex: 2" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Endereço Completo
                  </label>
                  <Input placeholder="Rua, número, bairro, cidade" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    className="w-full rounded-md border border-gray-300 p-2 h-32"
                    placeholder="Descreva as características principais do imóvel"
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setStep(2)}>Próximo</Button>
                </div>
              </div>
            )}

            {/* Step 2: Photos */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Fotos do Imóvel</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Arraste suas fotos aqui ou
                  </p>
                  <Button variant="outline">Selecionar Arquivos</Button>
                  <p className="text-sm text-gray-500 mt-2">PNG, JPG até 5MB</p>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Voltar
                  </Button>
                  <Button onClick={() => setStep(3)}>Próximo</Button>
                </div>
              </div>
            )}

            {/* Step 3: Values */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Valores</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valor do Ágio
                    </label>
                    <Input type="text" placeholder="R$ 0,00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valor da Parcela Atual
                    </label>
                    <Input type="text" placeholder="R$ 0,00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Parcelas Restantes
                    </label>
                    <Input type="number" placeholder="Ex: 120" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valor Total Financiado
                    </label>
                    <Input type="text" placeholder="R$ 0,00" />
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Voltar
                  </Button>
                  <Button onClick={() => alert("Anúncio enviado com sucesso!")}>
                    Publicar Anúncio
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por que anunciar conosco?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#3EA76F] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Grande Alcance</h3>
              <p className="text-gray-600">Milhares de compradores potenciais visualizam seu anúncio diariamente.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#48C78E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Segurança</h3>
              <p className="text-gray-600">Processo seguro e transparente do início ao fim da negociação.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#3EA76F] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suporte Especializado</h3>
              <p className="text-gray-600">Equipe dedicada para ajudar em todas as etapas do processo.</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}