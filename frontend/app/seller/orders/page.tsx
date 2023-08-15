"use client";
import LoyalUserToken from "@/app/components/LoyalUserToken"
import Modal from "@/app/components/Modal"
import { IUserSession } from "@/app/interfaces/IUser"
import OrderService from "@/app/services/order.service"
import { useSession } from "next-auth/react"
import qs from "qs"
import { useQuery } from "react-query"
import {useState} from 'react'
import Link from "next/link";
import Button from "@/app/components/button/Button"


export default function page() {
    const [walletAddress, setWalletAddress] = useState("")
    const { data: session } = useSession()
    const user = session?.user as IUserSession

    const query = qs.stringify(
        {
            filters: {
                sellerId: {
                    id: {
                        $eq: user?.data.seller?.id,
                    },
                },
            },
            populate: {
                orderId: {
                    populate: {
                        userId: {
                            fields: ["username", "walletAddress"],
                        },
                    },
                    fields: ["totalAmount", "numberOfTokens"],
                },
                productId: {
                    fields: ["price", "name"],
                },
            },
            fields: ["quantity"],
        },
        { encodeValuesOnly: true }
    )

    const { data: orders } = useQuery(
        ["order-items", user?.data.seller?.id],
        () => OrderService.getOrderItems(user.token, query),
        {
            enabled: user !== undefined ? true : false,
        }
    )

    return (
        <>
            <section className="mt-12 mx-4">
                <div className="flex items-center justify-between">
                    <div className="">
                        <h1 className="text-2xl font-bold">Orders</h1>
                        <p className="">Manage the orders</p>
                    </div>
                </div>

                <div className="mt-12">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Username
                                    </th>
                                    <th scope="col" className="px-6 py-3"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders?.data?.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {order?.attributes?.productId?.data.attributes.name}
                                        </th>

                                        <td className="px-6 py-4">
                                            ₹ {order?.attributes?.productId?.data.attributes.price}
                                        </td>

                                        <td className="px-6 py-4"> {order?.attributes.quantity}</td>

                                        <td className="px-6 py-4">
                                            {
                                                order?.attributes?.orderId?.data.attributes.userId.data
                                                    .attributes.username
                                            }
                                        </td>

                                        <td className="flex items-center px-6 py-4 space-x-3">
                                            <Button
                                                onClick={() =>
                                                    setWalletAddress(
                                                        order?.attributes.orderId.data.attributes.userId
                                                            .data.attributes.walletAddress
                                                    )
                                                }
                                                className="w-fit"
                                            >
                                                Give loyalty rewards
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <Modal open={walletAddress !== ""}>
                <LoyalUserToken
                    walletAddress={walletAddress}
                    onClose={() => setWalletAddress("")}
                />
            </Modal>
        </>
    )
}
