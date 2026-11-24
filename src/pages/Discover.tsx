import React from 'react'
import Root from '@/components/layout/Root'
import PageWrapper from '@/components/layout/PageWrapper'

const Discover: React.FC = () => {
  return (
    <Root>
      <PageWrapper>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <span className="font-mono text-mono-sm text-smoke/50 tracking-widest uppercase block mb-4">
              Coming in Phase 2
            </span>
            <h1 className="font-display font-light text-off-white" style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}>
              Discover
            </h1>
          </div>
        </div>
      </PageWrapper>
    </Root>
  )
}

export default Discover

