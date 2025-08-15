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
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(
    null,
  );

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
        user: "Carlinhos Maia",
        message: "Galera, o duelo começou! Quem vocês acham que vai ganhar?",
        timestamp: new Date(Date.now() - 300000),
        isInfluencer: true,
        avatar: "🤠",
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
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleBet = (participantId: string) => {
    setSelectedParticipant(participantId);
    const participant = currentDuel.participants.find(
      (p) => p.id === participantId,
    );

    if (participant) {
      // Update duel stats
      setCurrentDuel((prev) => ({
        ...prev,
        participants: prev.participants.map((p) =>
          p.id === participantId
            ? { ...p, votes: p.votes + 1, totalBets: p.totalBets + betAmount }
            : p,
        ) as [DuelParticipant, DuelParticipant],
        totalPot: prev.totalPot + betAmount,
      }));

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-muted-foreground hover:text-neon-blue transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>

            <div className="flex items-center space-x-3">
              <div className="text-3xl">{roomInfo.avatar}</div>
              <div>
                <h1 className="text-xl font-bold flex items-center space-x-2">
                  <span>{roomInfo.name}</span>
                  <div className="w-2 h-2 bg-status-live rounded-full animate-pulse"></div>
                </h1>
                <p className="text-sm text-muted-foreground">
                  por{" "}
                  <span className="text-neon-purple font-medium">
                    {roomInfo.influencer}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm">
              <Users className="h-4 w-4 text-neon-blue" />
              <span>{roomInfo.viewers.toLocaleString()}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <Share className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video/Stream Area */}
            <div className="aspect-video bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-xl border border-border flex items-center justify-center relative overflow-hidden">
              <div className="text-8xl opacity-50">{roomInfo.avatar}</div>

              {/* Stream Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              {/* Live Badge */}
              <div className="absolute top-4 left-4 bg-status-live text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-2 animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>AO VIVO</span>
              </div>

              {/* Stream Info */}
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-2xl font-bold mb-1">
                  {roomInfo.description}
                </h2>
                <p className="text-white/80">Assista a transmissão ao vivo</p>
              </div>
            </div>

            {/* Active Duel Section */}
            {currentDuel.isActive && (
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Sword className="h-6 w-6 text-neon-purple" />
                    <h2 className="text-2xl font-bold">Duelo Ativo</h2>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-neon-blue">
                      <Timer className="h-4 w-4" />
                      <span className="font-mono text-lg">
                        {formatTime(currentDuel.timeRemaining)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-neon-green">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-bold">
                        R$ {currentDuel.totalPot.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">
                  {currentDuel.description}
                </p>

                {/* Duel Participants */}
                <div className="grid md:grid-cols-2 gap-6">
                  {currentDuel.participants.map((participant, index) => (
                    <div
                      key={participant.id}
                      className={cn(
                        "relative bg-gradient-to-br p-6 rounded-xl border-2 transition-all duration-300",
                        index === 0
                          ? "from-duel-left/20 to-duel-left/5 border-duel-left/30"
                          : "from-duel-right/20 to-duel-right/5 border-duel-right/30",
                      )}
                    >
                      {/* Participant Info */}
                      <div className="text-center mb-4">
                        <div className="text-6xl mb-3">
                          {participant.avatar}
                        </div>
                        <h3 className="text-xl font-bold mb-1">
                          {participant.name}
                        </h3>
                        <div className="text-sm text-muted-foreground">
                          {participant.votes.toLocaleString()} votos
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Apoio</span>
                          <span className="font-bold">
                            {participant.percentage}%
                          </span>
                        </div>
                        <div className="h-3 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full transition-all duration-500 rounded-full",
                              index === 0 ? "bg-duel-left" : "bg-duel-right",
                            )}
                            style={{ width: `${participant.percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Betting */}
                      <div className="space-y-3">
                        <div className="text-center text-sm text-muted-foreground">
                          Total apostado: R${" "}
                          {participant.totalBets.toLocaleString()}
                        </div>

                        <button
                          onClick={() => handleBet(participant.id)}
                          className={cn(
                            "w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center space-x-2",
                            index === 0
                              ? "bg-duel-left hover:bg-duel-left/80 text-white neon-glow"
                              : "bg-duel-right hover:bg-duel-right/80 text-white neon-glow-pink",
                          )}
                        >
                          <DollarSign className="h-4 w-4" />
                          <span>Apoiar {participant.name}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bet Amount Selector */}
                <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center justify-center space-x-4">
                    <span className="text-sm font-medium">
                      Valor da aposta:
                    </span>
                    <div className="flex items-center space-x-2">
                      {[5, 10, 25, 50, 100].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setBetAmount(amount)}
                          className={cn(
                            "px-3 py-1 rounded-lg text-sm font-medium transition-colors",
                            betAmount === amount
                              ? "bg-neon-blue text-primary-foreground"
                              : "bg-secondary hover:bg-secondary/80",
                          )}
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
          <div className="bg-chat-bg border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-bold flex items-center space-x-2">
                <Crown className="h-5 w-5 text-neon-purple" />
                <span>Chat da Sala</span>
              </h2>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex items-start space-x-3 animate-fade-in",
                    msg.user === "Você" && "flex-row-reverse space-x-reverse",
                  )}
                >
                  <div className="flex-shrink-0">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                        msg.isInfluencer
                          ? "bg-gradient-to-r from-neon-purple to-neon-pink neon-glow-purple"
                          : msg.type === "bet"
                            ? "bg-neon-green neon-glow"
                            : msg.user === "Você"
                              ? "bg-chat-message-own"
                              : "bg-secondary",
                      )}
                    >
                      {msg.type === "bet" ? (
                        <DollarSign className="h-4 w-4" />
                      ) : (
                        msg.avatar
                      )}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "max-w-[70%]",
                      msg.user === "Você" && "text-right",
                    )}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          msg.isInfluencer &&
                            "text-neon-purple flex items-center space-x-1",
                          msg.type === "bet" && "text-neon-green",
                        )}
                      >
                        {msg.isInfluencer && <Crown className="h-3 w-3" />}
                        {msg.type === "bet" && (
                          <TrendingUp className="h-3 w-3" />
                        )}
                        <span>{msg.user}</span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div
                      className={cn(
                        "px-3 py-2 rounded-lg text-sm",
                        msg.user === "Você"
                          ? "bg-chat-message-own text-primary-foreground"
                          : msg.type === "bet"
                            ? "bg-neon-green/10 border border-neon-green/30"
                            : "bg-chat-message",
                      )}
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
              className="p-4 border-t border-border"
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue"
                />
                <button
                  type="submit"
                  className="bg-neon-blue hover:bg-neon-purple text-primary-foreground p-2 rounded-lg transition-colors duration-300 neon-glow"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
