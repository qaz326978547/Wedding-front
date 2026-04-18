import type { RsvpForm } from '~/types'

export function createApi(baseURL: string) {
  return {
    async submitRsvp(form: RsvpForm) {
      return await $fetch('/rsvp', {
        method: 'POST',
        baseURL,
        body: form,
      })
    },

    async getGallery() {
      return await $fetch('/gallery', { baseURL })
    },

    async getWeddingInfo() {
      return await $fetch('/wedding-info', { baseURL })
    },
  }
}
