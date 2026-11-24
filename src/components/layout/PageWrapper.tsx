import React from 'react'
import { motion } from 'framer-motion'
import { pageTransition } from '@/design-system/animations'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`min-h-screen bg-ink ${className}`}
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

export default PageWrapper

