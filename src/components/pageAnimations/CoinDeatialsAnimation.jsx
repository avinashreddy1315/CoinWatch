import React from 'react';
import { motion } from 'framer-motion';

const animations = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 }
};

function CoinDeatialsAnimation({ children }) {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      style={{
        position: 'relative',
        //zIndex: 2, // Ensure it's above the home page
      
      
        //background: 'white',
        top: 0, // Ensure it covers the whole screen
        left: 0, 
        bottom: 0// Ensure it covers the whole screen
      }}
    >
      {children}
    </motion.div>
  );
}

export default CoinDeatialsAnimation;
