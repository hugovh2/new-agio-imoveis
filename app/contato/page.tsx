"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  ArrowRight, 
  CheckCircle, 
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  ExternalLink,
  User,
  Building,
  HelpCircle,
  Zap,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  category: string;
}

interface ContactInfo {
  icon: React.ElementType;
  title: string;
  content: string;
  description: string;
  action?: () => void;
}

interface SocialLink {
  icon: React.ElementType;
  name: string;
  url: string;
  followers: string;
  color: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export default function ContatoPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'geral'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        category: 'geral'
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: Phone,
      title: 'Telefone',
      content: '(61) 9811-6408',
      description: 'Atendimento via WhatsApp',
      action: () => window.open('https://wa.me/556198116408', '_blank')
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'proftcov@gmail.com',
      description: 'Resposta em até 2 horas',
      action: () => window.open('mailto:proftcov@gmail.com', '_blank')
    },
    {
      icon: MapPin,
      title: 'Localização',
      content: 'Brasília, DF',
      description: 'Atendimento em todo o DF'
    },
    {
      icon: Clock,
      title: 'Horário de Atendimento',
      content: 'Seg - Sex: 8h às 18h',
      description: 'Sáb: 8h às 12h'
    }
  ];

  const socialLinks: SocialLink[] = [
    {
      icon: Facebook,
      name: 'Facebook',
      url: '#',
      followers: '12.5k',
      color: 'hover:text-blue-600'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      url: '#',
      followers: '8.2k',
      color: 'hover:text-pink-600'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      url: '#',
      followers: '5.1k',
      color: 'hover:text-blue-400'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: '#',
      followers: '3.8k',
      color: 'hover:text-blue-700'
    },
    {
      icon: Youtube,
      name: 'YouTube',
      url: '#',
      followers: '2.1k',
      color: 'hover:text-red-600'
    }
  ];

  const faqs: FAQ[] = [
    {
      question: 'Como funciona o processo de ágio?',
      answer: 'O ágio é a transferência de um financiamento já em andamento. Você paga um valor ao proprietário atual e assume as parcelas restantes, conseguindo um imóvel por valor abaixo do mercado.'
    },
    {
      question: 'Quanto tempo leva para finalizar uma negociação?',
      answer: 'O processo completo geralmente leva de 15 a 30 dias, incluindo análise de documentação, negociação e transferência junto ao banco financiador.'
    },
    {
      question: 'É seguro comprar imóvel com ágio?',
      answer: 'Sim, desde que seja feito corretamente com toda documentação em ordem e acompanhamento jurídico. Nossa equipe oferece suporte completo durante todo o processo.'
    },
    {
      question: 'Posso financiar o valor do ágio?',
      answer: 'Em alguns casos sim. Temos parcerias com instituições financeiras que oferecem crédito para pagamento do ágio, ou você pode negociar parcelamento com o vendedor.'
    }
  ];

  const categories = [
    { value: 'geral', label: 'Dúvida Geral', icon: HelpCircle },
    { value: 'compra', label: 'Quero Comprar', icon: User },
    { value: 'venda', label: 'Quero Vender', icon: Building },
    { value: 'suporte', label: 'Suporte Técnico', icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3EA76F] to-[#48C78E] py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] opacity-10" />
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Vamos Conversar
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Nossa equipe especializada está pronta para ajudar você a encontrar 
              a melhor oportunidade de ágio imobiliário
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${isOnline ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className="text-sm">
                  {isOnline ? 'Online agora' : 'Offline'}
                </span>
              </div>
              <div className="text-sm opacity-75">
                Resposta em até 2 horas
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-10"
            >
              <div className="flex items-center mb-8">
                <MessageCircle className="w-8 h-8 text-[#3EA76F] mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Envie sua Mensagem
                </h2>
              </div>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8"
                >
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <div>
                      <h3 className="font-semibold text-green-900">Mensagem enviada com sucesso!</h3>
                      <p className="text-green-700 text-sm mt-1">
                        Entraremos em contato em breve. Obrigado!
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Como podemos ajudar?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <label
                          key={category.value}
                          className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all ${
                            formData.category === category.value
                              ? 'border-[#3EA76F] bg-[#3EA76F]/5'
                              : 'border-gray-200 hover:border-[#3EA76F]/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="category"
                            value={category.value}
                            checked={formData.category === category.value}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="text-center">
                            <Icon className="w-6 h-6 mx-auto mb-2 text-[#3EA76F]" />
                            <span className="text-sm font-medium">{category.label}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="h-12"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-12"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-12"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assunto *
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="h-12"
                      placeholder="Assunto da sua mensagem"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#3EA76F] focus:border-transparent resize-none"
                    placeholder="Descreva sua dúvida ou necessidade em detalhes..."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.message.length}/500 caracteres
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || isSubmitted}
                  className="w-full h-14 bg-[#3EA76F] hover:bg-[#48C78E] text-lg font-semibold"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Enviando...
                    </div>
                  ) : isSubmitted ? (
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Mensagem Enviada!
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="w-5 h-5 mr-2" />
                      Enviar Mensagem
                    </div>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Informações de Contato
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div
                      key={index}
                      className={`group ${info.action ? 'cursor-pointer' : ''}`}
                      onClick={info.action}
                    >
                      <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="w-12 h-12 bg-[#3EA76F]/10 rounded-xl flex items-center justify-center group-hover:bg-[#3EA76F] transition-colors">
                          <Icon className="w-6 h-6 text-[#3EA76F] group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {info.title}
                          </h4>
                          <p className="text-gray-800 font-medium">
                            {info.content}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {info.description}
                          </p>
                        </div>
                        {info.action && (
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Redes Sociais
              </h3>
              <div className="space-y-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-[#3EA76F] transition-all group ${social.color}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-6 h-6" />
                        <div>
                          <p className="font-medium">{social.name}</p>
                          <p className="text-sm text-gray-600">{social.followers} seguidores</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Perguntas Frequentes
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                      className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`} />
                    </button>
                    {openFAQ === index && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-white rounded-3xl shadow-xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <MapPin className="w-6 h-6 mr-3 text-[#3EA76F]" />
              Nossa Localização
            </h3>
            <Button
              variant="outline"
              onClick={() => window.open('https://goo.gl/maps/yourCustomMapLink', '_blank')}
              className="flex items-center"
            >
              Abrir no Google Maps
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-lg h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245794.75539454045!2d-47.92770696805272!3d-15.721725324419551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a3d18df9ae275%3A0x738470e469754a24!2sBras%C3%ADlia%2C%20DF!5e0!3m2!1spt-BR!2sbr!4v1694655238297!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>

      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        onClick={() => window.open('https://wa.me/556198116408', '_blank')}
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all hover:scale-110"
      >
        <MessageCircle className="w-8 h-8" />
      </motion.button>
    </div>
  );
}