"use client";
import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import { IUserSession } from "../interfaces/IUser";
import qs from "qs";
import { useQuery } from "react-query";
import ProductService from "../services/product.service";
import { IProducts } from "../interfaces/IProducts";
import ImageSlideshow from "../components/ImageSlideshow";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const ProductsPage = () => {
  const { data } = useSession();
  const user = data?.user as IUserSession;

  const query = qs.stringify(
    {
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
    { encodeValuesOnly: true }
  );

  const { data: products } = useQuery(
    ["products"],
    () => ProductService.getProducts<IProducts>(user.token, query),
    {
      enabled: user ? true : false,
    }
  );

  console.log(products?.data);
  //   console.log(products)

  return (
    <section>
      <Navbar />
      <div className="p-28">
        <h1 className={`${poppins.className} text-4xl`}>Show all products</h1>

        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-4xl">Products</h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
              {products?.data.map((product, index) => {
                return (
                  <div key={index} className="m-4">
                    <a key={product.id} href={"/"} className="group">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        {product.attributes.images && <ImageSlideshow images={product.attributes.images}/>}
                        {/* {product.attributes.images && product.attributes.images.map((image,index)=>{
                              return (
                                <div
                                  key={index}
                                  className="flex justify-center items-center h-48"
                                >
                                  <Image src={image} height={100} width={100} alt="" />
                                </div>
                              );
                            })} */}
                      </div>
                      <h3 className="mt-4 text-sm text-gray-700">
                        {product.attributes.name}
                      </h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        {product.attributes.description}
                      </p>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        {product.attributes.price}
                      </p>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
