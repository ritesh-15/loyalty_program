import { ReactElement, useState } from "react"
import { LuEdit2 } from "react-icons/lu"
import Modal from "../Modal"
import Input from "../input/Input"
import Button from "../button/Button"
import { toast } from "react-hot-toast"

interface IProps {
  title: string
  value: string
  icon: ReactElement
  isEditable?: boolean
  modalTitle?: string
  modalDescription?: string
  updateFunction?: (value: string) => Promise<any>
}

export default function AdminCard({
  title,
  value,
  icon,
  isEditable,
  modalDescription,
  modalTitle,
  updateFunction,
}: IProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [updatedValue, setUpdatedValue] = useState(value)

  const onClick = async () => {
    if (!updatedValue || !updateFunction) return
    setLoading(true)
    try {
      await updateFunction(updatedValue)
    } catch (e: any) {
      console.log(e.message)
      toast.error("Something went wrong please try again!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex w-full items-center bg-white flex-col p-4 rounded-md shadow-md">
        {isEditable && (
          <div className="text-xl ml-auto">
            <LuEdit2 onClick={() => setOpen(true)} className="cursor-pointer" />
          </div>
        )}

        <div className="text-5xl text-yellow-500">{icon}</div>
        <p className="mt-4">{value}</p>
        <span className="font-semibold">{title}</span>
      </div>

      <Modal open={open}>
        <div className="">
          <h1 className="text-xl font-bold mb-2">{modalTitle}</h1>
          <p className="mb-4">{modalDescription}</p>
          <Input
            title={title}
            value={updatedValue}
            onChange={(e) => setUpdatedValue(e.target.value)}
          />
          <div className="flex items-center gap-1 mt-4 justify-end">
            <Button className=" w-fit" onClick={onClick}>
              Update
            </Button>
            <Button
              onClick={() => setOpen(false)}
              className="bg-transparent text-primary w-fit"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
