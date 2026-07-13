/**
 * One source of truth for site navigation.
 *
 * The site has two long pages that hold the anchor sections:
 *   - the home / storefront page (`/`)          → Recognition, The Project, About
 *   - the immersive book page (`/book`)          → the book, reading room, pre-order
 *
 * Each nav concept has a single canonical home. These helpers resolve a link
 * to a same-page hash (so it smooth-scrolls) when you're already on the page
 * that owns it, or to a cross-page URL (so it navigates) when you're not. The
 * header, footer, and CTAs all read from here so they can never drift apart.
 */

export function currentPath(): string {
  return typeof window !== "undefined" ? window.location.pathname : "/";
}

export function isHomePath(path = currentPath()): boolean {
  return path === "/";
}

export function isBookPath(path = currentPath()): boolean {
  return path === "/book" || path.startsWith("/book");
}

/** Link to a section that lives on the HOME page. */
export function homeSection(hash: string, path = currentPath()): string {
  return isHomePath(path) ? hash : `/${hash}`;
}

/** Link to a section that lives on the BOOK page. */
export function bookSection(hash: string, path = currentPath()): string {
  return isBookPath(path) ? hash : `/book${hash}`;
}

export interface NavItem {
  label: string;
  href: string;
  /** Set when href is a same-page hash — used for smooth-scroll + active state. */
  anchor?: string;
}

/**
 * The primary menu, identical on every page. "The Book" and "Read" lead into
 * the /book experience (overview + reading room); the rest are home sections.
 */
export function primaryNav(path = currentPath()): NavItem[] {
  const item = (label: string, href: string): NavItem => ({
    label,
    href,
    anchor: href.startsWith("#") ? href : undefined,
  });

  return [
    // Home scrolls to the top on the home page, navigates to "/" elsewhere.
    // anchor is left undefined so it never drives the active-section underline.
    { label: "Home", href: isHomePath(path) ? "#root" : "/" },
    item("The Book", bookSection("#top", path)),
    item("Read", bookSection("#read", path)),
    item("Recognition", homeSection("#recognition", path)),
    item("The Project", homeSection("#project", path)),
    item("About", homeSection("#about", path)),
  ];
}

/** The pre-order call to action target (the tiers on /book). */
export function preorderHref(path = currentPath()): string {
  return bookSection("#preorder", path);
}

/** The reading room — the single canonical "Read" destination. */
export function readingRoomHref(path = currentPath()): string {
  return bookSection("#read", path);
}
