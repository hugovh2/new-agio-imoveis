"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context/AuthContext";

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface FormValidation {
  email: boolean;
  password: boolean;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [validation, setValidation] = useState<FormValidation>({ email: false, password: false });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  
  const router = useRouter();
  const { login } = useAuth();

  // Validação em tempo real do email
  useEffect(() => {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(email);
      setValidation(prev => ({ ...prev, email: isValid }));
      
      if (!isValid && email.length > 0) {
        setErrors(prev => ({ ...prev, email: "Por favor, insira um email válido" }));
      } else {
        setErrors(prev => ({ ...prev, email: undefined }));
      }
    } else {
      setValidation(prev => ({ ...prev, email: false }));
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  }, [email]);

  // Validação em tempo real da senha
  useEffect(() => {
    if (password) {
      const isValid = password.length >= 6;
      setValidation(prev => ({ ...prev, password: isValid }));
      
      if (!isValid && password.length > 0) {
        setErrors(prev => ({ ...prev, password: "A senha deve ter no mínimo 6 caracteres" }));
      } else {
        setErrors(prev => ({ ...prev, password: undefined }));
      }
    } else {
      setValidation(prev => ({ ...prev, password: false }));
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  }, [password]);

  // Carregar dados salvos se "Lembrar-me" estava ativo
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const wasRemembered = localStorage.getItem("rememberMe") === "true";
    
    if (savedEmail && wasRemembered) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação final
    if (!validation.email || !validation.password) {
      setErrors(prev => ({
        ...prev,
        general: "Por favor, corrija os erros antes de continuar"
      }));
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("https://agio-imoveis.onrender.com/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao realizar login.");
      }

      // Salvar token e dados do usuário
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Gerenciar "Lembrar-me"
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberMe");
      }

      login(data.user, data.token);
      toast.success("Login realizado com sucesso!");
      
      // Pequeno delay para mostrar o toast
      setTimeout(() => {
        router.push("/");
      }, 1000);

    } catch (error: any) {
      setErrors({ general: error.message || "Erro ao realizar login. Tente novamente." });
      toast.error(error.message || "Erro ao realizar login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!forgotEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      toast.error("Por favor, insira um email válido");
      return;
    }

    setIsForgotLoading(true);

    try {
      // Simular envio de email de recuperação
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Email de recuperação enviado! Verifique sua caixa de entrada.");
      setShowForgotPassword(false);
      setForgotEmail("");
    } catch (error) {
      toast.error("Erro ao enviar email de recuperação. Tente novamente.");
    } finally {
      setIsForgotLoading(false);
    }
  };

  const getInputClassName = (field: keyof FormValidation, hasError: boolean) => {
    let baseClass = "pl-10 h-12 transition-all duration-200 border-gray-200 focus:border-[#3EA76F] focus:ring-[#3EA76F]/20";
    
    if (hasError) {
      baseClass += " border-red-300 focus:border-red-500 focus:ring-red-500/20";
    } else if (validation[field]) {
      baseClass += " border-green-300 focus:border-green-500 focus:ring-green-500/20";
    }
    
    return baseClass;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3EA76F]/5 via-white to-[#48C78E]/5 px-4 py-8">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 max-w-6xl">
        
        {/* Left side - Login Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 max-w-md"
        >
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6">
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold bg-gradient-to-r from-[#3EA76F] to-[#48C78E] bg-clip-text text-transparent"
              >
                Bem-vindo de volta
              </motion.h1>
              <p className="text-gray-600 mt-2">Entre na sua conta para continuar</p>
            </div>

            {/* Mensagem de erro geral */}
            <AnimatePresence>
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                  <span className="text-red-700 text-sm">{errors.general}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                {/* Campo Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    Email *
                    {validation.email && (
                      <CheckCircle2 className="w-4 h-4 text-green-500 ml-2" />
                    )}
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      className={getInputClassName('email', !!errors.email)}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                    {validation.email && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-500 text-sm flex items-center"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Campo Senha */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    Senha *
                    {validation.password && (
                      <CheckCircle2 className="w-4 h-4 text-green-500 ml-2" />
                    )}
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={getInputClassName('password', !!errors.password) + " pr-12"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-500 text-sm flex items-center"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.password}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Opções adicionais */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between"
              >
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#3EA76F] focus:ring-[#3EA76F] transition-colors"
                  />
                  <span className="text-sm text-gray-600">Lembrar-me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-[#3EA76F] hover:text-[#48C78E] transition-colors font-medium"
                >
                  Esqueceu a senha?
                </button>
              </motion.div>

              {/* Botão de Login */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-[#3EA76F] hover:bg-[#48C78E] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !validation.email || !validation.password}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Entrando...
                    </div>
                  ) : (
                    <>
                      Entrar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Link para cadastro */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <p className="text-sm text-gray-600">
                Ainda não tem uma conta?{" "}
                <Link 
                  href="/auth/register" 
                  className="text-[#3EA76F] hover:text-[#48C78E] font-medium transition-colors"
                >
                  Cadastre-se
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Illustration */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block w-1/2"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3EA76F] to-[#48C78E] rounded-2xl opacity-10 blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
              alt="Modern home"
              className="rounded-2xl object-cover w-full h-[600px] relative z-10"
            />
          </div>
        </motion.div>
      </div>

      {/* Modal de Recuperação de Senha */}
      <AnimatePresence>
        {showForgotPassword && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowForgotPassword(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Recuperar Senha</h3>
              <p className="text-gray-600 mb-6">
                Digite seu email e enviaremos um link para redefinir sua senha.
              </p>
              
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForgotPassword(false)}
                    className="flex-1"
                    disabled={isForgotLoading}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-[#3EA76F] hover:bg-[#48C78E]"
                    disabled={isForgotLoading}
                  >
                    {isForgotLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Enviar"
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}