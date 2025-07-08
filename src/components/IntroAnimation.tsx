import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import './IntroAnimation.css';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [showBlackScreen, setShowBlackScreen] = useState(false);

  // Spring animation for the zoom effect
  const zoomSpring = useSpring({
    transform: isZooming ? 'scale(50)' : 'scale(1)',
    opacity: isZooming ? 0.3 : 1,
    config: { duration: 1500, easing: t => t * t * (3 - 2 * t) } // More dramatic easing
  });

  // Spring animation for background transition
  const backgroundSpring = useSpring({
    backgroundColor: showBlackScreen ? '#000000' : '#ffffff',
    config: { duration: 800 }
  });

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    // Step 1: "WHAT IS THIS" - 2 seconds
    timeouts.push(setTimeout(() => setCurrentStep(1), 100));
    
    // Step 2: "WHAT U WAITING" - 2 seconds more
    timeouts.push(setTimeout(() => setCurrentStep(2), 2200));
    
    // Step 3: "O RIGHT, IM LUCAS" - 2 seconds more
    timeouts.push(setTimeout(() => setCurrentStep(3), 4400));
    
    // Start zoom effect on LUCAS - 1.5 seconds after step 3
    timeouts.push(setTimeout(() => {
      console.log('🔍 Starting LUCAS zoom effect');
      setIsZooming(true);
    }, 5900));
    
    // Transition to black screen during zoom (earlier for more dramatic effect)
    timeouts.push(setTimeout(() => {
      console.log('🖤 Transitioning to black screen');
      setShowBlackScreen(true);
    }, 6200));
    
    // Complete the intro after zoom effect (longer duration for the massive zoom)
    timeouts.push(setTimeout(() => {
      console.log('🎨 IntroAnimation complete, calling onComplete');
      onComplete();
    }, 8000));

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <animated.div
      className="intro-container"
      style={{
        ...backgroundSpring,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="intro-text-container">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              className="step-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="intro-text">WHAT IS THIS</h1>
            </motion.div>
          )}
          
          {currentStep === 2 && (
            <motion.div
              key="step2"
              className="step-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="intro-text">WHAT U WAITING</h1>
            </motion.div>
          )}
          
          {currentStep === 3 && (
            <motion.div
              key="step3"
              className="step-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center' }}
            >
              <h2 className="intro-text intro-text-small">O RIGHT,</h2>
              <animated.h1 
                className="intro-text intro-text-large lucas-name"
                style={{
                  ...zoomSpring,
                  color: showBlackScreen ? '#ffffff' : '#000000',
                  position: 'relative',
                  zIndex: 10000,
                  fontWeight: 'bold',
                  letterSpacing: isZooming ? '0.3em' : '0.15em',
                  textShadow: isZooming ? '0 0 50px rgba(255, 255, 255, 0.5)' : 'none',
                  transformOrigin: 'center center'
                }}
              >
                IM LUCAS
              </animated.h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </animated.div>
  );
};

export default IntroAnimation;
