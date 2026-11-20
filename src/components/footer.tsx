"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import Link from "next/link";
import { journalEnabled } from "@/lib/features";
import { github_url, linkedIn_url } from "@/utils/constants";

const subscribe = () => () => {};

export default function Footer() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const dark = mounted && resolvedTheme === "dark";
  return (
    <footer className="shell site-footer">
      <span>© {new Date().getFullYear()} Sreejith Nair</span>
      <div>
        <a href={github_url}>GitHub</a>
        <a href={linkedIn_url}>LinkedIn</a>
        {journalEnabled && <Link href="/blog">Journal</Link>}
        <button
          type="button"
          aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          onClick={() => setTheme(dark ? "light" : "dark")}
        >
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </footer>
  );
}
