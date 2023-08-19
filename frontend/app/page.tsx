import CategoryCard from "./components/CategoryCard"
import BrandCard from "./components/BrandCard"
import Carasoul from "./components/Carasoul"
import ProductList from "./components/ProductList"

export default function Home() {
  return (
    <>
      <Carasoul />
      <BrandCard />
      <CategoryCard />
      <ProductList />
    </>
  )
}
