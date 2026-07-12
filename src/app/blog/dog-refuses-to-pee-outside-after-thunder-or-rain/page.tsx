import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CloudRain,
  Droplets,
  ShieldAlert,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { GooglePlayBadge } from "@/components/GooglePlayBadge";
import { PageClarityTags } from "@/components/analytics/PageClarityTags";
import { ContactModal } from "../../contact-modal";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "../../store-links";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { ArticlePhoto } from "@/components/chillpup/ArticlePhoto";

export const metadata: Metadata = {
  title: "Dog Won’t Pee in the Rain? What’s Normal and When to Call a Vet",
  description:
    "If your dog avoids peeing in rain, learn when it may be normal wet-weather reluctance, when to call a vet, and how to plan a short sheltered potty attempt.",
  alternates: {
    canonical: "https://kf-software.com/blog/dog-refuses-to-pee-outside-after-thunder-or-rain/",
  },
  openGraph: {
    title: "Dog Won’t Pee in the Rain? What’s Normal and When to Call a Vet",
    description:
      "A practical ChillPup guide for dogs who dislike rainy potty breaks, with clear safety signs and a short sheltered setup.",
    url: "https://kf-software.com/blog/dog-refuses-to-pee-outside-after-thunder-or-rain/",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Dog Won’t Pee in the Rain? What’s Normal and When to Call a Vet",
    description:
      "If your dog avoids peeing in rain, learn when it may be normal wet-weather reluctance, when to call a vet, and how to plan a short sheltered potty attempt.",
  },
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "ChillPup", href: "/chillpup/" },
  { label: "Blog", href: "/blog/" },
  { label: "Support", href: "/support/" },
  { label: "About", href: "/about/" },
];

const vetDiscussionSigns = [
  "A sudden, unexplained change in house-training habits.",
  "An older dog who suddenly starts refusing to step outside into the cold or damp.",
  "Signs of stiffness, limping, or discomfort when moving on cold pavement or wet grass.",
];

const mildWeatherSigns = [
  "They walk perfectly on dry days but stop at the doorway when it rains.",
  "They lift their paws uncomfortably or shake their coat the moment they touch wet grass.",
  "They try to turn straight back toward the door after a quick look outside.",
];

const rainReasons = [
  {
    title: "Wet grass and cold pavement",
    text: "Walking on soggy, cold surfaces feels unpleasant on a dog’s paws and underbelly, especially for smaller or short-coated breeds.",
  },
  {
    title: "Loud rain and wind",
    text: "Shifting sounds, heavy downpours, and blowing wind can make the outdoors feel noisy and unpredictable.",
  },
  {
    title: "Rushing",
    text: "If you are holding the leash tightly, shivering, and trying to speed things up to stay dry, your dog picks up on that hurried energy and focuses on your behavior instead of peeing.",
  },
];

const avoidItems = [
  {
    title: "Do not drag them out",
    text: "Pulling a hesitant dog onto wet ground usually increases their resistance next time.",
  },
  {
    title: "Do not punish accidents",
    text: "Scolding a dog for an indoor accident after a failed trip outside creates tension around eliminating, which can lead to hidden accidents later.",
  },
  {
    title: "Do not stand outside for an hour",
    text: "Waiting in a downpour creates a frustrating standoff. Keep the trip brief.",
  },
  {
    title: "Do not force them into the open",
    text: "If there is a covered alternative nearby, use it rather than making them stand directly in the downpour.",
  },
];

const rainyPlan = [
  {
    title: "Find a sheltered spot",
    text: "Look for a large tree canopy, a building overhang, a carport, or a dry patch of ground next to a wall.",
  },
  {
    title: "Keep the attempt short",
    text: "Give your dog three to five minutes to sniff the area.",
  },
  {
    title: "Try again later if appropriate",
    text: "If nothing happens during that brief window, bring your dog back inside, keep them supervised, and try another short attempt once the rain slows down.",
  },
  {
    title: "Stay calm",
    text: "Keep a loose leash, stand quietly, and avoid hovering or staring directly at them while they look for a spot.",
  },
  {
    title: "Keep track",
    text: "Note which specific spots or weather conditions cause the most hesitation so you can plan around them.",
  },
];

const progressSigns = [
  "Stepping out onto the driveway without instantly pulling back toward the door.",
  "Sniffing a sheltered patch of grass calmly.",
  "Peeing quickly in a covered area and returning inside without stress.",
];

const vetFaqSigns = [
  "Your dog cannot pass urine at all despite trying.",
  "They strain repeatedly or only pass a few drops.",
  "You see blood in their urine or stool.",
  "Your dog vomits, seems unusually weak, or collapses.",
  "They show obvious signs of pain while peeing or pooping.",
  "They have repeated unsuccessful potty attempts.",
  "They suddenly stop following previously reliable house-training habits without an obvious environmental reason.",
];

const routineRows = [
  {
    situation: "Dog avoids potty in rain but is otherwise well",
    routine: "Rain / Weather Potty Confidence",
    href: null,
  },
  {
    situation: "Dog refuses all outdoor walks day and night",
    routine: "Outdoor Confidence Reset",
    href: "/blog/dog-suddenly-scared-to-go-outside/",
    linkLabel: "Why Is My Dog Suddenly Scared to Go Outside?",
  },
  {
    situation: "Dog walks fine by day but stops at night",
    routine: "Night Walk Confidence",
    href: "/blog/dog-suddenly-scared-of-night-walks/",
    linkLabel: "Dog Scared of Night Walks? Gentle Ways to Make Evening Walks Easier",
  },
  {
    situation: "Dog avoids going out after loud noises",
    routine: "Post-Fireworks Walk Rebuild",
    href: "/blog/dog-freezes-on-walks-after-fireworks/",
    linkLabel: "Dog Scared to Go Outside After Fireworks? What to Do First",
  },
];

export default function RainPottyConfidenceArticle() {
  const faqs = [
    {
      question: "Is it normal for dogs to avoid peeing in the rain?",
      answer: "Yes. Many dogs dislike the physical sensation of wet grass on their belly, cold pavement on their paws, or the loud noise and wind that come with a storm."
    },
    {
      question: "When should I call a vet if my dog will not pee?",
      answer: "Stop and contact your veterinarian promptly if you notice any of the following: Your dog cannot pass urine at all despite trying. They strain repeatedly or only pass a few drops. You see blood in their urine or stool. Your dog vomits, seems unusually weak, or collapses. They show obvious signs of pain while peeing or pooping. They have repeated unsuccessful potty attempts. They suddenly stop following previously reliable house-training habits without an obvious environmental reason. If your dog cannot pass urine at all, collapses, has trouble breathing, or appears severely weak or painful, seek urgent veterinary help. If none of these signs are present and your dog otherwise behaves normally, the issue may simply be rainy-day reluctance rather than a medical emergency."
    },
    {
      question: "Should I force my dog outside in bad weather?",
      answer: "No. Dragging or forcing your dog onto wet surfaces usually increases their avoidance. Several short, calm attempts are usually easier on the dog than one long standoff in the rain."
    },
    {
      question: "How can I make rainy potty breaks easier?",
      answer: "Keep the trip under five minutes, head directly to a covered area like a building overhang or a thick tree canopy, and remain calm rather than rushing your dog."
    },
    {
      question: "What ChillPup routine should I use for rainy-day potty reluctance?",
      answer: "The Rain / Weather Potty Confidence routine gives you a practical, low-pressure way to plan short, sheltered potty breaks when your dog seems otherwise well and no medical red flags are present."
    }
  ];

  return (
    <>
      <PageClarityTags siteSection="blog" product="chillpup" pageType="article" />
      <ArticleJsonLd
        title="Dog Won’t Pee in the Rain? What’s Normal and When to Call a Vet"
        description="If your dog avoids peeing in rain, learn when it may be normal wet-weather reluctance, when to call a vet, and how to plan a short sheltered potty attempt."
        url="https://kf-software.com/blog/dog-refuses-to-pee-outside-after-thunder-or-rain/"
        faqs={faqs}
      />
      <Header activeItem="Blog" navItems={navItems} />

      <main className="min-h-screen bg-gradient-to-b from-[#FAF6F0] via-[#FCFAF7] to-white text-[#526174]">
        <article>
          <section className="border-b border-slate-100/70 py-14 sm:py-18">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#0F766E] shadow-sm">
                    <CloudRain className="h-3.5 w-3.5" aria-hidden="true" />
                    Weather Potty Guide
                  </div>
                  <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-[#0F1A2C] sm:text-5xl lg:text-6xl">
                    Dog Won’t Pee in the Rain? What’s Normal and When to Call a Vet
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-[#526174]">
                    If your dog avoids peeing in the rain but seems fine otherwise, wet weather may simply be making the potty break harder. Start with a short, sheltered potty attempt and avoid forcing them. However, if your dog cannot pass urine, strains, or shows signs of discomfort, contact your veterinarian.
                  </p>
                </div>

                <div>
                  <ArticlePhoto
                    src="/assets/door/chillpup-door-preparing.jpg"
                    alt="A dog near the door on a leash before going outside"
                    aspect="portrait"
                    priority={true}
                    isHero={true}
                  />
                </div>
              </div>

              <div className="mt-10 max-w-3xl space-y-6">
                <div className="rounded-2xl border border-[#DCEFE8] bg-white p-4 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E]">
                      <Droplets className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                        ChillPup Routine
                      </p>
                      <h3 className="text-base font-extrabold text-[#0F1A2C] mt-0.5">
                        Rain / Weather Potty Confidence
                      </h3>
                    </div>
                  </div>
                  <a
                    href="#chillpup-routine"
                    className="inline-flex h-9 items-center justify-center rounded-lg bg-[#0F766E] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0B5F59]"
                  >
                    View Routine
                  </a>
                </div>

                <p className="text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  A dog slowing down or hesitating before going outside in bad weather is a common hurdle for many owners. While a rainy-day delay is usually normal, it can sometimes overlap with health changes. For dogs who seem otherwise well but dislike wet-weather potty breaks, ChillPup’s <strong>Rain / Weather Potty Confidence</strong> routine gives you a short way to plan one easier attempt without forcing or punishment.
                </p>

                <div className="rounded-2xl border border-teal-100 bg-teal-50/40 p-5 text-sm leading-6 text-[#0F1A2C]">
                  <strong>Quick answer:</strong> If your dog will not pee in the rain but seems otherwise well, use a short, sheltered potty attempt close to the door. If your dog strains, cannot urinate, seems painful, or has repeated unexplained accidents, contact your veterinarian.
                </div>
              </div>
            </div>
          </section>

          <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,720px)_320px] lg:justify-center lg:gap-12 lg:px-8 lg:py-16">
            <div className="space-y-14 lg:space-y-16">
              <section aria-labelledby="weather-check">
                <div className="rounded-[28px] border border-amber-200/70 bg-[#FFFDF9] p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-800">
                      <ShieldAlert className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 id="weather-check" className="text-2xl font-extrabold text-[#0F1A2C]">
                        First: Is This Just the Weather?
                      </h2>
                      <p className="mt-3 leading-7 text-[#526174]">
                        To handle this effectively, it helps to distinguish between a simple dislike of the rain and signs that require professional medical attention.
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 space-y-7">
                    <section>
                      <h3 className="text-lg font-extrabold text-[#0F1A2C]">1. Urgent Medical Signs</h3>
                      <p className="mt-2 text-sm leading-6 text-[#526174]">
                        If your dog cannot pass urine at all, collapses, has trouble breathing, or appears severely weak or painful, seek urgent veterinary help.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-extrabold text-[#0F1A2C]">2. Signs to Discuss with a Vet Before Changing Your Routine</h3>
                      <p className="mt-2 text-sm leading-6 text-[#526174]">
                        Speak with your veterinarian to rule out physical discomfort if you notice these changes:
                      </p>
                      <ul className="mt-3 space-y-2">
                        {vetDiscussionSigns.map((sign) => (
                          <li key={sign} className="flex gap-3 text-sm leading-6 text-[#526174]">
                            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
                            <span>{sign}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-extrabold text-[#0F1A2C]">3. Mild Weather Reluctance</h3>
                      <p className="mt-2 text-sm leading-6 text-[#526174]">
                        If your dog displays the following habits, they are likely just avoiding the elements:
                      </p>
                      <ul className="mt-3 space-y-2">
                        {mildWeatherSigns.map((sign) => (
                          <li key={sign} className="flex gap-3 text-sm leading-6 text-[#526174]">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0F766E]" aria-hidden="true" />
                            <span>{sign}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </div>
              </section>

              <section aria-labelledby="rain-reasons">
                <h2 id="rain-reasons" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Why Some Dogs Avoid the Rain
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  Most dogs who hesitate in bad weather are simply reacting to an uncomfortable shift in their environment.
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:hidden">
                  {rainReasons.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
                      <h3 className="text-base font-extrabold text-[#0F1A2C]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#526174]">{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 hidden space-y-5 lg:block">
                  {rainReasons.map((item) => (
                    <div key={item.title} className="border-l border-slate-200 pl-5">
                      <h3 className="text-lg font-extrabold text-[#0F1A2C]">{item.title}</h3>
                      <p className="mt-2 text-[17px] leading-8 text-[#526174]">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="avoid">
                <h2 id="avoid" className="text-3xl font-extrabold text-[#0F1A2C]">
                  What to Avoid When Your Dog Freezes
                </h2>

                <div className="mt-6 space-y-4 lg:hidden">
                  {avoidItems.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
                      <h3 className="text-base font-extrabold text-[#0F1A2C]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#526174]">{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 hidden space-y-6 lg:block">
                  {avoidItems.map((item) => (
                    <section key={item.title} className="border-l border-slate-200 pl-5">
                      <h3 className="text-lg font-extrabold text-[#0F1A2C]">{item.title}</h3>
                      <p className="mt-2 text-[17px] leading-8 text-[#526174]">{item.text}</p>
                    </section>
                  ))}
                </div>
              </section>

              <section aria-labelledby="rainy-plan">
                <h2 id="rainy-plan" className="text-3xl font-extrabold text-[#0F1A2C]">
                  A Simple Plan for Rainy Days
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  Instead of attempting your usual neighborhood loop during a storm, focus on a quick and practical routine.
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:hidden">
                  {rainyPlan.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
                      <h3 className="text-base font-extrabold text-[#0F1A2C]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#526174]">{item.text}</p>
                    </div>
                  ))}
                </div>

                <ul className="mt-6 hidden space-y-4 lg:block">
                  {rainyPlan.map((item) => (
                    <li key={item.title} className="flex gap-3 text-[17px] leading-8 text-[#526174]">
                      <CheckCircle2 className="mt-1.5 h-5 w-5 shrink-0 text-[#0F766E]" aria-hidden="true" />
                      <span>
                        <strong className="text-[#0F1A2C]">{item.title}:</strong> {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <ArticlePhoto
                src="/assets/walk-day/chillpup-walk-day-sniffing.jpg"
                alt="A dog sniffing grass during a short outdoor potty attempt"
                caption="For weather-sensitive dogs, the first goal may simply be a brief, low-pressure attempt."
                aspect="wide"
                className="my-8"
              />

              <section aria-labelledby="progress">
                <h2 id="progress" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Small Signs of Progress
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  When a dog dislikes wet conditions, success is built through small habits rather than instant changes. A good outing might simply look like:
                </p>
                <ul className="mt-5 space-y-3">
                  {progressSigns.map((sign) => (
                    <li key={sign} className="flex gap-3 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0F766E]" aria-hidden="true" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  If your dog handles the rain well but refuses to move once the sun sets, you can read our guide on{" "}
                  <a href="/blog/dog-suddenly-scared-of-night-walks/" className="font-semibold text-[#0F766E] hover:underline">
                    Dog Scared of Night Walks? Gentle Ways to Make Evening Walks Easier
                  </a>. For broader outdoor hesitation, see{" "}
                  <a href="/blog/dog-suddenly-scared-to-go-outside/" className="font-semibold text-[#0F766E] hover:underline">
                    Why Is My Dog Suddenly Scared to Go Outside?
                  </a>{" "}
                  or check our tips for seasonal disruptions like{" "}
                  <a href="/blog/dog-freezes-on-walks-after-fireworks/" className="font-semibold text-[#0F766E] hover:underline">
                    Dog Scared to Go Outside After Fireworks? What to Do First
                  </a>.
                </p>
              </section>

              <section id="chillpup-routine" aria-labelledby="routine-fit">
                <h2 id="routine-fit" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Which ChillPup Routine Fits Your Situation?
                </h2>

                <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead className="bg-slate-50 text-[#0F1A2C]">
                      <tr>
                        <th className="px-4 py-3 font-extrabold sm:px-6">Situation</th>
                        <th className="px-4 py-3 font-extrabold sm:px-6">Start with this ChillPup routine</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {routineRows.map((row) => (
                        <tr key={row.situation}>
                          <td className="px-4 py-4 align-top text-[#526174] sm:px-6">{row.situation}</td>
                          <td className="px-4 py-4 align-top font-semibold text-[#0F1A2C] sm:px-6">
                            {row.href && row.linkLabel ? (
                              <>
                                <a href={row.href} className="text-[#0F766E] hover:underline">
                                  {row.linkLabel}
                                </a>{" "}
                                → {row.routine}
                              </>
                            ) : (
                              row.routine
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-5 text-sm leading-6 text-[#526174]">
                  Use ChillPup routines for everyday support when no medical red flags are present. They are not a replacement for professional veterinary care or advice from a qualified behavior professional.
                </p>
              </section>

              <section aria-labelledby="faq">
                <h2 id="faq" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Frequently Asked Questions
                </h2>
                <div className="mt-6 divide-y divide-slate-100 rounded-[24px] border border-slate-200 bg-white shadow-sm">
                  <FaqItem title="Is it normal for dogs to avoid peeing in the rain?">
                    <p>Yes. Many dogs dislike the physical sensation of wet grass on their belly, cold pavement on their paws, or the loud noise and wind that come with a storm.</p>
                  </FaqItem>

                  <FaqItem title="When should I call a vet if my dog will not pee?">
                    <p>Stop and contact your veterinarian promptly if you notice any of the following:</p>
                    <ul className="mt-3 space-y-2">
                      {vetFaqSigns.map((sign) => (
                        <li key={sign} className="flex gap-3">
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
                          <span>{sign}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3">
                      If your dog cannot pass urine at all, collapses, has trouble breathing, or appears severely weak or painful, seek urgent veterinary help.
                    </p>
                    <p className="mt-3">
                      If none of these signs are present and your dog otherwise behaves normally, the issue may simply be rainy-day reluctance rather than a medical emergency.
                    </p>
                  </FaqItem>

                  <FaqItem title="Should I force my dog outside in bad weather?">
                    <p>No. Dragging or forcing your dog onto wet surfaces usually increases their avoidance. Several short, calm attempts are usually easier on the dog than one long standoff in the rain.</p>
                  </FaqItem>

                  <FaqItem title="How can I make rainy potty breaks easier?">
                    <p>Keep the trip under five minutes, head directly to a covered area like a building overhang or a thick tree canopy, and remain calm rather than rushing your dog.</p>
                  </FaqItem>

                  <FaqItem title="What ChillPup routine should I use for rainy-day potty reluctance?">
                    <p>The <strong>Rain / Weather Potty Confidence</strong> routine gives you a practical, low-pressure way to plan short, sheltered potty breaks when your dog seems otherwise well and no medical red flags are present.</p>
                  </FaqItem>
                </div>
              </section>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[28px] border border-[#DCEFE8] bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0F766E]">
                  Try the matching routine
                </p>
                <h2 className="mt-3 text-2xl font-extrabold text-[#0F1A2C]">
                  Rain / Weather Potty Confidence
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#526174]">
                  A short, owner-guided ChillPup routine for mild wet-weather potty reluctance when no medical red flags are present.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={APP_STORE_URL}
                    aria-label="Download ChillPup on the App Store"
                    className="inline-flex justify-center transition hover:opacity-85"
                  >
                    <AppStoreBadge className="h-[42px] w-auto" />
                  </a>
                  <a
                    href={GOOGLE_PLAY_URL}
                    aria-label="Get ChillPup on Google Play"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex justify-center transition hover:opacity-85"
                  >
                    <GooglePlayBadge className="h-[42px] w-auto" />
                  </a>
                </div>
                <p className="mt-5 border-t border-slate-100 pt-5 text-xs leading-5 text-[#526174]">
                  ChillPup is not a veterinary or diagnostic app. If your dog shows sudden severe symptoms, pain, collapse, seizures, appetite changes, or unexplained panting or shaking, contact a veterinarian.
                </p>
              </div>
            </aside>
          </div>
        </article>
      </main>

      <Footer />
      <ContactModal />
    </>
  );
}

function FaqItem({
  title,
  children,
}: Readonly<{
  title: string;
  children: ReactNode;
}>) {
  return (
    <section className="p-5 sm:p-6">
      <h3 className="text-lg font-extrabold text-[#0F1A2C]">{title}</h3>
      <div className="mt-2 space-y-3 text-sm leading-6 text-[#526174]">{children}</div>
    </section>
  );
}
