import { Link } from "react-router-dom";
import { Home, ArrowLeft, Zap } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="relative mb-6">
            <Zap className="h-20 w-20 text-neon-blue mx-auto animate-glow-pulse" />
            <div className="absolute inset-0 bg-neon-blue/20 rounded-full blur-xl"></div>
          </div>

          <h1 className="text-6xl font-bold text-neon-purple mb-4">404</h1>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Página Não Encontrada
          </h2>
          <p className="text-muted-foreground mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-neon-blue hover:bg-neon-purple text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all duration-300 neon-glow"
          >
            <Home className="h-4 w-4" />
            <span>Voltar ao Início</span>
          </Link>

          <div className="text-sm text-muted-foreground">
            ou{" "}
            <button
              onClick={() => window.history.back()}
              className="text-neon-purple hover:text-neon-pink transition-colors inline-flex items-center space-x-1"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>voltar à página anterior</span>
            </button>
          </div>
        </div>

        <div className="mt-12 p-6 bg-card border border-border rounded-lg neon-glow-purple">
          <p className="text-sm text-muted-foreground mb-4">
            Perdido na Arena Social? Explore nossas funcionalidades:
          </p>
          <div className="space-y-2 text-sm">
            <Link
              to="/"
              className="block text-neon-blue hover:text-neon-purple transition-colors"
            >
              • Chat Global e Salas Ao Vivo
            </Link>
            <Link
              to="/duels"
              className="block text-neon-blue hover:text-neon-purple transition-colors"
            >
              • Arena de Duelos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
