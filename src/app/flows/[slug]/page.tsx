import { notFound } from "next/navigation";
import Link from "next/link";
import { getFlowBySlug, getAllFlowSlugs } from "@/lib/flows";
import { FlowLayout } from "@/components/flow/FlowLayout";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ChevronLeft } from "lucide-react";

export interface FlowPageProps {
  params: Promise<{ slug: string }>;
}

export default async function FlowPage({ params }: FlowPageProps) {
  const { slug } = await params;
  const flow = getFlowBySlug(slug);
  if (!flow) notFound();
  return (
    <DashboardShell>
      <div className="p-8">
        <FlowLayout 
          flow={flow} 
          flowSlug={slug}
          backLink={
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="size-4" />
              Back
            </Link>
          }
        />
      </div>
    </DashboardShell>
  );
}

export function generateStaticParams() {
  return getAllFlowSlugs().map((slug) => ({ slug }));
}
