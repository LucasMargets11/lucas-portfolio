import { motion } from 'framer-motion';
import { useEffect } from 'react';
import './Home.css';

const Home: React.FC = () => {
  
  useEffect(() => {
    console.log('🏠 Home: Component mounting...');
    
    // Solo verificar que el home se está mostrando, sin cleanup agresivo
    const homeElement = document.querySelector('.home-container');
    if (homeElement) {
      console.log('✅ Home: Home container found and visible');
    }
    
    setTimeout(() => {
      console.log('🏠 Home: Component fully mounted');
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
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000
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
