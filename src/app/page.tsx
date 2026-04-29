import BrandLogo from '@/components/BrandLogo';
import Image from 'next/image';
import Link from 'next/link';

const caseStudies = [
  {
    address: 'Westlake Hills Residence',
    county: 'Travis County',
    outcome: '$118,000 reduction target supported by comps',
  },
  {
    address: 'Plano Investment Home',
    county: 'Collin County',
    outcome: 'Appeal packet drafted with neighborhood evidence',
  },
  {
    address: 'Houston Homestead',
    county: 'Harris County',
    outcome: 'Owner-ready protest letter and valuation summary',
  },
];

export default function Home() {
  return (
    <div className="marketing-page">
      <section className="section-shell pt-16 pb-12 md:pt-24 md:pb-18">
        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl">
            <div className="mb-6">
              <BrandLogo compact />
            </div>
            <span className="eyebrow">AI-guided appeal preparation</span>
            <h1 className="mt-6 text-6xl leading-[0.92] text-[var(--foreground)] md:text-7xl">
              Professional property tax appeals without the law-firm overhead.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
              LoneStarAppeals.AI helps Texas property owners organize market evidence,
              compare nearby properties, and generate polished protest letters that feel
              credible, calm, and submission-ready.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/register" className="button-primary">
                Start Your Appeal
              </Link>
              <Link href="/how-it-works" className="button-secondary">
                See the Process
              </Link>
            </div>
            <div className="mt-10 grid gap-6 border-t border-[var(--line)] pt-8 sm:grid-cols-3">
              <div>
                <p className="text-3xl font-semibold text-[var(--foreground)]">3 steps</p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
                  Intake to letter
                </p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-[var(--foreground)]">254 counties</p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
                  Texas-ready workflow
                </p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-[var(--foreground)]">PDF output</p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
                  Ready to download
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-6 md:p-8">
            <div className="rounded-[1.5rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(244,237,225,0.9))] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    Appeal Summary
                  </p>
                  <h2 className="mt-2 text-3xl text-[var(--foreground)]">4816 Maple Creek Dr</h2>
                </div>
                <div className="rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--muted)]">
                  Harris County
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="soft-card rounded-2xl p-5">
                  <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">
                    Current assessment
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-[var(--foreground)]">$642,000</p>
                </div>
                <div className="soft-card rounded-2xl p-5">
                  <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">
                    Estimated support
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-[var(--foreground)]">$584,000</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-[var(--line)] bg-[#fffdf8] p-5">
                <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">
                  Included in the packet
                </p>
                <ul className="mt-4 space-y-3 text-[var(--foreground)]">
                  <li>Comparable sales aligned to property type and county</li>
                  <li>County-specific protest notes from your context library</li>
                  <li>Structured appeal letter in a professional tone</li>
                </ul>
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--line)]">
                <Image
                  src="/property-scene.svg"
                  alt="Illustrated luxury property background"
                  width={1600}
                  height={900}
                  className="h-40 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-8 md:py-12">
        <div className="glass-panel rounded-[2rem] p-8 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="eyebrow">Why it feels credible</span>
              <h2 className="mt-5 text-5xl leading-tight text-[var(--foreground)]">
                Built around the way serious tax advisors actually present a case.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'County-specific appeal notes can be stored and reused across future filings.',
                'Comparable property records are centralized so your analysis gets sharper over time.',
                'Generated letters stay measured and professional rather than sounding robotic.',
                'Everything ends in a downloadable report that owners can review before submission.',
              ].map((item) => (
                <div key={item} className="soft-card rounded-[1.5rem] p-5 text-[var(--muted)]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-14 md:py-18">
        <div>
          <span className="eyebrow">Case-study style output</span>
          <h2 className="mt-5 text-5xl text-[var(--foreground)]">
            Examples of the type of work product you can generate.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <article key={study.address} className="soft-card rounded-[1.8rem] p-7">
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">{study.county}</p>
              <h3 className="mt-4 text-3xl text-[var(--foreground)]">{study.address}</h3>
              <p className="mt-5 text-base leading-7 text-[var(--muted)]">{study.outcome}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--foreground)] px-8 py-12 text-[#f8f4ed] md:px-12 md:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#d7cab7]">Start with one property</p>
              <h2 className="mt-4 text-5xl leading-tight">
                Make the site feel as polished as the report it produces.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#d7cab7]">
                Create your account, add your property details, and generate a cleaner,
                better-framed appeal packet in minutes.
              </p>
            </div>
            <Link href="/register" className="button-secondary border-[#8e7960] bg-[#f8f4ed] text-[var(--foreground)]">
              Create an Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
