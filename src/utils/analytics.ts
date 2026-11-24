import { BRAND_CONFIG } from '@/data/hungerDramaData'

export type AnalyticsEvent =
  | { type: 'whatsapp_order_click'; context: 'cart' | 'single_item' | 'builder' | 'sticky_bar'; total?: number }
  | { type: 'cart_add'; dishId: string; dishName: string; price: number }
  | { type: 'menu_filter_use'; filterType: 'dietary' | 'category' | 'search'; value: string }

/**
 * Privacy-friendly analytics hook.
 * Disabled by default. Only logs when BRAND_CONFIG.analyticsEnabled is set to true.
 * Collects zero personally identifiable information (no cookies, no tracking IDs).
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (!BRAND_CONFIG.analyticsEnabled) return

  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    try {
      ;(window as any).dataLayer.push(event)
    } catch (_) {}
  }

  // Developer console notification when analytics is enabled
  if ((import.meta as any).env?.DEV) {
    console.info('[Hunger Drama Analytics]', event)
  }
}
