import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Send,
  Users,
  Eye,
  Flame,
  Crown,
  MessageCircle,
  Video,
} from "lucide-react";

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
  isLive: boolean;
  category: string;
}

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    user: "Carlinhos Maia",
    message: "Galera, hoje vai ter duelo épico! 🔥",
    timestamp: new Date(Date.now() - 300000),
    isInfluencer: true,
    avatar: "🤠",
  },
  {
    id: "2",
    user: "Ana",
    message: "Mal posso esperar! Quem vai duelar?",
    timestamp: new Date(Date.now() - 240000),
    avatar: "👩",
  },
  {
    id: "3",
    user: "João",
    message: "Apostando no José hoje!",
    timestamp: new Date(Date.now() - 180000),
    avatar: "👨",
  },
  {
    id: "4",
    user: "Virginia Fonseca",
    message: "Preparando uma surpresa especial! ✨",
    timestamp: new Date(Date.now() - 120000),
    isInfluencer: true,
    avatar: "👸",
  },
  {
    id: "5",
    user: "Pedro",
    message: "Arena Social tá ficando insano! 🚀",
    timestamp: new Date(Date.now() - 60000),
    avatar: "🧑",
  },
];

const mockRooms: LiveRoom[] = [
  {
    id: "rancho-maia",
    name: "Rancho do Maia",
    influencer: "Carlinhos Maia",
    viewers: 15420,
    thumbnail: "🤠",
    isLive: true,
    category: "Reality Show",
  },
  {
    id: "casa-virginia",
    name: "Casa da Virginia",
    influencer: "Virginia Fonseca",
    viewers: 8930,
    thumbnail: "👸",
    isLive: true,
    category: "Lifestyle",
  },
  {
    id: "arena-combate",
    name: "Arena de Combate",
    influencer: "Luva de Pedreiro",
    viewers: 12100,
    thumbnail: "🥊",
    isLive: false,
    category: "Duelos",
  },
  {
    id: "talk-show",
    name: "Night Talk",
    influencer: "Whindersson Nunes",
    viewers: 6780,
    thumbnail: "🎭",
    isLive: true,
    category: "Talk Show",
  },
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
        "Que energia incrível! ⚡",
      ];

      const randomUsers = ["Miguel", "Sofia", "Lucas", "Isabella", "Davi"];
      const randomAvatars = ["👦", "👧", "👨", "👩", "🧑"];

      const randomMessage =
        randomMessages[Math.floor(Math.random() * randomMessages.length)];
      const randomUser =
        randomUsers[Math.floor(Math.random() * randomUsers.length)];
      const randomAvatar =
        randomAvatars[Math.floor(Math.random() * randomAvatars.length)];

      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        user: randomUser,
        message: randomMessage,
        timestamp: new Date(),
        avatar: randomAvatar,
      };

      setChatMessages((prev) => [...prev.slice(-20), newMsg]);
    }, 8000);

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
      avatar: "😊",
    };

    setChatMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Arena Social
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Conecte-se, compita e aposte em tempo real
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>24.7K usuários online</span>
            </div>
            <div className="flex items-center space-x-2">
              <Flame className="h-4 w-4 text-red-400" />
              <span>
                {activeRooms.filter((r) => r.isLive).length} salas ao vivo
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Live Rooms Section */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-3 flex items-center space-x-3">
                <Video className="h-8 w-8 text-blue-400" />
                <span>Salas Ao Vivo</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Entre nas salas dos seus influenciadores favoritos
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {activeRooms.map((room) => (
                <Link
                  key={room.id}
                  to={`/room/${room.id}`}
                  className="group relative bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-400/10"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center relative">
                    <div className="text-8xl">{room.thumbnail}</div>

                    {/* Live Badge */}
                    {room.isLive && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-2 animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span>AO VIVO</span>
                      </div>
                    )}

                    {/* Viewers */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>{room.viewers.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Crown className="h-5 w-5 text-purple-400" />
                      <span className="text-purple-400 font-medium">
                        {room.influencer}
                      </span>
                    </div>

                    <h3 className="font-bold text-xl mb-3 group-hover:text-blue-400 transition-colors">
                      {room.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{room.category}</span>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          room.isLive
                            ? "bg-red-500/20 text-red-400"
                            : "bg-purple-500/20 text-purple-400"
                        }`}
                      >
                        {room.isLive ? "Ao Vivo" : "Iniciando"}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Global Chat Section */}
          <div className="bg-slate-800/30 border border-slate-700 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold flex items-center space-x-3">
                <MessageCircle className="h-6 w-6 text-blue-400" />
                <span>Chat Global</span>
              </h2>
              <p className="text-gray-400 mt-2">
                Converse com toda a comunidade
              </p>
            </div>

            {/* Messages */}
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
                          : msg.user === "Você"
                            ? "bg-blue-500 shadow-lg shadow-blue-500/25"
                            : "bg-slate-600"
                      }`}
                    >
                      {msg.avatar}
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
                        }`}
                      >
                        {msg.isInfluencer && <Crown className="h-3 w-3" />}
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
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
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
