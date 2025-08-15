import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BeRealHome } from "./pages/BeRealHome";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white font-['Inter',system-ui,sans-serif]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BeRealHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
