import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://poudbyqhmmdqrxoandhf.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_mrcFpEOLM6s0BlaBaB9CoA_cE_xrrKE'

export const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export type BoardType = 'general' | 'qna' | 'notice'

export interface Post {
  id: string
  title: string
  content: string
  board_type: BoardType
  author_id: string
  author_email: string
  created_at: string
  updated_at: string
}
