import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-graphite bg-ink">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-24">

        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
          {/* Logo & tagline */}
          <div>
            <span className="font-display font-light text-off-white tracking-[-0.04em] text-[32px] block mb-3">
              AFTERHOURS
            </span>
            <p className="font-body font-light text-editorial text-smoke max-w-xs">
              An independent editorial platform for the curious, the restless, and the visually awake.
            </p>
          </div>

          {/* Navigation columns */}
          <div className="flex flex-col sm:flex-row gap-12">
            <div>
              <p className="font-body text-label text-ember uppercase tracking-[0.2em] mb-5">Explore</p>
              <ul className="flex flex-col gap-3">
                {['Discover', 'Collections', 'Cities', 'Architecture', 'Hidden Places'].map((item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="font-body font-light text-editorial text-smoke hover:text-cream transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-body text-label text-ember uppercase tracking-[0.2em] mb-5">Journal</p>
              <ul className="flex flex-col gap-3">
                {['About', 'Contributors', 'Archive', 'Contact', 'Subscribe'].map((item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="font-body font-light text-editorial text-smoke hover:text-cream transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-graphite mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="font-mono text-mono-sm text-smoke/60">
            © 2024–25 AFTERHOURS. Issue № 001.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Credits'].map((item) => (
              <Link
                key={item}
                to="#"
                className="font-body text-label text-smoke/50 hover:text-mist transition-colors duration-300 uppercase tracking-[0.15em]"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

