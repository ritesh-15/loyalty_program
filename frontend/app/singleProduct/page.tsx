import Wrapper from "../components/Wrapper";
import ProductDetailCrousel from "../components/ProductDetailCrousel"
export default function SingleProduct() {
    return (
        <div className="w-fullmd:py-20">

            <Wrapper className="primary">
                <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px] ">

                    {/* left column start */}
                    <div className="w-full  md:w-auto flex-[1.5] max-w-[500px] lg-max-w-full mx-auto lg:mx-0">
                        <ProductDetailCrousel/>
                    </div>
                    {/* left column end */}
                    {/* right column start */}
                    <div className="flex-[1] py-3">
                        {/* PRODUCT TITLE */}
                        <div className="text-[34px] font-semibold mb-2 leading-tight">
                            Jorden retro 5g
                        </div>

                        {/* PRODUCT SUBTITLE */}
                        <div className="text-lg font-semibold mb-5">
                            Men&apos;s golf shoes
                        </div>
                        {/* PRODUCT PRIZE */}
                        <div className="text-lg font-semibold">
                            MRP: $2000
                        </div>
                        <div className="text-md font-medium text-black/[0.5]">
                           inc. of all taxes
                        </div>
                        <div className="text-md font-medium text-black/[0.5] mb-20">
                            {`(Also include all aplicable duties)`}
                        </div>

                        {/* PRODUCT SIZE RANGE */}
                        <div className="mb-10">
                            <div className="flex justify-between mb-2">
                                <div className="text-md font-semibold">
                                    Choose size
                                </div>
                                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                                    Select Guide
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                                    UK 6
                                </div>
                                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                                    UK 7
                                </div>
                                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                                    UK 8
                                </div>
                                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                                    UK 9
                                </div>
                                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                                    UK 10
                                </div>
                                <div className="border rounded-md text-center py-3 font-medium bg-black/[0.1] opacity-[50] cursor-not-allowed">
                                    UK 11
                                </div>
                                <div className="border rounded-md text-center py-3 font-medium bg-black/[0.1] opacity-[50] cursor-not-allowed">
                                    UK 12
                                </div>
                                <div className="border rounded-md text-center py-3 font-medium bg-black/[0.1] opacity-[50] cursor-not-allowed">
                                    UK 13
                                </div>
                            </div>

                            <div className="text-red-600 mt-1">
                                Size selection is required
                            </div>

                        </div>

                        <button className="py-4 w-full rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75">
                            Add to cart
                        </button>
                        <button className="py-4 w-full rounded-full border border-black text-lg font-medium transition-transform flex items-center justify-center gap-2 active:scale-95 mb-10 hover:opacity-75">
                            Wishlist
                        </button>

                        <div>
                            <div className="text-lg font-bold md-5">
                                Product Details
                            </div>
                            <div className="text-md mb-5">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem similique consectetur, blanditiis eaque nisi aut ducimus voluptates. Distinctio ex, quaerat aliquam, quisquam nihil doloribus illum ducimus molestiae perferendis quas voluptate maiores amet veritatis a consequatur voluptatem voluptas. 
                                Doloribus neque quos ad a, veniam modi laboriosam doloremque similique in placeat dolorem sunt praesentium odio numquam aspernatur quisquam eveniet fugiat natus saepe nihil voluptatum quam illo?
                            </div>
                            <div className="text-md mb-5">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem similique consectetur, blanditiis eaque nisi aut ducimus voluptates. Distinctio ex, quaerat aliquam, quisquam nihil doloribus illum ducimus molestiae perferendis quas voluptate maiores amet veritatis a consequatur voluptatem voluptas. 
                                Doloribus neque quos ad a, veniam modi laboriosam doloremque similique in placeat dolorem sunt praesentium odio numquam aspernatur quisquam eveniet fugiat natus saepe nihil voluptatum quam illo?
                            </div>
                        </div>

                    </div>
                    {/* right column end */}
                </div>

            </Wrapper>

        </div>
    )
}