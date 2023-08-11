import { IUserSession } from "@/app/interfaces/IUser"
import { useFormik } from "formik"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
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

  const initialValues = {
    email: "",
    password: "",
  }

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const res = await signIn("credentials", {
          ...values,
          redirect: false,
        })

        if (res?.error) throw new Error(res.error)

        // base on user role navigate to particular page
        switch (user.data.role.name) {
          case "Authenticated":
            navigate.push("/")
          default:
            navigate.push("/")
        }
      } catch (error: any) {
        toast.error(error.message)
      }
    },
  })

  return { actions: { handleChange, handleSubmit }, states: { values, errors } }
}
