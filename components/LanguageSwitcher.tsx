'use client';

import { routing, Link, usePathname } from '@/i18n/routing';


export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();


  return (
    <div className="language-switcher">
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          className={`language-option ${currentLocale === loc ? 'active' : ''}`}
        >
          {loc.toUpperCase()} {/* Render language codes as uppercase */}
        </Link>
      ))}
    </div>
  );
}
