import Link from 'next/link';
import { notFound } from 'next/navigation';

import { prisma } from '@/lib/prisma';

export default async function Report({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const report = await prisma.report.findUnique({
    where: { id },
    include: {
      property: true,
    },
  });

  if (!report) {
    notFound();
  }

  return (
    <div className="marketing-page">
      <section className="section-shell py-12 md:py-16">
        <Link href="/dashboard" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]">
          Back to Dashboard
        </Link>

        <div className="mt-8 max-w-3xl">
          <span className="eyebrow">Saved report</span>
          <h1 className="mt-6 text-5xl text-[var(--foreground)] md:text-6xl">Appeal packet for {report.property.address}</h1>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
            Review the AI market analysis, refine the tone if needed, and download the generated report as a PDF for submission.
          </p>
        </div>

        <div className="mt-10 space-y-8">
          <div className="grid gap-8 xl:grid-cols-[0.78fr_1.22fr]">
            <div className="glass-panel rounded-[2rem] p-8">
              <h2 className="text-4xl text-[var(--foreground)]">AI Market Analysis</h2>
              <pre className="mt-6 whitespace-pre-wrap text-base leading-8 text-[var(--muted)]">
                {report.aiAnalysis}
              </pre>
            </div>

            <div className="report-paper rounded-[2rem] p-8 md:p-12">
              <div className="border-b border-[var(--line)] pb-6">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Formal letter preview</p>
                <h2 className="mt-3 text-4xl text-[var(--foreground)]">Property Tax Appeal Letter</h2>
              </div>
              <pre className="mt-8 whitespace-pre-wrap text-[15px] leading-8 text-[#44382a]">
                {report.appealLetter}
              </pre>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-8">
            <h2 className="text-4xl text-[var(--foreground)]">Download Report</h2>
            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center">
              <a href={`/api/reports/${report.id}/pdf`} className="button-primary">
                Download PDF
              </a>
              <p className="text-[var(--muted)]">
                The PDF is generated from the saved analysis and appeal letter.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
