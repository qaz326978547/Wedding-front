import { photos } from '~/wedding.config'

export function useGallery() {
  // 預設使用 wedding.config 的本地照片
  // 若後端 API 可用，可透過 fetchFromApi() 替換
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
      const res = await $fetch<any[]>('/gallery', { baseURL: apiBase })
      if (res?.length) {
        images.value = res.map((item, i) => ({
          id: item.id ?? i + 1,
          url: item.url,
          alt: item.alt ?? `婚紗照 ${i + 1}`,
        }))
      }
    } catch {
      // fallback to local photos — already set above
    }
  }

  return { images, active, open, close, fetchFromApi }
}
