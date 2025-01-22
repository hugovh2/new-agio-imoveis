"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User, ArrowRight, Github, ToggleLeft as Google, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);
  };

  const steps = [
    { title: "Informações Pessoais", icon: User },
    { title: "Segurança", icon: Lock },
    { title: "Confirmação", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3EA76F]/5 via-white to-[#48C78E]/5">
      <div className="container px-4 py-16 mx-auto flex flex-col lg:flex-row-reverse items-center gap-8">
        {/* Left side - Registration Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 max-w-md"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold bg-gradient-to-r from-[#3EA76F] to-[#48C78E] bg-clip-text text-transparent"
              >
                Crie sua conta
              </motion.h1>
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
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative z-10"
                  >
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
                  </motion.div>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 mt-12">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Nome completo</label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                      <Input
                        name="name"
                        placeholder="Seu nome"
                        className="pl-10 h-12 transition-all border-gray-200 hover:border-[#3EA76F] focus:border-[#3EA76F] focus:ring-[#3EA76F]/20"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                      <Input
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-10 h-12 transition-all border-gray-200 hover:border-[#3EA76F] focus:border-[#3EA76F] focus:ring-[#3EA76F]/20"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Senha</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                      <Input
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-12 transition-all border-gray-200 hover:border-[#3EA76F] focus:border-[#3EA76F] focus:ring-[#3EA76F]/20"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Confirmar senha</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3EA76F] transition-colors" />
                      <Input
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-12 transition-all border-gray-200 hover:border-[#3EA76F] focus:border-[#3EA76F] focus:ring-[#3EA76F]/20"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-2">Confirme seus dados</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><span className="font-medium">Nome:</span> {formData.name}</p>
                      <p><span className="font-medium">Email:</span> {formData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-gray-300 text-[#3EA76F] focus:ring-[#3EA76F]"
                      required
                    />
                    <label className="text-sm text-gray-600">
                      Eu concordo com os <a href="#" className="text-[#3EA76F] hover:text-[#48C78E]">Termos de Uso</a> e a{" "}
                      <a href="#" className="text-[#3EA76F] hover:text-[#48C78E]">Política de Privacidade</a>
                    </label>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between gap-4">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="w-full h-12"
                  >
                    Voltar
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="w-full h-12 bg-[#3EA76F] hover:bg-[#48C78E]"
                  >
                    Próximo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#3EA76F] hover:bg-[#48C78E]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : (
                      <>
                        Criar conta
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
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
              </>
            )}

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center mt-6"
            >
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link 
                  href="/auth/login" 
                  className="text-[#3EA76F] hover:text-[#48C78E] font-medium transition-colors"
                >
                  Entrar
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Illustration */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block w-1/2"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3EA76F] to-[#48C78E] rounded-2xl opacity-10 blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
              alt="Modern home interior"
              className="rounded-2xl object-cover w-full h-[600px] relative z-10"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}