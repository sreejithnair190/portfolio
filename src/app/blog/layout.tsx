import { notFound } from "next/navigation";
import { journalEnabled } from "@/lib/features";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!journalEnabled) notFound();
  return children;
}
