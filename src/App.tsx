import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import IntroAnimation from './components/IntroAnimation'
import Home from './components/Home'
import './App.css'

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    console.log('🏠 App: Intro complete, switching to Home'); // Debug
    console.log('🔍 App: Current showIntro state:', showIntro);
    setShowIntro(false);
    console.log('🔄 App: showIntro set to false');
  };

  // Force cleanup after intro completes
  useEffect(() => {
    console.log('📱 App useEffect triggered, showIntro:', showIntro);
    if (!showIntro) {
      console.log('🏠 Home is now active, cleaning up paint effects'); // Debug
      
      // Cleanup múltiple más agresivo
      const cleanupPaintEffects = () => {
        console.log('🧹 Running cleanup function...');
        
        // Remover paint containers
        const paintContainers = document.querySelectorAll('.paint-effect-container');
        console.log('🎨 Found paint containers:', paintContainers.length);
        paintContainers.forEach(el => {
          (el as HTMLElement).style.display = 'none';
          el.remove();
        });
        
        // Remover overlays
        const overlays = document.querySelectorAll('.paint-overlay');
        console.log('🖼️ Found overlays:', overlays.length);
        overlays.forEach(el => {
          (el as HTMLElement).style.opacity = '0';
          (el as HTMLElement).style.display = 'none';
          el.remove();
        });
        
        // Remover intro containers
        const introElements = document.querySelectorAll('.intro-container, .zoom-text-container');
        console.log('📝 Found intro elements:', introElements.length);
        introElements.forEach(el => el.remove());
        
        // Forzar cleanup de cualquier elemento con z-index alto que pueda estar bloqueando
        const highZElements = document.querySelectorAll('[style*="z-index"]');
        console.log('🔢 Found high z-index elements:', highZElements.length);
        highZElements.forEach(el => {
          const style = (el as HTMLElement).style;
          if (style.zIndex && parseInt(style.zIndex) > 100 && parseInt(style.zIndex) < 10000) {
            console.log('🚮 Removing high z-index element:', el.className);
            (el as HTMLElement).style.display = 'none';
          }
        });
        
        console.log('✅ Cleanup completed');
      };
      
      // Ejecutar cleanup inmediatamente y después de un pequeño delay
      cleanupPaintEffects();
      setTimeout(cleanupPaintEffects, 100);
      setTimeout(cleanupPaintEffects, 500);
    }
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
