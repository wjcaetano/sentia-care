import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
}

export default App;
