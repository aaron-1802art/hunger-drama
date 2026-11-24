import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HungerDramaProvider } from './context/HungerDramaContext'
import HungerDramaHome from './pages/HungerDramaHome'
import NotFoundPage from './pages/NotFoundPage'
import { DiscoveryProvider } from './context/DiscoveryContext'
import Home from './pages/Home'
import Collections from './pages/Collections'
import Creators from './pages/Creators'
import ColorDiscovery from './pages/ColorDiscovery'
import Profile from './pages/Profile'

const App: React.FC = () => {
  return (
    <HungerDramaProvider>
      <DiscoveryProvider>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="min-h-screen bg-[#FFF1E1] flex items-center justify-center">
                <span className="font-display text-xl text-[#292525] tracking-widest animate-pulse uppercase">
                  HUNGER DRAMA · LIGHTS. BITES. ACTION.
                </span>
              </div>
            }
          >
            <Routes>
              {/* Official Hunger Drama Website Root */}
              <Route path="/" element={<HungerDramaHome />} />
              <Route path="/menu" element={<HungerDramaHome />} />

              {/* Preserved Cosmos-Inspired Afterhours Visual Discovery Routes */}
              <Route path="/afterhours" element={<Home />} />
              <Route path="/afterhours/discover" element={<Home />} />
              <Route path="/afterhours/collections" element={<Collections />} />
              <Route path="/afterhours/creators" element={<Creators />} />
              <Route path="/afterhours/color-discovery" element={<ColorDiscovery />} />
              <Route path="/afterhours/profile" element={<Profile />} />

              {/* Friendly custom 404 page */}
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </DiscoveryProvider>
    </HungerDramaProvider>
  )
}

export default App
