import Hero from "@/components/home/Hero";
import Categories from "@/components/home/categories";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import BestSellers from "@/components/home/BestSellers";
import Publishers from "@/components/home/Publishers";
import AIBanner from "@/components/home/AIBanner";
import Newsletter from "@/components/home/NewsLetter";

export default function HomePage() {
  return (
    <main className="bg-slate-50">
      <Hero />

      <Categories />

      <FeaturedBooks />

      <BestSellers />

      <Publishers />

      <AIBanner />

      <Newsletter />
    </main>
  );
}