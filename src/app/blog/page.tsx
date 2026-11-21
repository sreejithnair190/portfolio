import Link from "next/link";
import { Layers3 } from "lucide-react";
import { series } from "@/lib/journal";
export const metadata = {
  title: "Journal",
  description: "I write about how I build things for the web, from shaping the 3D computer on my homepage to making it move as you scroll.",
};

export default function Journal() {
  return (
    <div className="shell reading-page">
      <div className="reading-head">
        <p className="eyebrow">
          <span className="orange-line" />
          Journal
        </p>
        <h1>
          Studio notes<span>.</span>
        </h1>
        <p>
          Build logs on the details that make a web experience feel good to use.
        </p>
      </div>
      <h2 className="reading-subtitle">Series</h2>
      {series.map((collection) => (
        <Link
          className="series-feature"
          href={`/blog/series/${collection.slug}`}
          key={collection.slug}
        >
          <div className="series-icon">
            <Layers3 size={36} />
          </div>
          <div>
            <p className="micro">
              {collection.posts.length} parts · Development
            </p>
            <h3>{collection.title}</h3>
            <p>{collection.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
