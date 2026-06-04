import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          ServiceWingman
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>

          <Link href="/features" className="transition hover:text-white">
            Features
          </Link>

          <Link href="/legaldocs/privacy-policy" className="transition hover:text-white">
            Privacy
          </Link>

          <Link href="/legaldocs/terms-and-conditions" className="transition hover:text-white">
            Terms
          </Link>
        </nav>
      </div>
    </header>
  );
}