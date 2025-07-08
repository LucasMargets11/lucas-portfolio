import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ZoomText from './ZoomText';
import PaintEffect from './PaintEffect';
import Debug from './Debug';
import './IntroAnimation.css';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isPainting, setIsPainting] = useState(false);
  const [lucasPosition, setLucasPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    // Step 1: "WHAT IS THIS" - aparece inmediatamente y dura ~3 segundos
    timeouts.push(setTimeout(() => setCurrentStep(1), 100));
    
    // Step 2: "WHAT U WAITING" - aparece después de 3.5 segundos y dura ~3 segundos
    timeouts.push(setTimeout(() => setCurrentStep(2), 3500));
    
    // Step 3: "O RIGHT, IM LUCAS" - aparece después de 7 segundos
    timeouts.push(setTimeout(() => setCurrentStep(3), 7000));
    
    // Énfasis en LUCAS - después de 9.5 segundos (1 segundo más)
    timeouts.push(setTimeout(() => setIsZooming(true), 9500));
    
    // Efecto de pintura - después de 11.5 segundos
    timeouts.push(setTimeout(() => setIsPainting(true), 11500));

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const handlePaintComplete = () => {
    console.log('🎨 Paint complete, calling onComplete'); // Debug
    console.log('🔄 Current states:', { currentStep, isZooming, isPainting, isComplete });
    
    setIsComplete(true);
    setIsPainting(false); // Reset state
    setIsZooming(false); // Reset state
    setCurrentStep(0); // Reset state
    
    // Cleanup directo del DOM antes de llamar onComplete
    const paintElements = document.querySelectorAll('.paint-effect-container, .paint-overlay, .paint-burst');
    console.log('🧹 Cleaning up paint elements:', paintElements.length);
    paintElements.forEach(el => {
      (el as HTMLElement).style.display = 'none';
      (el as HTMLElement).style.opacity = '0';
      el.remove();
    });
    
    // Llamar onComplete después de un breve delay para asegurar cleanup
    setTimeout(() => {
      console.log('✅ Calling onComplete to switch to Home');
      onComplete();
    }, 100);
  };

  // Si la animación está completa, no renderizar nada (permitir desmontaje completo)
  if (isComplete) {
    console.log('IntroAnimation: returning null'); // Debug
    return null;
  }

  return (
    <motion.div
      className="intro-container"
      initial={{ opacity: 0, backgroundColor: "#ffffff" }}
      animate={{ 
        opacity: 1, 
        backgroundColor: isZooming ? "#000000" : "#ffffff" 
      }}
      transition={{ 
        opacity: { duration: 1 },
        backgroundColor: { 
          duration: isZooming ? 0.6 : 0,
          delay: isZooming ? 0.4 : 0
        }
      }}
    >
      {/* Debug components */}
      <Debug step="intro-render" data={{ currentStep, isZooming, isPainting, isComplete }} />
      
      <AnimatePresence mode="wait">
        {currentStep === 1 && !isPainting && (
          <motion.div
            key="step1"
            className="intro-text step-1"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="typewriter">WHAT IS THIS</span>
          </motion.div>
        )}

        {currentStep === 2 && !isPainting && (
          <motion.div
            key="step2"
            className="intro-text step-2"
            initial={{ opacity: 0, x: -20, skewX: 0 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              skewX: [0, -5, 5, 0] 
            }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ 
              duration: 0.8,
              skewX: {
                repeat: 2,
                duration: 0.1
              }
            }}
          >
            WHAT U WAITING
          </motion.div>
        )}

        {currentStep === 3 && !isPainting && (
          <motion.div
            key="step3"
            className="intro-text-container step-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1 
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <ZoomText 
              isZooming={isZooming}
              onLucasPosition={setLucasPosition}
              className="intro-text intro-text-large lucas-name"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Efecto de pintura - solo si está activo */}
      {isPainting && !isComplete && (
        <PaintEffect 
          isActive={isPainting}
          triggerPosition={lucasPosition}
          onComplete={handlePaintComplete}
          color="#000000"
        />
      )}
    </motion.div>
  );
};

export default IntroAnimation;
