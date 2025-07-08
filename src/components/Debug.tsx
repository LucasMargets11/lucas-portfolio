import { useEffect } from 'react';

interface DebugProps {
  step: string;
  data?: any;
}

const Debug: React.FC<DebugProps> = ({ step, data }) => {
  useEffect(() => {
    console.log(`🐛 DEBUG [${step}]:`, data || 'triggered');
    
    // Log del DOM actual
    const paintElements = document.querySelectorAll('.paint-effect-container, .paint-overlay');
    if (paintElements.length > 0) {
      console.log(`🎨 Paint elements found:`, paintElements.length);
      paintElements.forEach(el => {
        console.log('Element:', el.className, 'Display:', (el as HTMLElement).style.display, 'Opacity:', (el as HTMLElement).style.opacity);
      });
    }
    
    const homeElements = document.querySelectorAll('.home-container');
    if (homeElements.length > 0) {
      console.log(`🏠 Home elements found:`, homeElements.length);
    }
  }, [step, data]);

  return null;
};

export default Debug;
