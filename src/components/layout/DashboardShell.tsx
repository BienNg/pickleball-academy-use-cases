"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Search,
  ChevronDown,
  ChevronRight,
  Users,
} from "lucide-react";
import { flows, getAllFlowSlugs, ALL_ROLES, getFlowSlugsByRole } from "@/lib/flows";

function AllFlowsDropdown({ pathname, isHome }: { pathname: string; isHome: boolean }) {
  const [open, setOpen] = useState(isHome || pathname.startsWith("/flows/"));
  const slugs = getAllFlowSlugs();

  return (
    <div className="flex flex-col gap-0.5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
          isHome ? "bg-primary/10 text-primary font-semibold" : "text-slate-600 hover:bg-slate-50"
        }`}
      >
        <LayoutDashboard className="size-5 flex-shrink-0" />
        <span className="text-sm flex-1">All Flows</span>
        {open ? (
          <ChevronDown className="size-4 flex-shrink-0 text-slate-400" />
        ) : (
          <ChevronRight className="size-4 flex-shrink-0 text-slate-400" />
        )}
      </button>
      {open && (
        <div className="flex flex-col gap-0.5 pl-6 mt-0.5 border-l border-slate-200 ml-3">
          {slugs.map((slug) => {
            const flow = flows[slug];
            const href = `/flows/${slug}`;
            const active = pathname === href;
            return (
              <Link
                key={slug}
                href={href}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {flow?.title ?? slug}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function RolesDropdown({ pathname }: { pathname: string }) {
  const [openRole, setOpenRole] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-0.5">
      {ALL_ROLES.map((role) => {
        const flowSlugs = getFlowSlugsByRole(role);
        const isOpen = openRole === role;

        return (
          <div key={role} className="flex flex-col gap-0.5">
            <button
              type="button"
              onClick={() => setOpenRole(isOpen ? null : role)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left text-slate-600 hover:bg-slate-50"
            >
              <Users className="size-5 flex-shrink-0 text-slate-400" />
              <span className="text-sm flex-1">{role}</span>
              <span className="text-xs text-slate-400 tabular-nums">
                {flowSlugs.length} flow{flowSlugs.length !== 1 ? "s" : ""}
              </span>
              {isOpen ? (
                <ChevronDown className="size-4 flex-shrink-0 text-slate-400" />
              ) : (
                <ChevronRight className="size-4 flex-shrink-0 text-slate-400" />
              )}
            </button>
            {isOpen && flowSlugs.length > 0 && (
              <div className="flex flex-col gap-0.5 pl-6 mt-0.5 border-l border-slate-200 ml-3">
                {flowSlugs.map((slug) => {
                  const flow = flows[slug];
                  const href = `/flows/${slug}`;
                  const active = pathname === href;
                  return (
                    <Link
                      key={slug}
                      href={href}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        active
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {flow?.title ?? slug}
                    </Link>
                  );
                })}
              </div>
            )}
            {isOpen && flowSlugs.length === 0 && (
              <div className="pl-6 mt-0.5 ml-3 border-l border-slate-200 py-2 px-3">
                <p className="text-xs text-slate-400">No flows for this role yet</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

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
            <AllFlowsDropdown pathname={pathname} isHome={isHome} />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 mb-2 px-3">
              Roles
            </p>
            <RolesDropdown pathname={pathname} />
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
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">{children}</div>
      </main>
    </div>
  );
}
