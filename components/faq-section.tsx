"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "O que é ágio de imóvel e como funciona?",
      answer: "Ágio é a transferência de um financiamento imobiliário já em andamento. Você paga um valor (ágio) ao proprietário atual e assume as parcelas restantes do financiamento, geralmente conseguindo um imóvel por um valor bem abaixo do mercado."
    },
    {
      question: "Quais são as vantagens de comprar um imóvel com ágio?",
      answer: "As principais vantagens são: economia significativa (até 70% do valor de mercado), entrada menor, processo mais rápido que um financiamento tradicional, e possibilidade de adquirir imóveis em localizações privilegiadas por valores acessíveis."
    },
    {
      question: "É seguro comprar imóvel com ágio?",
      answer: "Sim, desde que seja feito corretamente. É fundamental verificar a documentação, regularidade das parcelas, fazer a transferência através de cartório e contar com assessoria jurídica especializada. Nossa plataforma oferece suporte completo nesse processo."
    },
    {
      question: "Quais documentos são necessários?",
      answer: "Você precisará de: RG, CPF, comprovante de renda, certidões negativas, documentos do imóvel, contrato original de financiamento, e comprovante de quitação das parcelas em dia. Nossa equipe te orienta sobre toda a documentação necessária."
    },
    {
      question: "Como funciona o processo de transferência?",
      answer: "O processo envolve: análise da documentação, negociação do valor do ágio, assinatura do contrato de cessão de direitos, transferência do financiamento junto ao banco, e registro em cartório. Todo o processo é acompanhado por nossa equipe."
    },
    {
      question: "Posso financiar o valor do ágio?",
      answer: "Em alguns casos sim. Existem instituições financeiras que oferecem crédito para pagamento do ágio, ou você pode negociar o parcelamento diretamente com o vendedor. Consulte nossas opções de financiamento."
    }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full text-left p-6 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#3EA76F] focus:ring-inset"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#3EA76F]/10 rounded-full flex items-center justify-center mt-1">
                  <HelpCircle className="w-4 h-4 text-[#3EA76F]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
              </div>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </motion.div>
            </div>
          </button>
          
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="ml-12">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default FAQSection;