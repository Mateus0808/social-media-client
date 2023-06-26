import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
      {title}
    </button>
  )
}