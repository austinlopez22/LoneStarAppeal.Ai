import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const reports = await prisma.report.findMany({
    where: {
      property: {
        userId: session.user.id,
      },
    },
    include: {
      property: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  return (
    <div className="marketing-page">
      <section className="section-shell py-12 md:py-16">
        <div className="mb-10">
          <span className="eyebrow">Workspace</span>
          <h1 className="mt-6 text-5xl text-[var(--foreground)] md:text-6xl">
            Welcome back, {session.user.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Manage your appeal pipeline, keep local county guidance organized, and review the reports you have already generated.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-panel rounded-[2rem] p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Start a new file</p>
            <h2 className="mt-4 text-4xl text-[var(--foreground)]">Create a new appeal packet</h2>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">
              Enter property details, load saved county rules and comparable properties, and generate a polished report in one flow.
            </p>
            <div className="mt-8">
              <Link href="/dashboard/new-property" className="button-primary">
                Start Appeal
              </Link>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Evidence library</p>
            <h2 className="mt-4 text-4xl text-[var(--foreground)]">Manage local context</h2>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">
              Save appeal rules, deadlines, and comparable properties once, then let every future report begin with stronger support.
            </p>
            <div className="mt-8">
              <Link href="/dashboard/context-library" className="button-secondary">
                Open Library
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 glass-panel rounded-[2rem] p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Recent work</p>
              <h2 className="mt-3 text-4xl text-[var(--foreground)]">Saved reports</h2>
            </div>
            <p className="text-sm text-[var(--muted)]">Newest reports appear first.</p>
          </div>

          {reports.length > 0 ? (
            <div className="mt-8 space-y-4">
              {reports.map((report) => (
                <article
                  key={report.id}
                  className="soft-card flex flex-col gap-4 rounded-[1.5rem] p-5 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <h3 className="text-2xl text-[var(--foreground)]">{report.property.address}</h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.14em] text-[var(--muted)]">
                      {report.property.county} County, {report.property.state} • {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link href={`/report/${report.id}`} className="button-secondary px-5 py-2 text-sm">
                      View Report
                    </Link>
                    <a href={`/api/reports/${report.id}/pdf`} className="text-sm font-semibold text-[var(--foreground)]">
                      Download PDF
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 soft-card rounded-[1.5rem] p-6">
              <p className="text-lg text-[var(--foreground)]">No reports yet.</p>
              <p className="mt-2 text-[var(--muted)]">Start your first appeal to generate a saved report and downloadable packet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
