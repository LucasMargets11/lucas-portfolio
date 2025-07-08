import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import './ZoomText.css';

interface ZoomTextProps {
  isZooming: boolean;
  onLucasPosition?: (position: { x: number; y: number }) => void;
  className?: string;
}

const ZoomText: React.FC<ZoomTextProps> = ({ 
  isZooming, 
  onLucasPosition,
  className = '' 
}) => {
  const lucasRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isZooming && lucasRef.current && onLucasPosition) {
      const rect = lucasRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      onLucasPosition({ x: centerX, y: centerY });
    }
  }, [isZooming, onLucasPosition]);

  return (
    <motion.div
      className={`zoom-text-container ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ 
        opacity: 1, // Mantener siempre visible
        scale: 1,
        y: 0
      }}
      transition={{ 
        duration: 0.7, 
        ease: "easeOut",
        delay: 0.1
      }}
    >
      <div className="zoom-text">
        <motion.span 
          className="o-right-text"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isZooming ? 0 : 1,
            color: isZooming ? "#ffffff" : "#000000"
          }}
          transition={{ 
            opacity: { duration: 0.4 },
            color: { duration: 0.3 }
          }}
        >
          O RIGHT, IM{' '}
        </motion.span>
        <motion.span 
          ref={lucasRef}
          className={`lucas-text ${isZooming ? 'lucas-emphasize' : ''}`}
          animate={isZooming ? {
            scale: 2.5,
            color: "#000000",
            textShadow: "0 0 30px rgba(0, 0, 0, 0.5)",
            zIndex: 1000
          } : {
            color: "#000000"
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}
        >
          LUCAS
        </motion.span>
      </div>
    </motion.div>
  );
};

export default ZoomText;
