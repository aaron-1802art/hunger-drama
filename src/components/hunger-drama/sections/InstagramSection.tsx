import React from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, ExternalLink } from 'lucide-react'
import { InstagramIcon } from '../Icons'
import { BRAND_CONFIG } from '@/data/hungerDramaData'

export const InstagramSection: React.FC = () => {
  const socialPosts = [
    {
      id: 'ig-1',
      image: '/images/menu/cheese-drizzled-fries.webp',
      caption: 'The only kind of drama we endorse: heavy cheese drip on hot crinkle fries. 🧀🔥',
      likes: '1,420',
      comments: '88',
    },
    {
      id: 'ig-2',
      image: '/images/menu/nutella-choco-pancakes.webp',
      caption: 'Chocolate hazelnut drowned pancakes because every plot needs a sweet twist. 🥞✨',
      likes: '1,890',
      comments: '96',
    },
    {
      id: 'ig-3',
      image: '/images/menu/chilli-chicken.webp',
      caption: 'Sizzling wok tossed Chilli Chicken — crispy, spicy, unforgettable. 🍗🌶️',
      likes: '2,130',
      comments: '115',
    },
    {
      id: 'ig-4',
      image: '/images/menu/berry-shake.webp',
      caption: 'Thick wild berry shake whipped to velvety perfection. Wash down the heat. 🍓🥤',
      likes: '1,240',
      comments: '72',
    },
  ]

  return (
    <section className="py-20 sm:py-28 bg-[#FFF1E1] border-b border-[#292525]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#292525] text-white text-xs font-mono font-bold tracking-wider uppercase mb-3">
              <InstagramIcon size={13} />
              <span>COMMUNITY & SCENES</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-[#292525] uppercase tracking-tight">
              THE DRAMA CONTINUES.
            </h2>
            <p className="font-body text-base sm:text-lg text-[#292525]/75 mt-2">
              Catch daily bites, behind-the-scenes sizzle, and craving drops on our feed.
            </p>
          </div>

          <a
            href={BRAND_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border-2 border-[#292525] text-[#292525] hover:bg-[#FF382E] hover:text-white transition-all font-display text-xs tracking-wider uppercase shadow-sm self-start md:self-auto"
          >
            <InstagramIcon size={16} />
            <span>FOLLOW {BRAND_CONFIG.instagramHandle}</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* 4-Item Social Feed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View on Instagram ${BRAND_CONFIG.instagramHandle}: ${post.caption}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-white border-2 border-[#292525] rounded-3xl overflow-hidden shadow-sm hover:shadow-drama-pop transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Photo */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#292525]">
                <img
                  src={post.image}
                  alt={post.caption}
                  onError={(e) => {
                    e.currentTarget.src = BRAND_CONFIG.mascotImage
                    e.currentTarget.className = 'w-full h-full object-contain p-8 bg-[#292525]'
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-[#292525]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 text-white p-4 text-center">
                  <div className="flex items-center gap-4 font-mono text-xs font-bold">
                    <span className="flex items-center gap-1.5"><Heart size={16} fill="white" /> {post.likes}</span>
                    <span className="flex items-center gap-1.5"><MessageCircle size={16} fill="white" /> {post.comments}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF382E] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                    View on Instagram ↗
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                <p className="font-body text-xs text-[#292525]/80 line-clamp-2 leading-relaxed mb-3">
                  {post.caption}
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#292525]/50 pt-2 border-t border-[#292525]/10">
                  <span className="text-[#FF382E] font-bold">{BRAND_CONFIG.instagramHandle}</span>
                  <span className="flex items-center gap-1 text-[#292525]/60 group-hover:text-[#FF382E] transition-colors">
                    OPEN INSTAGRAM <ExternalLink size={11} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
