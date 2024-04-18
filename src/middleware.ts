import { defineMiddleware } from "astro:middleware";
import { parseHTML } from "linkedom";

export const onRequest = defineMiddleware(async (_context, next) => {
  if (!_context.url.pathname.startsWith("/partials")) return next();

  const response = await next();
  const html = await response.text();

  const { document } = parseHTML(`<html><body>${html}</body></html>`);
  const { body } = document;

  const headTags = body.querySelectorAll("style, script, meta, link");

  const head =
    body.getElementsByTagName("head")[0] ?? document.createElement("head");
  headTags.forEach((tag) => head.append(tag));

  body.prepend(head);

  return new Response(body.innerHTML, {
    status: 200,
    headers: response.headers,
  });
});
