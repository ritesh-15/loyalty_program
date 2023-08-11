import AuthService from "@/app/services/auth.service"
import { useFormik } from "formik"
import { signIn } from "next-auth/react"
import { useMutation } from "react-query"
import * as y from "yup"
import { AxiosError } from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

const singUpSchema = y.object({
  email: y
    .string()
    .email("email address must be valid")
    .required("email address is required"),
  password: y
    .string()
    .required("password is required")
    .min(6, "password must be at least 6 characters long"),
  name: y.string().required("name is required"),
})

export default function useRegister() {
  const navigate = useRouter()

  const initialValues = {
    email: "",
    password: "",
    name: "",
  }

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: singUpSchema,
    onSubmit: async (values) => {
      try {
        await register({
          username: values.name,
          walletAddress: "temp",
          ...values,
        })

        // to create the cookie in next auth for further authentication
        const res = await signIn("credentials", {
          ...values,
          redirect: false,
        })

        if (res?.error) throw new Error(res.error)

        // set the user data in global state and redirect user
        navigate.push("/")
      } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.error.message)
        } else {
          toast.error(error.message)
        }
      }
    },
  })

  const { mutateAsync: register, isLoading } = useMutation(AuthService.register)

  return {
    actions: { handleChange, handleSubmit },
    states: { values, errors, isLoading },
  }
}
