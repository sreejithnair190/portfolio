import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, journalImage, series } from "@/lib/journal";
import {
  generateArticleJsonLd,
  generatePostSocialMetaTags,
} from "@/lib/sanity/seo";
import { getSeriesNavigation } from "@/lib/sanity/utils";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return series.flatMap((s) =>
    s.posts.map((post) => ({ slug: post.slug.current })),
  );
}
export async function generateMetadata({ params }: Props) {
  const result = getArticle((await params).slug);
  if (!result) return {};
  const meta = generatePostSocialMetaTags(result.article, journalImage);
  return {
    title: result.entry.title,
    description: meta.description,
    openGraph: {
      type: "article",
      title: meta.title,
      url: meta.openGraph.url,
      images: [journalImage],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const result = getArticle((await params).slug);
  if (!result) notFound();
  const { entry, collection, article } = result;
  const { previousPost, nextPost, currentIndex, totalPosts } =
    getSeriesNavigation(collection.posts, entry._id);
  return (
    <article key={entry._id} className="shell reading-page article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleJsonLd(article, journalImage),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/blog">Journal</Link>
        <span>/</span>
        <Link href={`/blog/series/${collection.slug}`}>{collection.title}</Link>
      </nav>
      <div className="reading-head">
        <p className="eyebrow">
          <span className="orange-line" />
          Part {currentIndex} of {totalPosts} · {entry.estimatedReadingTime} min
          read
        </p>
        <h1>
          {entry.title}
          <span>.</span>
        </h1>
        <p>{entry.excerpt}</p>
      </div>
      <div className="prose">
        {entry.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
      </div>
      <nav className="post-nav" aria-label="More in this series">
        {previousPost && (
          <Link href={`/blog/${previousPost.slug}`}>
            <span className="micro">Previous part</span>
            {previousPost.title}
          </Link>
        )}
        {nextPost && (
          <Link href={`/blog/${nextPost.slug}`}>
            <span className="micro">Next part</span>
            {nextPost.title}
          </Link>
        )}
        <Link href={`/blog/series/${collection.slug}`}>
          <span className="micro">Full series</span>
          {collection.title}
        </Link>
      </nav>
    </article>
  );
}
