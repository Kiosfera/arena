import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Send, Users, Eye, Mic, Video, Crown, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  isInfluencer?: boolean;
  avatar: string;
}

interface LiveRoom {
  id: string;
  name: string;
  influencer: string;
  viewers: number;
  thumbnail: string;
  status: "live" | "starting" | "ended";
  category: string;
  isLive: boolean;
}

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    user: "Carlinhos Maia",
    message: "Galera, hoje vai ter duelo épico! 🔥",
    timestamp: new Date(Date.now() - 300000),
    isInfluencer: true,
    avatar: "🤠"
  },
  {
    id: "2", 
    user: "Ana",
    message: "Mal posso esperar! Quem vai duelar?",
    timestamp: new Date(Date.now() - 240000),
    avatar: "👩"
  },
  {
    id: "3",
    user: "João",
    message: "Apostando no José hoje!",
    timestamp: new Date(Date.now() - 180000),
    avatar: "👨"
  },
  {
    id: "4",
    user: "Virginia Fonseca",
    message: "Preparando uma surpresa especial! ✨",
    timestamp: new Date(Date.now() - 120000),
    isInfluencer: true,
    avatar: "👸"
  },
  {
    id: "5",
    user: "Pedro",
    message: "Arena Social tá ficando insano! 🚀",
    timestamp: new Date(Date.now() - 60000),
    avatar: "🧑"
  }
];

const mockRooms: LiveRoom[] = [
  {
    id: "rancho-maia",
    name: "Rancho do Maia",
    influencer: "Carlinhos Maia",
    viewers: 15420,
    thumbnail: "🤠",
    status: "live",
    category: "Reality Show",
    isLive: true
  },
  {
    id: "casa-virginia",
    name: "Casa da Virginia",
    influencer: "Virginia Fonseca",
    viewers: 8930,
    thumbnail: "👸",
    status: "live", 
    category: "Lifestyle",
    isLive: true
  },
  {
    id: "arena-combate",
    name: "Arena de Combate",
    influencer: "Luva de Pedreiro",
    viewers: 12100,
    thumbnail: "🥊",
    status: "starting",
    category: "Duelos",
    isLive: false
  },
  {
    id: "talk-show",
    name: "Night Talk",
    influencer: "Whindersson Nunes",
    viewers: 6780,
    thumbnail: "🎭",
    status: "live",
    category: "Talk Show", 
    isLive: true
  }
];

export function HomePage() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [activeRooms] = useState<LiveRoom[]>(mockRooms);

  // Simulate new messages
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessages = [
        "Quem mais tá assistindo? 👀",
        "Esse duelo vai ser épico!",
        "Arena Social é o futuro! 🚀",
        "Apoiando o time azul! 💙",
        "Que energia incrível! ⚡"
      ];
      
      const randomUsers = ["Miguel", "Sofia", "Lucas", "Isabella", "Davi"];
      const randomAvatars = ["👦", "👧", "👨", "👩", "🧑"];
      
      const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
      const randomAvatar = randomAvatars[Math.floor(Math.random() * randomAvatars.length)];
      
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        user: randomUser,
        message: randomMessage,
        timestamp: new Date(),
        avatar: randomAvatar
      };
      
      setChatMessages(prev => [...prev.slice(-20), newMsg]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: "Você",
      message: newMessage,
      timestamp: new Date(),
      avatar: "😊"
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/90">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
              Arena Social
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Conecte-se, compita e aposte em tempo real
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-status-online rounded-full animate-pulse"></div>
              <span>24.7K usuários online</span>
            </div>
            <div className="flex items-center space-x-2">
              <Flame className="h-4 w-4 text-status-live" />
              <span>{activeRooms.filter(r => r.isLive).length} salas ao vivo</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Live Rooms Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 flex items-center space-x-2">
                <Video className="h-6 w-6 text-neon-blue" />
                <span>Salas Ao Vivo</span>
              </h2>
              <p className="text-muted-foreground">
                Entre nas salas dos seus influenciadores favoritos
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {activeRooms.map((room) => (
                <Link
                  key={room.id}
                  to={`/room/${room.id}`}
                  className="group relative bg-card border border-border rounded-xl overflow-hidden hover:neon-glow transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center relative">
                    <div className="text-6xl">{room.thumbnail}</div>
                    
                    {/* Live Badge */}
                    {room.isLive && (
                      <div className="absolute top-3 left-3 bg-status-live text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span>AO VIVO</span>
                      </div>
                    )}
                    
                    {/* Viewers */}
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{room.viewers.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Crown className="h-4 w-4 text-neon-purple" />
                        <span className="text-sm text-neon-purple font-medium">{room.influencer}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2 group-hover:text-neon-blue transition-colors">
                      {room.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{room.category}</span>
                      <div className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        room.isLive 
                          ? "bg-status-live/10 text-status-live"
                          : "bg-neon-purple/10 text-neon-purple"
                      )}>
                        {room.isLive ? "Ao Vivo" : "Iniciando"}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Global Chat Section */}
          <div className="bg-chat-bg border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="text-xl font-bold flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-neon-blue" />
                <span>Chat Global</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                Converse com toda a comunidade
              </p>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex items-start space-x-3 animate-fade-in",
                    msg.user === "Você" && "flex-row-reverse space-x-reverse"
                  )}
                >
                  <div className="flex-shrink-0">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                      msg.isInfluencer 
                        ? "bg-gradient-to-r from-neon-purple to-neon-pink neon-glow-purple" 
                        : msg.user === "Você"
                        ? "bg-chat-message-own"
                        : "bg-secondary"
                    )}>
                      {msg.avatar}
                    </div>
                  </div>
                  
                  <div className={cn(
                    "max-w-[70%]",
                    msg.user === "Você" && "text-right"
                  )}>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={cn(
                        "text-sm font-medium",
                        msg.isInfluencer && "text-neon-purple flex items-center space-x-1"
                      )}>
                        {msg.isInfluencer && <Crown className="h-3 w-3" />}
                        <span>{msg.user}</span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    
                    <div className={cn(
                      "px-3 py-2 rounded-lg text-sm",
                      msg.user === "Você"
                        ? "bg-chat-message-own text-primary-foreground"
                        : "bg-chat-message"
                    )}>
                      {msg.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
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
