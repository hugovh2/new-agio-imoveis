"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Building2,
  Phone,
  ArrowRight,
  Github,
  ToggleLeft as Google,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    tipo_usuario: "cpf", // "cpf" ou "cnpj"
    email: "",
    senha: "",
    cpf: "",
    nome_completo: "",
    data_nascimento: "",
    cnpj: "",
    razao_social: "",
    nome_fantasia: "",
    telefone: "",
    termos_aceitos: false,
  });

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  // Função para validar os campos de cada etapa
  const validateStep = (): string[] => {
    const errors: string[] = [];

    if (step === 2) {
      if (formData.tipo_usuario === "cpf") {
        if (!formData.nome_completo.trim())
          errors.push("Nome completo é obrigatório.");
        if (!/^\d{11}$/.test(formData.cpf))
          errors.push("CPF deve conter 11 dígitos numéricos.");
        if (!formData.data_nascimento)
          errors.push("Data de nascimento é obrigatória.");
      } else {
        if (!formData.razao_social.trim())
          errors.push("Razão social é obrigatória.");
        if (!formData.nome_fantasia.trim())
          errors.push("Nome fantasia é obrigatória.");
        if (!/^\d{14}$/.test(formData.cnpj))
          errors.push("CNPJ deve conter 14 dígitos numéricos.");
        if (!formData.telefone.trim())
          errors.push("Telefone é obrigatório.");
      }
    } else if (step === 3) {
      if (!formData.email.trim())
        errors.push("Email é obrigatório.");
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        errors.push("Email inválido.");
      if (!formData.senha)
        errors.push("Senha é obrigatória.");
      else if (formData.senha.length < 6)
        errors.push("Senha deve ter no mínimo 6 caracteres.");
    } else if (step === 4) {
      if (!formData.termos_aceitos)
        errors.push("Você precisa aceitar os Termos de Uso e a Política de Privacidade.");
    }

    return errors;
  };

  // Função para avançar para a próxima etapa
  const handleNext = () => {
    const errors = validateStep();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors([]);
    setStep((prev) => prev + 1);
  };

  // Voltar para a etapa anterior e limpar erros
  const handleBack = () => {
    setValidationErrors([]);
    setStep((prev) => prev - 1);
  };

  // Envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação final antes de enviar (no step 4)
    const errors = validateStep();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao cadastrar");
      }

      alert("Cadastro realizado com sucesso!");
      router.push("/auth/login");
    } catch (error: any) {
      alert(error.message || "Ocorreu um erro.");
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { title: "Tipo de Conta", icon: User },
    { title: "Informações", icon: Building2 },
    { title: "Segurança", icon: Lock },
    { title: "Confirmação", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3EA76F]/5 via-white to-[#48C78E]/5">
      <div className="container px-4 py-16 mx-auto flex flex-col lg:flex-row-reverse items-center gap-8">
        {/* Formulário de Cadastro */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3EA76F] to-[#48C78E] bg-clip-text text-transparent">
                Crie sua conta
              </h1>
              <p className="text-gray-600 mt-2">Comece sua jornada conosco</p>
            </div>

            {/* Barra de progresso */}
            <div className="flex justify-between mb-8 relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0">
                <div
                  className="h-full bg-[#3EA76F] transition-all duration-300"
                  style={{
                    width: `${((step - 1) / (steps.length - 1)) * 100}%`,
                  }}
                />
              </div>
              {steps.map((s, index) => {
                const Icon = s.icon;
                return (
                  <div key={index} className="relative z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step > index
                          ? "bg-[#3EA76F] text-white"
                          : step === index + 1
                          ? "bg-white border-2 border-[#3EA76F] text-[#3EA76F]"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap text-gray-500">
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Exibição de erros de validação */}
            {validationErrors.length > 0 && (
              <div className="mb-4 p-3 border border-red-500 text-red-500 rounded">
                {validationErrors.map((err, index) => (
                  <p key={index} className="text-sm">
                    {err}
                  </p>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Selecione o tipo de conta
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <label
                      className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.tipo_usuario === "cpf"
                          ? "border-[#3EA76F] bg-[#3EA76F]/5"
                          : "border-gray-200 hover:border-[#3EA76F]/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="tipo_usuario"
                        value="cpf"
                        checked={formData.tipo_usuario === "cpf"}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <User className="w-6 h-6 mb-2 text-[#3EA76F]" />
                      <div className="font-medium">Pessoa Física</div>
                      <div className="text-sm text-gray-500">CPF</div>
                    </label>
                    <label
                      className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.tipo_usuario === "cnpj"
                          ? "border-[#3EA76F] bg-[#3EA76F]/5"
                          : "border-gray-200 hover:border-[#3EA76F]/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="tipo_usuario"
                        value="cnpj"
                        checked={formData.tipo_usuario === "cnpj"}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <Building2 className="w-6 h-6 mb-2 text-[#3EA76F]" />
                      <div className="font-medium">Pessoa Jurídica</div>
                      <div className="text-sm text-gray-500">CNPJ</div>
                    </label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  {formData.tipo_usuario === "cpf" ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Nome Completo
                        </label>
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                          <input
                            type="text"
                            name="nome_completo"
                            placeholder="Seu nome completo"
                            value={formData.nome_completo}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3EA76F]/20 focus:border-[#3EA76F] h-12"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          CPF
                        </label>
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                          <input
                            type="text"
                            name="cpf"
                            placeholder="Seu CPF (apenas números)"
                            value={formData.cpf}
                            onChange={handleChange}
                            maxLength={11}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3EA76F]/20 focus:border-[#3EA76F] h-12"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Data de Nascimento
                        </label>
                        <div className="relative group">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                          <input
                            type="date"
                            name="data_nascimento"
                            value={formData.data_nascimento}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3EA76F]/20 focus:border-[#3EA76F] h-12"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Telefone
                      </label>
                      <div className="relative group">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                        <input
                          type="text"
                          name="telefone"
                          placeholder="Seu telefone"
                          value={formData.telefone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3EA76F]/20 focus:border-[#3EA76F] h-12"
                          required
                        />
                      </div>
                    </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Razão Social
                        </label>
                        <div className="relative group">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                          <input
                            type="text"
                            name="razao_social"
                            placeholder="Razão social da empresa"
                            value={formData.razao_social}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3EA76F]/20 focus:border-[#3EA76F] h-12"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Nome Fantasia
                        </label>
                        <div className="relative group">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                          <input
                            type="text"
                            name="nome_fantasia"
                            placeholder="Nome fantasia"
                            value={formData.nome_fantasia}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3EA76F]/20 focus:border-[#3EA76F] h-12"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          CNPJ
                        </label>
                        <div className="relative group">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                          <input
                            type="text"
                            name="cnpj"
                            placeholder="CNPJ da empresa (apenas números)"
                            value={formData.cnpj}
                            onChange={handleChange}
                            maxLength={14}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3EA76F]/20 focus:border-[#3EA76F] h-12"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Telefone
                        </label>
                        <div className="relative group">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                          <input
                            type="tel"
                            name="telefone"
                            placeholder="Telefone da empresa"
                            value={formData.telefone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3EA76F]/20 focus:border-[#3EA76F] h-12"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                      <input
                        type="email"
                        name="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3EA76F]/20 focus:border-[#3EA76F] h-12"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Senha
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                      <input
                        type="password"
                        name="senha"
                        placeholder="••••••••"
                        value={formData.senha}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3EA76F]/20 focus:border-[#3EA76F] h-12"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <h3 className="font-medium text-gray-700 mb-4">
                      Confirme seus dados
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Tipo de Conta</p>
                        <p className="font-medium">
                          {formData.tipo_usuario === "cpf"
                            ? "Pessoa Física"
                            : "Pessoa Jurídica"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Email</p>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                      {formData.tipo_usuario === "cpf" ? (
                        <>
                          <div>
                            <p className="text-gray-500">Nome Completo</p>
                            <p className="font-medium">
                              {formData.nome_completo}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">CPF</p>
                            <p className="font-medium">{formData.cpf}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Data de Nascimento</p>
                            <p className="font-medium">
                              {formData.data_nascimento}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <p className="text-gray-500">Razão Social</p>
                            <p className="font-medium">
                              {formData.razao_social}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Nome Fantasia</p>
                            <p className="font-medium">
                              {formData.nome_fantasia}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">CNPJ</p>
                            <p className="font-medium">{formData.cnpj}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Telefone</p>
                            <p className="font-medium">{formData.telefone}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      name="termos_aceitos"
                      checked={formData.termos_aceitos}
                      onChange={handleChange}
                      className="mt-1 rounded border-gray-300 text-[#3EA76F] focus:ring-[#3EA76F]"
                      required
                    />
                    <label className="text-sm text-gray-600">
                      Eu concordo com os{" "}
                      <a
                        href="#"
                        className="text-[#3EA76F] hover:text-[#48C78E]"
                      >
                        Termos de Uso
                      </a>{" "}
                      e a{" "}
                      <a
                        href="#"
                        className="text-[#3EA76F] hover:text-[#48C78E]"
                      >
                        Política de Privacidade
                      </a>
                    </label>
                  </div>
                </div>
              )}

              <div className="flex justify-between gap-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-full h-12 px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Voltar
                  </button>
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full h-12 flex items-center justify-center px-6 py-2 bg-[#3EA76F] text-white rounded-lg hover:bg-[#48C78E] transition-colors"
                  >
                    Próximo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 flex items-center justify-center px-6 py-2 bg-[#3EA76F] text-white rounded-lg hover:bg-[#48C78E] transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Processando...
                      </div>
                    ) : (
                      <>
                        Criar conta
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>

            {step === 1 && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Ou cadastre-se com
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="h-12 flex items-center justify-center px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                    <Google className="mr-2 h-4 w-4" />
                    Google
                  </button>
                  <button className="h-12 flex items-center justify-center px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                    <Github className="mr-2 h-4 w-4" />
                    Github
                  </button>
                </div>
              </>
            )}

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <a
                  href="/auth/login"
                  className="text-[#3EA76F] hover:text-[#48C78E] font-medium"
                >
                  Entrar
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Ilustração */}
        <div className="hidden lg:block w-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3EA76F] to-[#48C78E] rounded-2xl opacity-10 blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
              alt="Modern home interior"
              className="rounded-2xl object-cover w-full h-[600px] relative z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
