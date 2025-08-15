import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./pages/HomePage";
import { InfluencerRoom } from "./pages/InfluencerRoom";
import { InfluencerProfile } from "./pages/InfluencerProfile";
import { DuelsArena } from "./pages/DuelsArena";
import { NotFound } from "./pages/NotFound";
import { PlaceholderPage } from "./pages/PlaceholderPage";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrowserRouter>
        <Navigation />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/room/:influencerId" element={<InfluencerRoom />} />
            <Route
              path="/profile/:influencerId"
              element={<PlaceholderPage title="Perfil do Influenciador" />}
            />
            <Route
              path="/duels"
              element={<PlaceholderPage title="Arena de Duelos" />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
