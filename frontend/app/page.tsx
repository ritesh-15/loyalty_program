import React, { Suspense } from "react";
const Navbar = React.lazy(() => import("@/app/components/Navbar"));
const Carasoul = React.lazy(() => import("@/app/components/Carasoul"));
const BrandCard = React.lazy(() => import("@/app/components/BrandCard"));
const CategoryCard = React.lazy(() => import("@/app/components/CategoryCard"));
const ProductList = React.lazy(() => import("@/app/components/ProductList"));

export default function Home() {
  return (
    <Suspense>
      <div>
        {/* Page 1 */}
        <Navbar />
        <Carasoul />
        <BrandCard />
        {/* Page 2 */}
        <CategoryCard />
        <ProductList />
      </div>
    </Suspense>
  );
}
