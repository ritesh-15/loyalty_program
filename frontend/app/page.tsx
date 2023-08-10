import Image from 'next/image'
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen text-center p-24">
        <h1 className="text-4xl m-4">Welcome to MetaMarket!</h1>
        <h3 className="text-2xl">A web3 solution for ecommerce</h3>
      </div>
    </div>
  );
}
