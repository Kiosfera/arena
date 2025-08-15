import { Link, useLocation } from "react-router-dom";
import { Zap, MessageCircle, Users, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Chat Global", icon: MessageCircle },
    { href: "/duels", label: "Duelos", icon: Trophy },
    { href: "/profile/user", label: "Perfil", icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Zap className="h-8 w-8 text-neon-blue group-hover:text-neon-purple transition-colors duration-300" />
              <div className="absolute inset-0 bg-neon-blue/20 rounded-full blur-lg group-hover:bg-neon-purple/20 transition-all duration-300"></div>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Arena Social
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 group",
                    isActive
                      ? "text-neon-blue bg-neon-blue/10 neon-glow"
                      : "text-muted-foreground hover:text-neon-purple hover:bg-neon-purple/10",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "p-2 rounded-lg transition-all duration-300",
                    isActive
                      ? "text-neon-blue bg-neon-blue/10 neon-glow"
                      : "text-muted-foreground hover:text-neon-purple hover:bg-neon-purple/10",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>

          {/* Status Indicator */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="w-2 h-2 bg-status-online rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Online</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
