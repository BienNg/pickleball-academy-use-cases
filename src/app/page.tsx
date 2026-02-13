import Link from "next/link";
import { getAllFlowSlugs, getFlowBySlug } from "@/lib/flows";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Filter, ArrowDownNarrowWide, Bookmark, Image as ImageIcon } from "lucide-react";

const CATEGORIES = [
  "All Categories",
  "Mobile Apps",
  "Web Apps",
  "B2B SaaS",
  "Fintech",
  "iOS",
  "Android",
  "E-commerce",
];

export default function HomePage() {
  const slugs = getAllFlowSlugs();
  const flows = slugs
    .map((slug) => {
      const flow = getFlowBySlug(slug);
      return flow ? { slug, ...flow } : null;
    })
    .filter(Boolean) as { slug: string; title: string; subtitle: string }[];

  return (
    <DashboardShell>
      <div className="p-8">
        {/* Section title & toolbar */}
        <div className="mb-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Flows
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Found {flows.length} result{flows.length !== 1 ? "s" : ""} across
                mobile and web platforms.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:border-primary/30 transition-colors"
              >
                <Filter className="size-4" />
                <span>Filter</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:border-primary/30 transition-colors"
              >
                <ArrowDownNarrowWide className="size-4" />
                <span>Newest First</span>
              </button>
            </div>
          </div>
          {/* Filter chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                type="button"
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  i === 0
                    ? "bg-primary text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-primary/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {flows.map((flow) => (
            <Link
              key={flow.slug}
              href={`/flows/${flow.slug}`}
              className="flow-card group bg-white rounded-xl overflow-hidden border border-slate-100 card-shadow transition-all cursor-pointer block"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                  <ImageIcon className="size-12 text-slate-200" />
                </div>
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    Web
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-bold flex items-center gap-1">
                    View flow
                    <span className="inline-block size-3.5">→</span>
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {flow.title}
                  </h3>
                  <div className="size-6 bg-slate-50 rounded flex items-center justify-center">
                    <Bookmark className="size-4 text-slate-400" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                  {flow.subtitle}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 bg-primary/5 text-primary text-[10px] font-bold rounded uppercase">
                    Onboarding
                  </span>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase">
                    Academy
                  </span>
                </div>
              </div>
            </Link>
          ))}
          {/* Skeleton card placeholder */}
          {flows.length < 8 && (
            <div className="bg-white rounded-xl overflow-hidden border border-slate-100 card-shadow">
              <div className="aspect-[4/3] bg-slate-50 animate-pulse flex items-center justify-center">
                <ImageIcon className="size-12 text-slate-200" />
              </div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-100 rounded-full w-3/4 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-2 bg-slate-50 rounded-full animate-pulse" />
                  <div className="h-2 bg-slate-50 rounded-full w-5/6 animate-pulse" />
                </div>
                <div className="flex gap-2">
                  <div className="h-4 bg-slate-50 rounded-lg w-16 animate-pulse" />
                  <div className="h-4 bg-slate-50 rounded-lg w-12 animate-pulse" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-400 cursor-not-allowed"
            disabled
          >
            <span>←</span>
            <span>Previous</span>
          </button>
          <div className="flex gap-1">
            <button
              type="button"
              className="size-9 bg-primary text-white rounded-lg text-sm font-bold"
            >
              1
            </button>
            <button
              type="button"
              className="size-9 bg-white text-slate-600 border border-slate-200 rounded-lg text-sm font-bold hover:border-primary/50 transition-colors"
            >
              2
            </button>
            <button
              type="button"
              className="size-9 bg-white text-slate-600 border border-slate-200 rounded-lg text-sm font-bold hover:border-primary/50 transition-colors"
            >
              3
            </button>
            <span className="size-9 flex items-center justify-center text-slate-400">
              ...
            </span>
            <button
              type="button"
              className="size-9 bg-white text-slate-600 border border-slate-200 rounded-lg text-sm font-bold hover:border-primary/50 transition-colors"
            >
              12
            </button>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:border-primary/50 transition-colors"
          >
            <span>Next</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
