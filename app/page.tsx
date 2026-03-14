import Hero from "@/components/Hero";
import RoleScroll from "@/components/RoleScroll";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-white text-gray-900 font-sans">
      <Hero />
      <RoleScroll />
      <Contact />
    </main>
  );
}

