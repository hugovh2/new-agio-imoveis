"use client";

import Head from "next/head";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação de envio do formulário
    setTimeout(() => {
      setIsLoading(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      content: "(61) 9999-9999",
      delay: 0.2,
    },
    {
      icon: Mail,
      title: "Email",
      content: "contato@agioimoveis.com.br",
      delay: 0.3,
    },
    {
      icon: MapPin,
      title: "Endereço",
      content: "Brasília, DF",
      delay: 0.4,
    },
    {
      icon: Clock,
      title: "Horário de Atendimento",
      content: "Seg - Sex: 9h às 18h",
      delay: 0.5,
    },
  ];

  return (
    <>
      <Head>
        <title>Agio Imóveis - Entre em Contato</title>
        <meta
          name="description"
          content="Entre em contato com Agio Imóveis. Nossa equipe está pronta para responder suas dúvidas e ajudar no que for preciso."
        />
        <meta
          name="keywords"
          content="contato, agio imoveis, imóveis, atendimento, telefone, email, endereço"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.agiomoveis.com.br/contato" />
        {/* Open Graph */}
        <meta property="og:title" content="Agio Imóveis - Entre em Contato" />
        <meta
          property="og:description"
          content="Entre em contato com Agio Imóveis. Nossa equipe está pronta para responder suas dúvidas e ajudar no que for preciso."
        />
        <meta property="og:url" content="https://www.agiomoveis.com.br/contato" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image-contato.jpg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Agio Imóveis - Entre em Contato" />
        <meta
          name="twitter:description"
          content="Entre em contato com Agio Imóveis. Nossa equipe está pronta para responder suas dúvidas."
        />
        <meta name="twitter:image" content="/images/og-image-contato.jpg" />
      </Head>
      <div className="min-h-screen pt-20 bg-gray-100">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#3EA76F] to-[#48C78E] relative h-[350px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1564577160324-112d603f750f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
              alt="Contato"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-green-400/80" />
          </div>
          <div className="relative flex items-center justify-center h-full text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-4">
                Entre em Contato
              </h1>
              <p className="text-white/90 text-xl max-w-2xl mx-auto">
                Nossa equipe está pronta para responder suas dúvidas e ajudar no que for preciso.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Formulário de Contato */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-3xl shadow-2xl p-10"
              >
                <h2 className="text-3xl font-bold mb-8 text-gray-800">Envie sua Mensagem</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Telefone</label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Assunto</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Mensagem</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-md transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                    ) : (
                      <div className="flex items-center justify-center">
                        Enviar Mensagem <Send className="ml-2 h-5 w-5" />
                      </div>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Informações de Contato e Mapa */}
              <div className="space-y-12">
                {/* Informações de Contato */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl font-bold mb-8 text-gray-800">Informações de Contato</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: info.delay }}
                          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
                        >
                          <div className="w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center mb-4">
                            <Icon className="w-6 h-6 text-green-600" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {info.title}
                          </h3>
                          <p className="text-gray-600">{info.content}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Seção do Mapa */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white p-6 rounded-2xl shadow-2xl"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Nossa Localização
                  </h3>
                  <div className="relative rounded-xl overflow-hidden shadow-md">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245794.75539454045!2d-47.92770696805272!3d-15.721725324419551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a3d18df9ae275%3A0x738470e469754a24!2sBras%C3%ADlia%2C%20DF!5e0!3m2!1spt-BR!2sbr!4v1694655238297!5m2!1spt-BR!2sbr"
                      width="100%"
                      height="350"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <a
                      href="https://goo.gl/maps/yourCustomMapLink"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-500 transition-colors"
                    >
                      Abrir no Google Maps
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
