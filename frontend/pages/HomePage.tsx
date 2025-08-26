import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Users, Award, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/advogados?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/advogados");
    }
  };

  const handleSpecialtyClick = (specialty: string) => {
    navigate(`/advogados?search=${encodeURIComponent(specialty)}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Encontre o Advogado Ideal em{" "}
              <span className="text-blue-200">Mato Grosso</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Conectamos você com os melhores profissionais jurídicos do estado.
              Busque por especialidade, localização e avaliações.
            </p>
            
            <div className="max-w-2xl mx-auto mb-8">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Buscar por especialidade ou cidade..."
                    className="pl-10 h-12 text-gray-900"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100">
                  Buscar Advogados
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">500+ Advogados</h3>
                <p className="text-blue-100">
                  Profissionais qualificados em todas as especialidades
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Avaliações Reais</h3>
                <p className="text-blue-100">
                  Sistema de avaliações verificadas de clientes reais
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Segurança Total</h3>
                <p className="text-blue-100">
                  Todos os profissionais são verificados pela OAB-MT
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Principais Especialidades
            </h2>
            <p className="text-lg text-gray-600">
              Encontre especialistas nas principais áreas do direito
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              "Direito Civil",
              "Direito Penal",
              "Direito Trabalhista",
              "Direito Empresarial",
              "Direito Tributário",
              "Direito de Família",
              "Direito Imobiliário",
              "Direito Previdenciário",
              "Direito do Consumidor",
              "Direito Ambiental",
            ].map((specialty) => (
              <button
                key={specialty}
                onClick={() => handleSpecialtyClick(specialty)}
                className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow border hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <h3 className="font-medium text-gray-900">{specialty}</h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            É Advogado? Cadastre-se na Plataforma
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Aumente sua visibilidade e conecte-se com novos clientes em todo o Mato Grosso
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cadastro">
              <Button size="lg" variant="secondary">
                Cadastrar Gratuitamente
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              Saiba Mais sobre Planos Premium
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
