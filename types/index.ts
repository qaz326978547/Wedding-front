export interface RsvpForm {
  name: string
  phone: string
  side: 'groom' | 'bride'
  attending: 'yes' | 'no'
  adults: number
  children: number
  needPaper: boolean
  address: string
  vegetarian: boolean
  notes: string
}

export interface GalleryImage {
  id: number
  url: string
  alt: string
}

export interface WeddingInfo {
  groomName: string
  brideName: string
  date: string
  time: string
  venue: string
  venueAddress: string
  mapUrl: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}
