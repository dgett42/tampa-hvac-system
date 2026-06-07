import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          ServiceWingman
        </Link>

        <nav className="flex max-w-full gap-4 overflow-x-auto whitespace-nowrap text-sm font-medium text-slate-300 md:gap-6">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>

          <Link href="/features" className="transition hover:text-white">
            Features
          </Link>

          <Link
            href="/legaldocs/privacy-policy"
            className="transition hover:text-white"
          >
            Privacy
          </Link>

          <Link
            href="/legaldocs/terms-and-conditions"
            className="transition hover:text-white"
          >
            Terms
          </Link>

          <Link href="/admin" className="transition hover:text-white">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}