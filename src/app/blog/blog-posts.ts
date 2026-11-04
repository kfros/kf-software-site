export type EditorialTrackId =
  | "engineering-notes"
  | "product-build-notes"
  | "market-discovery"
  | "chillpup-guides";

export interface EditorialTrack {
  id: EditorialTrackId;
  label: string;
  description: string;
  accent: "brand" | "chillpup";
  hubHref?: string;
  anchorId: string;
}

export const editorialTracks: EditorialTrack[] = [
  {
    id: "engineering-notes",
    label: "Engineering Notes",
    description:
      "Backend architecture, integrations, migrations, reliability, refactoring, testing, and technical delivery.",
    accent: "brand",
    anchorId: "engineering-notes",
  },
  {
    id: "product-build-notes",
    label: "Product Build Notes",
    description:
      "Decisions, tradeoffs, releases, and lessons from building focused software products.",
    accent: "brand",
    anchorId: "product-build-notes",
  },
  {
    id: "market-discovery",
    label: "Market Discovery",
    description:
      "What workflow experiments reveal, including inconclusive results and changed assumptions.",
    accent: "brand",
    anchorId: "market-discovery",
  },
  {
    id: "chillpup-guides",
    label: "ChillPup Guides",
    description:
      "Practical owner guidance for stressful dog moments, with clear safety boundaries.",
    accent: "chillpup",
    hubHref: "/chillpup/guides/",
    anchorId: "chillpup-guides",
  },
];

export type ArticleStatus = "draft" | "published";
export type AuthorKind = "person" | "organization";

export type BlogCategory =
  | "Walk Fear"
  | "Noise & Fireworks"
  | "Home Stress"
  | "Being Alone"
  | "Vet-Ready"
  | "Senior Dogs";

export type BlogBadge =
  | "ChillPup Routine"
  | "Safety Guide"
  | "Vet-Ready"
  | "Senior Tracking"
  | "Next Cluster";

export type BlogPriority = "P1" | "P2" | "P3";
export type BlogRiskLevel = "Low" | "Medium" | "High";

export interface ArticleRecord {
  slug: string;
  href: string;
  title: string;
  description: string;
  track: EditorialTrackId;
  status: ArticleStatus;
  datePublished: string;
  dateModified: string;
  authorKind: AuthorKind;
  authorName: string;
  authorUrl?: string;
  tags: string[];

  // ChillPup-specific metadata preserved
  category?: BlogCategory;
  badge?: BlogBadge;
  priority?: BlogPriority;
  relatedRoutine?: string | null;
  evidenceRows?: number[];
  riskLevel?: BlogRiskLevel;
  isBoundaryContent?: boolean;
}

export type BlogPost = ArticleRecord;

const rawArticles: ArticleRecord[] = [
  {
    slug: "dog-suddenly-scared-to-go-outside",
    href: "/blog/dog-suddenly-scared-to-go-outside/",
    title: "Why Is My Dog Suddenly Scared to Go Outside?",
    description:
      "For dogs who freeze at the door, refuse walks, or panic in familiar outdoor spaces.",
    track: "chillpup-guides",
    status: "published",
    datePublished: "2026-07-06",
    dateModified: "2026-07-06",
    authorKind: "organization",
    authorName: "KF Software",
    tags: ["Dog Anxiety", "Walk Fear", "Confidence Reset"],
    category: "Walk Fear",
    badge: "ChillPup Routine",
    priority: "P1",
    relatedRoutine: "Outdoor Confidence Reset",
    evidenceRows: [29, 33, 39, 41, 47, 55, 57, 59, 68, 69, 84, 96, 100],
    riskLevel: "Medium",
    isBoundaryContent: false,
  },
  {
    slug: "dog-freezes-on-walks-after-fireworks",
    href: "/blog/dog-freezes-on-walks-after-fireworks/",
    title: "Dog Scared to Go Outside After Fireworks? What to Do First",
    description:
      "How to rebuild outdoor confidence with tiny, low-pressure steps after a noise scare.",
    track: "chillpup-guides",
    status: "published",
    datePublished: "2026-07-06",
    dateModified: "2026-07-06",
    authorKind: "organization",
    authorName: "KF Software",
    tags: ["Fireworks Recovery", "Walk Fear", "Post-Fireworks"],
    category: "Walk Fear",
    badge: "ChillPup Routine",
    priority: "P1",
    relatedRoutine: "Post-Fireworks Walk Rebuild",
    evidenceRows: [57, 84, 96, 100],
    riskLevel: "Medium",
    isBoundaryContent: false,
  },
  {
    slug: "dog-still-shaken-after-fireworks",
    href: "/blog/dog-still-shaken-after-fireworks/",
    title: "Dog Still Shaken After Fireworks? How to Help Them Recover at Home",
    description:
      "Quiet indoor recovery steps for dogs who are still hiding, trembling, panting, or unsettled after fireworks.",
    track: "chillpup-guides",
    status: "published",
    datePublished: "2026-07-06",
    dateModified: "2026-07-06",
    authorKind: "organization",
    authorName: "KF Software",
    tags: ["Fireworks Fear", "Home Recovery", "Safe Space"],
    category: "Noise & Fireworks",
    badge: "ChillPup Routine",
    priority: "P1",
    relatedRoutine: "Post-Fireworks Recovery at Home",
    evidenceRows: [57, 84, 96, 100],
    riskLevel: "Medium",
    isBoundaryContent: false,
  },
  {
    slug: "prepare-dog-for-fireworks-without-making-fear-worse",
    href: "/blog/prepare-dog-for-fireworks-without-making-fear-worse/",
    title: "How to Prepare Your Dog for Fireworks Without Making Fear Worse",
    description:
      "Calm-day planning, safe indoor setup, potty timing, and clear steps before predictable fireworks.",
    track: "chillpup-guides",
    status: "published",
    datePublished: "2026-07-06",
    dateModified: "2026-07-06",
    authorKind: "organization",
    authorName: "KF Software",
    tags: ["Fireworks Preparation", "Desensitization Safety", "Indoor Setup"],
    category: "Noise & Fireworks",
    badge: "ChillPup Routine",
    priority: "P1",
    relatedRoutine: "Fireworks Prep: Calm-Day Practice",
    evidenceRows: [57, 84, 96, 100],
    riskLevel: "Medium",
    isBoundaryContent: false,
  },
  {
    slug: "dog-suddenly-scared-of-night-walks",
    href: "/blog/dog-suddenly-scared-of-night-walks/",
    title: "Dog Scared of Night Walks? Gentle Ways to Make Evening Walks Easier",
    description:
      "Why low light, past scares, and outdoor sounds can make familiar walks feel unsafe.",
    track: "chillpup-guides",
    status: "published",
    datePublished: "2026-07-06",
    dateModified: "2026-07-06",
    authorKind: "organization",
    authorName: "KF Software",
    tags: ["Night Walks", "Walk Fear", "Low Light"],
    category: "Walk Fear",
    badge: "ChillPup Routine",
    priority: "P1",
    relatedRoutine: "Night Walk Confidence",
    evidenceRows: [33, 84, 100],
    riskLevel: "Medium",
    isBoundaryContent: false,
  },
  {
    slug: "dog-refuses-to-pee-outside-after-thunder-or-rain",
    href: "/blog/dog-refuses-to-pee-outside-after-thunder-or-rain/",
    title: "Dog Won’t Pee in the Rain? What’s Normal and When to Call a Vet",
    description:
      "Safe, tiny steps for dogs who avoid wet weather, storms, or outdoor potty breaks after a scare.",
    track: "chillpup-guides",
    status: "published",
    datePublished: "2026-07-06",
    dateModified: "2026-07-06",
    authorKind: "organization",
    authorName: "KF Software",
    tags: ["Rain Reluctance", "Storm Fear", "Potty Routine"],
    category: "Walk Fear",
    badge: "Safety Guide",
    priority: "P1",
    relatedRoutine: "Rain / Weather Potty Confidence",
    evidenceRows: [39, 59, 69],
    riskLevel: "Medium",
    isBoundaryContent: false,
  },
  // Internal backlog records (status: draft, never published or exported)
  {
    slug: "escape-proof-harness-for-dogs-who-panic-on-walks",
    href: "/blog/escape-proof-harness-for-dogs-who-panic-on-walks/",
    title: "Escape-Proof Harness for Dogs Who Panic on Walks",
    description:
      "Safety-first guidance for dogs who back out of harnesses, freeze, or try to flee near roads.",
    track: "chillpup-guides",
    status: "draft",
    datePublished: "",
    dateModified: "",
    authorKind: "organization",
    authorName: "KF Software",
    tags: ["Harness Safety", "Walk Fear"],
    category: "Walk Fear",
    badge: "Safety Guide",
    priority: "P1",
    relatedRoutine: null,
    evidenceRows: [33, 47, 68],
    riskLevel: "High",
    isBoundaryContent: false,
  },
  {
    slug: "how-to-help-dog-scared-of-thunder",
    href: "/blog/how-to-help-dog-scared-of-thunder/",
    title: "How to Help a Dog Scared of Thunder",
    description:
      "A gentle storm plan for dogs who shake, hide, pace, or refuse comfort during thunder.",
    track: "chillpup-guides",
    status: "draft",
    datePublished: "",
    dateModified: "",
    authorKind: "organization",
    authorName: "KF Software",
    tags: ["Thunder Fear", "Storm Plan"],
    category: "Noise & Fireworks",
    badge: "Next Cluster",
    priority: "P1",
    relatedRoutine: "Thunder & Fireworks Safe Space",
    evidenceRows: [61, 66, 67, 76, 78, 79, 80, 87],
    riskLevel: "Medium",
    isBoundaryContent: false,
  },
  {
    slug: "dog-shaking-and-panting-not-just-anxiety",
    href: "/blog/dog-shaking-and-panting-not-just-anxiety/",
    title: "Dog Shaking and Panting: When It’s Not Just Anxiety",
    description:
      "How to notice red flags and organize what happened before a vet conversation.",
    track: "chillpup-guides",
    status: "draft",
    datePublished: "",
    dateModified: "",
    authorKind: "organization",
    authorName: "KF Software",
    tags: ["Vet-Ready", "Health Red Flags"],
    category: "Vet-Ready",
    badge: "Vet-Ready",
    priority: "P1",
    relatedRoutine: null,
    evidenceRows: [2, 3, 7, 12, 42, 63, 88],
    riskLevel: "High",
    isBoundaryContent: true,
  },
  {
    slug: "senior-dog-suddenly-anxious-at-night",
    href: "/blog/senior-dog-suddenly-anxious-at-night/",
    title: "Senior Dog Suddenly Anxious at Night",
    description:
      "What to track when an older dog starts pacing, panting, shaking, or acting confused at night.",
    track: "chillpup-guides",
    status: "draft",
    datePublished: "",
    dateModified: "",
    authorKind: "organization",
    authorName: "KF Software",
    tags: ["Senior Dogs", "Night Anxiety"],
    category: "Senior Dogs",
    badge: "Senior Tracking",
    priority: "P1",
    relatedRoutine: null,
    evidenceRows: [1, 49, 72, 75, 81, 82, 90],
    riskLevel: "High",
    isBoundaryContent: true,
  },
  {
    slug: "dog-suddenly-snapping-when-touched",
    href: "/blog/dog-suddenly-snapping-when-touched/",
    title: "Dog Suddenly Snapping When Touched",
    description:
      "Why pain must be ruled out before treating sudden handling aggression as a training issue.",
    track: "chillpup-guides",
    status: "draft",
    datePublished: "",
    dateModified: "",
    authorKind: "organization",
    authorName: "KF Software",
    tags: ["Pain Screening", "Safety"],
    category: "Vet-Ready",
    badge: "Safety Guide",
    priority: "P1",
    relatedRoutine: null,
    evidenceRows: [60, 94, 99],
    riskLevel: "High",
    isBoundaryContent: true,
  },
];

// Published articles collection
export const publishedArticles: ArticleRecord[] = rawArticles.filter(
  (a) => a.status === "published"
);

// Backward-compatible alias
export const allArticles: ArticleRecord[] = publishedArticles;

export const featuredCoreArticles: ArticleRecord[] = publishedArticles.filter(
  (a) => a.category === "Walk Fear"
);

export const safetyArticles: ArticleRecord[] = publishedArticles.filter(
  (a) => a.category === "Vet-Ready"
);

// Helpers
export function getArticlesByTrack(trackId: EditorialTrackId): ArticleRecord[] {
  return publishedArticles.filter((a) => a.track === trackId);
}

export function getChillPupGuides(): ArticleRecord[] {
  return publishedArticles.filter((a) => a.track === "chillpup-guides");
}

export function getArticleBySlug(slug: string): ArticleRecord | undefined {
  return publishedArticles.find((a) => a.slug === slug);
}
