"use client";

import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  Bell,
  MessageSquare,
  ChevronRight,
  Edit2,
  Mail,
  Phone,
  Calendar,
  Camera,
  X,
  Save,
  User,
  MapPin,
  Briefcase,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { randomAvatar } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface UserType {
  id: number;
  name: string;
  email: string;
  telefone?: string;
  avatar?: string;
  role?: string;
  created_at: string;
  location?: string;
  bio?: string;
}

function App() {
  const { user: initialUser } = useAuth() as { user: UserType | null };
  const [user, setUser] = useState<UserType | null>(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserType | null>(initialUser);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState("info");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
      setEditedUser(initialUser);
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setEditedUser(parsedUser);
      }
    }
  }, [initialUser]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <X className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Acesso Restrito
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Você precisa estar logado para acessar esta página.
            </p>
            <Link href={`/auth/login`}>
              <Button size="lg" variant="default">
                Fazer Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Se o usuário possuir avatar, verifica se já é uma URL completa
  const avatar = user?.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : "https://agio-imoveis.onrender.com/storage/" + user.avatar
    : randomAvatar();

  // Função para salvar as alterações no perfil
  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name", editedUser?.name || "");
      formData.append("email", editedUser?.email || "");
      formData.append("telefone", editedUser?.telefone || "");
      formData.append("role", editedUser?.role || "");
      formData.append("location", editedUser?.location || "");
      formData.append("bio", editedUser?.bio || "");

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const token = localStorage.getItem("token");
      const response = await fetch("https://agio-imoveis.onrender.com/api/user/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        setEditedUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Perfil atualizado com sucesso!");
        setAvatarFile(null);
      } else {
        toast.error("Erro ao atualizar perfil: " + data.message);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro ao atualizar perfil.");
    } finally {
      setIsLoading(false);
    }
  };

  // Função exclusiva para atualizar a foto de perfil
  const handleSavePhotoUpdate = async () => {
    if (!avatarFile) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name", editedUser?.name || "");
      formData.append("email", editedUser?.email || "");
      formData.append("telefone", editedUser?.telefone || "");
      formData.append("role", editedUser?.role || "");
      formData.append("location", editedUser?.location || "");
      formData.append("bio", editedUser?.bio || "");
      formData.append("avatar", avatarFile);

      const token = localStorage.getItem("token");
      const response = await fetch("https://agio-imoveis.onrender.com/api/user/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        setEditedUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Foto atualizada com sucesso!");
      } else {
        toast.error("Erro ao atualizar foto: " + data.message);
      }
    } catch (error) {
      console.error("Erro na atualização da foto:", error);
      toast.error("Erro ao atualizar foto.");
    } finally {
      setIsLoading(false);
      setShowImageUpload(false);
      setPreviewImage(null);
      setAvatarFile(null);
    }
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      await handleSaveProfile();
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handlePhotoClick = () => {
    setShowImageUpload(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadCancel = () => {
    setShowImageUpload(false);
    setPreviewImage(null);
    setAvatarFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Head>
        <title>Agio Imóveis - Meu Perfil</title>
        <meta
          name="description"
          content="Gerencie seu perfil, atualize suas informações e veja suas estatísticas no Agio Imóveis."
        />
        <meta
          name="keywords"
          content="perfil, agio imoveis, usuário, gerenciamento de perfil, estatísticas"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.agiomoveis.com.br/perfil" />
        {/* Open Graph */}
        <meta property="og:title" content="Agio Imóveis - Meu Perfil" />
        <meta
          property="og:description"
          content="Gerencie seu perfil, atualize suas informações e veja suas estatísticas no Agio Imóveis."
        />
        <meta property="og:url" content="https://www.agiomoveis.com.br/perfil" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image-perfil.jpg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Agio Imóveis - Meu Perfil" />
        <meta
          name="twitter:description"
          content="Gerencie seu perfil, atualize suas informações e veja suas estatísticas no Agio Imóveis."
        />
        <meta name="twitter:image" content="/images/og-image-perfil.jpg" />
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <Loader2 className="h-12 w-12 text-white animate-spin" />
          </div>
        )}

        {/* Header – permanece fixo no topo */}
        <header className="bg-white border-b border-gray-200 fixed w-full z-50 shadow-sm">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <Link href="/" className="text-2xl font-bold text-[#3EA76F]">
                Ágio Imóveis
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-[#48C78E] rounded-full"></span>
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Messages"
              >
                <MessageSquare className="h-6 w-6 text-gray-600" />
              </button>
              {/* Avatar pequena no header */}
              <div
                className="h-8 w-8 rounded-full overflow-hidden cursor-pointer"
                onClick={handlePhotoClick}
              >
                <img
                  src={avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Overlay para fechar sidebar em telas pequenas */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Conteúdo principal com sidebar e main */}
        <div className="flex flex-1 pt-16">
          {/* Sidebar */}
          <aside
            className={`transition-transform duration-300 ${
              isSidebarOpen
                ? "fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] z-20 bg-white border-r border-gray-200 overflow-y-auto md:relative md:translate-x-0"
                : "hidden md:block relative w-64"
            }`}
          >
            <div className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#A7EBC1]"
                  />
                  <button
                    onClick={handlePhotoClick}
                    className="absolute bottom-0 right-0 p-2 bg-[#3EA76F] rounded-full text-white hover:bg-[#48C78E] transition-colors"
                    aria-label="Editar foto de perfil"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="mt-4 text-xl font-semibold">{editedUser?.name}</h2>
                <p className="text-gray-600">{editedUser?.role}</p>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  {editedUser?.location || "Localização não definida"}
                </p>
              </div>

              <nav className="mt-8">
                <ul className="space-y-2">
                  {[
                    {
                      name: "Visão Geral",
                      icon: <User className="h-5 w-5 mr-3 text-[#3EA76F]" />,
                    },
                    {
                      name: "Meus Imóveis",
                      icon: <MapPin className="h-5 w-5 mr-3 text-[#3EA76F]" />,
                    },
                    {
                      name: "Mensagens",
                      icon: (
                        <MessageSquare className="h-5 w-5 mr-3 text-[#3EA76F]" />
                      ),
                    },
                    {
                      name: "Calendário",
                      icon: <Calendar className="h-5 w-5 mr-3 text-[#3EA76F]" />,
                    },
                    {
                      name: "Configurações",
                      icon: <Briefcase className="h-5 w-5 mr-3 text-[#3EA76F]" />,
                    },
                  ].map((item) => (
                    <li key={item.name}>
                      <button className="w-full p-3 flex items-center justify-between rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                          {item.icon}
                          <span className="text-gray-700">{item.name}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 transition-all duration-300 ml-0 md:ml-64">
            <div className="container mx-auto px-4 py-8">
              {/* Cabeçalho do perfil */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="relative mr-4">
                      <img
                        src={avatar}
                        alt={user.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-[#A7EBC1] cursor-pointer"
                        onClick={handlePhotoClick}
                      />
                      <button
                        onClick={handlePhotoClick}
                        className="absolute bottom-0 right-0 p-1 bg-[#3EA76F] rounded-full text-white hover:bg-[#48C78E]"
                        aria-label="Editar foto de perfil"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {editedUser?.name}
                      </h2>
                      <p className="text-gray-600 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {editedUser?.location || "Localização não definida"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleEditToggle}
                    className={`px-4 py-2 rounded-lg flex items-center justify-center transition-colors ${
                      isEditing
                        ? "bg-[#3EA76F] text-white hover:bg-[#48C78E]"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-5 w-5 mr-2" />
                        Salvar Alterações
                      </>
                    ) : (
                      <>
                        <Edit2 className="h-5 w-5 mr-2" />
                        Editar Perfil
                      </>
                    )}
                  </button>
                </div>

                {/* Abas de conteúdo */}
                <div className="mt-6 border-b border-gray-200 overflow-x-auto">
                  <div className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab("info")}
                      className={`pb-4 px-1 ${
                        activeTab === "info"
                          ? "border-b-2 border-[#3EA76F] text-[#3EA76F] font-medium"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Informações Pessoais
                    </button>
                    <button
                      onClick={() => setActiveTab("stats")}
                      className={`pb-4 px-1 ${
                        activeTab === "stats"
                          ? "border-b-2 border-[#3EA76F] text-[#3EA76F] font-medium"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Estatísticas
                    </button>
                    <button
                      onClick={() => setActiveTab("actions")}
                      className={`pb-4 px-1 ${
                        activeTab === "actions"
                          ? "border-b-2 border-[#3EA76F] text-[#3EA76F] font-medium"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Ações Rápidas
                    </button>
                  </div>
                </div>
              </div>

              {/* Conteúdo das abas */}
              <div className="grid grid-cols-1 gap-6">
                {activeTab === "info" && (
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-6">
                      Informações Pessoais
                    </h3>
                    {isEditing ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Nome Completo
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={editedUser?.name || ""}
                              onChange={handleInputChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3EA76F]"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={editedUser?.email || ""}
                              onChange={handleInputChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3EA76F]"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="telefone"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Telefone
                            </label>
                            <input
                              type="tel"
                              id="telefone"
                              name="telefone"
                              value={editedUser?.telefone || ""}
                              onChange={handleInputChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3EA76F]"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="role"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Cargo/Função
                            </label>
                            <input
                              type="text"
                              id="role"
                              name="role"
                              value={editedUser?.role || ""}
                              onChange={handleInputChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3EA76F]"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="location"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Localização
                            </label>
                            <input
                              type="text"
                              id="location"
                              name="location"
                              value={editedUser?.location || ""}
                              onChange={handleInputChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3EA76F]"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="bio"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Biografia
                          </label>
                          <textarea
                            id="bio"
                            name="bio"
                            rows={4}
                            value={editedUser?.bio || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3EA76F]"
                            placeholder="Conte um pouco sobre você..."
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 mb-1">
                              Nome Completo
                            </p>
                            <p className="text-gray-800">{editedUser?.name}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 mb-1">Email</p>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 text-[#3EA76F] mr-2" />
                              <p className="text-gray-800">{editedUser?.email}</p>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 mb-1">Telefone</p>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 text-[#3EA76F] mr-2" />
                              <p className="text-gray-800">
                                {editedUser?.telefone || "Não informado"}
                              </p>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 mb-1">
                              Cargo/Função
                            </p>
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 text-[#3EA76F] mr-2" />
                              <p className="text-gray-800">{editedUser?.role}</p>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 mb-1">
                              Localização
                            </p>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-[#3EA76F] mr-2" />
                              <p className="text-gray-800">
                                {editedUser?.location || "Não informado"}
                              </p>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 mb-1">
                              Membro desde
                            </p>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-[#3EA76F] mr-2" />
                              <p className="text-gray-800">
                                {new Date(
                                  editedUser?.created_at || ""
                                ).toLocaleDateString("pt-BR")}
                              </p>
                            </div>
                          </div>
                        </div>
                        {editedUser?.bio && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 mb-1">
                              Biografia
                            </p>
                            <p className="text-gray-800">{editedUser.bio}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "stats" && (
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-6">Estatísticas</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        {
                          label: "Imóveis Ativos",
                          value: "12",
                          icon: <MapPin className="h-6 w-6 text-[#3EA76F]" />,
                        },
                        {
                          label: "Visitas Agendadas",
                          value: "8",
                          icon: <Calendar className="h-6 w-6 text-[#3EA76F]" />,
                        },
                        {
                          label: "Propostas",
                          value: "5",
                          icon: <Briefcase className="h-6 w-6 text-[#3EA76F]" />,
                        },
                        {
                          label: "Avaliações",
                          value: "4.8",
                          icon: <User className="h-6 w-6 text-[#3EA76F]" />,
                        },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="bg-gray-50 p-4 rounded-lg"
                        >
                          <div className="flex items-center justify-center mb-2">
                            {stat.icon}
                          </div>
                          <p className="text-2xl font-semibold text-center text-[#3EA76F]">
                            {stat.value}
                          </p>
                          <p className="text-sm text-center text-gray-600">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8">
                      <h4 className="text-md font-semibold mb-4">
                        Atividade Recente
                      </h4>
                      <div className="space-y-4">
                        {[
                          {
                            action: "Imóvel visitado",
                            property: "Apartamento em Pinheiros",
                            date: "Hoje",
                          },
                          {
                            action: "Proposta recebida",
                            property: "Casa em Moema",
                            date: "Ontem",
                          },
                          {
                            action: "Novo imóvel adicionado",
                            property: "Cobertura em Perdizes",
                            date: "3 dias atrás",
                          },
                          {
                            action: "Mensagem recebida",
                            property: "Interessado em Vila Mariana",
                            date: "1 semana atrás",
                          },
                        ].map((activity, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border-b border-gray-100"
                          >
                            <div>
                              <p className="font-medium text-gray-800">
                                {activity.action}
                              </p>
                              <p className="text-sm text-gray-600">
                                {activity.property}
                              </p>
                            </div>
                            <span className="text-xs text-gray-500">
                              {activity.date}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "actions" && (
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-6">Ações Rápidas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          label: "Adicionar Novo Imóvel",
                          description:
                            "Cadastre um novo imóvel para venda ou aluguel",
                          link: "/anunciar",
                          icon: <MapPin className="h-6 w-6 text-[#3EA76F]" />,
                        },
                        {
                          label: "Agendar Visita",
                          description: "Organize visitas para seus clientes",
                          link: "#",
                          icon: <Calendar className="h-6 w-6 text-[#3EA76F]" />,
                        },
                        {
                          label: "Ver Mensagens",
                          description: "Confira suas conversas com clientes",
                          link: "#",
                          icon: (
                            <MessageSquare className="h-6 w-6 text-[#3EA76F]" />
                          ),
                        },
                        {
                          label: "Editar Perfil",
                          description: "Atualize suas informações pessoais",
                          link: "#",
                          icon: <User className="h-6 w-6 text-[#3EA76F]" />,
                        },
                      ].map(({ label, description, link, icon }) => (
                        <a
                          key={label}
                          href={link}
                          className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-[#3EA76F] hover:bg-[#A7EBC1]/10 transition-colors"
                        >
                          <div className="mr-4">{icon}</div>
                          <div>
                            <p className="font-medium text-gray-800">{label}</p>
                            <p className="text-sm text-gray-600">{description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modal de upload de imagem */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              Atualizar Foto de Perfil
            </h3>
            <div className="mb-6">
              {previewImage ? (
                <div className="relative w-32 h-32 mx-auto">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <button
                    onClick={() => setPreviewImage(null)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={triggerFileInput}
                  className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  <Camera className="h-8 w-8 text-gray-500 mb-2" />
                  <p className="text-sm text-gray-500">Clique para selecionar</p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleUploadCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSavePhotoUpdate}
                disabled={!previewImage}
                className={`px-4 py-2 rounded-lg text-white transition-colors ${
                  previewImage
                    ? "bg-[#3EA76F] hover:bg-[#48C78E]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
