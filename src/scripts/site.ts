// Small progressive enhancements. Without JS every block is readable and every link works.
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Header: thin line once the page is scrolled.
const header = document.querySelector<HTMLElement>("[data-header]");
const onScroll = (): void => { header?.classList.toggle("is-scrolled", window.scrollY > 8); };
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile menu (native popover: Esc and outside tap close it). Close on link choice; keep aria-expanded in sync.
const menu = document.querySelector<HTMLElement>("[data-menu]");
const menuBtn = document.querySelector<HTMLButtonElement>("[data-menu-btn]");
if (menu && "showPopover" in menu) {
  menu.addEventListener("toggle", (e) => {
    const open = (e as ToggleEvent).newState === "open";
    menuBtn?.setAttribute("aria-expanded", String(open));
    document.documentElement.classList.toggle("menu-open", open);
  });
  menu.querySelectorAll<HTMLAnchorElement>("[data-menu-link]").forEach((a) => {
    a.addEventListener("click", () => menu.hidePopover());
  });
}

// Active nav item by visible section.
const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav]"));
if (navLinks.length && "IntersectionObserver" in window) {
  const byId = new Map(navLinks.map((a) => [a.getAttribute("href")?.slice(1) ?? "", a]));
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      navLinks.forEach((a) => { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
      const link = byId.get(e.target.id);
      if (link) { link.classList.add("is-active"); link.setAttribute("aria-current", "location"); }
    }
  }, { rootMargin: "-45% 0px -50% 0px" });
  byId.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}

// Implants: tabs (ARIA tabs pattern, arrow keys). Without JS all three panels are shown one after another.
document.querySelectorAll<HTMLElement>("[data-tabs]").forEach((root) => {
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>("[role=tab]"));
  const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls") ?? ""));
  const select = (i: number, focus = false): void => {
    tabs.forEach((t, j) => {
      const on = i === j;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      const p = panels[j];
      if (p) { p.hidden = !on; p.classList.toggle("is-entering", on && !reduce); }
    });
    root.style.setProperty("--tab-index", String(i));
    if (focus) tabs[i]?.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(i));
    t.addEventListener("keydown", (e) => {
      const last = tabs.length - 1;
      let n = -1;
      if (e.key === "ArrowRight") n = i === last ? 0 : i + 1;
      else if (e.key === "ArrowLeft") n = i === 0 ? last : i - 1;
      else if (e.key === "Home") n = 0;
      else if (e.key === "End") n = last;
      if (n >= 0) { e.preventDefault(); select(n, true); }
    });
  });
  select(0);
});

// Mobile channel bar: appears once the hero is out of view, hides over the contacts block.
const bar = document.querySelector<HTMLElement>("[data-bar]");
const hero = document.getElementById("hero");
const contacts = document.getElementById("contacts");
if (bar && hero && contacts && "IntersectionObserver" in window) {
  let heroVisible = true;
  let contactsVisible = false;
  const update = (): void => { bar.classList.toggle("is-shown", !heroVisible && !contactsVisible); };
  new IntersectionObserver(([e]) => { heroVisible = !!e?.isIntersecting; update(); }).observe(hero);
  new IntersectionObserver(([e]) => { contactsVisible = !!e?.isIntersecting; update(); }, { rootMargin: "0px 0px -20% 0px" }).observe(contacts);
  bar.classList.add("is-ready");
}
