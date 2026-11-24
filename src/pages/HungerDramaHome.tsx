import React from 'react'
import { Navbar } from '@/components/hunger-drama/Navbar'
import { MobileMenu } from '@/components/hunger-drama/MobileMenu'
import { CartDrawer } from '@/components/hunger-drama/CartDrawer'
import { MenuItemModal } from '@/components/hunger-drama/MenuItemModal'
import { SoundToggle } from '@/components/hunger-drama/SoundToggle'
import { ClapperboardIntro } from '@/components/hunger-drama/ClapperboardIntro'
import { ScrollStoryIndicator } from '@/components/hunger-drama/ScrollStoryIndicator'
import { SoundProvider } from '@/context/SoundContext'
import { HeroSection } from '@/components/hunger-drama/sections/HeroSection'
import { HeroSearchBar } from '@/components/hunger-drama/sections/HeroSearchBar'
import { BrandStatement } from '@/components/hunger-drama/sections/BrandStatement'
import { FeaturedFood } from '@/components/hunger-drama/sections/FeaturedFood'
import { BuildYourDrama } from '@/components/hunger-drama/sections/BuildYourDrama'
import { MenuSection } from '@/components/hunger-drama/sections/MenuSection'
import { StorySection } from '@/components/hunger-drama/sections/StorySection'
import { BrandMoment } from '@/components/hunger-drama/sections/BrandMoment'
import { InstagramSection } from '@/components/hunger-drama/sections/InstagramSection'
import { SceneReviews } from '@/components/hunger-drama/sections/SceneReviews'
import { FinalCTA } from '@/components/hunger-drama/sections/FinalCTA'
import { LocationSection } from '@/components/hunger-drama/sections/LocationSection'
import { Footer } from '@/components/hunger-drama/sections/Footer'
import { MobileOrderBar } from '@/components/hunger-drama/MobileOrderBar'

export const HungerDramaHome: React.FC = () => {
  return (
    <SoundProvider>
      <div className="min-h-screen bg-[#FFF1E1] text-[#292525] selection:bg-[#FF382E] selection:text-white font-body antialiased flex flex-col">
        {/* Skip to Content Link (Accessibility) */}
        <a
          href="#menu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-2.5 focus:bg-[#FF382E] focus:text-white focus:rounded-xl focus:font-display focus:text-xs focus:uppercase focus:tracking-wider focus:shadow-[4px_4px_0px_#292525] focus:outline-none"
        >
          Skip to Menu & Dishes ↓
        </a>

        {/* Quick Clapperboard Intro (shown once/session, skippable, skips on reduced-motion) */}
        <ClapperboardIntro />

        {/* Scroll Story Timeline Indicator (12:30 PM -> 3:30 PM -> 6:00 PM -> 8:00 PM) */}
        <ScrollStoryIndicator />

        {/* Top Sticky Header */}
        <Navbar />

        {/* Sound Toggle (Square Green Button in bottom-left corner) */}
        <SoundToggle />

        {/* Sticky Mobile Order Bar (Mobile only, hides when footer is in view) */}
        <MobileOrderBar />

        {/* Slide-out Drawers & Modals */}
        <MobileMenu />
        <CartDrawer />
        <MenuItemModal />

        {/* Main Page Flow — with bottom padding on mobile to accommodate sticky order bar and floating controls */}
        <main id="main-content" className="flex-1 pb-24 md:pb-0">
          {/* Section 01: The Opening Experience */}
          <HeroSection />

          {/* Section 01.5: Quick Search Bar (Desktop only here; on mobile it renders directly after the hero text fold) */}
          <div className="hidden lg:block">
            <HeroSearchBar />
          </div>

          {/* Section 02: The Brand Statement & Act Moments */}
          <BrandStatement />

          {/* Section 03: The Food Experience / Main Characters */}
          <FeaturedFood />

          {/* Section 04: Build Your Drama (Interactive Customizer & Direct WhatsApp Ordering) */}
          <BuildYourDrama />

          {/* Section 05: The Menu (63 Items & Live Search) */}
          <MenuSection />

          {/* Section 06: The Story (Behind The Drama) */}
          <StorySection />

          {/* Section 07: Brand Moment & Craving Decider */}
          <BrandMoment />

          {/* Section 08: Social Proof / Community */}
          <InstagramSection />

          {/* Section 09: Scene Reviews (Config-driven, hidden until real reviews added) */}
          <SceneReviews />

          {/* Section 10: Final Call to Action */}
          <FinalCTA />

          {/* Section 11: Trust & Local Info (Vikaspuri, Live Hours Badge, Delivery) */}
          <LocationSection />
        </main>

        {/* Section 12: Footer & End Credits */}
        <Footer />
      </div>
    </SoundProvider>
  )
}

export default HungerDramaHome

