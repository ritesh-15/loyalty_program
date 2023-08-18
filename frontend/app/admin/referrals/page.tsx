"use client"

import Modal from "@/app/components/Modal"
import Button from "@/app/components/button/Button"
import useLoyaltyContract from "@/app/hooks/useLoyaltyContract"
import { IAdminReferrals } from "@/app/interfaces/IAdminReferrals"
import { IUserSession } from "@/app/interfaces/IUser"
import ReferralService from "@/app/services/referral.service"
import { formatWalletAddress } from "@/app/utils/formatWalletAddress"
import { useSession } from "next-auth/react"
import qs from "qs"
import { toast } from "react-hot-toast"
import { useMutation, useQuery } from "react-query"

export default function Referrals() {
  const { data: session } = useSession()
  const user = session?.user as IUserSession

  const { giveRewardOnReferral } = useLoyaltyContract()

  const { mutateAsync: reward, isLoading } = useMutation(
    (userAddress: string) => giveRewardOnReferral(userAddress)
  )

  const query = qs.stringify(
    {
      filters: {
        isAccountCreated: true,
      },
      populate: {
        user_id: {
          fields: ["username", "walletAddress"],
        },
      },
      fields: ["id"],
    },
    { encodeValuesOnly: true }
  )

  const { data: referrals } = useQuery(
    ["admin-referrals"],
    () => ReferralService.getRefferals<IAdminReferrals>(user.token, query),
    {
      enabled: user ? true : false,
    }
  )

  const handleSendReward = async (address: string) => {
    try {
      await reward(address)
      toast.success("Reward sent to user successfully!")
    } catch (e: any) {
      toast.error("Someting went wrong please try again!")
    }
  }

  return (
    <>
      <section className="mt-12 mx-4">
        <div className="flex items-center justify-between">
          <div className="">
            <h1 className="text-2xl font-bold">Referrls</h1>
            <p className="">Approve the referral reward for users</p>
          </div>
        </div>

        <div className="mt-12">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    UserName
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Wallet address
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {referrals?.data.map(({ attributes, id }) => (
                  <tr
                    key={id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {attributes.user_id.data.attributes.username}
                    </th>
                    <td className="px-6 py-4">
                      {formatWalletAddress(
                        attributes.user_id.data.attributes.walletAddress
                      )}
                    </td>

                    <td className="flex items-center px-6 py-4 space-x-3">
                      <Button
                        onClick={() =>
                          handleSendReward(
                            attributes.user_id.data.attributes.walletAddress
                          )
                        }
                        className="w-fit"
                      >
                        Give rewards
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Modal open={isLoading}>
        <div className="flex items-center justify-center h-full">
          <div className="w-[75px] h-[75px] rounded-full border-2 border-transparent border-r-primary border-b-primary border-l-primary animate-spin"></div>
        </div>
      </Modal>
    </>
  )
}