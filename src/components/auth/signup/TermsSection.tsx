'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import CheckedboxIcon from '@/assets/icon/checkedbox-icon.svg'
import NotcheckedboxIcon from '@/assets/icon/notcheckedbox-icon.svg'
import DoneIcon from '@/assets/icon/done-icon.svg'
import NotdoneIcon from '@/assets/icon/notdone-icon.svg'
import { getActiveTerms } from '@/apis/auth'
import type { Term } from '@/apis/auth/type'
import TermsViewModal from './TermsViewModal'

interface TermsSectionProps {
  onChange?: (uuids: string[], allRequiredAgreed: boolean) => void
}

export default function TermsSection({ onChange }: TermsSectionProps) {
  const [agreedUuids, setAgreedUuids] = useState<string[]>([])
  const [viewingTerm, setViewingTerm] = useState<Term | null>(null)

  const {
    data: terms = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['terms', 'active'],
    queryFn: getActiveTerms,
  })

  const allAgreed =
    terms.length > 0 && terms.every((t) => agreedUuids.includes(t.uuid))

  const updateAgreed = useCallback(
    (next: string[]) => {
      setAgreedUuids(next)
      const requiredTerms = terms.filter((t) => t.required)
      const allRequiredAgreed =
        requiredTerms.length > 0 &&
        requiredTerms.every((t) => next.includes(t.uuid))
      onChange?.(next, allRequiredAgreed)
    },
    [terms, onChange],
  )

  function handleAllChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateAgreed(e.target.checked ? terms.map((t) => t.uuid) : [])
  }

  function handleChange(uuid: string, isChecked: boolean) {
    const next = isChecked
      ? [...agreedUuids, uuid]
      : agreedUuids.filter((id) => id !== uuid)
    updateAgreed(next)
  }

  return (
    <>
      <fieldset>
        <div className="h-10 border-b border-secondary h4 mt-8 mb-9.5 flex">
          <legend>약관 동의</legend>
        </div>

        <label
          className="flex items-center gap-3.5 mb-4.5 cursor-pointer"
          htmlFor="all"
        >
          <input
            type="checkbox"
            id="all"
            className="sr-only"
            checked={allAgreed}
            onChange={handleAllChange}
          />
          <Image
            src={allAgreed ? CheckedboxIcon : NotcheckedboxIcon}
            alt={allAgreed ? '전체 선택됨' : '전체 미선택'}
            width={17}
            height={17}
          />
          <span>모두 동의</span>
        </label>

        {isLoading && (
          <p className="text-text-assistive p2">약관을 불러오는 중입니다...</p>
        )}
        {isError && (
          <p className="text-error p2">
            약관을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
          </p>
        )}
        {terms.map((term, i) => {
          const isChecked = agreedUuids.includes(term.uuid)
          const isLast = i === terms.length - 1
          return (
            <div
              key={term.uuid}
              className={`flex items-center justify-between ${isLast ? '' : 'mb-2.5'}`}
            >
              <label
                className="flex items-center gap-2 cursor-pointer"
                htmlFor={term.uuid}
              >
                <input
                  type="checkbox"
                  id={term.uuid}
                  className="sr-only"
                  checked={isChecked}
                  onChange={(e) => handleChange(term.uuid, e.target.checked)}
                />
                <Image
                  src={isChecked ? DoneIcon : NotdoneIcon}
                  alt={isChecked ? '동의함' : '미동의'}
                  width={20}
                  height={20}
                  className="ml-0.75"
                />
                <span>
                  [{term.required ? '필수' : '선택'}] {term.title} 동의
                </span>
              </label>
              <button
                type="button"
                onClick={() => setViewingTerm(term)}
                className="text-text-assistive text-gray-4 p4 underline cursor-pointer shrink-0"
              >
                보기
              </button>
            </div>
          )
        })}
      </fieldset>

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
