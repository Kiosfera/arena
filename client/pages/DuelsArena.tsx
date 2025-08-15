import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sword,
  Trophy,
  DollarSign,
  Timer,
  Users,
  Eye,
  Flame,
  Crown,
  TrendingUp,
  Star,
  Play,
  ArrowRight,
} from "lucide-react";

interface Duel {
  id: string;
  title: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
    votes: number;
    percentage: number;
    totalBets: number;
  }[];
  timeRemaining: number;
  totalPot: number;
  isActive: boolean;
  viewers: number;
  category: string;
  influencer: string;
  room: string;
}

interface CompletedDuel {
  id: string;
  title: string;
  winner: string;
  totalPot: number;
  participants: number;
  date: Date;
  category: string;
}

const activeDuels: Duel[] = [
  {
    id: "duel-1",
    title: "Grande Final: José vs Alex",
    participants: [
      {
        id: "jose",
        name: "José",
        avatar: "👨‍🦱",
        votes: 1247,
        percentage: 58,
        totalBets: 5420,
      },
      {
        id: "alex",
        name: "Alex",
        avatar: "👨‍🦰",
        votes: 897,
        percentage: 42,
        totalBets: 3890,
      },
    ],
    timeRemaining: 180,
    totalPot: 9310,
    isActive: true,
    viewers: 15420,
    category: "Knowledge",
    influencer: "Carlinhos Maia",
    room: "rancho-maia",
  },
  {
    id: "duel-2",
    title: "Batalha das Divas",
    participants: [
      {
        id: "maria",
        name: "Maria",
        avatar: "👩‍🦳",
        votes: 892,
        percentage: 52,
        totalBets: 4230,
      },
      {
        id: "ana",
        name: "Ana",
        avatar: "👩‍🦱",
        votes: 823,
        percentage: 48,
        totalBets: 3870,
      },
    ],
    timeRemaining: 420,
    totalPot: 8100,
    isActive: true,
    viewers: 8930,
    category: "Performance",
    influencer: "Virginia Fonseca",
    room: "casa-virginia",
  },
  {
    id: "duel-3",
    title: "Duelo de Habilidades",
    participants: [
      {
        id: "pedro",
        name: "Pedro",
        avatar: "👨‍🦲",
        votes: 0,
        percentage: 50,
        totalBets: 0,
      },
      {
        id: "carlos",
        name: "Carlos",
        avatar: "👨‍🎤",
        votes: 0,
        percentage: 50,
        totalBets: 0,
      },
    ],
    timeRemaining: 900,
    totalPot: 0,
    isActive: false,
    viewers: 2100,
    category: "Skills",
    influencer: "Luva de Pedreiro",
    room: "arena-combate",
  },
];

const completedDuels: CompletedDuel[] = [
  {
    id: "completed-1",
    title: "Duelo Musical Épico",
    winner: "Beatriz",
    totalPot: 15600,
    participants: 18500,
    date: new Date(Date.now() - 86400000),
    category: "Music",
  },
  {
    id: "completed-2",
    title: "Desafio da Memória",
    winner: "Roberto",
    totalPot: 12400,
    participants: 12300,
    date: new Date(Date.now() - 172800000),
    category: "Memory",
  },
  {
    id: "completed-3",
    title: "Battle Royale",
    winner: "Camila",
    totalPot: 23800,
    participants: 25600,
    date: new Date(Date.now() - 259200000),
    category: "Competition",
  },
];

export function DuelsArena() {
  const [selectedTab, setSelectedTab] = useState<"active" | "completed">(
    "active",
  );
  const [duels, setDuels] = useState(activeDuels);

  // Update timers
  useEffect(() => {
    const interval = setInterval(() => {
      setDuels((prev) =>
        prev.map((duel) => ({
          ...duel,
          timeRemaining: Math.max(0, duel.timeRemaining - 1),
        })),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const totalActivePot = duels.reduce((sum, duel) => sum + duel.totalPot, 0);
  const totalActiveViewers = duels.reduce((sum, duel) => sum + duel.viewers, 0);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Arena de Duelos
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Aposte nos melhores duelos e competições em tempo real
          </p>

          {/* Global Stats */}
          <div className="flex items-center justify-center space-x-12 text-lg">
            <div className="flex items-center space-x-3">
              <Flame className="h-6 w-6 text-red-400" />
              <span className="font-bold text-red-400">
                {duels.filter((d) => d.isActive).length}
              </span>
              <span className="text-gray-400">duelos ativos</span>
            </div>

            <div className="flex items-center space-x-3">
              <Eye className="h-6 w-6 text-blue-400" />
              <span className="font-bold text-blue-400">
                {formatNumber(totalActiveViewers)}
              </span>
              <span className="text-gray-400">assistindo</span>
            </div>

            <div className="flex items-center space-x-3">
              <DollarSign className="h-6 w-6 text-green-400" />
              <span className="font-bold text-green-400">
                R$ {formatNumber(totalActivePot)}
              </span>
              <span className="text-gray-400">em apostas</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-2xl mb-8 backdrop-blur-sm">
          <div className="p-6 border-b border-slate-700">
            <div className="flex space-x-8">
              <button
                onClick={() => setSelectedTab("active")}
                className={`flex items-center space-x-3 pb-4 px-3 transition-all duration-300 ${
                  selectedTab === "active"
                    ? "text-red-400 border-b-2 border-red-400"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <Sword className="h-5 w-5" />
                <span className="font-bold text-lg">Duelos Ativos</span>
              </button>

              <button
                onClick={() => setSelectedTab("completed")}
                className={`flex items-center space-x-3 pb-4 px-3 transition-all duration-300 ${
                  selectedTab === "completed"
                    ? "text-yellow-400 border-b-2 border-yellow-400"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <Trophy className="h-5 w-5" />
                <span className="font-bold text-lg">Finalizados</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {selectedTab === "active" && (
              <div className="space-y-8">
                {duels.map((duel) => (
                  <div
                    key={duel.id}
                    className="bg-slate-700/30 border border-slate-600 rounded-2xl overflow-hidden"
                  >
                    {/* Duel Header */}
                    <div className="p-6 border-b border-slate-600">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">
                            {duel.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-2">
                              <Crown className="h-4 w-4 text-purple-400" />
                              <span>{duel.influencer}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                              <span>{duel.category}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right space-y-2">
                          <div
                            className={`px-4 py-2 rounded-full text-sm font-bold ${
                              duel.isActive
                                ? "bg-red-500/20 text-red-400 animate-pulse"
                                : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {duel.isActive ? "AO VIVO" : "INICIANDO"}
                          </div>

                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <Timer className="h-4 w-4 text-blue-400" />
                              <span className="font-mono">
                                {formatTime(duel.timeRemaining)}
                              </span>
                            </div>

                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4 text-purple-400" />
                              <span>{formatNumber(duel.viewers)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <DollarSign className="h-6 w-6 text-green-400" />
                          <span className="text-2xl font-bold text-green-400">
                            R$ {formatNumber(duel.totalPot)}
                          </span>
                          <span className="text-gray-400">total apostado</span>
                        </div>

                        <Link
                          to={`/room/${duel.room}`}
                          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg"
                        >
                          <Play className="h-4 w-4" />
                          <span>Assistir</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Participants */}
                    <div className="grid md:grid-cols-2 divide-x divide-slate-600">
                      {duel.participants.map((participant, index) => (
                        <div
                          key={participant.id}
                          className={`p-8 ${
                            index === 0
                              ? "bg-gradient-to-br from-blue-500/10 to-blue-600/5"
                              : "bg-gradient-to-br from-pink-500/10 to-pink-600/5"
                          }`}
                        >
                          {/* Participant Info */}
                          <div className="text-center mb-6">
                            <div className="text-8xl mb-4">
                              {participant.avatar}
                            </div>
                            <h4 className="text-2xl font-bold mb-2">
                              {participant.name}
                            </h4>
                            <div className="text-gray-400">
                              {formatNumber(participant.votes)} votos
                            </div>
                          </div>

                          {/* Progress */}
                          <div className="mb-6">
                            <div className="flex justify-between text-lg mb-3">
                              <span>Apoio</span>
                              <span className="font-bold">
                                {participant.percentage}%
                              </span>
                            </div>
                            <div className="h-4 bg-slate-600 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-500 rounded-full ${
                                  index === 0 ? "bg-blue-400" : "bg-pink-400"
                                }`}
                                style={{ width: `${participant.percentage}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Betting Info */}
                          <div className="space-y-4">
                            <div className="text-center text-gray-400">
                              R$ {formatNumber(participant.totalBets)} apostados
                            </div>

                            {duel.isActive && (
                              <button
                                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                                  index === 0
                                    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                                    : "bg-pink-500 hover:bg-pink-600 text-white shadow-lg shadow-pink-500/25"
                                }`}
                              >
                                Apostar em {participant.name}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedTab === "completed" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedDuels.map((duel) => (
                  <div
                    key={duel.id}
                    className="bg-slate-700/30 border border-slate-600 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                        FINALIZADO
                      </div>
                      <span className="text-gray-400 text-sm">
                        {duel.date.toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3">{duel.title}</h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-4 w-4 text-yellow-400" />
                        <span className="text-yellow-400 font-medium">
                          Vencedor:
                        </span>
                        <span className="font-bold">{duel.winner}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-400" />
                        <span>R$ {formatNumber(duel.totalPot)} em apostas</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-blue-400" />
                        <span>
                          {formatNumber(duel.participants)} participantes
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">
                        {duel.category}
                      </span>
                      <button className="text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-1">
                        <span>Ver Detalhes</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Featured Section */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8 text-center backdrop-blur-sm">
          <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Próximo Grande Evento</h2>
          <p className="text-gray-300 text-lg mb-6">
            Battle Royale Final - Eliminatória definitiva com prêmio de R$
            50.000
          </p>
          <div className="flex items-center justify-center space-x-8 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">48h</div>
              <div className="text-gray-400">para começar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">32</div>
              <div className="text-gray-400">participantes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">5</div>
              <div className="text-gray-400">salas envolvidas</div>
            </div>
          </div>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg">
            Participar do Evento
          </button>
        </div>
      </div>
    </div>
  );
}
