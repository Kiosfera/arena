import { Link } from "react-router-dom";
import { Home, ArrowLeft, Zap, Search } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="relative mb-8">
            <Zap className="h-24 w-24 text-blue-400 mx-auto animate-pulse" />
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-2xl"></div>
          </div>

          <h1 className="text-8xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-6">
            404
          </h1>
          <h2 className="text-3xl font-bold text-white mb-4">
            Página Não Encontrada
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            A página que você está procurando não existe ou foi movida para
            outro local.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Home className="h-5 w-5" />
              <span>Voltar ao Início</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-3 bg-slate-700 hover:bg-slate-600 text-gray-300 px-8 py-4 rounded-xl font-medium transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Página Anterior</span>
            </button>
          </div>
        </div>

        <div className="mt-12 p-8 bg-slate-800/30 border border-slate-700 rounded-2xl backdrop-blur-sm">
          <Search className="h-8 w-8 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-4">Explore a Arena Social</h3>
          <p className="text-gray-400 mb-6">
            Descubra todas as funcionalidades incríveis da nossa plataforma:
          </p>
          <div className="space-y-3 text-left">
            <Link
              to="/"
              className="block text-blue-400 hover:text-blue-300 transition-colors border-l-2 border-blue-400/30 pl-4 py-2"
            >
              • Chat Global e Salas Ao Vivo
            </Link>
            <Link
              to="/duels"
              className="block text-purple-400 hover:text-purple-300 transition-colors border-l-2 border-purple-400/30 pl-4 py-2"
            >
              • Arena de Duelos e Apostas
            </Link>
            <Link
              to="/profile/carlinhos-maia"
              className="block text-pink-400 hover:text-pink-300 transition-colors border-l-2 border-pink-400/30 pl-4 py-2"
            >
              • Perfis dos Influenciadores
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
