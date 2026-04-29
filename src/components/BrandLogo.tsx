import Image from 'next/image';
import Link from 'next/link';

type BrandLogoProps = {
  compact?: boolean;
};

export default function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/lonestar-mark.svg"
        alt="LoneStarAppeals.AI logo"
        width={compact ? 44 : 54}
        height={compact ? 44 : 54}
        priority
      />
      <span className="flex flex-col">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
          Texas Property Tax
        </span>
        <span className="font-serif text-[1.9rem] leading-none text-[var(--foreground)]">
          LoneStarAppeals.AI
        </span>
      </span>
    </Link>
  );
}
