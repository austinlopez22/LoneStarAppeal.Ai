'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed');
        return;
      }

      router.push('/login?registered=true');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="marketing-page">
      <section className="section-shell py-16 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="self-center">
            <span className="eyebrow">Get started</span>
            <h1 className="mt-6 text-6xl leading-[0.95] text-[var(--foreground)]">
              Create your account and start building appeals.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
              Save property details, reusable county notes, and comparable-property evidence in a workspace that feels more professional from the first interaction.
            </p>
          </div>

          <div className="glass-panel rounded-[2rem] p-8 md:p-10">
            <h2 className="text-4xl text-[var(--foreground)]">Open your workspace</h2>
            {error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Full Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="field" required disabled={loading} />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field" required disabled={loading} />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="field" required disabled={loading} minLength={6} />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Confirm Password</label>
                <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="field" required disabled={loading} minLength={6} />
              </div>
              <button type="submit" disabled={loading} className="button-primary w-full disabled:opacity-60">
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            <p className="mt-6 text-sm text-[var(--muted)]">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-[var(--foreground)]">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
