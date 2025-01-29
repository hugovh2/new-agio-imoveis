import React, { useState } from 'react';
import { Mail, Lock, User, Building2, Phone, ArrowRight, Github, ToggleLeft as Google, CheckCircle2, Calendar } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    user_type: 'cpf',
    email: '',
    password: '',
    cpf: '',
    nome_completo: '',
    data_nascimento: '',
    cnpj: '',
    company_name: '',
    trade_name: '',
    phone: '',
    terms: false
  });

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1500);
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
        {/* Left side - Registration Form */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3EA76F] to-[#48C78E] bg-clip-text text-transparent">
                Crie sua conta
              </h1>
              <p className="text-gray-600 mt-2">Comece sua jornada conosco</p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-between mb-8 relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0">
                <div 
                  className="h-full bg-[#3EA76F] transition-all duration-300"
                  style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>
              {steps.map((s, index) => {
                const Icon = s.icon;
                return (
                  <div key={index} className="relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step > index
                        ? "bg-[#3EA76F] text-white"
                        : step === index + 1
                        ? "bg-white border-2 border-[#3EA76F] text-[#3EA76F]"
                        : "bg-gray-100 text-gray-400"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap text-gray-500">
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 mt-12">
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Selecione o tipo de conta</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.user_type === 'cpf' ? 'border-[#3EA76F] bg-[#3EA76F]/5' : 'border-gray-200 hover:border-[#3EA76F]/50'
                    }`}>
                      <input
                        type="radio"
                        name="user_type"
                        value="cpf"
                        checked={formData.user_type === 'cpf'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <User className="w-6 h-6 mb-2 text-[#3EA76F]" />
                      <div className="font-medium">Pessoa Física</div>
                      <div className="text-sm text-gray-500">CPF</div>
                    </label>
                    <label className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.user_type === 'cnpj' ? 'border-[#3EA76F] bg-[#3EA76F]/5' : 'border-gray-200 hover:border-[#3EA76F]/50'
                    }`}>
                      <input
                        type="radio"
                        name="user_type"
                        value="cnpj"
                        checked={formData.user_type === 'cnpj'}
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
                  {formData.user_type === 'cpf' ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Nome Completo</label>
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
                        <label className="text-sm font-medium text-gray-700">CPF</label>
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                          <input
                            type="text"
                            name="cpf"
                            placeholder="Seu CPF"
                            value={formData.cpf}
                            onChange={handleChange}
                            maxLength={11}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3EA76F]/20 focus:border-[#3EA76F] h-12"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Data de Nascimento</label>
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
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Razão Social</label>
                        <div className="relative group">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                          <input
                            type="text"
                            name="company_name"
                            placeholder="Razão social da empresa"
                            value={formData.company_name}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3EA76F]/20 focus:border-[#3EA76F] h-12"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Nome Fantasia</label>
                        <div className="relative group">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                          <input
                            type="text"
                            name="trade_name"
                            placeholder="Nome fantasia"
                            value={formData.trade_name}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3EA76F]/20 focus:border-[#3EA76F] h-12"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">CNPJ</label>
                        <div className="relative group">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                          <input
                            type="text"
                            name="cnpj"
                            placeholder="CNPJ da empresa"
                            value={formData.cnpj}
                            onChange={handleChange}
                            maxLength={14}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3EA76F]/20 focus:border-[#3EA76F] h-12"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Telefone</label>
                        <div className="relative group">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Telefone da empresa"
                            value={formData.phone}
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
                    <label className="text-sm font-medium text-gray-700">Email</label>
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
                    <label className="text-sm font-medium text-gray-700">Senha</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                      <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
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
                    <h3 className="font-medium text-gray-700 mb-4">Confirme seus dados</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Tipo de Conta</p>
                        <p className="font-medium">{formData.user_type === 'cpf' ? 'Pessoa Física' : 'Pessoa Jurídica'}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Email</p>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                      {formData.user_type === 'cpf' ? (
                        <>
                          <div>
                            <p className="text-gray-500">Nome Completo</p>
                            <p className="font-medium">{formData.nome_completo}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">CPF</p>
                            <p className="font-medium">{formData.cpf}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Data de Nascimento</p>
                            <p className="font-medium">{formData.data_nascimento}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <p className="text-gray-500">Razão Social</p>
                            <p className="font-medium">{formData.company_name}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Nome Fantasia</p>
                            <p className="font-medium">{formData.trade_name}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">CNPJ</p>
                            <p className="font-medium">{formData.cnpj}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Telefone</p>
                            <p className="font-medium">{formData.phone}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                      className="mt-1 rounded border-gray-300 text-[#3EA76F] focus:ring-[#3EA76F]"
                      required
                    />
                    <label className="text-sm text-gray-600">
                      Eu concordo com os <a href="#" className="text-[#3EA76F] hover:text-[#48C78E]">Termos de Uso</a> e a{" "}
                      <a href="#" className="text-[#3EA76F] hover:text-[#48C78E]">Política de Privacidade</a>
                    </label>
                  </div>
                </div>
              )}

              <div className="flex justify-between gap-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="w-full h-12 px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Voltar
                  </button>
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
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
                    <span className="px-2 bg-white text-gray-500">Ou cadastre-se com</span>
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
                <a href="/login" className="text-[#3EA76F] hover:text-[#48C78E] font-medium">
                  Entrar
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Illustration */}
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

export default App;