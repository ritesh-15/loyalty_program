import Navbar from './components/Navbar';
import Carasoul from './components/Carasoul';
import BrandCard from './components/BrandCard';
import CategoryCard from './components/CategoryCard';

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
  );
}
