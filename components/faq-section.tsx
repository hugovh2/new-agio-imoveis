// components/faq-section.tsx
"use client";
import React, { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Como posso anunciar meu imóvel?",
      answer: "Você pode se cadastrar e seguir as instruções para anunciar seu imóvel."
    },
    {
      question: "Quais são os custos para anunciar?",
      answer: "Anunciar é gratuito, mas alguns serviços premium podem ter custos adicionais."
    },
    {
      question: "Como funciona o processo de financiamento?",
      answer: "Nossa plataforma auxilia com informações e parceiros para facilitar seu financiamento."
    }
  ];

  return (
    <div>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4 border-b pb-4">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full text-left font-bold text-lg"
          >
            {faq.question}
          </button>
          {openIndex === index && (
            <p className="mt-2 text-gray-600">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
