import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import WhyChooseUs from '@/components/WhyChooseUs';
import FeaturedProducts from '@/components/FeaturedProducts';
import Testimonials from '@/components/Testimonials';
import WhoWeServe from '@/components/WhoWeServe';
import QuoteBanner from '@/components/QuoteBanner';
import { getProducts } from '@/lib/shopify';

export const revalidate = 3600;

export default async function HomePage() {
  let featuredProducts: any[] = [];
  try {
    const { products } = await getProducts({ first: 8 });
    featuredProducts = products;
  } catch {
    // Shopify not configured yet — FeaturedProducts uses mock data
  }

  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedProducts products={featuredProducts} />
      <WhyChooseUs />
      <WhoWeServe />
      <Testimonials />
      <QuoteBanner />
    </>
  );
}
