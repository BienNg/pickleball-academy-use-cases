import { notFound } from "next/navigation";
import Link from "next/link";
import { getFlowBySlug, getAllFlowSlugs } from "@/lib/flows";
import { FlowLayout } from "@/components/flow/FlowLayout";

export interface FlowPageProps {
  params: Promise<{ slug: string }>;
}

export default async function FlowPage({ params }: FlowPageProps) {
  const { slug } = await params;
  const flow = getFlowBySlug(slug);
  if (!flow) notFound();
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[#E5E7EB] px-6 py-4 md:px-10">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex h-8 items-center rounded-md px-3 text-sm font-medium text-[#1E1E1E] hover:bg-black/5"
          >
            ← Back
          </Link>
          <h1 className="text-lg font-semibold text-[#1E1E1E]">PB Academy</h1>
        </div>
      </header>
      <main className="px-6 py-8 md:px-10 md:py-10">
        <FlowLayout flow={flow} />
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return getAllFlowSlugs().map((slug) => ({ slug }));
}
