import CategorySlider from "./_components/CategorySlider/CategorySlider";
import HomeSlider from "./_components/HomeSlider/HomeSlider";
import MainProducts from "./_components/MainProducts/MainProducts";

export default function Home() {

// server commp           server
// client commp           server               client

  return <>

    <div className="container py-8 space-y-12">

      <HomeSlider />

      <CategorySlider />

      <MainProducts />
    </div>
  </>
}
