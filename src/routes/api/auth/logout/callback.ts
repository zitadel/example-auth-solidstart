import { redirect } from '@solidjs/router';
import { APIEvent } from '@solidjs/start/server';
import { deleteCookie, getCookie, parseCookies, setHeader } from 'vinxi/http';

// noinspection JSUnusedGlobalSymbols
/**
 * Handles the callback from an external Identity Provider (IdP) after a user
 * signs out. This endpoint is responsible for validating the logout request to
 * prevent Cross-Site Request Forgery (CSRF) attacks by comparing a `state`
 * parameter from the URL with a value stored in a secure, server-side cookie.
 * If validation is successful, it clears the user's session cookies and
 * redirects to a success page. Otherwise, it redirects to an error page.
 *
 * @param event - The incoming SolidStart API event object, which contains the
 * URL and its search parameters, including the `state` from the IdP.
 * @returns A redirect response that either redirects the user to a success
 * or error page. Upon success, it includes headers to delete session cookies.
 */
export async function GET(event: APIEvent) {
  const url = new URL(event.request.url);
  const state = url.searchParams.get('state');
  const logoutStateCookie = getCookie(event.nativeEvent, 'logout_state');

  if (state && logoutStateCookie && state === logoutStateCookie) {
    const successUrl = new URL('/logout/success', event.request.url);
    setHeader(event.nativeEvent, 'Clear-Site-Data', '"cookies"');
    for (const name of Object.keys(parseCookies(event.nativeEvent))) {
      if (name.includes('authjs.')) {
        deleteCookie(event.nativeEvent, name, { path: '/' });
      }
    }
    deleteCookie(event.nativeEvent, 'logout_state', {
      path: '/api/auth/logout/callback',
    });
    return redirect(successUrl.toString());
  } else {
    const errorUrl = new URL('/logout/error', event.request.url);
    errorUrl.searchParams.set('reason', 'Invalid or missing state parameter.');
    return redirect(errorUrl.toString());
  }
}
