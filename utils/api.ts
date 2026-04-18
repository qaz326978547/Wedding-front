import type { RsvpForm } from '~/types'

export function createApi(baseURL: string) {
  return {
    async submitRsvp(form: RsvpForm) {
      const res = await fetch(`${baseURL}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(await res.text())
      return res.json()
    },

    async getGallery() {
      const res = await fetch(`${baseURL}/gallery`)
      if (!res.ok) throw new Error('Failed to fetch gallery')
      return res.json()
    },

    async getWeddingInfo() {
      const res = await fetch(`${baseURL}/wedding-info`)
      if (!res.ok) throw new Error('Failed to fetch wedding info')
      return res.json()
    },
  }
}
