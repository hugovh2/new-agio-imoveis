"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingDown, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface SimulationResult {
  monthlyPayment: number;
  totalAmount: number;
  totalInterest: number;
  agioSavings: number;
}

export default function FinancingSimulator() {
  const [propertyValue, setPropertyValue] = useState(300000);
  const [downPayment, setDownPayment] = useState([60000]);
  const [loanTerm, setLoanTerm] = useState([360]);
  const [interestRate, setInterestRate] = useState([8.5]);
  const [agioValue, setAgioValue] = useState(50000);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const calculateFinancing = () => {
    const principal = propertyValue - downPayment[0];
    const monthlyRate = interestRate[0] / 100 / 12;
    const numPayments = loanTerm[0];

    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalAmount = monthlyPayment * numPayments + downPayment[0];
    const totalInterest = totalAmount - propertyValue;
    const agioSavings = propertyValue - agioValue;

    setResult({
      monthlyPayment,
      totalAmount,
      totalInterest,
      agioSavings
    });
  };

  useEffect(() => {
    calculateFinancing();
  }, [propertyValue, downPayment, loanTerm, interestRate, agioValue]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simulador de Financiamento
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calcule suas parcelas e descubra quanto você pode economizar com ágio
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulário de Simulação */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-3xl p-8"
            >
              <div className="flex items-center mb-8">
                <Calculator className="w-8 h-8 text-[#3EA76F] mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Configure sua Simulação
                </h3>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor do Imóvel
                  </label>
                  <Input
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="text-lg"
                    placeholder="R$ 300.000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Entrada: {formatCurrency(downPayment[0])}
                  </label>
                  <Slider
                    value={downPayment}
                    onValueChange={setDownPayment}
                    max={propertyValue * 0.5}
                    min={propertyValue * 0.1}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10%</span>
                    <span>50%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Prazo: {loanTerm[0]} meses ({Math.round(loanTerm[0] / 12)} anos)
                  </label>
                  <Slider
                    value={loanTerm}
                    onValueChange={setLoanTerm}
                    max={420}
                    min={120}
                    step={12}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10 anos</span>
                    <span>35 anos</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Taxa de Juros: {interestRate[0]}% a.a.
                  </label>
                  <Slider
                    value={interestRate}
                    onValueChange={setInterestRate}
                    max={15}
                    min={6}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>6%</span>
                    <span>15%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor do Ágio
                  </label>
                  <Input
                    type="number"
                    value={agioValue}
                    onChange={(e) => setAgioValue(Number(e.target.value))}
                    className="text-lg"
                    placeholder="R$ 50.000"
                  />
                </div>
              </div>
            </motion.div>

            {/* Resultados */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-[#3EA76F] to-[#48C78E] rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Resultado da Simulação</h3>
                
                {result && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-xl p-4">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-5 h-5 mr-2" />
                          <span className="text-sm opacity-90">Parcela Mensal</span>
                        </div>
                        <p className="text-2xl font-bold">
                          {formatCurrency(result.monthlyPayment)}
                        </p>
                      </div>
                      
                      <div className="bg-white/10 rounded-xl p-4">
                        <div className="flex items-center mb-2">
                          <DollarSign className="w-5 h-5 mr-2" />
                          <span className="text-sm opacity-90">Valor Total</span>
                        </div>
                        <p className="text-2xl font-bold">
                          {formatCurrency(result.totalAmount)}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <TrendingDown className="w-5 h-5 mr-2" />
                        <span className="text-sm opacity-90">Economia com Ágio</span>
                      </div>
                      <p className="text-3xl font-bold text-yellow-300">
                        {formatCurrency(result.agioSavings)}
                      </p>
                      <p className="text-sm opacity-75 mt-1">
                        Você economiza {((result.agioSavings / propertyValue) * 100).toFixed(1)}% do valor do imóvel
                      </p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <Calculator className="w-5 h-5 mr-2" />
                        <span className="text-sm opacity-90">Total de Juros</span>
                      </div>
                      <p className="text-xl font-bold">
                        {formatCurrency(result.totalInterest)}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">
                  💡 Dica Importante
                </h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  O ágio permite que você adquira um imóvel por um valor menor que o de mercado, 
                  assumindo o financiamento já em andamento. Isso pode representar uma economia 
                  significativa na sua compra!
                </p>
              </div>

              <Button 
                className="w-full bg-[#3EA76F] hover:bg-[#48C78E] text-lg py-6"
                onClick={() => window.open('/buscar', '_blank')}
              >
                Ver Imóveis com Ágio
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}