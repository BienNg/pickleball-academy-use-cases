import Link from "next/link";
import { getAllFlowSlugs, getFlowBySlug } from "@/lib/flows";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const slugs = getAllFlowSlugs();
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[#E5E7EB] px-6 py-6 md:px-10">
        <h1 className="text-xl font-semibold tracking-tight text-[#1E1E1E]">
          PB Academy
        </h1>
        <p className="mt-1 text-sm text-[#6B7280]">User flows & use cases</p>
      </header>
      <main className="px-6 py-10 md:px-10">
        <h2 className="mb-6 text-lg font-semibold text-[#1E1E1E]">Flows</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {slugs.map((slug) => {
            const flow = getFlowBySlug(slug);
            if (!flow) return null;
            return (
              <li key={slug}>
                <Link href={`/flows/${slug}`}>
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base">{flow.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-[#6B7280] line-clamp-2">
                        {flow.subtitle}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
