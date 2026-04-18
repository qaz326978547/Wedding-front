import type { RsvpForm } from '~/types'
import { createApi } from '~/utils/api'

export function useRsvp() {
  const config = useRuntimeConfig()
  const api = createApi(config.public.apiBase)

  const form = reactive<RsvpForm>({
    name: '',
    phone: '',
    side: 'bride',
    attending: 'yes',
    adults: 1,
    children: 0,
    needPaper: false,
    address: '',
    vegetarian: false,
    notes: '',
  })

  const loading = ref(false)
  const submitted = ref(false)
  const error = ref<string | null>(null)

  async function submit() {
    loading.value = true
    error.value = null
    try {
      await api.submitRsvp({ ...form })
      submitted.value = true
    } catch (e: any) {
      error.value = e?.message ?? '送出失敗，請稍後再試'
    } finally {
      loading.value = false
    }
  }

  return { form, loading, submitted, error, submit }
}
