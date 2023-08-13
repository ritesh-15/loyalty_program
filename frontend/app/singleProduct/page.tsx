'use client'
import Wrapper from "../components/Wrapper";
import ProductDetailCrousel from "../components/ProductDetailCrousel"
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DescriptionsItem from "antd/es/descriptions/Item";
import SellerDetails from "../admin/sellers/[id]/page";
import { FiLogOut } from "react-icons/fi";


// images
// name 
// Description
// prize
// SellerDetails - name location 
// brand -  name logo
// catetgory



export default function SingleProduct() {
    // const router = useRouter();
    const notify = () => {
        toast.success('Item added to cart', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    const addToCart = async () => {
        try {
            // router.push('cart');
            notify();
        } catch {

        }
    }

    return (
        <div className="w-fullmd:py-20">
            {/* <Navbar/> */}
            <ToastContainer/>
            <Wrapper className="pt-20 ">
                <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px] ">

                    {/* left column start */}
                    <div className="w-full  md:w-auto flex-[1.5] max-w-[500px] lg-max-w-full mx-auto lg:mx-0">
                        <ProductDetailCrousel />
                    </div>
                    {/* left column end */}
                    {/* right column start */}
                    <div className="flex-[1] py-3">
                        <div className="text-md font-semibold mb-1 text-black/[0.6]">
                            Brand logo - <span>brand name</span>
                        </div>


                        {/* PRODUCT TITLE */}
                        <div className="text-[34px] font-semibold mb-2 leading-tight">
                            Jorden retro 5g
                        </div>

                        {/* PRODUCT SELLER */}
                        <div className="text-sm font-semibold mb-5 text-black/[0.6]">
                            Seller Name - <span>location</span>
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

                        

                        <button className="py-4 w-full rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75" onClick={addToCart}>
                            Add to cart
                        </button>
                        {/* <button className="py-4 w-full rounded-full border border-black text-lg font-medium transition-transform flex items-center justify-center gap-2 active:scale-95 mb-10 hover:opacity-75">
                            Wishlist
                        </button> */}

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