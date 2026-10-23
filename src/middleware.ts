import { defineMiddleware } from 'astro:middleware';
import { resolveCheckoutPathRedirect } from './config/checkout-redirects.mjs';
import { resolveLocaleRoutingRedirect } from './config/locale-routing.mjs';
import { resolvePathRedirect } from '../scripts/redirects.mjs';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const { pathname, search, hash } = url;

  const checkoutTarget = resolveCheckoutPathRedirect(pathname);
  if (checkoutTarget) {
    const destination = checkoutTarget.includes('?')
      ? `${checkoutTarget}${search.replace('?', '&')}`
      : `${checkoutTarget}${search}`;
    return context.redirect(destination, 302, {
      headers: { 'X-Robots-Tag': 'noindex, nofollow' },
    });
  }

  const localeRoute = resolveLocaleRoutingRedirect(pathname);
  if (localeRoute?.status === 301) {
    return context.redirect(`${localeRoute.location}${search}${hash}`, 301);
  }
  if (localeRoute?.status === 404) {
    return new Response('Not Found', { status: 404, statusText: 'Not Found' });
  }

  const pathRedirect = resolvePathRedirect(pathname);
  if (pathRedirect && pathRedirect !== pathname) {
    return context.redirect(`${pathRedirect}${search}${hash}`, 301);
  }

  return next();
});
