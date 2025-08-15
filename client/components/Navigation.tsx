import { Link, useLocation } from "react-router-dom";
import { Zap, MessageCircle, Trophy, User, Users } from "lucide-react";

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Chat Global", icon: MessageCircle },
    { href: "/duels", label: "Duelos", icon: Trophy },
    { href: "/profile/carlinhos-maia", label: "Perfis", icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-lg border-b border-blue-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Zap className="h-8 w-8 text-blue-400 group-hover:text-purple-400 transition-colors duration-300" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg group-hover:bg-purple-400/20 transition-all duration-300"></div>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Arena Social
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 group ${
                    isActive(item.href)
                      ? "text-blue-400 bg-blue-400/10 shadow-lg shadow-blue-400/20"
                      : "text-gray-300 hover:text-purple-400 hover:bg-purple-400/10"
                  }`}
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
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isActive(item.href)
                      ? "text-blue-400 bg-blue-400/10"
                      : "text-gray-300 hover:text-purple-400 hover:bg-purple-400/10"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>

          {/* Status Indicator */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">24.7K online</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-red-400" />
              <span className="text-sm text-gray-300">12 ao vivo</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
