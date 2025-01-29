"use client";

import { motion } from "framer-motion";
import { Building2, Users, Award, Shield, ChevronRight, Target, Rocket, Heart } from "lucide-react";
import Image from "next/image";

export default function SobrePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const stats = [
    { number: "5000+", label: "Imóveis Anunciados", prefix: "+" },
    { number: "10000+", label: "Usuários Ativos", prefix: "+" },
    { number: "2000+", label: "Negócios Fechados", prefix: "+" },
    { number: "98%", label: "Clientes Satisfeitos", prefix: "" }
  ];

  const values = [
    {
      icon: Target,
      title: "Excelência",
      description: "Comprometimento com a qualidade em todos os aspectos do nosso serviço."
    },
    {
      icon: Users,
      title: "Transparência",
      description: "Clareza e honestidade em todas as nossas transações e relacionamentos."
    },
    {
      icon: Rocket,
      title: "Inovação",
      description: "Busca constante por soluções inovadoras para o mercado imobiliário."
    },
    {
      icon: Heart,
      title: "Compromisso",
      description: "Dedicação total à satisfação e sucesso de nossos clientes."
    }
  ];

  const timeline = [
    {
      year: "2025",
      title: "Fundação",
      description: "Início das operações com foco em simplificar o processo de compra e venda de ágios."
    },
    {
      year: "2026",
      title: "Expansão Nacional",
      description: "Alcance em todas as principais cidades do Brasil."
    },
    {
      year: "2027",
      title: "Inovação Tecnológica",
      description: "Lançamento de ferramentas avançadas para avaliação e negociação."
    },
    {
      year: "2028",
      title: "Reconhecimento",
      description: "Líder no mercado de ágios imobiliários."
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Modern building"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3EA76F]/95 to-[#48C78E]/95" />
        </div>
        <div className="relative h-full container mx-auto px-4 flex items-center">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Transformando o Mercado Imobiliário
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Somos a principal plataforma de ágio de imóveis no Brasil, conectando proprietários e compradores de forma segura e eficiente.
            </p>
            <div className="flex gap-4">
              <motion.div
                className="h-1 w-20 bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold text-[#3EA76F] mb-2">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    {stat.prefix}{stat.number}
                  </motion.span>
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Nossos Valores</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Construímos nossa reputação com base em valores sólidos que norteiam todas as nossas ações
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-[#3EA76F]/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-[#3EA76F]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Nossa História</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Uma jornada de inovação e crescimento no mercado imobiliário
            </p>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-8 mb-12 last:mb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-32 pt-2">
                  <div className="text-2xl font-bold text-[#3EA76F]">{item.year}</div>
                </div>
                <div className="flex-1">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#3EA76F]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Faça Parte dessa História
            </h2>
            <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já confiam em nossa plataforma para realizar seus sonhos
            </p>
            <button className="bg-white text-[#3EA76F] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
              Comece Agora
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}