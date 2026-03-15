import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import RoleScroll from "@/components/RoleScroll";
import BuiltWithAI from "@/components/BuiltWithAI";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-[#2c2a24] text-[#e8dcc8] min-h-screen">
      <Nav />
      <Hero />
      <RoleScroll />
      <BuiltWithAI />
      <Contact />
    </main>
  );
}