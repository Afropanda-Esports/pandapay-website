import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/products" element={<LandingPage />} />
      <Route path="/faq" element={<LandingPage />} />
      <Route path="/about" element={<LandingPage />} />
      <Route path="/crypto" element={<LandingPage />} />
      <Route path="/how-it-works" element={<LandingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
