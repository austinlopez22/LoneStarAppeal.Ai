import Link from 'next/link';

const steps = [
  {
    number: '01',
    title: 'Collect the property facts',
    body: 'Enter the address, assessed value, property characteristics, condition notes, and anything else that materially affects value.',
    points: [
      'Address, county, and state',
      'Square footage, lot size, beds, baths',
      'Current assessed value and owner notes',
    ],
  },
  {
    number: '02',
    title: 'Layer in local context',
    body: 'Use the context library to store appeal rules and comparable properties so each new report starts with stronger regional support.',
    points: [
      'County filing expectations',
      'Evidence requirements',
      'Relevant neighborhood comparables',
    ],
  },
  {
    number: '03',
    title: 'Generate a polished protest packet',
    body: 'The platform turns your facts into a measured market analysis and a professional appeal letter that can be reviewed, edited, and downloaded as a PDF.',
    points: [
      'AI valuation summary',
      'Professional appeal draft',
      'Downloadable PDF output',
    ],
  },
];

export default function HowItWorks() {
  return (
    <div className="marketing-page">
      <section className="section-shell py-16 md:py-24">
        <div className="max-w-3xl">
          <span className="eyebrow">Process</span>
          <h1 className="mt-6 text-6xl leading-[0.95] text-[var(--foreground)] md:text-7xl">
            A calmer, cleaner way to prepare a property tax appeal.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            The workflow is designed to feel more like a professional case-prep system than a generic AI form.
            Each step adds structure, context, and polish before you submit anything.
          </p>
        </div>

        <div className="mt-14 grid gap-6">
          {steps.map((step) => (
            <article key={step.number} className="glass-panel grid gap-6 rounded-[2rem] p-8 md:grid-cols-[140px_1fr] md:p-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  Step {step.number}
                </p>
              </div>
              <div>
                <h2 className="text-4xl text-[var(--foreground)]">{step.title}</h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">{step.body}</p>
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {step.points.map((point) => (
                    <div key={point} className="soft-card rounded-[1.25rem] p-4 text-sm leading-6 text-[var(--foreground)]">
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-[2rem] border border-[var(--line)] bg-[rgba(255,251,245,0.84)] p-8 md:p-10">
          <h2 className="text-4xl text-[var(--foreground)]">Ready to see it in action?</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Create your account, save your county context, and generate the first report with a more professional presentation from the start.
          </p>
          <div className="mt-8">
            <Link href="/register" className="button-primary">
              Start Your First Appeal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
