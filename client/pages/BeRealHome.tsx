import { useState, useEffect } from "react";
import { Camera, Users, User, Clock, Bell, RotateCcw } from "lucide-react";

interface Notification {
  id: string;
  message: string;
  time: string;
}

export function BeRealHome() {
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [hasPostedToday, setHasPostedToday] = useState(false);
  const [notifications] = useState<Notification[]>([
    { id: "1", message: "João postou seu BeReal", time: "5 min" },
    { id: "2", message: "Maria comentou na sua foto", time: "12 min" }
  ]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !hasPostedToday) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, hasPostedToday]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTakePhoto = () => {
    setHasPostedToday(true);
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white font-sans">
      {/* Top Notification Area */}
      <div className="bg-[#2A2A2A] border-b border-gray-700 p-4">
        <div className="max-w-md mx-auto">
          {!hasPostedToday ? (
            <div className="flex items-center justify-between bg-blue-600/20 border border-blue-500/30 rounded-xl p-3">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-400" />
                <span className="text-blue-400 font-medium">
                  {timeLeft > 0 ? `${formatTime(timeLeft)} para postar` : "Tempo esgotado!"}
                </span>
              </div>
              <Bell className="h-5 w-5 text-blue-400" />
            </div>
          ) : (
            <div className="flex items-center justify-center bg-green-600/20 border border-green-500/30 rounded-xl p-3">
              <span className="text-green-400 font-medium">✓ Você postou hoje!</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">BeReal.</h1>
            <p className="text-gray-400 text-lg">
              Seja autêntico. Seja real.
            </p>
          </div>

          {!hasPostedToday ? (
            /* Camera Capture Area */
            <div className="relative bg-[#2A2A2A] rounded-3xl p-8 mb-8 border border-gray-700">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">Hora de ser real!</h2>
                <p className="text-gray-400">
                  Capture um momento autêntico com suas duas câmeras
                </p>
              </div>

              {/* Dual Camera Layout Preview */}
              <div className="relative mb-8">
                {/* Main camera view */}
                <div className="aspect-[3/4] bg-gray-800 rounded-2xl border-2 border-dashed border-gray-600 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <Camera className="h-16 w-16 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-500">Câmera traseira</p>
                  </div>

                  {/* Front camera overlay */}
                  <div className="absolute top-4 left-4 w-24 h-32 bg-gray-700 rounded-xl border-2 border-gray-600 flex items-center justify-center">
                    <div className="text-center">
                      <User className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-400">Frontal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Capture Button */}
              <div className="text-center">
                <button
                  onClick={handleTakePhoto}
                  className="bg-[#3B82F6] hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3 mx-auto"
                >
                  <Camera className="h-6 w-6" />
                  <span>Capturar BeReal</span>
                </button>
              </div>
            </div>
          ) : (
            /* Posted Content */
            <div className="bg-[#2A2A2A] rounded-3xl p-6 mb-8 border border-gray-700">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">Seu BeReal de hoje</h2>
                <p className="text-gray-400">Postado há 2 minutos</p>
              </div>

              {/* Sample posted image */}
              <div className="relative mb-6">
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center relative">
                  <div className="text-6xl">📸</div>
                  
                  {/* Front camera result */}
                  <div className="absolute top-4 left-4 w-24 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl flex items-center justify-center border-2 border-white/20">
                    <div className="text-2xl">😊</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-sm">
                    G
                  </div>
                  <span className="font-medium">Gabriela</span>
                </div>
                
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors">
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Friends Activity */}
          <div className="bg-[#2A2A2A] rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-400" />
              <span>Atividade dos amigos</span>
            </h3>
            
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                    <span className="text-gray-300">{notification.message}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{notification.time}</span>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-medium transition-colors">
              Ver todos
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-[#2A2A2A] border-t border-gray-700 p-4 pb-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors">
              <div className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                <Camera className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium">Câmera</span>
            </button>
            
            <button className="flex flex-col items-center space-y-1 text-blue-400">
              <div className="w-12 h-12 bg-[#3B82F6] rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-medium">Feed</span>
            </button>
            
            <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors">
              <div className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                <User className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium">Perfil</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
