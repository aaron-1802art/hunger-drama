import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
import FilmGrain from '../ui/FilmGrain'

interface RootProps {
  children: React.ReactNode
}

const Root: React.FC<RootProps> = ({ children }) => {
  return (
    <div className="relative bg-ink min-h-screen">
      <FilmGrain opacity={0.045} />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Root

