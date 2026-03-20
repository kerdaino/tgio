export type PrayerRequestRow = {
  id: string
  name: string | null
  email: string | null
  phone: string | null
  prayer_request: string
  is_anonymous: boolean
  allow_contact: boolean
  share_with_prayer_team: boolean
  status: string
  created_at: string
}

export type PrayerTeamApplicationRow = {
  id: string
  name: string
  email: string
  phone: string
  location: string | null
  availability: string
  experience: string | null
  why_join: string
  allow_contact: boolean
  status: string
  created_at: string
}

export type DonationSubmissionRow = {
  id: string
  full_name: string
  email: string
  phone: string | null
  currency: string
  amount: number
  message: string | null
  payment_reference: string
  proof_note: string | null
  status: string
  created_at: string
}

export type GalleryItemRow = {
  id: string
  title: string | null
  alt: string
  category: string
  media_type: "image" | "video"
  file_url: string
  thumbnail_url: string | null
  is_published: boolean
  sort_order: number
  created_at: string
}

export type TestimonyRow = {
  id: string
  category: string
  title: string
  story: string
  name: string
  meta: string | null
  image_url: string | null
  is_published: boolean
  created_at: string
}