import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  X,
  Sun,
  Moon,
  Plus,
  Bookmark,
  User,
  SlidersHorizontal,
  LayoutGrid,
  Grid3X3,
  Columns,
  Palette,
  Menu,
  Sparkles,
} from 'lucide-react'
import { useDiscovery } from '@/context/DiscoveryContext'

export const CosmosNavigation: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    filteredItems,
    theme,
    toggleTheme,
    gridDensity,
    setGridDensity,
    setIsUploadOpen,
    setIsAuthOpen,
    user,
    resetFilters,
  } = useDiscovery()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const location = useLocation()
  const navigate = useNavigate()

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.metaKey && e.key === 'k')) && document.activeElement !== searchInputRef.current) {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
      if (e.key === 'Escape' && isSearchFocused) {
        searchInputRef.current?.blur()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchFocused])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { label: 'Discover', path: '/' },
    { label: 'Moodboards', path: '/collections' },
    { label: 'Creators', path: '/creators' },
    { label: 'Color', path: '/color-discovery' },
  ]

  const isHome = location.pathname === '/'

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-ink/90 backdrop-blur-md border-b border-graphite transition-colors duration-300">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18 gap-3 sm:gap-6">

            {/* Left: Brand Identity */}
            <div className="flex items-center gap-5 sm:gap-8 flex-shrink-0">
              <Link
                to="/"
                onClick={resetFilters}
                className="group flex items-baseline gap-2 tap-transparent"
                aria-label="AFTERHOURS Visual Discovery"
              >
                <span className="font-display font-light text-off-white tracking-[-0.04em] text-[22px] sm:text-[25px] transition-opacity duration-300 group-hover:opacity-70">
                  AFTERHOURS
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-ember flex-shrink-0 animate-pulse-subtle" />
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center gap-6" aria-label="Main Discovery">
                {navLinks.map((link) => {
                  const isActive =
                    link.path === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(link.path)
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`relative py-1 font-body text-label uppercase tracking-[0.2em] transition-colors duration-300 ${
                        isActive ? 'text-cream font-medium' : 'text-smoke hover:text-cream'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="navUnderline"
                          className="absolute -bottom-1 left-0 right-0 h-px bg-ember"
                          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Center: Powerful Visual Search Input */}
            <div className="flex-1 max-w-xl hidden sm:block">
              <div
                className={`relative flex items-center w-full h-10 px-3.5 rounded-full bg-carbon/80 border transition-all duration-300 ${
                  isSearchFocused
                    ? 'border-ember shadow-[0_0_15px_rgba(196,98,45,0.15)] bg-carbon'
                    : 'border-graphite hover:border-graphite/80'
                }`}
              >
                <Search className={`w-4 h-4 mr-2.5 transition-colors ${isSearchFocused ? 'text-ember' : 'text-smoke'}`} />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    if (location.pathname !== '/') navigate('/')
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search architecture, warm minimal, tactile, Kyoto, travertine..."
                  className="w-full bg-transparent text-[13px] font-body text-cream placeholder:text-smoke/60 focus:outline-none"
                />

                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-smoke hover:text-cream rounded-full transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-smoke/70 bg-ash/50 border border-graphite rounded pointer-events-none">
                    /
                  </kbd>
                )}
              </div>
            </div>

            {/* Right: Actions Cluster */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

              {/* Search Toggle for Mobile */}
              <button
                onClick={() => {
                  if (location.pathname !== '/') navigate('/')
                  setTimeout(() => searchInputRef.current?.focus(), 100)
                }}
                className="sm:hidden p-2 text-smoke hover:text-cream rounded-full bg-carbon border border-graphite"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Grid Density Switcher (Desktop) */}
              {isHome && (
                <div className="hidden xl:flex items-center bg-carbon border border-graphite rounded-full p-1 gap-1">
                  <button
                    onClick={() => setGridDensity('editorial')}
                    className={`p-1.5 rounded-full transition-colors ${
                      gridDensity === 'editorial' ? 'bg-ash text-cream' : 'text-smoke hover:text-cream'
                    }`}
                    title="Editorial Density (3 columns)"
                    aria-label="Editorial 3 column density"
                  >
                    <Columns className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setGridDensity('standard')}
                    className={`p-1.5 rounded-full transition-colors ${
                      gridDensity === 'standard' ? 'bg-ash text-cream' : 'text-smoke hover:text-cream'
                    }`}
                    title="Standard Density (4 columns)"
                    aria-label="Standard 4 column density"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setGridDensity('compact')}
                    className={`p-1.5 rounded-full transition-colors ${
                      gridDensity === 'compact' ? 'bg-ash text-cream' : 'text-smoke hover:text-cream'
                    }`}
                    title="Compact Density (5 columns)"
                    aria-label="Compact 5 column density"
                  >
                    <Grid3X3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 rounded-full bg-carbon border border-graphite text-smoke hover:text-cream transition-colors duration-300 tap-transparent"
                title={`Switch to ${theme === 'dark' ? 'Warm Ivory Light Theme' : 'Charcoal Dark Theme'}`}
                aria-label="Toggle visual theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-ember hover:rotate-45 transition-transform" />
                ) : (
                  <Moon className="w-4 h-4 text-ember hover:-rotate-12 transition-transform" />
                )}
              </button>

              {/* Upload Button */}
              <button
                onClick={() => setIsUploadOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ember text-off-white text-[11px] font-body font-medium uppercase tracking-wider hover:bg-ember-dim transition-all duration-300 tap-transparent shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload</span>
              </button>

              {/* Saved Moodboard Pill */}
              <Link
                to="/profile"
                className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-carbon border border-graphite text-smoke hover:text-cream transition-colors duration-300 text-[12px] font-body"
                title="View your saved inspiration"
              >
                <Bookmark className="w-3.5 h-3.5 text-ember" />
                <span className="font-mono text-[11px] text-cream">{user.savedItemIds.length}</span>
              </Link>

              {/* User Avatar / Profile */}
              <button
                onClick={() => setIsAuthOpen(true)}
                className="relative rounded-full p-0.5 border border-graphite hover:border-ember transition-colors tap-transparent"
                aria-label="Open User Profile"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-cream rounded-full bg-carbon border border-graphite tap-transparent"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>

            </div>

          </div>

          {/* Mobile Search Bar (when expanded or on mobile) */}
          <div className="sm:hidden pb-3">
            <div className="relative flex items-center w-full h-9 px-3 rounded-full bg-carbon border border-graphite">
              <Search className="w-3.5 h-3.5 mr-2 text-smoke" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search visual archive..."
                className="w-full bg-transparent text-[12px] font-body text-cream placeholder:text-smoke/60 focus:outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="p-1 text-smoke">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-16 z-30 bg-ink/95 backdrop-blur-xl border-b border-graphite p-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center justify-between py-2.5 font-display text-2xl text-cream hover:text-ember transition-colors border-b border-graphite/40"
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-xs text-smoke">→</span>
                  </Link>
                ))}
              </nav>

              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsUploadOpen(true)
                  }}
                  className="w-full py-2.5 rounded-full bg-ember text-off-white text-xs font-body font-medium uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Discovery Item</span>
                </button>

                <div className="flex items-center justify-between pt-3 border-t border-graphite/50 text-xs font-body text-smoke">
                  <span className="flex items-center gap-2">
                    <img src={user.avatar} alt="" className="w-6 h-6 rounded-full" />
                    <span className="text-cream">{user.name}</span>
                  </span>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      setIsAuthOpen(true)
                    }}
                    className="text-ember underline text-xs"
                  >
                    Switch Account
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

