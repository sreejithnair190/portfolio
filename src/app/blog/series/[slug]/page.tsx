import Link from "next/link";
import { notFound } from "next/navigation";
import { series, journalImage } from "@/lib/journal";
import {
  generateItemListJsonLd,
  generateSeriesSocialMetaTags,
} from "@/lib/sanity/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return series.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const collection = series.find((s) => s.slug === slug);
  if (!collection) return {};
  const meta = generateSeriesSocialMetaTags(collection.schema, journalImage);
  return {
    title: collection.title,
    description: meta.description,
    openGraph: {
      type: "website",
      url: meta.openGraph.url,
      images: [journalImage],
    },
  };
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params;
  const collection = series.find((s) => s.slug === slug);
  if (!collection) notFound();
  return (
    <div key={slug} className="shell reading-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateItemListJsonLd(collection.schema),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/blog">Journal</Link>
        <span>/</span> Series
      </nav>
      <div className="reading-head">
        <p className="eyebrow">
          <span className="orange-line" />
          {collection.posts.length} parts · {collection.schema.totalReadingTime}{" "}
          min read
        </p>
        <h1>
          {collection.title}
          <span>.</span>
        </h1>
        <p>{collection.description}</p>
      </div>
      <ol className="post-list">
        {collection.posts.map((post) => (
          <li key={post._id}>
            <Link href={`/blog/${post.slug.current}`}>
              <span className="post-number">
                {String(post.orderInSeries).padStart(2, "0")}
              </span>
              <div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </div>
              <span className="micro">{post.estimatedReadingTime} min</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
