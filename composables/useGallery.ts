import { ref } from 'vue'
import { photos } from '~/wedding.config'

export function useGallery() {
  const images = ref(
    photos.gallery.map((url, i) => ({
      id: i + 1,
      url,
      alt: `婚紗照 ${i + 1}`,
    })),
  )

  const active = ref<{ url: string; alt: string } | null>(null)

  function open(img: { url: string; alt: string }) {
    active.value = img
  }

  function close() {
    active.value = null
  }

  async function fetchFromApi(apiBase: string) {
    try {
      const res = await fetch(`${apiBase}/gallery`)
      if (!res.ok) return
      const data = await res.json()
      if (Array.isArray(data) && data.length) {
        images.value = data.map((item: any, i: number) => ({
          id: item.id ?? i + 1,
          url: item.url,
          alt: item.alt ?? `婚紗照 ${i + 1}`,
        }))
      }
    } catch {
      // fallback to local photos
    }
  }

  return { images, active, open, close, fetchFromApi }
}
