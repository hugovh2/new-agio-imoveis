// app/auth/login/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, ArrowRight, Github, ToggleLeft as Google } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
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
  
      // Salva o token no localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
  
      login(data.user, data.token);
  
      toast.success("Login realizado com sucesso!");
      router.push("/");
    } catch (error: any) {
      setErrorMessage(error.message || "Ocorreu um erro.");
      toast.error(error.message || "Ocorreu um erro.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3EA76F]/5 via-white to-[#48C78E]/5">
      <div className="container px-4 py-16 mx-auto flex flex-col lg:flex-row items-center gap-8">
        {/* Left side - Login Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 max-w-md"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6">
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

            {errorMessage && (
              <div className="bg-red-100 text-red-600 border border-red-200 rounded p-2 text-sm">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10 h-12 transition-all border-gray-200 hover:border-[#3EA76F] focus:border-[#3EA76F] focus:ring-[#3EA76F]/20"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-12 transition-all border-gray-200 hover:border-[#3EA76F] focus:border-[#3EA76F] focus:ring-[#3EA76F]/20"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between"
              >
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-[#3EA76F] focus:ring-[#3EA76F]"
                  />
                  <span className="text-sm text-gray-600">Lembrar-me</span>
                </label>
                <a href="#" className="text-sm text-[#3EA76F] hover:text-[#48C78E] transition-colors">
                  Esqueceu a senha?
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-[#3EA76F] hover:bg-[#48C78E] transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continue com</span>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <Button variant="outline" className="h-12">
                <Google className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="outline" className="h-12">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
            </motion.div>

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

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}
