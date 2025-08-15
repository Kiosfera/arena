import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./pages/HomePage";
import { InfluencerRoom } from "./pages/InfluencerRoom";
import { InfluencerProfile } from "./pages/InfluencerProfile";
import { DuelsArena } from "./pages/DuelsArena";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <BrowserRouter>
        <Navigation />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/room/:influencerId" element={<InfluencerRoom />} />
            <Route path="/profile/:influencerId" element={<InfluencerProfile />} />
            <Route path="/duels" element={<DuelsArena />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
