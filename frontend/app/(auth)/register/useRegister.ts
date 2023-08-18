import AuthService from "@/app/services/auth.service"
import { useFormik } from "formik"
import { signIn, useSession } from "next-auth/react"
import { useMutation, useQuery } from "react-query"
import * as y from "yup"
import { AxiosError } from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { IUserSession } from "@/app/interfaces/IUser"
import { useEffect, useState } from "react"
import { useWallet } from "@/app/store/WalletStore"
import { ISingleReferral } from "@/app/services/ISingleReferral"
import ReferralService from "@/app/services/referral.service"
import QueryString from "qs"
import useDebounce from "@/app/hooks/useDebounce"

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
  const { walletAddress } = useWallet()

  const [hasId, setHasId] = useState<boolean>(false)
  const [userReferralId, setUserReferralId] = useState("")

  const referalQuery = useDebounce(userReferralId, 300)

  const [foundReferral, setFoundReferral] = useState<number | null>(null)
  const [referralError, setReferralError] = useState("")

  const { data } = useSession()
  const user = data?.user as IUserSession

  useEffect(() => {
    if (user) redirectToPage()
  }, [user])

  // redirect to route
  const redirectToPage = () => {
    switch (user.data.role.name) {
      case "Authenticated":
        navigate.push("/")
        break
      case "Admin":
        navigate.push("/admin")
        break
      default:
        navigate.push("/")
        break
    }
  }

  const initialValues = {
    email: "",
    password: "",
    name: "",
  }

  const { mutateAsync: updateReferral } = useMutation((data: any) =>
    ReferralService.updateReferral(foundReferral!!, data)
  )

  const query = QueryString.stringify({
    fields: ["refferId", "isAccountCreated"],
    filters: {
      $and: [
        {
          refferId: {
            $eq: referalQuery,
          },
        },
        {
          isAccountCreated: false,
        },
      ],
    },
  })

  useQuery(
    ["referral", referalQuery],
    () => ReferralService.checkReferral<ISingleReferral>(query),
    {
      onSuccess({ data }) {
        if (data.length === 0) {
          setReferralError("No referral found with given code!")
          return
        }
        setFoundReferral(data[0].id)
      },
      onError(error) {
        toast.error(
          "Someting went wrong while checking referral please try again!"
        )
      },
      enabled: referalQuery === "" ? false : true,
    }
  )

  const handleRegister = async (data: any) => {
    try {
      if (!walletAddress) {
        toast.error("Please connect your meta mask wallet account")
        return
      }

      await Promise.all([
        register({
          username: data.name,
          walletAddress,
          ...data,
        }),

        foundReferral &&
          updateReferral({
            data: {
              isAccountCreated: true,
            },
          }),
      ])

      // to create the cookie in next auth for further authentication
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
        toast.error(error.message)
      }
    }
  }

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: singUpSchema,
    onSubmit: (values) => {
      handleRegister(values)
    },
  })

  const { mutateAsync: register, isLoading } = useMutation(AuthService.register)

  return {
    actions: { handleChange, handleSubmit, setUserReferralId, setHasId },
    states: { values, errors, isLoading, hasId, userReferralId, referralError },
  }
}
