import { BrowserRouter, Routes, Route } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Arena Social
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Plataforma de comunicação e entretenimento
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Chat Global</h2>
            <div className="space-y-3 mb-4">
              <div className="bg-slate-700 rounded p-3">
                <span className="text-blue-400 font-medium">Carlinhos Maia:</span>
                <span className="ml-2">Galera, hoje vai ter duelo épico! 🔥</span>
              </div>
              <div className="bg-slate-700 rounded p-3">
                <span className="text-green-400 font-medium">Ana:</span>
                <span className="ml-2">Mal posso esperar!</span>
              </div>
            </div>
            <div className="flex">
              <input 
                type="text" 
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-slate-700 border border-slate-600 rounded-l px-3 py-2 text-white"
              />
              <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r">
                Enviar
              </button>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Salas Ao Vivo</h2>
            <div className="space-y-4">
              <div className="bg-slate-700 rounded p-4 hover:bg-slate-600 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">Rancho do Maia</h3>
                  <span className="text-red-400 text-sm">🔴 AO VIVO</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">Carlinhos Maia</p>
                <p className="text-gray-300 text-sm">15.4K assistindo</p>
              </div>
              
              <div className="bg-slate-700 rounded p-4 hover:bg-slate-600 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">Casa da Virginia</h3>
                  <span className="text-red-400 text-sm">🔴 AO VIVO</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">Virginia Fonseca</p>
                <p className="text-gray-300 text-sm">8.9K assistindo</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Duelo Ativo</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-900/30 border-2 border-blue-500 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-2">José</h3>
              <div className="text-3xl mb-4">👨‍🦱</div>
              <div className="mb-4">
                <div className="bg-slate-700 rounded-full h-4 mb-2">
                  <div className="bg-blue-500 h-4 rounded-full" style={{width: '58%'}}></div>
                </div>
                <span className="text-lg font-bold">58% apoio</span>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg w-full">
                Apoiar José
              </button>
            </div>
            
            <div className="bg-pink-900/30 border-2 border-pink-500 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Alex</h3>
              <div className="text-3xl mb-4">👨‍🦰</div>
              <div className="mb-4">
                <div className="bg-slate-700 rounded-full h-4 mb-2">
                  <div className="bg-pink-500 h-4 rounded-full" style={{width: '42%'}}></div>
                </div>
                <span className="text-lg font-bold">42% apoio</span>
              </div>
              <button className="bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded-lg w-full">
                Apoiar Alex
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 mb-2">Total apostado: R$ 9.310</p>
            <p className="text-lg font-bold">Tempo restante: 2:47</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<div className="min-h-screen bg-slate-900 text-white flex items-center justify-center"><h1>Página não encontrada</h1></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
