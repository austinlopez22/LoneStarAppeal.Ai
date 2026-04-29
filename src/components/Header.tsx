'use client';

import BrandLogo from '@/components/BrandLogo';
import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const navLinks = (
    <>
      <Link href="/" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]">
        Home
      </Link>
      <Link href="/how-it-works" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]">
        How It Works
      </Link>
      <Link href="/pricing" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]">
        Pricing
      </Link>
      <Link href="/contact" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]">
        Contact
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(250,247,240,0.82)] backdrop-blur-xl">
      <div className="section-shell">
        <div className="flex items-center justify-between py-4">
          <BrandLogo />

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[rgba(255,251,245,0.7)] md:hidden"
              aria-label="Toggle navigation"
              onClick={() => setShowMobileNav((value) => !value)}
            >
              <span className="space-y-1">
                <span className="block h-0.5 w-5 bg-[var(--foreground)]" />
                <span className="block h-0.5 w-5 bg-[var(--foreground)]" />
                <span className="block h-0.5 w-5 bg-[var(--foreground)]" />
              </span>
            </button>
            {session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="button-secondary px-5 py-2 text-sm"
                >
                  {session.user.name || session.user.email}
                </button>
                {showMenu && (
                  <div className="soft-card absolute right-0 mt-3 w-52 rounded-2xl p-2">
                    <Link
                      href="/dashboard"
                      className="block rounded-xl px-4 py-3 text-sm text-[var(--foreground)] hover:bg-[var(--accent-soft)]"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: '/' });
                        setShowMenu(false);
                      }}
                      className="block w-full rounded-xl px-4 py-3 text-left text-sm text-[var(--foreground)] hover:bg-[var(--accent-soft)]"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="hidden text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] sm:inline-flex">
                  Login
                </Link>
                <Link href="/register" className="hidden px-5 py-2 text-sm sm:inline-flex button-primary">
                  Start Appeal
                </Link>
              </>
            )}
          </div>
        </div>

        {showMobileNav ? (
          <div className="mb-4 rounded-[1.5rem] border border-[var(--line)] bg-[rgba(255,251,245,0.95)] p-4 shadow-[0_18px_40px_rgba(65,50,34,0.08)] md:hidden">
            <nav className="flex flex-col gap-4">
              {navLinks}
              {!session?.user ? (
                <>
                  <Link href="/login" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]">
                    Login
                  </Link>
                  <Link href="/register" className="button-primary w-full">
                    Start Appeal
                  </Link>
                </>
              ) : (
                <Link href="/dashboard" className="button-secondary w-full">
                  Dashboard
                </Link>
              )}
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
