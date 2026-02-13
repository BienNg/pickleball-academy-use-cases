"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  Users,
} from "lucide-react";
import { flows, getAllFlowSlugs, ALL_ROLES, getFlowSlugsByRole } from "@/lib/flows";
import { cn } from "@/lib/utils";

function AllFlowsDropdown({ pathname, isHome }: { pathname: string; isHome: boolean }) {
  const [open, setOpen] = useState(isHome || pathname.startsWith("/flows/"));
  const slugs = getAllFlowSlugs();

  return (
    <div className="flex flex-col gap-0.5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors w-full text-left text-slate-600 hover:bg-slate-50"
      >
        <LayoutDashboard className="size-4 flex-shrink-0" />
        <span className="text-xs flex-1">All Flows</span>
        {open ? (
          <ChevronDown className="size-3 flex-shrink-0 text-slate-400" />
        ) : (
          <ChevronRight className="size-3 flex-shrink-0 text-slate-400" />
        )}
      </button>
      {open && (
        <div className="flex flex-col gap-0 pl-1 mt-0.5 border-l border-slate-200 ml-3">
          {slugs.map((slug) => {
            const flow = flows[slug];
            const href = `/flows/${slug}`;
            const isActive = pathname === href;
            return (
              <Link
                key={slug}
                href={href}
                className={cn(
                  "block px-3 py-1 rounded-lg text-xs transition-colors",
                  isActive
                    ? "bg-slate-100 text-slate-900 font-medium"
                    : "text-slate-600 hover:bg-slate-50"
                )}
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
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors w-full text-left text-slate-600 hover:bg-slate-50"
            >
              <Users className="size-4 flex-shrink-0 text-slate-400" />
              <span className="text-xs flex-1">{role}</span>
              <span className="text-[10px] text-slate-400 tabular-nums">
                {flowSlugs.length} flow{flowSlugs.length !== 1 ? "s" : ""}
              </span>
              {isOpen ? (
                <ChevronDown className="size-3 flex-shrink-0 text-slate-400" />
              ) : (
                <ChevronRight className="size-3 flex-shrink-0 text-slate-400" />
              )}
            </button>
            {isOpen && flowSlugs.length > 0 && (
              <div className="flex flex-col gap-0 pl-1 mt-0.5 border-l border-slate-200 ml-3">
                {flowSlugs.map((slug) => {
                  const flow = flows[slug];
                  const href = `/flows/${slug}`;
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={slug}
                      href={href}
                      className={cn(
                        "block px-3 py-1 rounded-lg text-xs transition-colors",
                        isActive
                          ? "bg-slate-100 text-slate-900 font-medium"
                          : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {flow?.title ?? slug}
                    </Link>
                  );
                })}
              </div>
            )}
            {isOpen && flowSlugs.length === 0 && (
              <div className="pl-1 mt-0.5 ml-3 border-l border-slate-200 py-1 px-3">
                <p className="text-[10px] text-slate-400">No flows for this role yet</p>
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
      <aside className="w-64 flex-shrink-0 border-r border-primary/10 bg-white flex flex-col justify-between px-2 py-6">
        <div className="flex flex-col gap-4">
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
          <nav className="flex flex-col gap-0.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 px-3">
              Main Library
            </p>
            <AllFlowsDropdown pathname={pathname} isHome={isHome} />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4 mb-1 px-3">
              Roles
            </p>
            <RolesDropdown pathname={pathname} />
          </nav>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">{children}</div>
      </main>
    </div>
  );
}
