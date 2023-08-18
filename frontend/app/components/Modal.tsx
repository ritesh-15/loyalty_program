import { ReactNode } from "react"
import tw from "../utils/tw"

interface IProps {
  children: ReactNode
  open: boolean
}

export default function Modal({ children, open }: IProps) {
  return (
    <div
      className={tw(
        "fixed top-0 bottom-0 right-0 left-0 min-h-screen w-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 opacity-0 pointer-events-none transition-opacity",
        {
          "opacity-100 pointer-events-auto": open,
        }
      )}
    >
      <div className="bg-white p-4 max-w-[550px] w-full shadow-md rounded-md">
        {children}
      </div>
    </div>
  )
}
