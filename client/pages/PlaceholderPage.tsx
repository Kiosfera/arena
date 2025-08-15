import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({
  title,
  description = "Esta página está em desenvolvimento. Continue explorando outras funcionalidades!",
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <Construction className="h-16 w-16 text-neon-purple mx-auto mb-4 animate-pulse" />
          <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="p-6 bg-card border border-border rounded-lg neon-glow-purple">
          <p className="text-sm text-muted-foreground mb-4">
            Esta funcionalidade será implementada em breve.
          </p>
          <div className="inline-flex items-center space-x-2 text-neon-purple">
            <span className="text-sm font-medium">Em desenvolvimento</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
