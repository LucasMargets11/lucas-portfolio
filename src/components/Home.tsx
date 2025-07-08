import { motion } from 'framer-motion';
import { useEffect } from 'react';
import DecryptedText from './DecryptedText';
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
        {/* Main Title with Decrypted Effect */}
        <motion.h1 
          className="main-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <DecryptedText 
            text="Lucas Margets"
            delay={800}
            className="main-title"
          />
        </motion.h1>

        {/* Subtitle with Decrypted Effect */}
        <motion.p 
          className="subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <DecryptedText 
            text="Obsessed with turning ideas into code"
            delay={1800}
            className="subtitle"
            speed="fast"
          />
        </motion.p>
      </motion.main>

      {/* Additional content to test scrolling */}
      <motion.section
        style={{ padding: '4rem 2rem', textAlign: 'center' }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#ffffff' }}>
          About Me
        </h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6, color: '#ffffff', opacity: 0.8 }}>
          I'm a passionate developer who loves creating innovative solutions and beautiful user experiences. 
          With a focus on modern web technologies and clean code practices, I bring ideas to life through elegant design and robust functionality.
        </p>
      </motion.section>

      <motion.section
        style={{ padding: '4rem 2rem', textAlign: 'center', minHeight: '50vh' }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#ffffff' }}>
          My Work
        </h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6, color: '#ffffff', opacity: 0.8 }}>
          Here you'll find a collection of projects that showcase my skills and creativity. 
          From web applications to mobile solutions, each project represents a unique challenge and learning experience.
        </p>
      </motion.section>

      <motion.section
        style={{ padding: '4rem 2rem', textAlign: 'center', minHeight: '50vh' }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#ffffff' }}>
          Get In Touch
        </h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6, color: '#ffffff', opacity: 0.8 }}>
          Ready to collaborate? I'm always excited to work on new projects and meet fellow developers. 
          Let's create something amazing together.
        </p>
      </motion.section>
    </motion.div>
  );
};

export default Home;
