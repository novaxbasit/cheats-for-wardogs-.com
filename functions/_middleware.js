import { isLocalPreviewHost, parseHostname } from '../scripts/local-preview-host.mjs';
import { SITE_DOMAIN } from '../src/config/site-url.mjs';

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  const host = parseHostname(request.headers.get('host') || url.hostname);
  if (isLocalPreviewHost(host)) return next();

  if (host === `www.${SITE_DOMAIN}`) {
    url.protocol = 'https:';
    url.hostname = SITE_DOMAIN;
    url.port = '';
    return new Response(null, {
      status: 301,
      headers: {
        Location: url.toString(),
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }

  return next();
}
