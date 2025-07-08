import { motion } from 'framer-motion';
import { useEffect } from 'react';
import './Home.css';

const Home: React.FC = () => {
  
  // Cleanup adicional cuando el componente se monta
  useEffect(() => {
    console.log('🏠 Home: Component mounting...');
    
    // Cleanup agresivo de elementos de pintura
    const forceCleanup = () => {
      console.log('🧹 Home: Running force cleanup');
      const paintElements = document.querySelectorAll('.paint-effect-container, .paint-overlay, .paint-burst');
      console.log('🎨 Home: Found paint elements to remove:', paintElements.length);
      paintElements.forEach(el => {
        (el as HTMLElement).style.display = 'none';
        (el as HTMLElement).style.opacity = '0';
        el.remove();
      });
      
      // Verificar que el home se está mostrando
      const homeElement = document.querySelector('.home-container');
      if (homeElement) {
        console.log('✅ Home: Home container found and visible');
        (homeElement as HTMLElement).style.display = 'flex';
        (homeElement as HTMLElement).style.zIndex = '10000';
        (homeElement as HTMLElement).style.opacity = '1';
      }
    };
    
    forceCleanup();
    setTimeout(forceCleanup, 100);
    setTimeout(() => {
      console.log('🏠 Home: Component fully mounted and cleaned');
    }, 200);
  }, []);
  
  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      style={{ 
        backgroundColor: '#000000',
        position: 'relative',
        zIndex: 10000 // Z-index muy alto
      }}
    >
      {/* Header */}
      <motion.header 
        className="header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main 
        className="main-content"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Main Title */}
        <motion.h1 
          className="main-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Lucas Margets
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Obsessed with turning ideas into code
        </motion.p>
      </motion.main>
    </motion.div>
  );
};

export default Home;
