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
import Link from "next/link";
import SellerService from "../services/sellers.service";
import { ISellers } from "../interfaces/ISellers";
import { ISellerWithProducts } from "../interfaces/ISellerWithProducts";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const ProductsPage = () => {
  const { data } = useSession();
  const user = data?.user as IUserSession;

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
  });

  const { data: sellers } = useQuery(
    ["sellers"],
    () => SellerService.getSellers<ISellerWithProducts>(user.token, query),
    {
      enabled: user ? true : false,
    }
  );

  console.log(sellers);

  return (
    <section>
      <Navbar />
      <div className="p-28">
        <h1 className={`${poppins.className} text-4xl`}>Show all products</h1>

        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-4xl">Products</h2>

              <div className="flex flex-col justify-between place-content-between">
                {sellers?.data.map((seller, index) => {
                  return (
                    <div key={index} className="m-4">
                      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                      {seller.attributes.products.data.map((product, key) => {
                        return <div key={key}>{product.attributes.name}</div>;
                      })}
                    </div>
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
