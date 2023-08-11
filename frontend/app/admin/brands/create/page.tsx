"use client"

import Button from "@/app/components/button/Button"
import Input from "@/app/components/input/Input"
import { IUserSession } from "@/app/interfaces/IUser"
import UserService from "@/app/services/user.service"
import { useFormik } from "formik"
import { useSession } from "next-auth/react"
import { ChangeEvent, useState } from "react"
import { toast } from "react-hot-toast"
import { useMutation, useQuery } from "react-query"
import * as y from "yup"
import qs from "qs"
import { ISelectUsers } from "@/app/interfaces/ISelectUser"
import BrandService from "@/app/services/brand.service"
import { redirect } from "next/navigation"
import UploadService from "@/app/services/upload.service"

const brandSchema = y.object({
  name: y.string().required("brand name is required"),
  description: y.string().required("brand description is required"),
})

export default function page() {
  const { data: session } = useSession()
  const user = session?.user as IUserSession

  const initialValues = {
    name: "",
    description: "",
  }

  const [logo, setLogo] = useState<File | null>(null)
  const [selectedUser, setSelectedUser] = useState("")

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length) return
    setLogo(files[0])
  }

  const usersQuery = qs.stringify(
    {
      fields: ["id", "username"],
    },
    { encodeValuesOnly: true }
  )

  const { data } = useQuery(
    ["users", user],
    () => UserService.getAllUsers<ISelectUsers>(user.token, usersQuery),
    {
      onError: (error: any) => {
        toast.error(error.response.data.error.message)
      },
      enabled: user ? true : false,
    }
  )

  const { mutateAsync: createBrand } = useMutation(
    (data: any) => BrandService.createBrand(data, user.token),
    {
      onSuccess: (data) => {
        toast.success("Brand created successfully!!")
        redirect("/admin/brands")
      },
      onError: (error: any) => {
        toast.error(error.response.data.error.message)
      },
    }
  )

  const { mutateAsync: uploadBrandLogo } = useMutation(
    (data: any) => UploadService.upload(data),
    {
      onError: (error: any) => {
        toast.error(error.response.data.error.message)
      },
    }
  )

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues,
    validationSchema: brandSchema,
    onSubmit: async (values) => {
      console.log(logo)
      if (!logo || !selectedUser) {
        toast.error("all fields are required!")
        return
      }
      // uplod brand logo
      const formData = new FormData()
      formData.append("api_key", process.env.NEXT_PUBLIC_API_KEY!!)
      formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET!!)
      formData.append("public_id", process.env.NEXT_PUBLIC_PUBLIC_ID!!)
      formData.append("file", logo)

      const uploadedFileResponse = await uploadBrandLogo(formData)

      console.log(uploadedFileResponse)
    },
  })

  return (
    <section className="mt-12 mx-4">
      <div className="">
        <h1 className="text-2xl font-bold">Create new brand</h1>
        <p className="">
          Add the following required information to add a new brand
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-md shadow-md mt-12"
        action=""
      >
        <div className="mb-4">
          <Input
            name="name"
            onChange={handleChange}
            error={errors.name}
            title="Brand name"
          />
        </div>

        <div className="mb-4">
          <Input
            name="description"
            onChange={handleChange}
            error={errors.description}
            isMultiline
            title="Description"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select user
          </label>
          <select
            onChange={(e) => setSelectedUser(e.target.value)}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a user</option>
            {data?.map((user) => (
              <option value={user.id} selected={+selectedUser === user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload Logo
          </label>
          <input
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            accept="image/*"
          />
        </div>

        <Button type="submit" className="w-fit ml-auto">
          Create
        </Button>
      </form>
    </section>
  )
}
