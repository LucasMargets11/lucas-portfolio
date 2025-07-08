import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import IntroAnimation from './components/IntroAnimation'
import Home from './components/Home'
import './App.css'

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    console.log('🏠 App: Intro complete, switching to Home');
    setShowIntro(false);
  };

  // Auto-skip intro after 12 seconds as fallback
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (showIntro) {
        console.log('⏰ Fallback timer triggered, skipping to Home');
        setShowIntro(false);
      }
    }, 12000); // 12 seconds maximum for the massive zoom animation

    return () => clearTimeout(fallbackTimer);
  }, [showIntro]);

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroAnimation key="intro" onComplete={handleIntroComplete} />
        ) : (
          <Home key="home" />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
