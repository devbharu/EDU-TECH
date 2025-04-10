import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Aichatbot from './components/aichatbot';
import Home from './components/home';
import Particles from './components/ogl';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-black h-screen overflow-hidden text-white relative">
      {/* Background Particle Layer */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10  flex flex-col">
        {/* Navbar */}
        <nav className="w-full bg-black bg-opacity-70 p-4 flex justify-between items-center">
          <div className="text-2xl font-bold"> EduTech</div>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-yellow-300">Home</Link>
            <Link to="/resources" className="hover:text-yellow-300">Resources</Link>
            <Link to="/dashboard" className="hover:text-yellow-300">Dashboard</Link>
          </div>
        </nav>

        {/* Routes Page Container */}
        <div className="flex-grow px-6 py-4 overflow-y-auto">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/resources" element={<div>Resources Component</div>} />
            <Route path="/dashboard" element={<div>Dashboard Component</div>} />
            <Route path="/aichatbot" element={<Aichatbot />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
