'use client';

import Link from 'next/link';
import { useState } from 'react';

type Rule = {
  id: string;
  county: string;
  state: string;
  title: string;
  summary: string;
  filingDeadline: string | null;
  evidenceRequirements: string | null;
  sourceUrl: string | null;
};

type Comparable = {
  id: string;
  address: string;
  county: string;
  state: string;
  propertyType: string;
  squareFootage: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  yearBuilt: number | null;
  salePrice: number | null;
  assessedValue: number | null;
  sourceUrl: string | null;
  sourceNotes: string | null;
};

export default function ContextLibraryClient({
  initialRules,
  initialComparables,
}: {
  initialRules: Rule[];
  initialComparables: Comparable[];
}) {
  const [rules, setRules] = useState(initialRules);
  const [comparables, setComparables] = useState(initialComparables);
  const [ruleError, setRuleError] = useState('');
  const [compError, setCompError] = useState('');
  const [ruleLoading, setRuleLoading] = useState(false);
  const [compLoading, setCompLoading] = useState(false);
  const [ruleForm, setRuleForm] = useState({
    county: '',
    state: 'TX',
    title: '',
    summary: '',
    filingDeadline: '',
    evidenceRequirements: '',
    sourceUrl: '',
  });
  const [compForm, setCompForm] = useState({
    address: '',
    county: '',
    state: 'TX',
    propertyType: '',
    squareFootage: '',
    bedrooms: '',
    bathrooms: '',
    yearBuilt: '',
    salePrice: '',
    assessedValue: '',
    sourceUrl: '',
    sourceNotes: '',
  });

  const onRuleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRuleForm({ ...ruleForm, [e.target.name]: e.target.value });
  };

  const onCompChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCompForm({ ...compForm, [e.target.name]: e.target.value });
  };

  const saveRule = async (e: React.FormEvent) => {
    e.preventDefault();
    setRuleError('');
    setRuleLoading(true);

    try {
      const response = await fetch('/api/context/rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ruleForm),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Unable to save rule.');
      }

      setRules([payload, ...rules]);
      setRuleForm({
        county: '',
        state: 'TX',
        title: '',
        summary: '',
        filingDeadline: '',
        evidenceRequirements: '',
        sourceUrl: '',
      });
    } catch (error) {
      setRuleError(error instanceof Error ? error.message : 'Unable to save rule.');
    } finally {
      setRuleLoading(false);
    }
  };

  const saveComparable = async (e: React.FormEvent) => {
    e.preventDefault();
    setCompError('');
    setCompLoading(true);

    try {
      const response = await fetch('/api/context/comparables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(compForm),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Unable to save comparable property.');
      }

      setComparables([payload, ...comparables]);
      setCompForm({
        address: '',
        county: '',
        state: 'TX',
        propertyType: '',
        squareFootage: '',
        bedrooms: '',
        bathrooms: '',
        yearBuilt: '',
        salePrice: '',
        assessedValue: '',
        sourceUrl: '',
        sourceNotes: '',
      });
    } catch (error) {
      setCompError(
        error instanceof Error ? error.message : 'Unable to save comparable property.'
      );
    } finally {
      setCompLoading(false);
    }
  };

  return (
    <div className="marketing-page">
      <section className="section-shell py-12 md:py-16">
        <Link href="/dashboard" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]">
          Back to Dashboard
        </Link>

        <div className="mt-8 max-w-3xl">
          <span className="eyebrow">Context library</span>
          <h1 className="mt-6 text-5xl text-[var(--foreground)] md:text-6xl">Store the evidence your next appeal will need.</h1>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
            Save jurisdiction rules and comparable properties once so every future report starts with stronger local context.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="glass-panel rounded-[2rem] p-8">
            <h2 className="text-4xl text-[var(--foreground)]">Add Jurisdiction Rule</h2>
            <form onSubmit={saveRule} className="mt-8 space-y-5">
              <input name="county" value={ruleForm.county} onChange={onRuleChange} placeholder="County" className="field" required />
              <input name="state" value={ruleForm.state} onChange={onRuleChange} placeholder="State" className="field" required />
              <input name="title" value={ruleForm.title} onChange={onRuleChange} placeholder="Rule title" className="field" required />
              <textarea name="summary" value={ruleForm.summary} onChange={onRuleChange} placeholder="What does the county or state require?" rows={4} className="field" required />
              <input name="filingDeadline" value={ruleForm.filingDeadline} onChange={onRuleChange} placeholder="Filing deadline" className="field" />
              <textarea name="evidenceRequirements" value={ruleForm.evidenceRequirements} onChange={onRuleChange} placeholder="Evidence requirements" rows={3} className="field" />
              <input name="sourceUrl" value={ruleForm.sourceUrl} onChange={onRuleChange} placeholder="Source URL" className="field" />
              {ruleError ? <p className="text-sm text-red-700">{ruleError}</p> : null}
              <button type="submit" disabled={ruleLoading} className="button-primary disabled:opacity-60">
                {ruleLoading ? 'Saving...' : 'Save Rule'}
              </button>
            </form>
          </div>

          <div className="glass-panel rounded-[2rem] p-8">
            <h2 className="text-4xl text-[var(--foreground)]">Add Comparable Property</h2>
            <form onSubmit={saveComparable} className="mt-8 grid gap-5 md:grid-cols-2">
              <input name="address" value={compForm.address} onChange={onCompChange} placeholder="Address" className="field md:col-span-2" required />
              <input name="county" value={compForm.county} onChange={onCompChange} placeholder="County" className="field" required />
              <input name="state" value={compForm.state} onChange={onCompChange} placeholder="State" className="field" required />
              <input name="propertyType" value={compForm.propertyType} onChange={onCompChange} placeholder="Property type" className="field" required />
              <input name="squareFootage" value={compForm.squareFootage} onChange={onCompChange} placeholder="Square footage" className="field" />
              <input name="bedrooms" value={compForm.bedrooms} onChange={onCompChange} placeholder="Bedrooms" className="field" />
              <input name="bathrooms" value={compForm.bathrooms} onChange={onCompChange} placeholder="Bathrooms" className="field" />
              <input name="yearBuilt" value={compForm.yearBuilt} onChange={onCompChange} placeholder="Year built" className="field" />
              <input name="salePrice" value={compForm.salePrice} onChange={onCompChange} placeholder="Sale price" className="field" />
              <input name="assessedValue" value={compForm.assessedValue} onChange={onCompChange} placeholder="Assessed value" className="field" />
              <input name="sourceUrl" value={compForm.sourceUrl} onChange={onCompChange} placeholder="Source URL" className="field md:col-span-2" />
              <textarea name="sourceNotes" value={compForm.sourceNotes} onChange={onCompChange} placeholder="Notes about this comp" rows={3} className="field md:col-span-2" />
              {compError ? <p className="text-sm text-red-700 md:col-span-2">{compError}</p> : null}
              <button type="submit" disabled={compLoading} className="button-primary md:col-span-2 disabled:opacity-60">
                {compLoading ? 'Saving...' : 'Save Comparable'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="glass-panel rounded-[2rem] p-8">
            <h2 className="text-4xl text-[var(--foreground)]">Recent Rules</h2>
            <div className="mt-8 space-y-4">
              {rules.map((rule) => (
                <article key={rule.id} className="soft-card rounded-[1.5rem] p-5">
                  <h3 className="text-2xl text-[var(--foreground)]">{rule.title}</h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.14em] text-[var(--muted)]">
                    {rule.county} County, {rule.state}
                  </p>
                  <p className="mt-4 whitespace-pre-wrap text-[var(--muted)]">{rule.summary}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-8">
            <h2 className="text-4xl text-[var(--foreground)]">Recent Comparables</h2>
            <div className="mt-8 space-y-4">
              {comparables.map((comp) => (
                <article key={comp.id} className="soft-card rounded-[1.5rem] p-5">
                  <h3 className="text-2xl text-[var(--foreground)]">{comp.address}</h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.14em] text-[var(--muted)]">
                    {comp.county} County, {comp.state} • {comp.propertyType}
                  </p>
                  <p className="mt-4 text-[var(--muted)]">
                    {[
                      comp.squareFootage ? `${comp.squareFootage} sqft` : '',
                      comp.bedrooms !== null ? `${comp.bedrooms} bd` : '',
                      comp.bathrooms !== null ? `${comp.bathrooms} ba` : '',
                      comp.salePrice ? `$${comp.salePrice.toLocaleString()}` : '',
                    ]
                      .filter(Boolean)
                      .join(' • ')}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
