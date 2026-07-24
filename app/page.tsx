import Hero from "@/components/home/Hero";
import Courses from "@/components/home/courses";
import Catalogue from "@/components/home/catalogue";
import BestSellers from "@/components/home/BestSellers";
import Publishers from "@/components/home/Publishers";
import AIBanner from "@/components/home/AIBanner";
import Newsletter from "@/components/home/author";

export default function HomePage() {
  return (
    <main className="bg-slate-50">
      <Hero />

      <Courses />

      <Catalogue />

      <BestSellers />

      <a/>

      <AIBanner />

      <Newsletter />
    </main>
  );
}