import React from 'react';
import { animate, motion } from 'framer-motion'


const animations = {
    initial: { opacity: 0, y: 200 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 }
}

function AnimatedPage({ children }) {
    return (
        <motion.div variants={animations} initial="initial" animate="animate" exit="exit" transition={{duration: 0.3} }>
            {children}
        </motion.div>
    )
}

export default AnimatedPage
