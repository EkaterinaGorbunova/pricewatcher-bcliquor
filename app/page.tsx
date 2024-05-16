import HeroCarousel from "@/components/HeroCarousel"
import Searchbar from "@/components/Searchbar"
import Image from "next/image"
import { getAllProducts } from "@/lib/actions"
import ProductCard from "@/components/ProductCard"

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Home = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center"> 
            <p className="small-text">
              Unlock Savings Now:
              <Image 
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
                style={{ width: "16px", height: "auto" }}
              />
            </p>

            <h2 className="head-text">
              Unleash the Power of
              <span className="text-primary"> PriceWatch</span>
            </h2>

            <div className="paragraph-text pt-4">
              <p className="pb-4">
                Shop smarter at <span className="font-semibold">BCLiquor Store</span>: Track Prices, Compare and Save
              </p>
              <h3 className="pb-1">How to Get Started:</h3>
              <ul className="space-y-1 list-inside pb-4">
                <li className="flex items-start">
                  <Image 
                    src="/assets/icons/check.svg"
                    alt="check-mark"
                    width={16}
                    height={16}
                    className="me-2 mt-2"
                    style={{ width: "16px", height: "16px" }}
                  />
                  Enter product link from BCLiquor Store that you want to track
                </li>
                <li className="flex items-start">
                  <Image 
                    src="/assets/icons/check.svg"
                    alt="check-mark"
                    width={16}
                    height={16}
                    className="me-2 mt-2"
                    style={{ width: "16px", height: "16px" }}
                  />
                  Receive email notifications when your favorite drinks are on sale
                </li>
              </ul>
              <p>
                With PriceWatch, you'll never miss a deal again!
              </p>
            </div>

            <Searchbar />
          </div>

          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home