import Link from 'next/link';

const plans = [
  {
    name: 'Single Appeal',
    price: '$49',
    description: 'For one property owner who wants one polished appeal packet.',
    features: ['AI market analysis', 'Professional protest letter', 'PDF export', '30-day support'],
    cta: 'Choose Single Appeal',
    featured: false,
  },
  {
    name: 'Multi-Property',
    price: '$99',
    description: 'For owners or investors managing a small portfolio across the year.',
    features: ['Up to 3 properties', 'Context library support', 'Priority assistance', 'Saved evidence workflow'],
    cta: 'Choose Multi-Property',
    featured: true,
  },
  {
    name: 'Portfolio',
    price: '$199',
    description: 'For property managers who need repeatable reporting across many parcels.',
    features: ['Unlimited properties', 'Bulk-ready workflow', 'API-oriented roadmap', 'Dedicated onboarding'],
    cta: 'Talk to Sales',
    featured: false,
  },
];

export default function Pricing() {
  return (
    <div className="marketing-page">
      <section className="section-shell py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Pricing</span>
          <h1 className="mt-6 text-6xl leading-[0.95] text-[var(--foreground)] md:text-7xl">
            Straightforward plans for serious appeal prep.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            Pick the plan that matches how many properties you need to evaluate. Every tier is focused on generating a cleaner, more credible protest package.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-[2rem] p-8 ${
                plan.featured
                  ? 'border border-[var(--line-strong)] bg-[var(--foreground)] text-[#f8f4ed] shadow-[0_30px_70px_rgba(44,31,16,0.18)]'
                  : 'soft-card'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className={`text-4xl ${plan.featured ? 'text-[#f8f4ed]' : 'text-[var(--foreground)]'}`}>
                  {plan.name}
                </h2>
                {plan.featured ? (
                  <span className="rounded-full bg-[#f8f4ed] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]">
                    Most Popular
                  </span>
                ) : null}
              </div>
              <p className={`mt-4 text-lg ${plan.featured ? 'text-[#d6cab8]' : 'text-[var(--muted)]'}`}>
                {plan.description}
              </p>
              <p className={`mt-8 text-6xl font-semibold ${plan.featured ? 'text-[#f8f4ed]' : 'text-[var(--foreground)]'}`}>
                {plan.price}
              </p>
              <ul className={`mt-8 space-y-3 ${plan.featured ? 'text-[#efe5d7]' : 'text-[var(--foreground)]'}`}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link
                  href="/register"
                  className={plan.featured ? 'button-secondary border-[#8e7960] bg-[#f8f4ed] text-[var(--foreground)]' : 'button-primary'}
                >
                  {plan.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 glass-panel rounded-[2rem] p-8 text-center md:p-10">
          <h2 className="text-4xl text-[var(--foreground)]">A note on value</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            LoneStarAppeals.AI does not promise a reduction. It helps owners prepare a stronger, better-organized appeal with more consistent presentation.
          </p>
        </div>
      </section>
    </div>
  );
}
