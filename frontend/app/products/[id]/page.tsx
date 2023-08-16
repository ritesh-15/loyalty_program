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

interface SingleProductProps {
  params: {
    sellerId: number
    productId: number
  }
}

export const SingleProduct: React.FC<SingleProductProps> = ({ params }) => {
  const { data } = useSession()
  const user = data?.user as IUserSession

  const [product, setProduct] = useState<ISingleProduct["data"][0] | null>()
  // const session =  getCurrentUser();

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

  useQuery(
    ["products", sid, pid],
    () => ProductService.getProducts(user.token, query),
    {
      enabled: user ? true : false,
      onSuccess({ data }) {
        if (data) {
          setProduct(data[0])
        }
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

  return (
    <div>
      {/* <Navbar/> */}

      <div className="w-full md:py-20">
        {/* <ToastContainer /> */}
        <Wrapper className="pt-20 ">
          <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px] ">
            {/* left column start */}
            <div className="w-full  md:w-auto flex-[1.5] max-w-[500px] lg-max-w-full mx-auto lg:mx-0">
              {product?.attributes.images && (
                <ProductDetailCarousel images={product.attributes.images} />
              )}
              {/* {   } */}
            </div>
            {/* left column end */}
            {/* right column start */}
            <div className="flex-[1] py-3">
              <div className="font-semibold flex flex-row space-x-4 mb-1 text-black/[0.6]">
                {product?.attributes.brandId.data.attributes.brandLogo && (
                  <Image
                    src={product?.attributes.brandId.data.attributes.brandLogo}
                    alt=""
                    width={50}
                    height={50}
                  />
                )}
                <span className="text-lg">
                  {product?.attributes.brandId.data.attributes.name}
                </span>
              </div>

              {/* PRODUCT TITLE */}
              <div className="text-[34px] font-semibold mb-2 leading-tight">
                {product?.attributes.name}
              </div>

              {/* PRODUCT SELLER */}
              <div className="text-sm font-semibold mb-5 text-black/[0.6]">
                {product?.attributes.sellers.data[0].attributes.name} -{" "}
                <span>
                  {product?.attributes.sellers.data[0].attributes.location}
                </span>
              </div>
              {/* PRODUCT PRIZE */}
              <div className="text-lg font-semibold">
                ₹{product?.attributes.price}
              </div>
              <div className="text-md font-medium text-black/[0.5]">
                inc. of all taxes
              </div>
              <div className="text-md font-medium text-black/[0.5] mb-20">
                {`(Also include all aplicable duties)`}
              </div>

              <button
                className="py-4 w-full rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                onClick={handleCart}
              >
                Add to cart
              </button>
              {/* <button className="py-4 w-full rounded-full border border-black text-lg font-medium transition-transform flex items-center justify-center gap-2 active:scale-95 mb-10 hover:opacity-75">
                            Wishlist
                        </button> */}

              <div>
                <div className="text-lg font-bold md-5">Product Details</div>
                <div className="text-md mb-5">
                  {product?.attributes.description}
                </div>
              </div>
            </div>
            {/* right column end */}
          </div>
        </Wrapper>
      </div>
    </div>
  )
}

export default SingleProduct
