'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProperty() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [contextLoading, setContextLoading] = useState(false);
  const [autoRules, setAutoRules] = useState('');
  const [autoComparables, setAutoComparables] = useState('');
  const [formData, setFormData] = useState({
    ownerName: '',
    taxYear: new Date().getFullYear().toString(),
    address: '',
    county: '',
    state: '',
    propertyType: '',
    squareFootage: '',
    lotSize: '',
    yearBuilt: '',
    bedrooms: '',
    bathrooms: '',
    upgrades: '',
    currentValue: '',
    notes: '',
    comparableProperties: '',
    jurisdictionNotes: '',
  });

  useEffect(() => {
    const county = formData.county.trim();
    const state = formData.state.trim();

    if (!county || !state) {
      setAutoRules('');
      setAutoComparables('');
      return;
    }

    let ignore = false;

    const loadContext = async () => {
      setContextLoading(true);

      try {
        const params = new URLSearchParams({
          county,
          state,
          propertyType: formData.propertyType,
        });
        const response = await fetch(`/api/context?${params.toString()}`);
        const payload = await response.json();

        if (!ignore) {
          setAutoRules(payload.jurisdictionNotes || '');
          setAutoComparables(payload.comparableNotes || '');
        }
      } catch {
        if (!ignore) {
          setAutoRules('');
          setAutoComparables('');
        }
      } finally {
        if (!ignore) {
          setContextLoading(false);
        }
      }
    };

    void loadContext();

    return () => {
      ignore = true;
    };
  }, [formData.county, formData.state, formData.propertyType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Unable to generate the appeal report.');
      }

      router.push(`/report/${payload.reportId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to generate the appeal report.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="marketing-page">
      <section className="section-shell py-12 md:py-16">
        <Link href="/dashboard" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]">
          Back to Dashboard
        </Link>

        <div className="mt-8 max-w-3xl">
          <span className="eyebrow">New appeal</span>
          <h1 className="mt-6 text-5xl text-[var(--foreground)] md:text-6xl">Prepare a new property appeal packet.</h1>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
            Enter the core property facts first. Saved county rules and comparable properties will load automatically when the county, state, and property type match your context library.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          <div className="glass-panel rounded-[2rem] p-8">
            <h2 className="text-4xl text-[var(--foreground)]">Property profile</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="ownerName" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Owner Name</label>
                <input type="text" id="ownerName" name="ownerName" value={formData.ownerName} onChange={handleChange} className="field" required />
              </div>
              <div>
                <label htmlFor="taxYear" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Tax Year</label>
                <input type="text" id="taxYear" name="taxYear" value={formData.taxYear} onChange={handleChange} className="field" required />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Property Address</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="field" required />
              </div>
              <div>
                <label htmlFor="county" className="mb-2 block text-sm font-medium text-[var(--foreground)]">County</label>
                <input type="text" id="county" name="county" value={formData.county} onChange={handleChange} className="field" required />
              </div>
              <div>
                <label htmlFor="state" className="mb-2 block text-sm font-medium text-[var(--foreground)]">State</label>
                <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="field" required />
              </div>
              <div>
                <label htmlFor="propertyType" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Property Type</label>
                <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleChange} className="field" required>
                  <option value="">Select type</option>
                  <option value="single-family">Single Family Home</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="multi-family">Multi-Family</option>
                </select>
              </div>
              <div>
                <label htmlFor="currentValue" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Current Assessed Value</label>
                <input type="number" id="currentValue" name="currentValue" value={formData.currentValue} onChange={handleChange} className="field" />
              </div>
              <div>
                <label htmlFor="squareFootage" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Square Footage</label>
                <input type="number" id="squareFootage" name="squareFootage" value={formData.squareFootage} onChange={handleChange} className="field" />
              </div>
              <div>
                <label htmlFor="lotSize" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Lot Size (acres)</label>
                <input type="number" step="0.01" id="lotSize" name="lotSize" value={formData.lotSize} onChange={handleChange} className="field" />
              </div>
              <div>
                <label htmlFor="yearBuilt" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Year Built</label>
                <input type="number" id="yearBuilt" name="yearBuilt" value={formData.yearBuilt} onChange={handleChange} className="field" />
              </div>
              <div>
                <label htmlFor="bedrooms" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Bedrooms</label>
                <input type="number" id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="field" />
              </div>
              <div>
                <label htmlFor="bathrooms" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Bathrooms</label>
                <input type="number" step="0.5" id="bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="field" />
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="glass-panel rounded-[2rem] p-8">
              <h2 className="text-4xl text-[var(--foreground)]">Owner notes</h2>
              <div className="mt-8 space-y-5">
                <div>
                  <label htmlFor="upgrades" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Recent Upgrades or Improvements</label>
                  <textarea id="upgrades" name="upgrades" value={formData.upgrades} onChange={handleChange} rows={4} className="field" placeholder="Describe renovations, additions, deferred maintenance, or updates." />
                </div>
                <div>
                  <label htmlFor="notes" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Additional Notes</label>
                  <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={5} className="field" placeholder="Add anything that should influence value or letter tone." />
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-[2rem] p-8">
              <h2 className="text-4xl text-[var(--foreground)]">Auto-loaded context</h2>
              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                {contextLoading
                  ? 'Loading your saved county rules and comparable properties...'
                  : 'When matching context exists in your library, it appears here automatically.'}
              </p>
              <div className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">Comparable Properties</label>
                  <textarea value={autoComparables} readOnly rows={6} className="field bg-[rgba(245,239,229,0.7)] text-[var(--muted)]" placeholder="Saved comparable properties will appear here." />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">County or State Rules</label>
                  <textarea value={autoRules} readOnly rows={6} className="field bg-[rgba(245,239,229,0.7)] text-[var(--muted)]" placeholder="Saved appeal rules will appear here." />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-8">
            <h2 className="text-4xl text-[var(--foreground)]">Manual supporting context</h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div>
                <label htmlFor="comparableProperties" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Additional Comparable Properties</label>
                <textarea id="comparableProperties" name="comparableProperties" value={formData.comparableProperties} onChange={handleChange} rows={8} className="field" placeholder="Paste nearby sales or assessed properties you want the AI to compare against." />
              </div>
              <div>
                <label htmlFor="jurisdictionNotes" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Additional County or State Appeal Rules</label>
                <textarea id="jurisdictionNotes" name="jurisdictionNotes" value={formData.jurisdictionNotes} onChange={handleChange} rows={8} className="field" placeholder="Paste deadlines, filing instructions, exemptions, or procedural notes." />
              </div>
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="flex flex-col gap-4 sm:flex-row">
            <button type="submit" disabled={isSubmitting} className="button-primary disabled:opacity-60">
              {isSubmitting ? 'Generating Report...' : 'Generate Appeal Report'}
            </button>
            <Link href="/dashboard/context-library" className="button-secondary">
              Update Context Library
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
