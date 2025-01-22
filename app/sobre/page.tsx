import { Building2, Users, Award, Shield } from "lucide-react";

export default function SobrePage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#3EA76F] to-[#48C78E] py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre a Ágio Imóveis</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Somos a principal plataforma de ágio de imóveis no Brasil, conectando proprietários e compradores de forma segura e eficiente.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#3EA76F] mb-2">+5000</div>
              <div className="text-gray-600">Imóveis Anunciados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#3EA76F] mb-2">+10000</div>
              <div className="text-gray-600">Usuários Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#3EA76F] mb-2">+2000</div>
              <div className="text-gray-600">Negócios Fechados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#3EA76F] rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excelência</h3>
              <p className="text-gray-600">Comprometimento com a qualidade em todos os aspectos do nosso serviço.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#48C78E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparência</h3>
              <p className="text-gray-600">Clareza e honestidade em todas as nossas transações e relacionamentos.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#3EA76F] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inovação</h3>
              <p className="text-gray-600">Busca constante por soluções inovadoras para o mercado imobiliário.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#48C78E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Segurança</h3>
              <p className="text-gray-600">Proteção e confiabilidade em todas as negociações.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossa História</h2>
          <div className="max-w-3xl mx-auto text-gray-600 space-y-6">
            <p>
              Fundada em 2025, a Ágio Imóveis nasceu da necessidade de simplificar e tornar mais seguro o processo de compra e venda de ágios de imóveis no Brasil.
            </p>
            <p>
              Nossa plataforma foi desenvolvida com foco na experiência do usuário, oferecendo ferramentas intuitivas e recursos avançados para facilitar a busca e negociação de imóveis.
            </p>
            <p>
              Hoje, somos referência no mercado de ágios, conectando milhares de proprietários e compradores em todo o país, sempre com o compromisso de oferecer um serviço de excelência e segurança para todos os envolvidos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}