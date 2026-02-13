"use client";

import Link from "next/link";
import { useState } from "react";
import { getAllFlowSlugs, getFlowBySlug } from "@/lib/flows";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Filter, ArrowDownNarrowWide, Bookmark, ArrowRight } from "lucide-react";

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

const ITEMS_PER_PAGE = 12;

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const slugs = getAllFlowSlugs();
  const allFlows = slugs
    .map((slug) => {
      const flow = getFlowBySlug(slug);
      return flow ? { slug, ...flow } : null;
    })
    .filter(Boolean) as { slug: string; title: string; subtitle: string }[];

  // Calculate pagination
  const totalPages = Math.ceil(allFlows.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const flows = allFlows.slice(startIndex, endIndex);

  // Calculate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Show up to 5 page numbers
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage <= 3) {
        // Near the beginning
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of content
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
                Found {allFlows.length} result{allFlows.length !== 1 ? "s" : ""} across
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
              className="flow-card group bg-white rounded-xl border border-slate-100 card-shadow transition-all cursor-pointer block p-5 text-left hover:border-primary/20"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  Web
                </span>
                <div className="size-6 bg-slate-50 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Bookmark className="size-4 text-slate-400" />
                </div>
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors text-base mb-2">
                {flow.title}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                {flow.subtitle}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-0.5 bg-primary/5 text-primary text-[10px] font-bold rounded uppercase">
                  Onboarding
                </span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase">
                  Academy
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-400 group-hover:text-primary transition-colors flex items-center gap-1">
                View flow
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === 1
                  ? "text-slate-400 cursor-not-allowed"
                  : "text-slate-600 hover:border-primary/50"
              }`}
            >
              <span>←</span>
              <span>Previous</span>
            </button>
            <div className="flex gap-1">
              {pageNumbers.map((page, index) => {
                if (page === "...") {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="size-9 flex items-center justify-center text-slate-400"
                    >
                      ...
                    </span>
                  );
                }
                const pageNum = page as number;
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`size-9 rounded-lg text-sm font-bold transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-primary/50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === totalPages
                  ? "text-slate-400 cursor-not-allowed"
                  : "text-slate-600 hover:border-primary/50"
              }`}
            >
              <span>Next</span>
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
