"use client"
import { v4 as uuidv4 } from "uuid"
import React, { useState } from "react"
import Image from "next/image"
import Button from "../components/button/Button"
import { BsChevronDoubleDown } from "react-icons/bs"
import { AiOutlineCopy } from "react-icons/ai"
import { toast, Toaster } from "react-hot-toast"
import ReferralService from "../services/referral.service"
import { useMutation, useQuery } from "react-query"
import { useSession } from "next-auth/react"
import { IUserSession } from "../interfaces/IUser"
import qs from "qs"

const Referral = () => {
  const [generatedId, setGeneratedId] = useState("")
  const [isIdGenerated, setIsIdGenerated] = useState(false)

  const { data: session } = useSession()
  const user = session?.user as IUserSession

  const { mutateAsync: createReferral } = useMutation((data: any) =>
    ReferralService.createReferral(user.token, data)
  )

  const handleButtonClick = async () => {
    const uniqueId = await uuidv4()
    setGeneratedId(uniqueId)
    setIsIdGenerated(true)
    try {
      const rf = await createReferral({
        data: {
          user_id: user.data.id,
          refferId: uniqueId,
        },
      })
    } catch (error: any) {
      toast.error("Something went wrong please try again")
      console.log("error ")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedId)
    toast.success("Copied")
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 pt-28 pb-14 bg-blue-200">
      <Toaster />
      <div className="flex flex-col">
        {/* 1st div */}
        <div className="bg-blue-100 h-60 rounded-lg p-4 mb-4 flex items-center">
          <div className="flex-grow ml-20">
            <div className="text-3xl font-bold font-sans">
              Refer Friends
              <br />
              Earn Coins
            </div>
            <div className="text-lg mt-2">
              Earn 5 Coins for every client you introduce. Join the program and
              win exciting prizes.
            </div>
            {isIdGenerated ? (
              <div className="text-lg p-2 text-pink-800 flex flex-row space-x-3">
                <p>Referrel code is generated below</p>
                <BsChevronDoubleDown size="20" />
              </div> // Button will be hidden when ID is generated
            ) : (
              <Button
                className="py-2 max-w-sm mt-5 px-6 rounded-full bg-black text-white text-lg font-medium mb-3 hover:opacity-75"
                onClick={handleButtonClick}
              >
                Generate Link
              </Button>
            )}
          </div>
          <div className="flex-shrink-0 pl-5">
            <Image
              src={
                "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514042/Metamarket/HomePageUI/refer_th2dmf.png"
              }
              alt=""
              height={300}
              width={300}
            />
          </div>
        </div>

        {/* 2nd div */}
        <div className={`bg-blue-100 h-20 rounded-lg p-4 mb-4`}>
          <div
            className={`${isIdGenerated ? "opacity-100" : "opacity-0"}`}
            style={{ transition: "opacity 1s" }}
          >
            {isIdGenerated ? (
              <div className="flex items-center space-x-10 flex-row">
                <p className="text-lg font-semibold ">Referral ID:</p>
                <div className="flex flex-row space-x-3">
                  <p className="text-sm p-2 bg-white rounded-lg ">
                    {generatedId}
                  </p>
                  <button onClick={handleCopy}>
                    <AiOutlineCopy size="20" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-lg text-black font-semibold ml-20 mt-2">
                Please generate your referral ID
              </div>
            )}
          </div>
        </div>

        <div className="flex">
          {/* 3rd div */}
          <div className="bg-blue-100 h-40 w-[30%] rounded-lg p-4 mr-4 transition-transform"></div>

          {/* 4th div */}
          <div className="bg-blue-100 h-40 w-[70%] rounded-lg p-4 transition-transform"></div>
        </div>
      </div>
    </div>
  );
}

export default Referral
