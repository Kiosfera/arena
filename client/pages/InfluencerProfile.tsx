import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  Trophy, 
  Star,
  Play,
  Clock,
  DollarSign,
  Flame,
  Crown,
  MessageCircle,
  Eye
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: Date;
  status: "completed" | "upcoming" | "live";
  participants: number;
  totalBets: number;
  winner?: string;
}

interface Stats {
  totalEvents: number;
  totalViewers: number;
  totalBets: number;
  winRate: number;
}

export function InfluencerProfile() {
  const { influencerId } = useParams();
  const [activeTab, setActiveTab] = useState<"events" | "stats" | "upcoming">("events");

  const influencerData = {
    "carlinhos-maia": {
      name: "Carlinhos Maia",
      avatar: "🤠",
      bio: "Humorista, empresário e criador de conteúdo. Criador do famoso 'Rancho do Maia' onde reality shows épicos acontecem com eliminações, desafios e muito entretenimento!",
      followers: "45.2M",
      roomName: "Rancho do Maia",
      isLive: true,
      currentViewers: 15420,
      category: "Reality Show / Humor"
    },
    "virginia-fonseca": {
      name: "Virginia Fonseca",
      avatar: "👸",
      bio: "Influenciadora digital, empresária e apresentadora. Na 'Casa da Virginia' você encontra lifestyle, dinâmicas divertidas e muita interação com os fãs!",
      followers: "42.8M",
      roomName: "Casa da Virginia",
      isLive: true,
      currentViewers: 8930,
      category: "Lifestyle / Entretenimento"
    },
    "luva-de-pedreiro": {
      name: "Luva de Pedreiro",
      avatar: "🥊",
      bio: "Fenômeno do futebol e entretenimento. Na 'Arena de Combate' rolam os duelos mais épicos e competições que deixam todo mundo na torcida!",
      followers: "38.1M",
      roomName: "Arena de Combate",
      isLive: false,
      currentViewers: 0,
      category: "Esportes / Duelos"
    }
  }[influencerId as string] || {
    name: "Influenciador",
    avatar: "⭐",
    bio: "Criador de conteúdo e entretenimento digital.",
    followers: "10M",
    roomName: "Sala do Influenciador",
    isLive: false,
    currentViewers: 0,
    category: "Entretenimento"
  };

  const stats: Stats = {
    totalEvents: 127,
    totalViewers: 2800000,
    totalBets: 12500000,
    winRate: 76.4
  };

  const mockEvents: Event[] = [
    {
      id: "1",
      title: "Grande Final: José vs Alex",
      date: new Date(Date.now() - 86400000),
      status: "completed",
      participants: 15420,
      totalBets: 189000,
      winner: "José"
    },
    {
      id: "2",
      title: "Desafio da Memória",
      date: new Date(Date.now() - 172800000),
      status: "completed",
      participants: 12300,
      totalBets: 145000,
      winner: "Maria"
    },
    {
      id: "3",
      title: "Duelo Musical",
      date: new Date(Date.now() + 86400000),
      status: "upcoming",
      participants: 0,
      totalBets: 0
    },
    {
      id: "4",
      title: "Battle Royale - Eliminatória",
      date: new Date(Date.now() + 259200000),
      status: "upcoming",
      participants: 0,
      totalBets: 0
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">Perfil do Influenciador</h1>
        </div>

        {/* Profile Header */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8 mb-8 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center text-6xl border border-slate-600">
                {influencerData.avatar}
              </div>
              {influencerData.isLive && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  LIVE
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-4xl font-bold mb-2 flex items-center space-x-3">
                  <span>{influencerData.name}</span>
                  <Crown className="h-8 w-8 text-purple-400" />
                </h2>
                <p className="text-gray-400 text-lg mb-4">{influencerData.category}</p>
                <p className="text-gray-300 leading-relaxed max-w-2xl">
                  {influencerData.bio}
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span className="text-lg font-bold">{influencerData.followers}</span>
                  <span className="text-gray-400">seguidores</span>
                </div>
                
                {influencerData.isLive && (
                  <div className="flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-red-400" />
                    <span className="text-lg font-bold">{formatNumber(influencerData.currentViewers)}</span>
                    <span className="text-gray-400">assistindo agora</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-4">
              <Link
                to={`/room/${influencerId}`}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center space-x-3 ${
                  influencerData.isLive
                    ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25"
                    : "bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                }`}
              >
                <Play className="h-5 w-5" />
                <span>{influencerData.isLive ? "Assistir Ao Vivo" : "Entrar na Sala"}</span>
              </Link>
              
              <button className="px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-medium transition-colors flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Seguir</span>
              </button>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 text-center backdrop-blur-sm">
            <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">{stats.totalEvents}</div>
            <div className="text-gray-400">Eventos Realizados</div>
          </div>
          
          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 text-center backdrop-blur-sm">
            <Eye className="h-8 w-8 text-purple-400 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">{formatNumber(stats.totalViewers)}</div>
            <div className="text-gray-400">Total de Visualizações</div>
          </div>
          
          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 text-center backdrop-blur-sm">
            <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">R$ {formatNumber(stats.totalBets)}</div>
            <div className="text-gray-400">Total Apostado</div>
          </div>
          
          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 text-center backdrop-blur-sm">
            <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">{stats.winRate}%</div>
            <div className="text-gray-400">Taxa de Acerto</div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-2xl backdrop-blur-sm">
          {/* Tab Navigation */}
          <div className="border-b border-slate-700 p-6">
            <div className="flex space-x-8">
              {[
                { id: "events", label: "Eventos Recentes", icon: Calendar },
                { id: "upcoming", label: "Próximos Eventos", icon: Clock },
                { id: "stats", label: "Estatísticas", icon: Trophy }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 pb-4 px-2 transition-all duration-300 ${
                      activeTab === tab.id
                        ? "text-blue-400 border-b-2 border-blue-400"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "events" && (
              <div className="space-y-4">
                {mockEvents.filter(e => e.status === "completed").map((event) => (
                  <div key={event.id} className="bg-slate-700/30 border border-slate-600 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                          Finalizado
                        </div>
                        <span className="text-gray-400">
                          {event.date.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-blue-400" />
                        <span>{formatNumber(event.participants)} participantes</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <DollarSign className="h-5 w-5 text-green-400" />
                        <span>R$ {formatNumber(event.totalBets)} apostados</span>
                      </div>
                      
                      {event.winner && (
                        <div className="flex items-center space-x-3">
                          <Trophy className="h-5 w-5 text-yellow-400" />
                          <span>Vencedor: <strong>{event.winner}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "upcoming" && (
              <div className="space-y-4">
                {mockEvents.filter(e => e.status === "upcoming").map((event) => (
                  <div key={event.id} className="bg-slate-700/30 border border-slate-600 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                          Agendado
                        </div>
                        <span className="text-gray-400">
                          {event.date.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-gray-300">
                        Prepare-se para mais um evento épico! Fique atento às notificações.
                      </p>
                      <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors">
                        Definir Lembrete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "stats" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold mb-4">Performance dos Eventos</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Eventos com +10K viewers</span>
                        <span className="font-bold text-blue-400">89%</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Duração média</span>
                        <span className="font-bold text-purple-400">2h 34m</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Engajamento</span>
                        <span className="font-bold text-green-400">94.2%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold mb-4">Apostas e Duelos</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Duelos realizados</span>
                        <span className="font-bold text-yellow-400">243</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Aposta média</span>
                        <span className="font-bold text-green-400">R$ 47</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Maior aposta</span>
                        <span className="font-bold text-pink-400">R$ 2.500</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
