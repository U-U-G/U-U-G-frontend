import {
  fetchEventSource,
  type FetchEventSourceInit,
} from '@microsoft/fetch-event-source'
import { getAccessToken } from '@/utils/tokenStorage'
import { privateClient } from '@/apis/common/privateClient'
import { ApiResponse } from '../common/type'
import {
  JobPostingAnalysisRequest,
  JobPosting,
  JobPostingAnalysisEvent,
  JobPostingDetail,
  JobPostingListItem,
  UpdateJobPostingCompanyNameRequest,
} from './type'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const getJobPostingList = async () => {
  const { data } =
    await privateClient.get<ApiResponse<JobPostingListItem[]>>('/job-postings')
  return data.data
}

export const createJobPosting = async (body: JobPostingAnalysisRequest) => {
  const { data } = await privateClient.post<ApiResponse<JobPosting>>(
    '/job-postings',
    body,
  )
  return data.data
}

export const getJobPosting = async (uuid: string) => {
  const { data } = await privateClient.get<ApiResponse<JobPostingDetail>>(
    `/job-postings/${uuid}`,
  )
  return data.data
}

export const deleteJobPosting = async (uuid: string) => {
  const { data } = await privateClient.delete<ApiResponse<string>>(
    `/job-postings/${uuid}`,
  )
  return data.data
}

export const updateJobPostingCompanyName = async (
  uuid: string,
  body: UpdateJobPostingCompanyNameRequest,
) => {
  const { data } = await privateClient.patch<ApiResponse<JobPostingDetail>>(
    `/job-postings/${uuid}`,
    body,
  )
  return data.data
}

// export const createJobPostingAnalysisEventSource = (uuid: string) => {
//   return new EventSource(`${API_BASE_URL}/job-postings/${uuid}/stream`)
// }

export const createJobPostingAnalysisEventSource = (
  uuid: string,
  options: FetchEventSourceInit,
) => {
  const accessToken = getAccessToken()

  return fetchEventSource(`${API_BASE_URL}/job-postings/${uuid}/stream`, {
    ...options,

    credentials: 'include',

    headers: {
      Accept: 'text/event-stream',
      Authorization: `Bearer ${accessToken ?? ''}`,
      ...options.headers,
    },
  })
}

export const parseJobPostingAnalysisEvent = (
  event: MessageEvent<string>,
): JobPostingAnalysisEvent => {
  return JSON.parse(event.data)
}
