import { IUserSession } from "@/app/interfaces/IUser"
import { AxiosError } from "axios"
import { useFormik } from "formik"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import * as y from "yup"

const loginSchema = y.object({
  email: y
    .string()
    .email("email address must be valid")
    .required("email address is required"),
  password: y
    .string()
    .required("password is required")
    .min(6, "password must be at least 6 characters long"),
})

export default function useLogin() {
  const navigate = useRouter()
  const { data } = useSession()
  const user = data?.user as IUserSession

  useEffect(() => {
    if (user) redirectToPage()
  }, [user])

  const [isLoading, setIsLoading] = useState(false)

  const initialValues = {
    email: "",
    password: "",
  }

  // redirect to route
  const redirectToPage = () => {
    switch (user.data.role.name) {
      case "Authenticated":
        navigate.push("/")
        break
      case "Admin":
        navigate.push("/admin")
        break
      case "Brand":
        navigate.push("/brand")
        break
      case "Seller":
        navigate.push("/seller")
        break
      default:
        navigate.push("/")
        break
    }
  }

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        const res = await signIn("credentials", {
          ...values,
          redirect: false,
        })

        if (res?.error) throw new Error(res.error)

        // base on user role navigate to particular page
        redirectToPage()
      } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.error.message)
        } else {
          toast.error("Someting went wrong please try again!")
        }
      } finally {
        setIsLoading(false)
      }
    },
  })

  return {
    actions: { handleChange, handleSubmit },
    states: { values, errors, isLoading },
  }
}
