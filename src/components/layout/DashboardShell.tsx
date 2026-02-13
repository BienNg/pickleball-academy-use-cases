"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserPlus,
  TrendingUp,
  CheckCircle,
  ShoppingCart,
  BarChart3,
  Bookmark,
  Search,
} from "lucide-react";

const navMain = [
  { href: "/", label: "All Flows", icon: LayoutDashboard },
  { href: "#onboarding", label: "Onboarding", icon: UserPlus },
  { href: "#growth", label: "Growth", icon: TrendingUp },
  { href: "#retention", label: "Retention", icon: CheckCircle },
  { href: "#checkout", label: "Checkout", icon: ShoppingCart },
];

const navResearch = [
  { href: "#competitive", label: "Competitive Bench", icon: BarChart3 },
  { href: "#favorites", label: "Favorites", icon: Bookmark },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-primary/10 bg-white flex flex-col justify-between p-6">
        <div className="flex flex-col gap-8">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="size-10 bg-primary flex items-center justify-center rounded-xl text-white">
              <LayoutDashboard className="size-5" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-[#0d0d1b] text-base font-bold leading-tight">
                PB Academy
              </h1>
              <p className="text-primary/60 text-xs font-medium uppercase tracking-wider">
                Internal v2.4
              </p>
            </div>
          </Link>
          {/* Nav */}
          <nav className="flex flex-col gap-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-3">
              Main Library
            </p>
            {navMain.map((item) => {
              const active = item.href === "/" ? isHome : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    active
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <item.icon className="size-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 mb-2 px-3">
              Research
            </p>
            {navResearch.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <item.icon className="size-5" />
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search user flows, companies, or patterns..."
                className="w-full bg-background-light border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto custom-scrollbar">{children}</div>
      </main>
    </div>
  );
}
