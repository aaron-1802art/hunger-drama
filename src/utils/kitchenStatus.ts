import { BRAND_CONFIG } from '@/data/hungerDramaData'

export interface KitchenStatus {
  isOpen: boolean
  badgeText: string
  detailText: string
}

/**
 * Calculates whether the kitchen is open right now based on local browser time.
 * Kitchen hours: Mon - Sun 12:30 PM to 8:00 PM
 */
export function getKitchenStatus(): KitchenStatus {
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  const openMinutes = BRAND_CONFIG.hours.openHour * 60 + BRAND_CONFIG.hours.openMinute
  const closeMinutes = BRAND_CONFIG.hours.closeHour * 60 + BRAND_CONFIG.hours.closeMinute

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes

  if (isOpen) {
    return {
      isOpen: true,
      badgeText: 'OPEN NOW',
      detailText: `Kitchen Sizzling · Taking orders until 8:00 PM`,
    }
  }

  const opensText =
    currentMinutes < openMinutes
      ? `Opens today at 12:30 PM`
      : `Opens tomorrow at 12:30 PM`

  return {
    isOpen: false,
    badgeText: 'CURRENTLY CLOSED',
    detailText: `Kitchen resting · ${opensText}`,
  }
}

