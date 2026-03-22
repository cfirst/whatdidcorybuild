"use client";

import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex justify-between items-center px-8 md:px-20 py-6 border-b border-[#3e3b33]">
      <span className="text-[11px] tracking-[0.14em] uppercase text-[#c4b89a]">
        Cory Firstenberg
      </span>
      <div className="flex gap-7">
        <Link href="#work" className="text-[11px] tracking-[0.1em] uppercase text-[#6b6455] hover:text-[#c4b89a] transition-colors">Work</Link>
        <Link href="/case-study" className="text-[11px] tracking-[0.1em] uppercase text-[#6b6455] hover:text-[#c4b89a] transition-colors">Case Studies</Link>
        <Link href="/chat" className="text-[11px] tracking-[0.1em] uppercase text-[#6b6455] hover:text-[#c4b89a] transition-colors">Chat</Link>
        <Link href="#contact" className="text-[11px] tracking-[0.1em] uppercase text-[#6b6455] hover:text-[#c4b89a] transition-colors">Contact</Link>
      </div>
    </nav>
  );
}
