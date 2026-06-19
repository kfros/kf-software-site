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
}

export const featuredCoreArticles: BlogPost[] = [
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
    isBoundaryContent: false
  },
  {
    slug: "dog-freezes-on-walks-after-fireworks",
    href: "/blog/dog-freezes-on-walks-after-fireworks/",
    title: "Dog Freezes on Walks After Fireworks or a Scary Event",
    description: "How to rebuild outdoor confidence with tiny, low-pressure steps after a noise scare.",
    category: "Walk Fear",
    badge: "ChillPup Routine",
    priority: "P1",
    relatedRoutine: "Post-Fireworks Outdoor Rebuild",
    evidenceRows: [57, 84, 96, 100],
    riskLevel: "Medium",
    isBoundaryContent: false
  },
  {
    slug: "dog-suddenly-scared-of-night-walks",
    href: "/blog/dog-suddenly-scared-of-night-walks/",
    title: "Dog Suddenly Scared of Night Walks",
    description: "Why low light, past scares, and outdoor sounds can make familiar walks feel unsafe.",
    category: "Walk Fear",
    badge: "ChillPup Routine",
    priority: "P1",
    relatedRoutine: "Night Walk Confidence",
    evidenceRows: [33, 84, 100],
    riskLevel: "Medium",
    isBoundaryContent: false
  },
  {
    slug: "dog-refuses-to-pee-outside-after-thunder-or-rain",
    href: "/blog/dog-refuses-to-pee-outside-after-thunder-or-rain/",
    title: "Dog Refuses to Pee Outside After Thunder or Rain",
    description: "Safe, tiny steps for dogs who avoid wet weather, storms, or outdoor potty breaks after a scare.",
    category: "Walk Fear",
    badge: "Safety Guide",
    priority: "P1",
    relatedRoutine: "Weather Potty Confidence",
    evidenceRows: [39, 59, 69],
    riskLevel: "Medium",
    isBoundaryContent: false
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
    isBoundaryContent: false
  },
  {
    slug: "how-to-help-dog-scared-of-thunder",
    href: "/blog/how-to-help-dog-scared-of-thunder/",
    title: "How to Help a Dog Scared of Thunder",
    description: "A gentle storm plan for dogs who shake, hide, pace, or refuse comfort during thunder.",
    category: "Noise & Fireworks",
    badge: "Next Cluster",
    priority: "P1",
    relatedRoutine: "Storm Calm Plan",
    evidenceRows: [61, 66, 67, 76, 78, 79, 80, 87],
    riskLevel: "Medium",
    isBoundaryContent: false
  }
];

export const safetyArticles: BlogPost[] = [
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
    isBoundaryContent: true
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
    isBoundaryContent: true
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
    isBoundaryContent: true
  }
];

// Combines both sets in original defined order
export const allArticles: BlogPost[] = [
  ...featuredCoreArticles,
  ...safetyArticles
];
