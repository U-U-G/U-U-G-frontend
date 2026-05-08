import { privateClient } from '@/apis/common/privateClient'
import { ApiResponse } from '../common/type'
import type {
  ScheduleDetail,
  CreateScheduleRequest,
  UpdateScheduleRequest,
  GetScheduleListResponse,
} from '@/apis/schedules/type'

export const createInterviewSchedule = async (body: CreateScheduleRequest) => {
  const { data } = await privateClient.post<ApiResponse<ScheduleDetail>>(
    '/schedules',
    body,
  )
  return data.data
}

export const getInterviewScheduleList =
  async (): Promise<GetScheduleListResponse> => {
    const { data } =
      await privateClient.get<ApiResponse<GetScheduleListResponse>>(
        '/schedules',
      )
    return data.data
  }

export const getInterviewSchedule = async (scheduleUuid: string) => {
  const { data } = await privateClient.get<ApiResponse<ScheduleDetail>>(
    `/schedules/${scheduleUuid}`,
  )
  return data.data
}

export const updateInterviewSchedule = async (
  scheduleUuid: string,
  body: UpdateScheduleRequest,
) => {
  const { data } = await privateClient.put<ApiResponse<ScheduleDetail>>(
    `/schedules/${scheduleUuid}`,
    body,
  )
  return data.data
}

export const deleteInterviewSchedule = async (scheduleUuid: string) => {
  const { data } = await privateClient.delete<ApiResponse<string>>(
    `/schedules/${scheduleUuid}`,
  )
  return data.data
}

export const scheduleApi = {
  createInterviewSchedule,
  getInterviewScheduleList,
  getInterviewSchedule,
  updateInterviewSchedule,
  deleteInterviewSchedule,
}
