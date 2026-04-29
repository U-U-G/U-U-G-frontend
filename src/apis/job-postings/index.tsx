import { privateClient } from '@/apis/common/privateClient'
import { ApiResponse } from '../common/type'
import {
  CreateJobPostingRequest,
  JobPosting,
  JobPostingDetail,
  JobPostingListItem,
} from './type'

export const getJobPostingList = async () => {
  const { data } =
    await privateClient.get<ApiResponse<JobPostingListItem[]>>('/job-postings')
  return data.data
}

export const createJobPosting = async (body: CreateJobPostingRequest) => {
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
