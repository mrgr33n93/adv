import React from "react";
import { Scale, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Advogados MT</span>
            </div>
            <p className="text-gray-300 mb-4">
              A maior plataforma de advogados de Mato Grosso. Conectamos clientes
              com os melhores profissionais jurídicos do estado.
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin className="h-4 w-4" />
              <span>Mato Grosso, Brasil</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/" className="hover:text-blue-400 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="/advogados" className="hover:text-blue-400 transition-colors">
                  Encontrar Advogados
                </a>
              </li>
              <li>
                <a href="/cadastro" className="hover:text-blue-400 transition-colors">
                  Cadastrar-se
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contato@advogadosmt.com.br</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(65) 3000-0000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Advogados MT. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
