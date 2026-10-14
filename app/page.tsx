import Hero from "@/components/home/Hero";
import Courses from "@/components/home/courses";
import Gallery from "@/components/home/gallery";

export default function HomePage() {
  return (
    <main className="bg-slate-50">
      <Hero />
      <Courses />
      <Gallery />
    </main>
  );
}