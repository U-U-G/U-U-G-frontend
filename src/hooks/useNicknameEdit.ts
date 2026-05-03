import { useState, useEffect } from 'react'

export function useNicknameEdit(initialNickname: string) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialNickname)

  useEffect(() => {
    if (!isEditing) {
      setValue(initialNickname)
    }
  }, [initialNickname])
  const [input, setInput] = useState('')
  const [isDuplicate, setIsDuplicate] = useState(false)

  const hasInput = input.trim().length > 0

  const onEdit = () => {
    setIsEditing(true)
    setInput('')
    setIsDuplicate(false)
  }

  const onConfirm = () => {
    setValue(input)
    setIsEditing(false)
    setInput('')
    setIsDuplicate(false)
  }

  const onInputChange = (next: string) => {
    setInput(next)
    setIsDuplicate(false)
  }

  return {
    isEditing,
    value,
    input,
    isDuplicate,
    hasInput,
    onEdit,
    onConfirm,
    onInputChange,
    setIsDuplicate,
  }
}
