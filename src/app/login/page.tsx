'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      router.push('/dashboard');
    }
  }, [session, router]);

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setError('');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (!result?.ok) {
        setError(result?.error || 'Login failed');
        return;
      }

      router.push('/dashboard');
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
            <span className="eyebrow">Client access</span>
            <h1 className="mt-6 text-6xl leading-[0.95] text-[var(--foreground)]">
              Log in to manage your appeal work.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
              Review reports, add county context, save comparable properties, and generate polished protest letters from one place.
            </p>
          </div>

          <div className="glass-panel rounded-[2rem] p-8 md:p-10">
            <h2 className="text-4xl text-[var(--foreground)]">Welcome back</h2>
            {error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="field"
                  required
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="button-primary w-full disabled:opacity-60"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
            <div className="mt-6 flex flex-col gap-3 text-sm">
              <Link href="/forgot-password" className="text-[var(--muted)] hover:text-[var(--foreground)]">
                Forgot password?
              </Link>
              <p className="text-[var(--muted)]">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-semibold text-[var(--foreground)]">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div className="marketing-page" />}>
      <LoginForm />
    </Suspense>
  );
}
