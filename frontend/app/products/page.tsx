"use client"
import React, { useState } from "react"
import Image from "next/image"
import Navbar from "../components/Navbar"
import { useSession } from "next-auth/react"
import { IUserSession } from "../interfaces/IUser"
import qs from "qs"
import { useQuery } from "react-query"
import Link from "next/link"
import SellerService from "../services/sellers.service"
import { ISellerWithProducts } from "../interfaces/ISellerWithProducts"

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

  useQuery(
    ["products-sellers"],
    () => SellerService.getSellers<ISellerWithProducts>(user.token, query),
    {
      onSuccess: ({ data }) => {
        data.map((seller) => {
          setProducts((prev) => [
            ...prev,
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
          ])
        })
      },
      enabled: user ? true : false,
      // staleTime: Infinity,
    }
  )

  return (
    <section>
      <Navbar />
      <div className="p-28">
        <h1 className={`text-4xl`}>Show all products</h1>

        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-4xl">Products</h2>

            <div className="m-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
              {products?.map((product, index) => {
                return (
                  <div className="m-4" key={index}>
                    <Link
                      href={`/products/[id]?sellerId=${product.seller.id}&productId=${product.product.id}`}
                    >
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <div className="flex justify-center items-center h-48">
                          {product.product.attributes.images && (
                            <Image
                              src={product.product.attributes.images[0]}
                              height={200}
                              width={200}
                              alt=""
                            />
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="mt-4 text-sm text-gray-700">
                          {product.product.attributes.name}
                        </h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">
                          ₹{product.product.attributes.price}
                        </p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <p>{product.seller.name}</p>
                        <p>{product.seller.location}</p>
                      </div>
                      <div>
                        {
                          product.product.attributes.brandId.data.attributes
                            .name
                        }
                        {product.product.attributes.categories.data.map(
                          (category, id) => {
                            return (
                              <div key={id}>{category.attributes.name}</div>
                            )
                          }
                        )}
                      </div>
                      {product.product.id} -- {product.seller.id}
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductsPage
