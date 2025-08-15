import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Heart,
  Share,
  Send,
  Crown,
  Sword,
  DollarSign,
  Timer,
  TrendingUp,
  Play,
  Eye,
  Volume2,
} from "lucide-react";

interface DuelParticipant {
  id: string;
  name: string;
  avatar: string;
  votes: number;
  percentage: number;
  totalBets: number;
}

interface ActiveDuel {
  id: string;
  participants: [DuelParticipant, DuelParticipant];
  timeRemaining: number;
  totalPot: number;
  isActive: boolean;
  description: string;
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  isInfluencer?: boolean;
  avatar: string;
  type?: "bet" | "normal";
  betAmount?: number;
  betTarget?: string;
}

const mockDuel: ActiveDuel = {
  id: "duel-1",
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
  description: "Duelo de Conhecimentos Gerais",
};

export function InfluencerRoom() {
  const { influencerId } = useParams();
  const [currentDuel, setCurrentDuel] = useState<ActiveDuel>(mockDuel);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [betAmount, setBetAmount] = useState(10);
  const [isLiked, setIsLiked] = useState(false);

  const roomInfo = {
    "rancho-maia": {
      name: "Rancho do Maia",
      influencer: "Carlinhos Maia",
      avatar: "🤠",
      viewers: 15420,
      description: "Reality show com desafios e eliminações",
    },
    "casa-virginia": {
      name: "Casa da Virginia",
      influencer: "Virginia Fonseca",
      avatar: "👸",
      viewers: 8930,
      description: "Lifestyle e dinâmicas divertidas",
    },
    "arena-combate": {
      name: "Arena de Combate",
      influencer: "Luva de Pedreiro",
      avatar: "🥊",
      viewers: 12100,
      description: "Duelos e competições épicas",
    },
  }[influencerId as string] || {
    name: "Sala do Influenciador",
    influencer: "Influenciador",
    avatar: "⭐",
    viewers: 5000,
    description: "Entretenimento ao vivo",
  };

  // Timer for duel
  useEffect(() => {
    if (!currentDuel.isActive) return;

    const timer = setInterval(() => {
      setCurrentDuel((prev) => ({
        ...prev,
        timeRemaining: Math.max(0, prev.timeRemaining - 1),
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentDuel.isActive]);

  // Mock chat messages
  useEffect(() => {
    const mockMessages: ChatMessage[] = [
      {
        id: "1",
        user: roomInfo.influencer,
        message: "Galera, o duelo começou! Quem vocês acham que vai ganhar?",
        timestamp: new Date(Date.now() - 300000),
        isInfluencer: true,
        avatar: roomInfo.avatar,
      },
      {
        id: "2",
        user: "Ana",
        message: "Apostei 50 reais no José!",
        timestamp: new Date(Date.now() - 240000),
        avatar: "👩",
        type: "bet",
        betAmount: 50,
        betTarget: "José",
      },
      {
        id: "3",
        user: "Pedro",
        message: "Alex vai surpreender! 💪",
        timestamp: new Date(Date.now() - 180000),
        avatar: "👨",
      },
    ];

    setChatMessages(mockMessages);
  }, [roomInfo]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleBet = (participantId: string) => {
    const participant = currentDuel.participants.find(
      (p) => p.id === participantId,
    );

    if (participant) {
      // Update duel stats
      setCurrentDuel((prev) => {
        const newParticipants = prev.participants.map((p) =>
          p.id === participantId
            ? { ...p, votes: p.votes + 1, totalBets: p.totalBets + betAmount }
            : p,
        ) as [DuelParticipant, DuelParticipant];

        const totalVotes = newParticipants[0].votes + newParticipants[1].votes;
        newParticipants[0].percentage = Math.round(
          (newParticipants[0].votes / totalVotes) * 100,
        );
        newParticipants[1].percentage = 100 - newParticipants[0].percentage;

        return {
          ...prev,
          participants: newParticipants,
          totalPot: prev.totalPot + betAmount,
        };
      });

      // Add bet message to chat
      const betMessage: ChatMessage = {
        id: Date.now().toString(),
        user: "Você",
        message: `Apostou R$ ${betAmount} no ${participant.name}!`,
        timestamp: new Date(),
        avatar: "😊",
        type: "bet",
        betAmount,
        betTarget: participant.name,
      };

      setChatMessages((prev) => [...prev, betMessage]);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: "Você",
      message: newMessage,
      timestamp: new Date(),
      avatar: "😊",
    };

    setChatMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700 p-4 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>

            <div className="flex items-center space-x-4">
              <div className="text-4xl">{roomInfo.avatar}</div>
              <div>
                <h1 className="text-2xl font-bold flex items-center space-x-3">
                  <span>{roomInfo.name}</span>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </h1>
                <p className="text-gray-400">
                  por{" "}
                  <span className="text-purple-400 font-medium">
                    {roomInfo.influencer}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm">
              <Eye className="h-4 w-4 text-blue-400" />
              <span>{roomInfo.viewers.toLocaleString()}</span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isLiked
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                    : "bg-slate-700 hover:bg-slate-600 text-gray-300"
                }`}
              >
                <Heart className="h-5 w-5" />
              </button>
              <button className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors">
                <Share className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Video/Stream Area */}
            <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl border border-slate-700 flex items-center justify-center relative overflow-hidden">
              <div className="text-9xl opacity-60">{roomInfo.avatar}</div>

              {/* Stream Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              {/* Live Badge */}
              <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center space-x-3 animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>AO VIVO</span>
              </div>

              {/* Controls */}
              <div className="absolute bottom-6 left-6 flex items-center space-x-4">
                <button className="bg-black/60 hover:bg-black/80 text-white p-3 rounded-xl transition-colors backdrop-blur-sm">
                  <Play className="h-6 w-6" />
                </button>
                <button className="bg-black/60 hover:bg-black/80 text-white p-3 rounded-xl transition-colors backdrop-blur-sm">
                  <Volume2 className="h-6 w-6" />
                </button>
              </div>

              {/* Stream Info */}
              <div className="absolute bottom-6 right-6 text-white text-right">
                <h2 className="text-3xl font-bold mb-2">
                  {roomInfo.description}
                </h2>
                <p className="text-white/80">Assista a transmissão ao vivo</p>
              </div>
            </div>

            {/* Active Duel Section */}
            {currentDuel.isActive && (
              <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <Sword className="h-8 w-8 text-purple-400" />
                    <h2 className="text-3xl font-bold">Duelo Ativo</h2>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3 text-blue-400">
                      <Timer className="h-5 w-5" />
                      <span className="font-mono text-xl">
                        {formatTime(currentDuel.timeRemaining)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-green-400">
                      <DollarSign className="h-5 w-5" />
                      <span className="font-bold text-xl">
                        R$ {currentDuel.totalPot.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-lg mb-8">
                  {currentDuel.description}
                </p>

                {/* Duel Participants */}
                <div className="grid md:grid-cols-2 gap-8">
                  {currentDuel.participants.map((participant, index) => (
                    <div
                      key={participant.id}
                      className={`relative p-8 rounded-2xl border-2 transition-all duration-300 ${
                        index === 0
                          ? "bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-400/50"
                          : "bg-gradient-to-br from-pink-500/20 to-pink-600/10 border-pink-400/50"
                      }`}
                    >
                      {/* Participant Info */}
                      <div className="text-center mb-6">
                        <div className="text-8xl mb-4">
                          {participant.avatar}
                        </div>
                        <h3 className="text-2xl font-bold mb-2">
                          {participant.name}
                        </h3>
                        <div className="text-gray-400">
                          {participant.votes.toLocaleString()} votos
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-3">
                          <span>Apoio</span>
                          <span className="font-bold text-lg">
                            {participant.percentage}%
                          </span>
                        </div>
                        <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 rounded-full ${
                              index === 0 ? "bg-blue-400" : "bg-pink-400"
                            }`}
                            style={{ width: `${participant.percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Betting */}
                      <div className="space-y-4">
                        <div className="text-center text-gray-400">
                          Total apostado: R${" "}
                          {participant.totalBets.toLocaleString()}
                        </div>

                        <button
                          onClick={() => handleBet(participant.id)}
                          className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
                            index === 0
                              ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                              : "bg-pink-500 hover:bg-pink-600 text-white shadow-lg shadow-pink-500/25"
                          }`}
                        >
                          <DollarSign className="h-5 w-5" />
                          <span>Apoiar {participant.name}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bet Amount Selector */}
                <div className="mt-8 p-6 bg-slate-700/30 rounded-xl">
                  <div className="flex items-center justify-center space-x-4">
                    <span className="text-lg font-medium">
                      Valor da aposta:
                    </span>
                    <div className="flex items-center space-x-3">
                      {[5, 10, 25, 50, 100].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setBetAmount(amount)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            betAmount === amount
                              ? "bg-blue-500 text-white shadow-lg"
                              : "bg-slate-600 hover:bg-slate-500 text-gray-300"
                          }`}
                        >
                          R$ {amount}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Sidebar */}
          <div className="bg-slate-800/30 border border-slate-700 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="p-6 border-b border-slate-700">
              <h2 className="text-xl font-bold flex items-center space-x-3">
                <Crown className="h-6 w-6 text-purple-400" />
                <span>Chat da Sala</span>
              </h2>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 ${
                    msg.user === "Você" && "flex-row-reverse space-x-reverse"
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        msg.isInfluencer
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"
                          : msg.type === "bet"
                            ? "bg-green-500 shadow-lg shadow-green-500/25"
                            : msg.user === "Você"
                              ? "bg-blue-500 shadow-lg shadow-blue-500/25"
                              : "bg-slate-600"
                      }`}
                    >
                      {msg.type === "bet" ? (
                        <DollarSign className="h-4 w-4" />
                      ) : (
                        msg.avatar
                      )}
                    </div>
                  </div>

                  <div
                    className={`max-w-[75%] ${msg.user === "Você" && "text-right"}`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span
                        className={`text-sm font-medium ${
                          msg.isInfluencer &&
                          "text-purple-400 flex items-center space-x-1"
                        } ${msg.type === "bet" && "text-green-400"}`}
                      >
                        {msg.isInfluencer && <Crown className="h-3 w-3" />}
                        {msg.type === "bet" && (
                          <TrendingUp className="h-3 w-3" />
                        )}
                        <span>{msg.user}</span>
                      </span>
                      <span className="text-xs text-gray-500">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div
                      className={`px-4 py-3 rounded-2xl text-sm ${
                        msg.user === "Você"
                          ? "bg-blue-500 text-white"
                          : msg.type === "bet"
                            ? "bg-green-500/20 border border-green-500/30 text-green-300"
                            : "bg-slate-700 text-gray-100"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-6 border-t border-slate-700"
            >
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-xl transition-all duration-300 shadow-lg"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
