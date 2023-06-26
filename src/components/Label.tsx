import { LabelHTMLAttributes } from "react"

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string
}

export const Label = ({ label, ...rest }: LabelProps) => {
  return (
    <label {...rest} className="block mb-2 text-sm font-medium text-gray-600">
      {label}
    </label>
  )
}