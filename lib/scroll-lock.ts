const LOCK_ATTR = "data-scroll-lock";
const LOCK_TOP_ATTR = "data-scroll-lock-top";

function getWindowScrollY(doc: Document): number {
  if (typeof window === "undefined") {
    return 0;
  }

  return window.scrollY || doc.documentElement.scrollTop || 0;
}

export function lockBodyScroll(doc: Document = document) {
  if (typeof window === "undefined") {
    return;
  }

  const body = doc.body;
  if (body.getAttribute(LOCK_ATTR) === "true") {
    return;
  }

  const scrollY = getWindowScrollY(doc);
  body.setAttribute(LOCK_ATTR, "true");
  body.setAttribute(LOCK_TOP_ATTR, `${scrollY}`);
  body.style.position = "fixed";
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";
  body.style.top = `-${scrollY}px`;
  body.style.overflow = "hidden";
}

export function unlockBodyScroll(doc: Document = document) {
  if (typeof window === "undefined") {
    return;
  }

  const body = doc.body;
  if (body.getAttribute(LOCK_ATTR) !== "true") {
    return;
  }

  const rawTop = body.getAttribute(LOCK_TOP_ATTR);
  const storedTop = rawTop ? Number.parseInt(rawTop, 10) : 0;
  body.removeAttribute(LOCK_ATTR);
  body.removeAttribute(LOCK_TOP_ATTR);
  body.style.position = "";
  body.style.left = "";
  body.style.right = "";
  body.style.width = "";
  body.style.top = "";
  body.style.overflow = "";
  window.scrollTo(0, Number.isNaN(storedTop) ? 0 : storedTop);
}
