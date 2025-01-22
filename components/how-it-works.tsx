import { CheckCircle, Search, Home, MessageSquare } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="w-12 h-12 text-[#3EA76F]" />,
      title: "Busque",
      description: "Encontre o imóvel ideal com nossos filtros avançados",
    },
    {
      icon: <Home className="w-12 h-12 text-[#3EA76F]" />,
      title: "Visite",
      description: "Agende uma visita com o proprietário ou corretor",
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-[#3EA76F]" />,
      title: "Negocie",
      description: "Faça uma proposta e negocie diretamente",
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-[#3EA76F]" />,
      title: "Realize",
      description: "Concretize o negócio com segurança e facilidade",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Como Funciona
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}