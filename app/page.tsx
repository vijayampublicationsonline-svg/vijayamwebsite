import Hero from "@/components/home/Hero";
import Courses from "@/components/home/courses";
import Catalogue from "@/components/home/catalogue";
import Promocopy from "@/components/home/promocopy";
import Aboutus from "@/components/home/aboutus";
import Newsletter from "@/components/home/author";
export default function HomePage() {
  return (
    <main className="bg-slate-50">
      <Hero />

      <Courses />

      <Catalogue />


      <Promocopy />

      <Aboutus />

      <a/>

   

      <Newsletter />
    </main>
  );
}