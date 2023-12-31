import { InputHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export const Input = ({ name, ...rest }: InputProps) => {
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
    <input
      ref={inputRef}
      id={name}
      name={name}
      {...rest}
      className="w-full p-2 h-11 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
    />
  )
}
