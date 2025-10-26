"use client";
import Link from "next/link";

export default function TPOLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <img
        className="fixed h-screen w-screen opacity-50 z-0"
        src="/bg.png"
        alt="Background"
      />
      <section className="relative z-20 min-h-screen">
        <div className="h-10 w-full bg-gradient-to-br from-neutral-900 to-nmims"></div>
        <header className="bg-white p-5 flex flex-row justify-between items-center w-full shadow-sm">
          <img src="/nmims.png" className="max-h-14" alt="NMIMS Logo" />
          <div className="max-w-fit flex flex-row justify-around items-center gap-9 font-medium text-zinc-600">
            <Link href="/tpo" className="hover:underline hover:cursor-pointer hover:text-nmims transition">
              Dashboard
            </Link>
            <Link href="/tpo/companies" className="hover:underline hover:cursor-pointer hover:text-nmims transition">
              Companies
            </Link>
            <Link href="/tpo/drives" className="hover:underline hover:cursor-pointer hover:text-nmims transition">
              Drives
            </Link>
            <Link href="/tpo/students" className="hover:underline hover:cursor-pointer hover:text-nmims transition">
              Students
            </Link>
            <Link href="/tpo/reports" className="hover:underline hover:cursor-pointer hover:text-nmims transition">
              Reports
            </Link>
            <Link href="/tpo/opportunities" className="hover:underline hover:cursor-pointer hover:text-nmims transition">
              Opportunities
            </Link>
            <a className="flex flex-row justify-center items-center gap-2 hover:cursor-pointer">
              <img
                src="https://thispersondoesnotexist.com/"
                className="size-10 rounded-full"
                alt="Profile"
              />
              TPO Officer
            </a>
          </div>
        </header>
        {children}
      </section>
    </div>
  );
}