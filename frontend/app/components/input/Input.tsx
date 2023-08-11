import { DetailedHTMLProps, InputHTMLAttributes } from "react"

interface IProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  title: string
  error?: string
}

export default function Input({ title, error, ...props }: IProps) {
  return (
    <div className="flex flex-col">
      <label className="mb-2" htmlFor="">
        {title}
      </label>
      <input
        {...props}
        className="px-2 py-3 rounded-md bg-gray-100 outline-none"
      />
      {error && (
        <small className="text-red-500 inline-block mt-1">{error}</small>
      )}
    </div>
  )
}
