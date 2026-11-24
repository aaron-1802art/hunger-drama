import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import {
  VisualItem,
  Moodboard,
  UserProfile,
  DISCOVERY_ITEMS,
  DEFAULT_MOODBOARDS,
  CREATORS,
} from '@/data/discoveryData'

interface DiscoveryContextType {
  // Items & Feed
  items: VisualItem[]
  filteredItems: VisualItem[]
  activeItem: VisualItem | null
  setActiveItem: (item: VisualItem | null) => void

  // Search & Filtering
  searchQuery: string
  setSearchQuery: (q: string) => void
  selectedCategory: string
  setSelectedCategory: (cat: string) => void
  selectedMood: string
  setSelectedMood: (mood: string) => void
  selectedColor: string | null
  setSelectedColor: (color: string | null) => void
  resetFilters: () => void

  // Grid layout
  gridDensity: 'compact' | 'standard' | 'editorial'
  setGridDensity: (density: 'compact' | 'standard' | 'editorial') => void

  // Theme
  theme: 'dark' | 'light'
  toggleTheme: () => void

  // Moodboards / Collections
  moodboards: Moodboard[]
  createMoodboard: (title: string, description: string, tags?: string[], isPrivate?: boolean) => Moodboard
  toggleSaveItem: (itemId: string, boardId?: string) => void
  isItemSaved: (itemId: string, boardId?: string) => boolean
  addItemToMoodboard: (itemId: string, boardId: string) => void
  removeItemFromMoodboard: (itemId: string, boardId: string) => void

  // Likes
  toggleLikeItem: (itemId: string) => void
  isItemLiked: (itemId: string) => boolean

  // Uploads
  isUploadOpen: boolean
  setIsUploadOpen: (open: boolean) => void
  uploadItem: (newItem: Omit<VisualItem, 'id' | 'savesCount' | 'likesCount'>, targetBoardId?: string) => VisualItem

  // Auth & Profile
  user: UserProfile
  isAuthOpen: boolean
  setIsAuthOpen: (open: boolean) => void
  updateProfile: (updates: Partial<UserProfile>) => void
  loginDemoUser: (variant?: 'curator' | 'architect') => void
  logout: () => void

  // Modals
  isCreateBoardOpen: boolean
  setIsCreateBoardOpen: (open: boolean) => void
  quickSaveTargetItem: VisualItem | null
  setQuickSaveTargetItem: (item: VisualItem | null) => void
}

const STORAGE_KEYS = {
  THEME: 'afterhours_theme_v2',
  ITEMS: 'afterhours_items_v2',
  BOARDS: 'afterhours_boards_v2',
  SAVED: 'afterhours_saved_v2',
  LIKED: 'afterhours_liked_v2',
  USER: 'afterhours_user_v2',
  DENSITY: 'afterhours_density_v2',
}

const INITIAL_USER: UserProfile = {
  id: 'usr-afterhours-01',
  name: 'Elena Rostova',
  handle: '@elena.arch',
  email: 'elena@afterhours.design',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&fit=crop',
  bio: 'Visual curator & spatial researcher. Archiving brutalist concrete, wabi-sabi spaces, and tactile materiality.',
  location: 'Paris & São Paulo',
  savedItemIds: ['art-01', 'art-02', 'art-03', 'art-06', 'art-10', 'art-17'],
  createdBoardIds: ['mb-01', 'mb-02'],
  uploadedItemIds: [],
  likedItemIds: ['art-01', 'art-03', 'art-07', 'art-12'],
  joinedDate: 'Autumn 2024',
}

const DiscoveryContext = createContext<DiscoveryContextType | undefined>(undefined)

export const DiscoveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME)
      return saved === 'light' ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  })

  // Grid density
  const [gridDensity, setGridDensityState] = useState<'compact' | 'standard' | 'editorial'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DENSITY)
      if (saved === 'compact' || saved === 'standard' || saved === 'editorial') return saved
      return 'standard'
    } catch {
      return 'standard'
    }
  })

  // Items (Builtin + User uploads)
  const [items, setItems] = useState<VisualItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ITEMS)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch {}
    return DISCOVERY_ITEMS
  })

  // Moodboards
  const [moodboards, setMoodboards] = useState<Moodboard[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BOARDS)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch {}
    return DEFAULT_MOODBOARDS
  })

  // User profile
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER)
      if (stored) return JSON.parse(stored)
    } catch {}
    return INITIAL_USER
  })

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedMood, setSelectedMood] = useState('All')
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  // Active item & modal visibility
  const [activeItem, setActiveItem] = useState<VisualItem | null>(null)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false)
  const [quickSaveTargetItem, setQuickSaveTargetItem] = useState<VisualItem | null>(null)

  // Sync theme with HTML document class and storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme)
    } catch {}
    if (theme === 'light') {
      document.documentElement.classList.add('theme-light')
      document.documentElement.classList.remove('theme-dark')
    } else {
      document.documentElement.classList.add('theme-dark')
      document.documentElement.classList.remove('theme-light')
    }
  }, [theme])

  // Sync moodboards to storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOARDS, JSON.stringify(moodboards))
    } catch {}
  }, [moodboards])

  // Sync items to storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items))
    } catch {}
  }, [items])

  // Sync user to storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
    } catch {}
  }, [user])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const setGridDensity = useCallback((density: 'compact' | 'standard' | 'editorial') => {
    setGridDensityState(density)
    try {
      localStorage.setItem(STORAGE_KEYS.DENSITY, density)
    } catch {}
  }, [])

  const resetFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedCategory('All')
    setSelectedMood('All')
    setSelectedColor(null)
  }, [])

  // Check if item is saved
  const isItemSaved = useCallback(
    (itemId: string, boardId?: string) => {
      if (boardId) {
        const board = moodboards.find((b) => b.id === boardId)
        return board ? board.itemIds.includes(itemId) : false
      }
      return user.savedItemIds.includes(itemId)
    },
    [moodboards, user.savedItemIds]
  )

  // Check if item is liked
  const isItemLiked = useCallback(
    (itemId: string) => {
      return user.likedItemIds.includes(itemId)
    },
    [user.likedItemIds]
  )

  // Toggle Save to Quick Inspiration or Board
  const toggleSaveItem = useCallback(
    (itemId: string, boardId?: string) => {
      const alreadySaved = user.savedItemIds.includes(itemId)

      setUser((prev) => {
        const nextSaved = alreadySaved
          ? prev.savedItemIds.filter((id) => id !== itemId)
          : [itemId, ...prev.savedItemIds]
        return { ...prev, savedItemIds: nextSaved }
      })

      // Update item save count
      setItems((prevItems) =>
        prevItems.map((it) => {
          if (it.id === itemId) {
            return {
              ...it,
              savesCount: alreadySaved ? Math.max(0, it.savesCount - 1) : it.savesCount + 1,
            }
          }
          return it
        })
      )

      // If specific board designated
      if (boardId) {
        setMoodboards((prevBoards) =>
          prevBoards.map((b) => {
            if (b.id === boardId) {
              const hasIt = b.itemIds.includes(itemId)
              return {
                ...b,
                itemIds: hasIt ? b.itemIds.filter((id) => id !== itemId) : [itemId, ...b.itemIds],
              }
            }
            return b
          })
        )
      }
    },
    [user.savedItemIds]
  )

  // Add to board
  const addItemToMoodboard = useCallback((itemId: string, boardId: string) => {
    setMoodboards((prevBoards) =>
      prevBoards.map((b) => {
        if (b.id === boardId && !b.itemIds.includes(itemId)) {
          return {
            ...b,
            itemIds: [itemId, ...b.itemIds],
            coverImage: b.coverImage || items.find((i) => i.id === itemId)?.image,
          }
        }
        return b
      })
    )

    // Also mark as user saved
    setUser((prev) => {
      if (!prev.savedItemIds.includes(itemId)) {
        return { ...prev, savedItemIds: [itemId, ...prev.savedItemIds] }
      }
      return prev
    })
  }, [items])

  // Remove from board
  const removeItemFromMoodboard = useCallback((itemId: string, boardId: string) => {
    setMoodboards((prevBoards) =>
      prevBoards.map((b) => {
        if (b.id === boardId) {
          return {
            ...b,
            itemIds: b.itemIds.filter((id) => id !== itemId),
          }
        }
        return b
      })
    )
  }, [])

  // Toggle Like
  const toggleLikeItem = useCallback(
    (itemId: string) => {
      const alreadyLiked = user.likedItemIds.includes(itemId)
      setUser((prev) => ({
        ...prev,
        likedItemIds: alreadyLiked
          ? prev.likedItemIds.filter((id) => id !== itemId)
          : [itemId, ...prev.likedItemIds],
      }))

      setItems((prevItems) =>
        prevItems.map((it) => {
          if (it.id === itemId) {
            return {
              ...it,
              likesCount: alreadyLiked ? Math.max(0, it.likesCount - 1) : it.likesCount + 1,
            }
          }
          return it
        })
      )
    },
    [user.likedItemIds]
  )

  // Create Moodboard
  const createMoodboard = useCallback(
    (title: string, description: string, tags: string[] = [], isPrivate: boolean = false): Moodboard => {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      const newBoard: Moodboard = {
        id: `mb-user-${Date.now()}`,
        title,
        slug,
        description,
        itemIds: [],
        curator: user.name,
        isPrivate,
        createdAt: new Date().toISOString().split('T')[0],
        tags: tags.length > 0 ? tags : ['Visuals', 'Inspiration'],
      }

      setMoodboards((prev) => [newBoard, ...prev])
      setUser((prev) => ({
        ...prev,
        createdBoardIds: [newBoard.id, ...prev.createdBoardIds],
      }))

      return newBoard
    },
    [user.name]
  )

  // Upload new discovery item
  const uploadItem = useCallback(
    (
      newItemData: Omit<VisualItem, 'id' | 'savesCount' | 'likesCount'>,
      targetBoardId?: string
    ): VisualItem => {
      const id = `art-upload-${Date.now()}`
      const createdItem: VisualItem = {
        ...newItemData,
        id,
        savesCount: 1,
        likesCount: 1,
        dateAdded: new Date().toISOString().split('T')[0],
      }

      setItems((prev) => [createdItem, ...prev])
      setUser((prev) => ({
        ...prev,
        uploadedItemIds: [id, ...prev.uploadedItemIds],
        savedItemIds: [id, ...prev.savedItemIds],
      }))

      if (targetBoardId) {
        addItemToMoodboard(id, targetBoardId)
      }

      return createdItem
    },
    [addItemToMoodboard]
  )

  // Profile update
  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }))
  }, [])

  // Switch demo user
  const loginDemoUser = useCallback((variant: 'curator' | 'architect' = 'curator') => {
    if (variant === 'architect') {
      setUser({
        id: 'usr-demo-02',
        name: 'Kenji Takahashi',
        handle: '@kenji_t',
        email: 'kenji@takahashi-arch.jp',
        avatar: CREATORS[1].avatar,
        bio: 'Architect & spatial designer exploring monolithic cast concrete and Japanese light intervals.',
        location: 'Tokyo & Zurich',
        savedItemIds: ['art-01', 'art-05', 'art-08', 'art-12', 'art-18', 'art-22'],
        createdBoardIds: ['mb-01', 'mb-05'],
        uploadedItemIds: [],
        likedItemIds: ['art-01', 'art-05', 'art-18'],
        joinedDate: 'Winter 2024',
      })
    } else {
      setUser(INITIAL_USER)
    }
    setIsAuthOpen(false)
  }, [])

  const logout = useCallback(() => {
    setUser({
      id: `usr-guest-${Date.now()}`,
      name: 'Guest Curator',
      handle: '@guest',
      email: 'guest@afterhours.design',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80&fit=crop',
      bio: 'Exploring AFTERHOURS visual discovery engine.',
      location: 'Earth',
      savedItemIds: [],
      createdBoardIds: [],
      uploadedItemIds: [],
      likedItemIds: [],
      joinedDate: 'Just now',
    })
  }, [])

  // Dynamic filter engine (Search, Category, Mood, Color)
  const filteredItems = useMemo(() => {
    let result = items

    // Category filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(
        (it) => it.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Mood filter
    if (selectedMood && selectedMood !== 'All') {
      result = result.filter((it) =>
        it.moods.some((m) => m.toLowerCase() === selectedMood.toLowerCase())
      )
    }

    // Color filter
    if (selectedColor) {
      const target = selectedColor.toLowerCase()
      result = result.filter(
        (it) =>
          it.dominantColor.toLowerCase() === target ||
          it.palette.some((c) => c.toLowerCase() === target)
      )
    }

    // Free text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter((it) => {
        return (
          it.title.toLowerCase().includes(q) ||
          (it.subtitle && it.subtitle.toLowerCase().includes(q)) ||
          it.creator.name.toLowerCase().includes(q) ||
          it.creator.handle.toLowerCase().includes(q) ||
          it.location.toLowerCase().includes(q) ||
          it.category.toLowerCase().includes(q) ||
          it.moods.some((m) => m.toLowerCase().includes(q)) ||
          it.tags.some((t) => t.toLowerCase().includes(q)) ||
          it.description.toLowerCase().includes(q)
        )
      })
    }

    return result
  }, [items, selectedCategory, selectedMood, selectedColor, searchQuery])

  const value = {
    items,
    filteredItems,
    activeItem,
    setActiveItem,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedMood,
    setSelectedMood,
    selectedColor,
    setSelectedColor,
    resetFilters,
    gridDensity,
    setGridDensity,
    theme,
    toggleTheme,
    moodboards,
    createMoodboard,
    toggleSaveItem,
    isItemSaved,
    addItemToMoodboard,
    removeItemFromMoodboard,
    toggleLikeItem,
    isItemLiked,
    isUploadOpen,
    setIsUploadOpen,
    uploadItem,
    user,
    isAuthOpen,
    setIsAuthOpen,
    updateProfile,
    loginDemoUser,
    logout,
    isCreateBoardOpen,
    setIsCreateBoardOpen,
    quickSaveTargetItem,
    setQuickSaveTargetItem,
  }

  return <DiscoveryContext.Provider value={value}>{children}</DiscoveryContext.Provider>
}

export const useDiscovery = () => {
  const context = useContext(DiscoveryContext)
  if (!context) {
    throw new Error('useDiscovery must be used within a DiscoveryProvider')
  }
  return context
}

