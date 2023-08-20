"use client"
import Wrapper from "@/app/components/Wrapper"
import ProductDetailCarousel from "@/app/components/ProductDetailCarousel"
import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { IUserSession } from "@/app/interfaces/IUser"
import qs from "qs"
import ProductService from "@/app/services/product.service"
import { useSearchParams } from "next/navigation"
import { useQuery } from "react-query"
import { ISingleProduct } from "@/app/interfaces/ISingleProduct"
import { toast } from "react-hot-toast"
import Image from "next/image"
import { ICartItem } from "@/app/interfaces/ICartItem"
import { useCartStore } from "@/app/store/CartStore"
import Button from "@/app/components/button/Button"

export default function SingleProduct() {
  const { data } = useSession()
  const user = data?.user as IUserSession

  const searchParams = useSearchParams()
  const sid = searchParams.get("sellerId")
  const pid = searchParams.get("productId")

  const query = qs.stringify(
    {
      fields: ["name", "description", "price", "images"],
      populate: {
        brandId: {
          fields: ["name", "brandLogo"],
          populate: {
            user: {
              fields: ["username", "walletAddress"],
            },
          },
        },
        categories: {
          fields: ["name"],
        },
        sellers: {
          fields: ["name", "location", "user"],
          populate: {
            user: {
              fields: ["username", "walletAddress"],
            },
          },
        },
      },

      filters: {
        $and: [
          {
            seller: {
              id: {
                $eq: sid,
              },
            },
          },
          {
            id: {
              $eq: pid,
            },
          },
        ],
      },
    },
    { encodeValuesOnly: true }
  )

  const { data: product, isLoading } = useQuery(
    ["single-product", { sid, pid }],
    () => ProductService.fetchProduct<ISingleProduct>(query),
    {
      onError(err) {
        toast.error("Someting went wrong while fetching product")
      },
      select: ({ data }) => {
        return data[0]
      },
    }
  )

  const [addToCart] = useCartStore((state) => [
    state.addToCart,
    state.cartItems,
  ])

  const handleCart = () => {
    if (!product) return
    const cartItem: ICartItem = {
      userId: user?.data.id,
      userWalletAddress: user?.data.walletAddress,
      sellerId: product?.attributes.sellers.data[0].id,
      sellerWalletAddress:
        product?.attributes.sellers.data[0].attributes.user.data.attributes
          .walletAddress,
      brandId: product?.attributes.brandId.data.id,
      brandWalletAddress:
        product?.attributes.brandId.data.attributes.user.data.attributes
          .walletAddress,
      name: product?.attributes.name,
      productId: product?.id,
      price: product?.attributes.price,
      images: product?.attributes.images,
      quantity: 1,
    }

    addToCart(cartItem)
    toast.success("Added to cart")
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center mt-16">
        <div className="w-[75px] h-[75px] rounded-full border-2 border-transparent border-r-primary border-b-primary border-l-primary animate-spin"></div>
      </div>
    )

  return (
    <>
      <section className="mt-16">
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="max-w-[450px]">
              {product?.attributes.images && (
                <ProductDetailCarousel images={product.attributes.images} />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-1 mb-2">
                {product?.attributes.brandId.data.attributes.brandLogo && (
                  <Image
                    src={product?.attributes.brandId.data.attributes.brandLogo}
                    alt=""
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                )}
                <span className="text-sm font-semibold">
                  {product?.attributes.brandId.data.attributes.name}
                </span>
              </div>

              <div className="text-4xl font-semibold mb-2">
                {product?.attributes.name}
              </div>

              <div className="text-sm font-light mb-2">
                {product?.attributes.sellers.data[0].attributes.name} -{" "}
                <span>
                  {product?.attributes.sellers.data[0].attributes.location}
                </span>
              </div>

              <div className="text-xl font-bold">
                ₹{product?.attributes.price}
              </div>
              <div className="text-md font-light">inc. of all taxes</div>
              <div className="text-md font-light mb-4">
                {`(Also include all aplicable duties)`}
              </div>

              <div className="text-lg font-bold md-5">Product Details</div>
              <div className="text-sm font-light mb-4">
                {product?.attributes.description}
              </div>

              <Button className="rounded-full py-4" onClick={handleCart}>
                Add to cart
              </Button>
            </div>
          </div>
        </>
      </section>
    </>
  )
}
