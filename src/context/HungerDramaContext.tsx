import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react'
import {
  MenuItem,
  MENU_ITEMS,
  MENU_CATEGORIES,
  MenuCategory,
  createWhatsAppOrderUrl,
  createCartWhatsAppUrl,
  BRAND_CONFIG,
} from '@/data/hungerDramaData'
import { playCrunch } from '@/hooks/useSoundEngine'
import { trackEvent } from '@/utils/analytics'

export interface CartItem {
  item: MenuItem
  quantity: number
}

interface HungerDramaContextType {
  // Menu items & filtering
  items: MenuItem[]
  filteredItems: MenuItem[]
  categories: MenuCategory[]
  selectedCategory: string
  setSelectedCategory: (cat: string) => void
  dietaryFilter: 'all' | 'veg' | 'non-veg'
  setDietaryFilter: (diet: 'all' | 'veg' | 'non-veg') => void
  searchQuery: string
  setSearchQuery: (q: string) => void

  // Product detail modal
  activeItem: MenuItem | null
  setActiveItem: (item: MenuItem | null) => void

  // Cart & Ordering
  cart: CartItem[]
  cartNote: string
  setCartNote: (note: string) => void
  addToCart: (item: MenuItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, delta: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  checkoutWhatsApp: () => void
  orderItemDirectly: (item: MenuItem) => void

  // Mobile drawer
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}

const HungerDramaContext = createContext<HungerDramaContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'hd_cart_v1'
const NOTE_STORAGE_KEY = 'hd_cart_note_v1'

function getSavedCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed
  } catch (_) {}
  return []
}

function getSavedNote(): string {
  if (typeof window === 'undefined') return ''
  try {
    return localStorage.getItem(NOTE_STORAGE_KEY) || ''
  } catch (_) {
    return ''
  }
}

export const HungerDramaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategoryState] = useState<string>('all')
  const [dietaryFilter, setDietaryFilterState] = useState<'all' | 'veg' | 'non-veg'>('all')
  const [searchQuery, setSearchQueryState] = useState<string>('')
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null)
  const [cart, setCart] = useState<CartItem[]>(getSavedCart)
  const [cartNote, setCartNote] = useState<string>(getSavedNote)
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch (_) {}
  }, [cart])

  // Persist note to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(NOTE_STORAGE_KEY, cartNote)
    } catch (_) {}
  }, [cartNote])

  const setSelectedCategory = useCallback((cat: string) => {
    setSelectedCategoryState(cat)
    trackEvent({ type: 'menu_filter_use', filterType: 'category', value: cat })
  }, [])

  const setDietaryFilter = useCallback((diet: 'all' | 'veg' | 'non-veg') => {
    setDietaryFilterState(diet)
    trackEvent({ type: 'menu_filter_use', filterType: 'dietary', value: diet })
  }, [])

  const setSearchQuery = useCallback((q: string) => {
    setSearchQueryState(q)
    if (q.trim().length > 2) {
      trackEvent({ type: 'menu_filter_use', filterType: 'search', value: q.trim() })
    }
  }, [])

  // Filter items
  const filteredItems = useMemo(() => {
    let result = MENU_ITEMS

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((it) => it.categorySlug === selectedCategory)
    }

    // Dietary filter
    if (dietaryFilter !== 'all') {
      result = result.filter((it) => it.dietary === dietaryFilter)
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (it) =>
          it.name.toLowerCase().includes(q) ||
          it.description.toLowerCase().includes(q) ||
          it.category.toLowerCase().includes(q)
      )
    }

    return result
  }, [selectedCategory, dietaryFilter, searchQuery])

  // Cart operations
  const addToCart = useCallback((item: MenuItem) => {
    playCrunch()
    trackEvent({ type: 'cart_add', dishId: item.id, dishName: item.name, price: item.price })
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id)
      if (existing) {
        return prev.map((i) => (i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { item, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((i) => i.item.id !== itemId))
  }, [])

  const updateQuantity = useCallback((itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.item.id === itemId) {
            const nextQty = i.quantity + delta
            return nextQty > 0 ? { ...i, quantity: nextQty } : null
          }
          return i
        })
        .filter(Boolean) as CartItem[]
    )
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
    setCartNote('')
    try {
      localStorage.removeItem(CART_STORAGE_KEY)
      localStorage.removeItem(NOTE_STORAGE_KEY)
    } catch (_) {}
  }, [])

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0)
  }, [cart])

  const cartCount = useMemo(() => {
    return cart.reduce((acc, curr) => acc + curr.quantity, 0)
  }, [cart])

  const checkoutWhatsApp = useCallback(() => {
    trackEvent({ type: 'whatsapp_order_click', context: 'cart', total: cartTotal })
    const url = createCartWhatsAppUrl(cart, cartNote)
    window.open(url, '_blank')
  }, [cart, cartNote, cartTotal])

  const orderItemDirectly = useCallback((item: MenuItem) => {
    trackEvent({ type: 'whatsapp_order_click', context: 'single_item', total: item.price })
    const url = createWhatsAppOrderUrl(item)
    window.open(url, '_blank')
  }, [])

  const value = {
    items: MENU_ITEMS,
    filteredItems,
    categories: MENU_CATEGORIES,
    selectedCategory,
    setSelectedCategory,
    dietaryFilter,
    setDietaryFilter,
    searchQuery,
    setSearchQuery,
    activeItem,
    setActiveItem,
    cart,
    cartNote,
    setCartNote,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    checkoutWhatsApp,
    orderItemDirectly,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  }

  return <HungerDramaContext.Provider value={value}>{children}</HungerDramaContext.Provider>
}

export const useHungerDrama = () => {
  const context = useContext(HungerDramaContext)
  if (!context) {
    throw new Error('useHungerDrama must be used within a HungerDramaProvider')
  }
  return context
}

