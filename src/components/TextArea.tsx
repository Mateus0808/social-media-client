import { InputHTMLAttributes, TextareaHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
}

export const TextArea = ({ name, ...rest }: TextAreaProps) => {
  const inputRef = useRef(null)
  const { fieldName, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: (ref) => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <textarea
      ref={inputRef}
      id={name}
      name={name}
      {...rest}
      className="w-full resize-none px-3 py-2 border-none outline-none rounded text-2xl font-normal"
    />
  )
}
