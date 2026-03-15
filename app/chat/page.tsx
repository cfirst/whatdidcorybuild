import Link from "next/link";

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-[#2c2a24] flex flex-col items-center justify-center">
      <p className="text-[11px] tracking-[0.18em] uppercase text-[#8a7d60] mb-3">Coming soon</p>
      <h1 className="font-display text-[42px] font-bold text-[#e8dcc8] leading-none mb-4">Back shortly.</h1>
      <p className="text-[14px] text-[#6b6455] mb-8">This feature is being updated.</p>
      <Link href="/" className="text-[11px] tracking-[0.1em] uppercase text-[#6b6455] hover:text-[#c4b89a] transition-colors">
        Back to portfolio
      </Link>
    </main>
  );
}
