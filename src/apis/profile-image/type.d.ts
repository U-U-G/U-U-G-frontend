export interface ProfileImagePresignedUrlRequest {
  fileExtension: string
  contentType: string
}

export interface ProfileImagePresignedUrlResponse {
  preSignedUrl: string
  s3Key: string
  publicUrl: string
}

export interface UpdateProfileImageRequest {
  s3Key: string
}
