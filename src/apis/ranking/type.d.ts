export interface RankingItem {
  rank: number
  nickname: string
  jobTitle: string
  bestScore: number
  totalSessionCount: number
}

export interface RankingResponse {
  myRankingResponse: RankingItem | null
  rankingItemResponseList: RankingItem[]
  totalCount: number
}
