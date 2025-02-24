"use client";

import React, { useState, useEffect } from "react";
import { 
  Menu, Bell, MessageSquare, ChevronRight, Edit2, Mail, Phone, Calendar 
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { randomAvatar } from "@/lib/utils";

interface User {
  id: number;
  name: string;
  email: string;
  telefone?: string;
  avatar?: string;
  role: string;
  created_at: string;
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth() as { user: User | null };

  useEffect(() => {
    // Lógica adicional se necessário
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-red-500 text-lg">
          Você precisa estar logado para acessar esta página.
        </p>
      </div>
    );
  }

  const avatar = user.avatar ? user.avatar : randomAvatar();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 fixed w-full z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-[#3EA76F]">Perfil</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-[#48C78E] rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MessageSquare className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transition-transform duration-300 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0`}
        >
          <div className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img 
                  src={avatar} 
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#A7EBC1]"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-[#3EA76F] rounded-full text-white hover:bg-[#48C78E] transition-colors">
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>
              <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.role}</p>
            </div>

            <nav className="mt-8">
              <ul className="space-y-2">
                {[
                  "Visão Geral",
                  "Meus Imóveis",
                  "Mensagens",
                  "Calendário",
                  "Configurações"
                ].map((item) => (
                  <li key={item}>
                    <button className="w-full p-3 flex items-center justify-between rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="text-gray-700">{item}</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Overlay para mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black opacity-50 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 transition-all duration-300 md:ml-64">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Info Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Informações Pessoais</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-[#3EA76F]" />
                    <span className="text-gray-600">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-[#3EA76F]" />
                    <span className="text-gray-600">{user.telefone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-[#3EA76F]" />
                    <span className="text-gray-600">
                      Membro desde {new Date(user.created_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Statistics Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Estatísticas</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Imóveis Ativos", value: "12" },
                    { label: "Visitas Agendadas", value: "8" },
                    { label: "Propostas", value: "5" },
                    { label: "Avaliações", value: "4.8" }
                  ].map((stat) => (
                    <div key={stat.label} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-semibold text-[#3EA76F]">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
                <div className="space-y-3">
                  {[
                    { label: "Adicionar Novo Imóvel", link: "/anunciar" },
                    { label: "Agendar Visita", link: "#" },
                    { label: "Ver Mensagens", link: "#" },
                    { label: "Editar Perfil", link: "#" }
                  ].map(({ label, link }) => (
                    <a
                      key={label}
                      href={link}
                      className="w-full block p-3 text-left rounded-lg border border-gray-200 hover:border-[#3EA76F] hover:bg-[#A7EBC1]/10 transition-colors"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
