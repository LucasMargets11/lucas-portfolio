import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DecryptedTextProps {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  speed?: 'slow' | 'normal' | 'fast';
}

const DecryptedText: React.FC<DecryptedTextProps> = ({ 
  text, 
  delay = 0, 
  className = '', 
  style = {},
  speed = 'normal'
}) => {
  const [displayText, setDisplayText] = useState(text);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

  // Speed configurations
  const speedConfig = {
    slow: { interval: 120, increment: 0.3 },
    normal: { interval: 80, increment: 0.5 },
    fast: { interval: 30, increment: 1.2 }
  };

  useEffect(() => {
    // Inicialmente mostrar caracteres random para reservar el espacio
    const initialRandomText = text.split('').map(char => 
      char === ' ' ? ' ' : characters[Math.floor(Math.random() * characters.length)]
    ).join('');
    setDisplayText(initialRandomText);

    const timer = setTimeout(() => {
      decrypt();
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  const decrypt = () => {
    let iterations = 0;
    const targetLength = text.length;
    const config = speedConfig[speed];
    
    const interval = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return text[index];
            }
            
            if (char === ' ') {
              return ' ';
            }
            
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');
      });

      if (iterations >= targetLength) {
        clearInterval(interval);
        setDisplayText(text);
      }

      iterations += config.increment;
    }, config.interval);
  };

  return (
    <motion.span
      className={className}
      style={{
        fontFamily: 'inherit',
        letterSpacing: 'inherit',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        minWidth: 'fit-content',
        ...style
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      {displayText}
    </motion.span>
  );
};

export default DecryptedText;
