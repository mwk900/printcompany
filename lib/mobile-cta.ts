export function shouldShowMobileCta(pathname: string, menuOpen: boolean) {
  if (menuOpen) {
    return false;
  }

  return pathname !== "/contact";
}
