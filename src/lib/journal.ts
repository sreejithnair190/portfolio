import type { BlogPost, BlogSeries } from "./sanity/types";
import { calculateReadingTime, generateSlug } from "./sanity/utils";

interface Section {
  heading: string;
  paragraphs: string[];
}
interface Entry {
  title: string;
  excerpt: string;
  sections: Section[];
}

const entries: Entry[] = [
  {
    title: "Giving the terminal a silhouette",
    excerpt:
      "How a few rounded shapes became the little orange computer on the homepage.",
    sections: [
      {
        heading: "Start with the shadow",
        paragraphs: [
          "A CRT monitor has a shape you can recognise from across a room. The glass face is almost square, the casing stretches back behind it, and the whole assembly sits a little heavier than you expect. Those proportions were the starting point for the studio terminal.",
          "The first pass only needs three objects: the monitor, a disk drive, and a separate keyboard. Keeping some air between the keyboard and the drive makes the silhouette readable even when the model shrinks down to phone size.",
        ],
      },
      {
        heading: "Give each edge a job",
        paragraphs: [
          "The orange shell gets generous rounded corners. The dark surround on the screen gets a tighter bevel. Seen together, those edges tell you that the surround is a separate piece fitted inside the housing. The same idea repeats where the cream disk drive rests on its rubber feet.",
          "Small details work best in groups. A row of ventilation slots gives the side of the case a sense of scale. A single dark opening makes the disk drive easy to recognise. The coiled lead explains how the loose keyboard belongs to the rest of the machine.",
        ],
      },
      {
        heading: "Put someone at home",
        paragraphs: [
          "The screen is a canvas texture with a pixel smile, a short greeting, and faint scanlines. Keeping the face and text on one surface lets them turn naturally with the monitor. The result has a little personality before anyone discovers they can drag it.",
        ],
      },
    ],
  },
  {
    title: "Making an object feel good to turn",
    excerpt:
      "How the camera, floating hardware, and keyboard controls share a scroll-driven scene.",
    sections: [
      {
        heading: "Choose the first view",
        paragraphs: [
          "At a straight-on angle the monitor hides its own depth. From the side, the greeting disappears. The starting camera sits slightly above and to the right, where the screen, top vents, disk slot and keys can all be read at once.",
          "A narrow perspective lens gives the keyboard more presence as it moves toward the viewer. The framing adapts to the width of the canvas, leaving room for the disk above the monitor and the loose escape key in front.",
        ],
      },
      {
        heading: "Make the motion belong to the visitor",
        paragraphs: [
          "Scroll through the opening and the monitor lifts off the disk drive. The keyboard advances as the camera swings around to the other side. Scrolling back brings each part to its starting position.",
          "Dragging or using the arrow keys adds a viewing angle of your own. Press Home to return to the camera angle for that point in the sequence.",
        ],
      },
      {
        heading: "Know when the scene can rest",
        paragraphs: [
          "The machine drifts gently while it is in view. When the opening leaves the viewport or the browser tab is hidden, its animation loop stops. Each moving assembly batches pieces of the same material so the bank of keys can travel as one.",
          "Two stills from the scene cover the assembled and exploded views on devices without WebGL. With reduced motion enabled, the opening stays in its assembled pose and visitors can go straight to the work.",
        ],
      },
    ],
  },
];
const title = "Building the studio";
const slug = "building-the-studio";
const description =
  "A two-part build log on modeling a retro computer and bringing it to life in the browser.";
const slugValue = (current: string) => ({ current, _type: "slug" as const });
const seriesRef = { _id: slug, title, slug: slugValue(slug) };

const posts = entries.map((entry, i) => {
  const id = generateSlug(entry.title);
  const wordCount = entry.sections
    .map((section) => [section.heading, ...section.paragraphs].join(" "))
    .join(" ")
    .split(/\s+/).length;
  return {
    ...entry,
    _id: id,
    slug: slugValue(id),
    orderInSeries: i + 1,
    featuredImage: null,
    estimatedReadingTime: calculateReadingTime(wordCount),
    publishedAt: "2026-11-19T00:00:00.000Z",
  };
});

export const series = [
  {
    ...seriesRef,
    slug,
    description,
    posts,
    schema: {
      ...seriesRef,
      description,
      coverImage: null,
      posts,
      totalReadingTime: posts.reduce(
        (n, post) => n + post.estimatedReadingTime,
        0,
      ),
    } satisfies BlogSeries,
  },
];

export function getArticle(slug: string) {
  for (const collection of series) {
    const entry = collection.posts.find((post) => post.slug.current === slug);
    if (entry) {
      const article: BlogPost = {
        ...entry,
        author: "Sreejith Nair",
        content: [],
        series: collection.schema,
      };
      return { entry, article, collection };
    }
  }
}

export const journalImage = "https://sreejithnair.me/studio/terminal.webp";
