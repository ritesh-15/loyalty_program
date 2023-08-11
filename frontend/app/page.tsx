import Image from "next/image"
import Navbar from "./components/Navbar"
import CategoryCard from "./components/CategoryCard"
import BrandCard from "./components/BrandCard"
import Carasoul from "./components/Carasoul"
import { useSession } from "next-auth/react"

export default function Home() {
  return (
    <div>
      {/* Page 1 */}
      <Navbar/> 
      <Carasoul/>
      <BrandCard/>
      {/* Page 2 */}
      <CategoryCard/>
    </div>
  )
}
