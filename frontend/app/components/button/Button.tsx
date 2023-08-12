import tw from "@/app/utils/tw"
import React from "react"

interface IProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactElement | string
  loading?: boolean
}

export default function Button({
  children,
  className,
  loading,
  ...props
}: IProps) {
  return (
    <button
      className={tw(
        "bg-primary text-white w-full p-3 rounded-md flex items-center justify-center",
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="border-2 border-transparent rounded-full h-[25px] w-[25px] mx-auto animate-spin border-b-white border-l-white border-r-white"></div>
      ) : (
        children
      )}
    </button>
  )
}
