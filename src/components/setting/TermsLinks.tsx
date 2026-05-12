'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getActiveTerms } from '@/apis/auth'
import type { Term } from '@/apis/auth/type'
import TermsViewModal from '@/components/auth/signup/TermsViewModal'

export default function TermsLinks() {
  const [viewingTerm, setViewingTerm] = useState<Term | null>(null)

  const {
    data: terms = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['terms', 'active'],
    queryFn: getActiveTerms,
  })

  const termsOfService = terms.find((t) => t.type === 'TERMS_OF_SERVICE')
  const privacyPolicy = terms.find((t) => t.type === 'PRIVACY_POLICY')

  if (isError) {
    return (
      <p className="p4 text-error">
        약관을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
      </p>
    )
  }

  return (
    <>
      <div className="flex flex-row gap-5 p4 text-gray-3">
        <button
          type="button"
          onClick={() => termsOfService && setViewingTerm(termsOfService)}
          disabled={isLoading}
          className="cursor-pointer disabled:opacity-50"
        >
          이용약관
        </button>
        <button
          type="button"
          onClick={() => privacyPolicy && setViewingTerm(privacyPolicy)}
          disabled={isLoading}
          className="cursor-pointer disabled:opacity-50"
        >
          개인정보처리방침
        </button>
      </div>

      {viewingTerm && (
        <TermsViewModal
          title={viewingTerm.title}
          content={viewingTerm.content}
          onClose={() => setViewingTerm(null)}
        />
      )}
    </>
  )
}
