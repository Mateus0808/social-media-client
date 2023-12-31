import { SelectHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
}

export const Select = ({ name, children, ...rest }: SelectProps) => {
  const selectRef = useRef(null)
  const { fieldName, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <select
      ref={selectRef}
      id={name} 
      name={name}
      className="w-full px-3 h-11 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
    >
      {children}
    </select>
  )
}
