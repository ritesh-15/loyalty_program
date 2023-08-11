import React from "react"

interface IProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactElement | string
  loading?: boolean
}

export default function Button({ children, loading, ...props }: IProps) {
  return (
    <button
      className="bg-primary text-white w-full p-3 rounded-md flex items-center justify-center"
      disabled={loading}
      {...props}
    >
      {loading ? <div className="">Loading...</div> : children}
    </button>
  )
}
