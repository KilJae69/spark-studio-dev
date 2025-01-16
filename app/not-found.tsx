
import NotFoundPage from '@/components/NotFoundPage';


// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
    <NotFoundPage />
  </div>
  );
}
