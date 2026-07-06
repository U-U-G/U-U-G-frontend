import { queryOptions } from '@tanstack/react-query'
import { getProfile } from './index'

export const PROFILE_QUERY_KEY = ['user', 'profile'] as const

const PROFILE_STALE_TIME_MS = 5 * 60 * 1000

export const profileQueryOptions = queryOptions({
  queryKey: PROFILE_QUERY_KEY,
  queryFn: getProfile,
  staleTime: PROFILE_STALE_TIME_MS,
  retry: false,
})
