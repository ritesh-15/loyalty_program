import { getDiscountedPricePercentage } from "../utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const ProductCard = () => {
    const original_price = 3000
    const price = 1000
    return (
        <div
            className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer max-w-xl "
        >
            <div className="flex flex-col">

                <Image
                    width={200}
                    height={200}
                    src={`/img1.png`}
                    alt={``}
                />
                <div className="p-4 text-black/[0.9]">
                    <h2 className="text-md font-medium">Name</h2>
                    <h3 className="text-sm font-medium">Brand</h3>
                    <div className="flex items-center text-black/[0.5]">
                        <p className="mr-2 text-lg font-semibold">
                            &#8377;{price}
                        </p>

                        (
                        <>
                            <p className="text-base  font-medium line-through">
                                &#8377;{`${original_price}`}
                            </p>
                            <p className="ml-auto text-base font-medium text-green-500">
                                {getDiscountedPricePercentage(
                                    original_price,
                                    price
                                )}
                                % off
                            </p>
                        </>
                        )
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;