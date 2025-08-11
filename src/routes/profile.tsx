import { createAsync, redirect, query } from '@solidjs/router';
import { getSession } from '@auth/solid-start';
import { authOptions } from '~/lib/auth';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { Show } from 'solid-js';
import { getRequestEvent } from 'solid-js/web';

const getSessionData = query(async function () {
  'use server';
  const event = getRequestEvent();
  if (!event) throw redirect('/api/auth/signin');

  const session = await getSession(event.request, authOptions);
  if (!session) {
    throw redirect('/api/auth/signin');
  }

  return session;
}, 'session-data');

// noinspection JSUnusedGlobalSymbols
export default function ProfilePage() {
  const session = createAsync(() => getSessionData());

  return (
    <div class="flex min-h-screen flex-col bg-gray-50">
      <Header isAuthenticated={true} />
      <main class="flex-1 px-6 py-12">
        <div class="mx-auto max-w-5xl">
          <div class="mb-8 rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
            <div class="flex items-center">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                <svg
                  class="h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <h2 class="text-xl font-semibold text-green-900">
                  Authentication Successful!
                </h2>
                <p class="mt-1 text-green-700">
                  You have successfully logged into the application.
                </p>
              </div>
            </div>
          </div>
          <div class="rounded-lg border border-gray-200 bg-white p-8">
            <h2 class="mb-4 text-2xl font-semibold text-gray-900">
              Session Information
            </h2>
            <p class="mb-6 text-gray-600">
              Below is the authentication data stored in your session:
            </p>
            <div class="overflow-x-auto rounded-lg bg-gray-900 p-6">
              <Show when={session()}>
                <pre class="font-mono text-sm leading-relaxed text-green-400">
                  {JSON.stringify(session(), null, 2)}
                </pre>
              </Show>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
