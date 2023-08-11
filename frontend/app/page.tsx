import Navbar from './components/Navbar';
import Carasoul from './components/Carasoul';
import BrandCard from './components/BrandCard';
import CategoryCard from './components/CategoryCard';
import Image from "next/image"
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
