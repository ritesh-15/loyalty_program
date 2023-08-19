"use client"
import React, { useState } from "react"
import Image from "next/image"
import Navbar from "../components/Navbar"
import qs from "qs"
import { useQuery } from "react-query"
import Link from "next/link"
import SellerService from "../services/sellers.service"
import { ISellerWithProducts } from "../interfaces/ISellerWithProducts"
import { getDiscountedPricePercentage } from "../utils/helper";

interface IProductWithSeller {
  product: ISellerWithProducts["data"][0]["attributes"]["products"]["data"][0]
  seller: {
    name: string
    location: string
    id: number
  }
}

const ProductsPage = () => {
  const { data } = useSession()
  const user = data?.user as IUserSession

  const [products, setProducts] = useState<IProductWithSeller[]>([])

  const query = qs.stringify({
    fields: ["name", "location", "user"],
    populate: {
      products: {
        fields: ["name", "description", "price", "images"],
        populate: {
          brandId: {
            fields: ["name", "brandlogo"],
          },
          categories: {
            fields: ["name"],
          },
        },
      },
    },
  })

  const { data: products, isLoading } = useQuery(
    ["all-products"],
    () => SellerService.fetchProducts<ISellerWithProducts>(query),
    {
      refetchOnWindowFocus: false,
      select: ({ data }) => {
        let temp: any[] = []

        data.map((seller) => {
          temp = [
            ...temp,
            ...seller.attributes.products.data.map((product) => {
              return {
                product,
                seller: {
                  id: seller.id,
                  name: seller.attributes.name,
                  location: seller.attributes.location,
                },
              }
            }),
          ]
        })

        return temp
      },
    }
  )

  if (isLoading)
    return (
      <div className="flex items-center justify-center mt-16">
        <div className="w-[75px] h-[75px] rounded-full border-2 border-transparent border-r-primary border-b-primary border-l-primary animate-spin"></div>
      </div>
    )

  return (
    <section>
      <h1 className={`text-3xl mt-32`}>Explore all products</h1>

      <>
        <>
          <div className="m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products?.map((product: any, index: any) => {
              return (
                <div className="hover:shadow-lg rounded-md p-4" key={index}>
                  <Link
                    href={`/products/${product.product.id}?sellerId=${product.seller.id}&productId=${product.product.id}`}
                  >
                    <div className="flex justify-center items-center">
                      {product.product.attributes.images && (
                        <div className="relative w-full h-[300px] rounded-md overflow-hidden">
                          <Image
                            src={product.product.attributes.images[0]}
                            fill
                            alt=""
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="mt-4 text-gray-700 text-xl font-bold text-ellipsis line-clamp-2">
                        {product.product.attributes.name}
                      </h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        ₹{product.product.attributes.price}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between font-light text-sm">
                      <p>{product.seller.name}</p>
                      <p>{product.seller.location}</p>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </>
      </>
    </section>
  )
}

export default ProductsPage
