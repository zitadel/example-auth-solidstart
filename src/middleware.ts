// noinspection JSUnusedGlobalSymbols
import { createMiddleware } from '@solidjs/start/middleware';
import { getSession, signInUrl } from '~/lib/auth';

/**
 * Server-side auth gate for protected routes.
 *
 * SolidStart's default render mode is streaming: `renderToStream`
 * returns a stream object synchronously and `pipeTo` only awaits
 * deferred promises *after* the response handler has already moved
 * past its Location-header check. Net effect — a `throw redirect()`
 * from inside a `query` / `createAsync`, even with `deferStream: true`
 * (the pattern the docs recommend), still ships the full protected
 * page body on the wire. Browsers honour the 302 and discard it, but
 * curl, crawlers, and any client doing `fetch(url, { redirect:
 * 'manual' })` reads the leaked HTML.
 *
 * H3 middleware runs *before* `renderToStream` is invoked, so
 * returning a Response here produces a clean 302 with an empty body.
 * This matches the SolidStart-canonical pattern used by other
 * real-world projects (anomalyco/opencode, fedify-dev/fedify,
 * solidjs's own test fixtures). The other framework SDKs in this
 * family (Next.js, Remix, SvelteKit, TanStack Start, Qwik, Astro)
 * co-locate the auth check with the route file because their
 * loader/middleware primitives run before render; SolidStart's
 * streaming-first design means the equivalent primitive is
 * H3-level middleware.
 *
 * The session is also cached on `event.locals.session` so the page
 * can read it without issuing a second `getSession()` call.
 */
const isProtected = (pathname: string): boolean =>
  pathname === '/profile' || pathname.startsWith('/profile/');

export default createMiddleware({
  onRequest: async (event) => {
    const url = new URL(event.request.url);
    if (!isProtected(url.pathname)) return;

    const session = await getSession(event.request);
    event.locals.session = session;

    if (!session) {
      return new Response(null, {
        status: 302,
        headers: { Location: signInUrl({ redirectTo: url.pathname }) },
      });
    }
  },
});
