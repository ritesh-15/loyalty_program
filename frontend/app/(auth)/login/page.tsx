"use client"

import Button from "@/app/components/button/Button"
import Input from "@/app/components/input/Input"
import useLogin from "./useLogin"
import Link from "next/link"

export default function page() {
  const { actions, states } = useLogin()

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-md w-[95%] max-w-[550px]">
        <h1 className="text-xl font-bold">Welcome to Meta market! 👋</h1>
        <p className="mt-2 max-w-[80%] text-center">
          Please login with email address and password to continue .
        </p>

        <form onSubmit={actions.handleSubmit} action="" className="mt-4 w-full">
          <div className="mb-4">
            <Input
              placeholder="johndoe@gmail.com"
              title="Email address"
              type="email"
              name="email"
              onChange={actions.handleChange}
              value={states.values.email}
              error={states.errors.email}
            />
          </div>

          <div className="mb-4">
            <Input
              placeholder="*********"
              title="Password"
              type="password"
              name="password"
              onChange={actions.handleChange}
              value={states.values.password}
              error={states.errors.password}
            />
          </div>

          <Button loading={states.isLoading} type="submit">
            Login
          </Button>
        </form>

        <div className="mt-4">
          Dont have an account yet ?{" "}
          <Link href="/register" className="text-primary">
            Create an account
          </Link>
        </div>
      </div>
    </section>
  )
}
