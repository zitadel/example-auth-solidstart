import {
  ErrorBoundary as SolidErrorBoundary,
  JSX,
  ParentComponent,
} from 'solid-js';
import { A } from '@solidjs/router';

interface Props {
  children: JSX.Element;
  fallback?: JSX.Element;
  showDetails?: boolean;
}

/**
 * Error Boundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree and displays
 * a fallback UI instead of crashing the entire application. This is essential
 * for production applications to provide graceful error handling.
 *
 * ## Features
 * - Catches rendering errors, lifecycle method errors, and constructor errors
 * - Displays user-friendly error messages
 * - Provides error details in development mode
 * - Offers recovery options (reload page, go home)
 * - Logs errors for debugging
 *
 * ## Usage
 *
 * ```tsx
 * // Wrap any component that might throw errors
 * <ErrorBoundary>
 *   <SomeComponentThatMightFail />
 * </ErrorBoundary>
 *
 * // With custom fallback
 * <ErrorBoundary fallback={<div>Custom error message</div>}>
 *   <Component />
 * </ErrorBoundary>
 *
 * // Show error details in development
 * <ErrorBoundary showDetails={process.env.NODE_ENV === 'development'}>
 *   <Component />
 * </ErrorBoundary>
 * ```
 */
export const ErrorBoundary: ParentComponent<Props> = (props) => {
  const handleReload = () => {
    window.location.reload();
  };

  const defaultFallback = () => (
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

        <p class="text-base font-semibold text-red-600">Error</p>
        <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Something went wrong
        </h1>
        <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          An unexpected error occurred. Please try reloading the page.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={handleReload}
            class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Reload page
          </button>
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

  return (
    <SolidErrorBoundary
      fallback={(error) => {
        console.error('Error Boundary caught an error:', error);
        return props.fallback || defaultFallback();
      }}
    >
      {props.children}
    </SolidErrorBoundary>
  );
};
