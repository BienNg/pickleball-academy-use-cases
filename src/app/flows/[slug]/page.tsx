import { notFound } from "next/navigation";
import Link from "next/link";
import { getFlowBySlug, getAllFlowSlugs } from "@/lib/flows";
import { FlowLayout } from "@/components/flow/FlowLayout";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ChevronLeft } from "lucide-react";

export interface FlowPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function FlowPage({ params, searchParams }: FlowPageProps) {
  const { slug } = await params;
  const resolved = await searchParams;
  const stepParam = resolved?.step;
  const initialStepIndex =
    typeof stepParam === "string"
      ? Math.max(0, Math.min(parseInt(stepParam, 10) - 1, 999))
      : undefined;

  const flow = getFlowBySlug(slug);
  if (!flow) notFound();
  const clampedStep =
    initialStepIndex != null && !isNaN(initialStepIndex)
      ? Math.min(initialStepIndex, flow.steps.length - 1)
      : undefined;

  return (
    <DashboardShell>
      <div className="p-8">
        <FlowLayout
          flow={flow}
          flowSlug={slug}
          initialStepIndex={clampedStep}
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

export async function generateStaticParams() {
  return getAllFlowSlugs().map((slug) => ({ slug }));
}
