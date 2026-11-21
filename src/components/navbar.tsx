"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { journalEnabled } from "@/lib/features";
import { useEffect, useRef, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Work", href: "/#projects" },
  { label: "About", href: "/#about" },
  ...(journalEnabled ? [{ label: "Journal", href: "/blog" }] : []),
];

export default function Navbar() {
  const pathname = usePathname();
  const [section, setSection] = useState("home");
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    const update = () => {
      const current = ["home", "projects", "about", "journal", "contact"]
        .filter((id) => {
          const el = document.getElementById(id);
          return (
            el && el.getBoundingClientRect().top <= window.innerHeight * 0.35
          );
        })
        .pop();
      setSection(current ?? "home");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  return (
    <header
      className={
        pathname === "/" && section === "home"
          ? "site-header over-stage"
          : "site-header"
      }
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="shell nav-row">
        <Link
          href="/#home"
          className="wordmark"
          aria-label="Sreejith Nair home"
          onClick={() => setOpen(false)}
        >
          <span className="monogram" aria-hidden="true">
            sn<span>.</span>
          </span>
          <span>
            Sreejith Nair<span className="logo-period">.</span>
          </span>
        </Link>
        <nav
          aria-label="Primary navigation"
          className={open ? "main-nav is-open" : "main-nav"}
          id="main-navigation"
        >
          {links.map((link) => {
            const active = pathname.startsWith("/blog")
              ? link.label === "Journal"
              : pathname === "/" &&
                (link.href.endsWith("#" + section) ||
                  (section === "journal" && link.label === "Journal"));
            return (
              <Link
                href={link.href}
                key={link.href}
                aria-current={active ? "location" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="nav-actions">
          <Link
            className="contact-button"
            href="/#contact"
            aria-current={pathname === "/" && section === "contact" ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            Let&apos;s talk <MessageCircle size={15} />
          </Link>
          <button
            ref={toggle}
            className="mobile-menu"
            aria-expanded={open}
            aria-controls="main-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
