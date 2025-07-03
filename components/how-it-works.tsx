"use client";

import { motion } from "framer-motion";
import { Search, FileText, Handshake, Key } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="w-12 h-12 text-[#3EA76F]" />,
      title: "1. Busque",
      description: "Encontre o imóvel ideal com nossos filtros avançados e oportunidades exclusivas de ágio",
      details: "Use nossa busca inteligente para filtrar por localização, valor do ágio, parcelas restantes e muito mais."
    },
    {
      icon: <FileText className="w-12 h-12 text-[#3EA76F]" />,
      title: "2. Analise",
      description: "Verifique toda a documentação e histórico do financiamento com nossa assessoria especializada",
      details: "Nossa equipe verifica a regularidade das parcelas, documentação e te orienta sobre todos os aspectos legais."
    },
    {
      icon: <Handshake className="w-12 h-12 text-[#3EA76F]" />,
      title: "3. Negocie",
      description: "Faça uma proposta e negocie diretamente com o proprietário de forma segura",
      details: "Plataforma segura para negociação, com suporte para parcelamento do ágio e condições especiais."
    },
    {
      icon: <Key className="w-12 h-12 text-[#3EA76F]" />,
      title: "4. Realize",
      description: "Concretize o negócio com segurança total e receba as chaves do seu novo lar",
      details: "Acompanhamento completo da transferência, registro em cartório e entrega das chaves."
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Como Funciona o Ágio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Um processo simples e seguro para você adquirir seu imóvel com economia de até 70%
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Linha conectora */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-[#3EA76F] to-[#48C78E] transform translate-x-4 z-0" />
              )}
              
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative z-10 border border-gray-100 group hover:border-[#3EA76F]/20">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#3EA76F]/10 to-[#48C78E]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 text-center mb-4 leading-relaxed">
                  {step.description}
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {step.details}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Seção adicional com benefícios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-[#3EA76F] to-[#48C78E] rounded-3xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            Por que escolher ágio?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">Até 70%</div>
              <div className="text-white/90">de economia</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Entrada</div>
              <div className="text-white/90">facilitada</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Processo</div>
              <div className="text-white/90">mais rápido</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}