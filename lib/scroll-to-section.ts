export function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (!section) {
    return;
  }

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
