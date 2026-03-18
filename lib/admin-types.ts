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