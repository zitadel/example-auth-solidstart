import { A, useSearchParams } from '@solidjs/router';
import { Suspense } from 'solid-js';
import { getMessage } from '~/routes/auth/message';

function AuthErrorContent() {
  const [searchParams] = useSearchParams();
  const error = () => searchParams.error || 'default';

  const { heading, message } = getMessage(error(), 'auth-error');

  return (
    <main class="grid flex-1 place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg
            class="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h1 class="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          {heading}
        </h1>
        <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          {message}
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <A
            href="/api/auth/signin"
            class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Try signing in again
          </A>
          <A
            href="/"
            class="rounded-md bg-gray-100 px-3.5 py-2.5 text-sm font-semibold text-gray-700 shadow-xs hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
          >
            Go back home
          </A>
        </div>
      </div>
    </main>
  );
}

/**
 * Custom NextAuth error page that matches the application's design system.
 *
 * Displays user-friendly error messages for various authentication failures
 * including configuration errors, access denied, and verification failures.
 */
export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
}
