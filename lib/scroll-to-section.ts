const HEADER_SELECTOR = "[data-site-header]";
const DEFAULT_OFFSET = 112;

function resolveHeaderOffset() {
  const header = document.querySelector<HTMLElement>(HEADER_SELECTOR);
  if (!header) {
    return DEFAULT_OFFSET;
  }

  const height = header.getBoundingClientRect().height;
  return Math.max(DEFAULT_OFFSET, Math.ceil(height + 20));
}

export function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (!section) {
    return;
  }

  const sectionTop = window.scrollY + section.getBoundingClientRect().top;
  const top = Math.max(0, sectionTop - resolveHeaderOffset());
  window.scrollTo({ top, behavior: "smooth" });
}
