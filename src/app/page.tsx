"use client";

import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";
import { getAllFlowSlugs, getFlowBySlug, ALL_ROLES, getFlowSlugsByRole, categoryLabels, FlowConfig } from "@/lib/flows";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Bookmark, ArrowRight } from "lucide-react";
import { VisualContent } from "@/components/flow/VisualPanel";

const ITEMS_PER_PAGE = 12;
const DASHBOARD_STATE_KEY = "dashboard-state";

// Helper function to get thumbnail visual for a flow
function getFlowThumbnailVisual(flow: FlowConfig, flowSlug: string) {
  // Map of flow slugs to specific step indices (0-indexed) for thumbnails
  const thumbnailStepMap: Record<string, number> = {
    "head-coach-creates-video-course": 6, // Step 7 (index 6): "Uploads Course to App"
    "session-editing-and-upload": 4, // Step 5 (index 4): "Cuts Idle Time & Stitches Clips"
    "first-contact-academy": 1, // Step 2 (index 1): "Consults"
    "head-coach-creates-coaching-program": 5, // Step 6 (index 5): "Compiles Master Coaching Document"
    "creating-session-success-clips": 1, // Step 2 (index 1): "Selects Before & After Clip"
    "student-requests-training-session-scenario-2": 4, // Step 5 (index 4): "Receives Escalation Notification"
    "student-requests-training-session-scenario-3": 2, // Step 3 (index 2): "Checks Court Availability & Calls Coach"
  };

  // Check if this flow has a specific thumbnail step defined
  const thumbnailStepIndex = thumbnailStepMap[flowSlug];
  if (thumbnailStepIndex !== undefined && flow.steps && flow.steps[thumbnailStepIndex]?.visual) {
    return flow.steps[thumbnailStepIndex].visual;
  }

  // Fallback: Use the first step's visual, or find a step with a visual
  if (flow.steps && flow.steps.length > 0) {
    // Try to find a step with a visual (prefer non-app-screen visuals for better thumbnails)
    const stepWithVisual = flow.steps.find(step => step.visual);
    if (stepWithVisual?.visual) {
      return stepWithVisual.visual;
    }
  }
  return null;
}

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // Restore dashboard state from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(DASHBOARD_STATE_KEY);
      if (stored) {
        const { role, page } = JSON.parse(stored) as { role: string | null; page: number };
        if (role === null || (ALL_ROLES as readonly string[]).includes(role)) {
          setSelectedRole(role);
        }
        if (typeof page === "number" && page >= 1) {
          setCurrentPage(page);
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Persist dashboard state to sessionStorage when it changes (skip initial mount to avoid overwriting before restore)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    try {
      sessionStorage.setItem(
        DASHBOARD_STATE_KEY,
        JSON.stringify({ role: selectedRole, page: currentPage })
      );
    } catch {
      // Ignore quota errors
    }
  }, [selectedRole, currentPage]);
  
  // Get all flows, filtered by selected role
  const filteredFlows = useMemo(() => {
    const slugs = selectedRole 
      ? getFlowSlugsByRole(selectedRole)
      : getAllFlowSlugs();
    
    return slugs
      .map((slug) => {
        const flow = getFlowBySlug(slug);
        return flow ? { slug, ...flow } : null;
      })
      .filter(Boolean) as { slug: string; title: string; subtitle: string; roles?: string[] }[];
  }, [selectedRole]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredFlows.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  // Clamp page when it exceeds totalPages (e.g. after role filter change or restore)
  useEffect(() => {
    if (totalPages >= 1 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const flows = filteredFlows.slice(startIndex, endIndex);

  // Reset to page 1 when role changes
  const handleRoleChange = (role: string | null) => {
    setSelectedRole(role);
    setCurrentPage(1);
  };

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
                Found {filteredFlows.length} result{filteredFlows.length !== 1 ? "s" : ""} across
                mobile and web platforms.
              </p>
            </div>
          </div>
          {/* Role filter chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            <button
              key="all"
              type="button"
              onClick={() => handleRoleChange(null)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                selectedRole === null
                  ? "bg-primary text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-primary/50"
              }`}
            >
              All Roles
              <span className="tabular-nums opacity-80">{getAllFlowSlugs().length}</span>
            </button>
            {ALL_ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleChange(role)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  selectedRole === role
                    ? "bg-primary text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-primary/50"
                }`}
              >
                {role}
                <span className="tabular-nums opacity-80">{getFlowSlugsByRole(role).length}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {flows.map((flow) => {
            const flowConfig = getFlowBySlug(flow.slug);
            const thumbnailVisual = flowConfig ? getFlowThumbnailVisual(flowConfig, flow.slug) : null;
            
            return (
              <Link
                key={flow.slug}
                href={`/flows/${flow.slug}`}
                className="flow-card group bg-white rounded-xl border border-slate-100 card-shadow transition-all cursor-pointer block overflow-hidden hover:border-primary/20"
              >
                {/* Thumbnail section */}
                {thumbnailVisual && (
                  <div className="w-full h-40 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center overflow-hidden relative p-4">
                    <div className="w-full h-full flex items-center justify-center scale-75 group-hover:scale-80 transition-transform duration-200">
                      <VisualContent visual={thumbnailVisual} />
                    </div>
                  </div>
                )}
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        Web
                      </span>
                      {flowConfig?.involvesApp && (
                        <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-0.5">
                          📱 App
                        </span>
                      )}
                    </div>
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
                    {flow.roles && flow.roles.length > 0 ? (
                      flow.roles.map((role) => {
                        const displayName = categoryLabels[role as keyof typeof categoryLabels] || role;
                        return (
                          <span
                            key={role}
                            className="px-2 py-0.5 bg-primary/5 text-primary text-[10px] font-bold rounded uppercase"
                          >
                            {displayName}
                          </span>
                        );
                      })
                    ) : (
                      // Fallback: extract unique roles from steps if roles property doesn't exist
                      (() => {
                        const flowConfigForRoles = getFlowBySlug(flow.slug);
                        if (flowConfigForRoles) {
                          const uniqueRoles = Array.from(
                            new Set(flowConfigForRoles.steps.map((step) => step.role))
                          );
                          return uniqueRoles.map((role) => (
                            <span
                              key={role}
                              className="px-2 py-0.5 bg-primary/5 text-primary text-[10px] font-bold rounded uppercase"
                            >
                              {role}
                            </span>
                          ));
                        }
                        return null;
                      })()
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-primary transition-colors flex items-center gap-1">
                    View flow
                    <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
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
