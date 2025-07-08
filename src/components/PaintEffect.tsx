import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './PaintEffect.css';

interface PaintEffectProps {
  isActive: boolean;
  triggerPosition: { x: number; y: number };
  onComplete: () => void;
  color?: string;
}

const PaintEffect: React.FC<PaintEffectProps> = ({ 
  isActive, 
  triggerPosition, 
  onComplete,
  color = '#000000'
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    console.log('🎨 PaintEffect useEffect:', { isActive, isAnimating });
    
    if (isActive && !isAnimating) {
      console.log('🚀 Starting paint animation...');
      setIsAnimating(true);
      
      // Completar después de la animación MUY rápida
      const timer = setTimeout(() => {
        console.log('⏰ Paint animation timeout reached, calling onComplete');
        onComplete();
      }, 1500); // Muy reducido
      
      return () => {
        console.log('🧹 PaintEffect cleanup');
        clearTimeout(timer);
      };
    }
  }, [isActive, isAnimating, onComplete]);

  // No renderizar nada si no está activo
  if (!isActive) {
    console.log('❌ PaintEffect not rendering (not active)');
    return null;
  }

  console.log('✅ PaintEffect rendering with position:', triggerPosition);

  return (
    <div className="paint-effect-container" style={{ zIndex: 9999 }}>
      {/* Efecto de explosión radial simplificado */}
      <motion.div
        className="paint-burst"
        style={{
          left: triggerPosition.x,
          top: triggerPosition.y,
          backgroundColor: color,
        }}
        initial={{ 
          scale: 0,
          opacity: 0.9
        }}
        animate={{
          scale: 30, // Escala fija más simple
          opacity: 1
        }}
        transition={{
          duration: 1.2, // Más rápido
          ease: "easeOut"
        }}
      />
      
      {/* Overlay final */}
      <motion.div
        className="paint-overlay"
        style={{ backgroundColor: color }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3, // Muy rápido
          delay: 1.0 // Delay reducido
        }}
      />
    </div>
  );
};

export default PaintEffect;
