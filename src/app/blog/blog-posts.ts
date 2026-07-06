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

export interface BlogPost {
  slug: string;
  href: string;
  title: string;
  description: string;
  category: BlogCategory;
  badge: BlogBadge;
  priority: BlogPriority;
  relatedRoutine: string | null;
  evidenceRows: number[];
  riskLevel: BlogRiskLevel;
  isBoundaryContent: boolean;
  isLive?: boolean;
}

const rawArticles: BlogPost[] = [
  {
    slug: "dog-suddenly-scared-to-go-outside",
    href: "/blog/dog-suddenly-scared-to-go-outside/",
    title: "Why Is My Dog Suddenly Scared to Go Outside?",
    description: "For dogs who freeze at the door, refuse walks, or panic in familiar outdoor spaces.",
    category: "Walk Fear",
    badge: "ChillPup Routine",
    priority: "P1",
    relatedRoutine: "Outdoor Confidence Reset",
    evidenceRows: [29, 33, 39, 41, 47, 55, 57, 59, 68, 69, 84, 96, 100],
    riskLevel: "Medium",
    isBoundaryContent: false,
    isLive: true
  },
  {
    slug: "dog-freezes-on-walks-after-fireworks",
    href: "/blog/dog-freezes-on-walks-after-fireworks/",
    title: "Dog Scared to Go Outside After Fireworks? What to Do First",
    description: "How to rebuild outdoor confidence with tiny, low-pressure steps after a noise scare.",
    category: "Walk Fear",
    badge: "ChillPup Routine",
    priority: "P1",
    relatedRoutine: "Post-Fireworks Walk Rebuild",
    evidenceRows: [57, 84, 96, 100],
    riskLevel: "Medium",
    isBoundaryContent: false,
    isLive: true
  },
  {
    slug: "dog-still-shaken-after-fireworks",
    href: "/blog/dog-still-shaken-after-fireworks/",
    title: "Dog Still Shaken After Fireworks? How to Help Them Recover at Home",
    description: "Quiet indoor recovery steps for dogs who are still hiding, trembling, panting, or unsettled after fireworks.",
    category: "Noise & Fireworks",
    badge: "ChillPup Routine",
    priority: "P1",
    relatedRoutine: "Post-Fireworks Recovery at Home",
    evidenceRows: [57, 84, 96, 100],
    riskLevel: "Medium",
    isBoundaryContent: false,
    isLive: true
  },
  {
    slug: "prepare-dog-for-fireworks-without-making-fear-worse",
    href: "/blog/prepare-dog-for-fireworks-without-making-fear-worse/",
    title: "How to Prepare Your Dog for Fireworks Without Making Fear Worse",
    description: "Calm-day planning, safe indoor setup, potty timing, and clear steps before predictable fireworks.",
    category: "Noise & Fireworks",
    badge: "ChillPup Routine",
    priority: "P1",
    relatedRoutine: "Fireworks Prep: Calm-Day Practice",
    evidenceRows: [57, 84, 96, 100],
    riskLevel: "Medium",
    isBoundaryContent: false,
    isLive: true
  },
  {
    slug: "dog-suddenly-scared-of-night-walks",
    href: "/blog/dog-suddenly-scared-of-night-walks/",
    title: "Dog Scared of Night Walks? Gentle Ways to Make Evening Walks Easier",
    description: "Why low light, past scares, and outdoor sounds can make familiar walks feel unsafe.",
    category: "Walk Fear",
    badge: "ChillPup Routine",
    priority: "P1",
    relatedRoutine: "Night Walk Confidence",
    evidenceRows: [33, 84, 100],
    riskLevel: "Medium",
    isBoundaryContent: false,
    isLive: true
  },
  {
    slug: "dog-refuses-to-pee-outside-after-thunder-or-rain",
    href: "/blog/dog-refuses-to-pee-outside-after-thunder-or-rain/",
    title: "Dog Won’t Pee in the Rain? What’s Normal and When to Call a Vet",
    description: "Safe, tiny steps for dogs who avoid wet weather, storms, or outdoor potty breaks after a scare.",
    category: "Walk Fear",
    badge: "Safety Guide",
    priority: "P1",
    relatedRoutine: "Rain / Weather Potty Confidence",
    evidenceRows: [39, 59, 69],
    riskLevel: "Medium",
    isBoundaryContent: false,
    isLive: true
  },
  {
    slug: "escape-proof-harness-for-dogs-who-panic-on-walks",
    href: "/blog/escape-proof-harness-for-dogs-who-panic-on-walks/",
    title: "Escape-Proof Harness for Dogs Who Panic on Walks",
    description: "Safety-first guidance for dogs who back out of harnesses, freeze, or try to flee near roads.",
    category: "Walk Fear",
    badge: "Safety Guide",
    priority: "P1",
    relatedRoutine: null,
    evidenceRows: [33, 47, 68],
    riskLevel: "High",
    isBoundaryContent: false,
    isLive: false
  },
  {
    slug: "how-to-help-dog-scared-of-thunder",
    href: "/blog/how-to-help-dog-scared-of-thunder/",
    title: "How to Help a Dog Scared of Thunder",
    description: "A gentle storm plan for dogs who shake, hide, pace, or refuse comfort during thunder.",
    category: "Noise & Fireworks",
    badge: "Next Cluster",
    priority: "P1",
    relatedRoutine: "Thunder & Fireworks Safe Space",
    evidenceRows: [61, 66, 67, 76, 78, 79, 80, 87],
    riskLevel: "Medium",
    isBoundaryContent: false,
    isLive: false
  },
  {
    slug: "dog-shaking-and-panting-not-just-anxiety",
    href: "/blog/dog-shaking-and-panting-not-just-anxiety/",
    title: "Dog Shaking and Panting: When It’s Not Just Anxiety",
    description: "How to notice red flags and organize what happened before a vet conversation.",
    category: "Vet-Ready",
    badge: "Vet-Ready",
    priority: "P1",
    relatedRoutine: null,
    evidenceRows: [2, 3, 7, 12, 42, 63, 88],
    riskLevel: "High",
    isBoundaryContent: true,
    isLive: false
  },
  {
    slug: "senior-dog-suddenly-anxious-at-night",
    href: "/blog/senior-dog-suddenly-anxious-at-night/",
    title: "Senior Dog Suddenly Anxious at Night",
    description: "What to track when an older dog starts pacing, panting, shaking, or acting confused at night.",
    category: "Senior Dogs",
    badge: "Senior Tracking",
    priority: "P1",
    relatedRoutine: null,
    evidenceRows: [1, 49, 72, 75, 81, 82, 90],
    riskLevel: "High",
    isBoundaryContent: true,
    isLive: false
  },
  {
    slug: "dog-suddenly-snapping-when-touched",
    href: "/blog/dog-suddenly-snapping-when-touched/",
    title: "Dog Suddenly Snapping When Touched",
    description: "Why pain must be ruled out before treating sudden handling aggression as a training issue.",
    category: "Vet-Ready",
    badge: "Safety Guide",
    priority: "P1",
    relatedRoutine: null,
    evidenceRows: [60, 94, 99],
    riskLevel: "High",
    isBoundaryContent: true,
    isLive: false
  }
];

// Exported collections filtered for live visibility
export const featuredCoreArticles: BlogPost[] = rawArticles.filter(
  (a) => a.isLive && a.category === "Walk Fear"
);

export const safetyArticles: BlogPost[] = rawArticles.filter(
  (a) => a.isLive && a.category === "Vet-Ready"
);

export const allArticles: BlogPost[] = rawArticles.filter((a) => a.isLive);

// Export the backlog for editorial/reference purposes
export const backlogArticles: BlogPost[] = rawArticles.filter((a) => !a.isLive);
