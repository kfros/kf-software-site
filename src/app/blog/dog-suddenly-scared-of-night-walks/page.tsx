import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Footprints,
  Moon,
  ShieldAlert,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { GooglePlayBadge } from "@/components/GooglePlayBadge";
import { PageClarityTags } from "@/components/analytics/PageClarityTags";
import { ContactModal } from "../../contact-modal";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "../../store-links";

export const metadata: Metadata = {
  title: "Dog Scared of Night Walks? Gentle Ways to Make Evening Walks Easier",
  description:
    "If your dog walks fine by day but freezes at night, learn what to check first and how to make evening walks shorter, brighter, and less stressful.",
  alternates: {
    canonical: "https://kf-software.com/blog/dog-suddenly-scared-of-night-walks/",
  },
  openGraph: {
    title: "Dog Scared of Night Walks? Gentle Ways to Make Evening Walks Easier",
    description:
      "A practical ChillPup guide for dogs who manage daytime walks but hesitate, freeze, or scan the street after dark.",
    url: "https://kf-software.com/blog/dog-suddenly-scared-of-night-walks/",
    type: "article",
  },
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "ChillPup", href: "/chillpup/" },
  { label: "Blog", href: "/blog/" },
  { label: "Support", href: "/support/" },
  { label: "About", href: "/about/" },
];

const healthChecks = [
  "The fear started overnight.",
  "An older dog suddenly seems disoriented or bumps into objects in low light.",
  "The dog limps, stiffens, or shows physical signs of pain.",
  "You notice heavy panting, trembling, or extreme distress.",
  "The route has active hazards like heavy traffic, poor lighting, loose dogs, or construction.",
];

const nightChanges = [
  {
    title: "Visual shifts",
    text: "Shadows stretch, headlights create sudden reflections, and a bush that looks normal at noon can look unrecognizable at 8 PM.",
  },
  {
    title: "Surprise factors",
    text: "Scooters, bikes, or pedestrians appear suddenly from dark corners, leaving less time for a dog to process their presence.",
  },
  {
    title: "Environmental sounds",
    text: "Wind, rustling trash, or nocturnal wildlife sound louder when daytime traffic quiets down.",
  },
  {
    title: "Leash tension",
    text: "If you feel uneasy walking after dark, your dog may feel the tightened leash and start scanning the street too.",
  },
];

const freezeSteps = [
  {
    title: "If your dog stops at the doorway",
    text: "Do not drag them out. Stay near the entrance for a minute or two, let them look around, and go back inside if they still refuse to move.",
  },
  {
    title: "If your dog plants their feet on the sidewalk",
    text: "Stop pulling. Let them scan the street. Forcing them forward teaches them that night walks come with conflict.",
  },
  {
    title: "If your dog pulls back toward home",
    text: "Turn around. If they relax as soon as you head back, the current environment was probably too much for tonight.",
  },
  {
    title: "If they startle at a shadow",
    text: "Give them distance. Do not march them toward the object to prove it is harmless.",
  },
];

const tonightSteps = [
  {
    title: "Stick to the daytime route",
    text: "Do not experiment with new paths in the dark.",
  },
  {
    title: "Cut the distance in half",
    text: "A successful trip to the closest lamppost is better than a stressful mile.",
  },
  {
    title: "Follow the light",
    text: "Pick well-lit streets even if it makes the walk repetitive.",
  },
  {
    title: "Skip high-trigger spots",
    text: "Avoid blind corners or narrow alleys where someone can surprise you.",
  },
  {
    title: "Keep your voice steady",
    text: "Use a quiet, normal tone. Do not rush the pace.",
  },
  {
    title: "Track what works",
    text: "Note which streets, times, or lighting levels cause the least hesitation.",
  },
];

const wins = [
  "Stepping out onto the driveway without trembling.",
  "Sniffing near the building entrance.",
  "Reaching the first corner and turning back calmly.",
];

const routineRows = [
  {
    situation: "Dog walks fine by day but stops at night",
    routine: "Night Walk Confidence",
    href: null,
  },
  {
    situation: "Dog refuses all outdoor walks day and night",
    routine: "Outdoor Confidence Reset",
    href: "/blog/dog-suddenly-scared-to-go-outside/",
    linkLabel: "Why Is My Dog Suddenly Scared to Go Outside?",
  },
  {
    situation: "Dog is afraid to go outside after recent fireworks",
    routine: "Post-Fireworks Walk Rebuild",
    href: "/blog/dog-freezes-on-walks-after-fireworks/",
    linkLabel: "Dog Scared to Go Outside After Fireworks? What to Do First",
  },
  {
    situation: "Dog refuses to go out in wet weather",
    routine: "Rain / Weather Potty Confidence",
    href: "/blog/dog-refuses-to-pee-outside-after-thunder-or-rain/",
    linkLabel: "Dog Won’t Pee in the Rain? What’s Normal and When to Call a Vet",
  },
];

export default function NightWalkConfidenceArticle() {
  return (
    <>
      <PageClarityTags siteSection="blog" product="chillpup" pageType="article" />
      <Header activeItem="Blog" navItems={navItems} />

      <main className="min-h-screen bg-gradient-to-b from-[#FAF6F0] via-[#FCFAF7] to-white text-[#526174]">
        <article>
          <section className="border-b border-slate-100/70 py-14 sm:py-18">
            <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#0F766E] shadow-sm">
                  <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                  Walk Fear Guide
                </div>
                <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-[#0F1A2C] sm:text-5xl lg:text-6xl">
                  Dog Scared of Night Walks? Gentle Ways to Make Evening Walks Easier
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#526174]">
                  If a dog walks normally during the day but freezes, plants their feet, or refuses the evening route, check for sudden vision or health issues first. If health concerns are cleared, stop pulling them forward. Make the route shorter, brighter, and let them turn back early.
                </p>
                <p className="mt-5 max-w-2xl text-base leading-7 text-[#526174]">
                  When a dog walks fine during the day but stops at the doorway or scans the street anxiously at dark, the environment is likely the trigger. Night changes how things look, sound, and smell. For dogs who seem physically well and mainly struggle with the evening route, ChillPup’s <strong>Night Walk Confidence</strong> routine gives you a practical way to choose a smaller, calmer first step before you head out tonight.
                </p>
              </div>

              <aside className="rounded-[32px] border border-[#DCEFE8] bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-[#0F766E]">
                    <Footprints className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0F766E]">
                      ChillPup Routine
                    </p>
                    <h2 className="mt-2 text-2xl font-extrabold text-[#0F1A2C]">
                      Night Walk Confidence
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[#526174]">
                      For dogs who manage daytime walks but need a smaller, calmer plan after dark.
                    </p>
                  </div>
                </div>
                <a
                  href="#chillpup-routine"
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0B5F59] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:ring-offset-2"
                >
                  Find the matching routine
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </aside>
            </div>
          </section>

          <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,720px)_320px] lg:justify-center lg:gap-12 lg:px-8 lg:py-16">
            <div className="space-y-14 lg:space-y-16">
              <section aria-labelledby="health-safety">
                <div className="rounded-[28px] border border-amber-200/70 bg-[#FFFDF9] p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-800">
                      <ShieldAlert className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 id="health-safety" className="text-2xl font-extrabold text-[#0F1A2C]">
                        First, Check for Health or Safety Concerns
                      </h2>
                      <p className="mt-3 leading-7 text-[#526174]">
                        Rule out physical issues before treating this as a confidence or environment problem. Speak with your veterinarian before treating this as a confidence issue if:
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {healthChecks.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-[#526174]">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-2xl border border-amber-200 bg-white p-4 text-sm leading-6 text-[#526174]">
                    <strong className="text-[#0F1A2C]">Urgent signs:</strong> If your dog collapses, has trouble breathing, or seems severely distressed, seek urgent veterinary help.
                  </div>

                  <blockquote className="mt-6 border-l-4 border-amber-400 pl-4 text-sm leading-6 text-[#526174]">
                    ChillPup does not evaluate vision decline, pain, or illness. Speak with your veterinarian if you notice these signs.
                  </blockquote>
                </div>
              </section>

              <section aria-labelledby="night-changes">
                <h2 id="night-changes" className="text-3xl font-extrabold text-[#0F1A2C]">
                  What Changes When the Sun Goes Down
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  A dog afraid to walk at night is responding to a shifting environment, not simply being stubborn.
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:hidden">
                  {nightChanges.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
                      <h3 className="text-base font-extrabold text-[#0F1A2C]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#526174]">{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 hidden space-y-5 lg:block">
                  {nightChanges.map((item) => (
                    <div key={item.title} className="border-l border-slate-200 pl-5">
                      <h3 className="text-lg font-extrabold text-[#0F1A2C]">{item.title}</h3>
                      <p className="mt-2 text-[17px] leading-8 text-[#526174]">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="freezes">
                <h2 id="freezes" className="text-3xl font-extrabold text-[#0F1A2C]">
                  What to Do in the Moment When Your Dog Freezes
                </h2>

                <div className="mt-6 space-y-4 lg:hidden">
                  {freezeSteps.map((step) => (
                    <div key={step.title} className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
                      <h3 className="text-base font-extrabold text-[#0F1A2C]">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#526174]">{step.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 hidden space-y-6 lg:block">
                  {freezeSteps.map((step) => (
                    <section key={step.title} className="border-l border-slate-200 pl-5">
                      <h3 className="text-lg font-extrabold text-[#0F1A2C]">{step.title}</h3>
                      <p className="mt-2 text-[17px] leading-8 text-[#526174]">{step.text}</p>
                    </section>
                  ))}
                </div>
              </section>

              <section aria-labelledby="tonight">
                <h2 id="tonight" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Small Changes for Tonight&apos;s Walk
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  Give your dog a clear, manageable setup rather than trying to finish the usual route.
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:hidden">
                  {tonightSteps.map((step) => (
                    <div key={step.title} className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
                      <h3 className="text-base font-extrabold text-[#0F1A2C]">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#526174]">{step.text}</p>
                    </div>
                  ))}
                </div>

                <ul className="mt-6 hidden space-y-4 lg:block">
                  {tonightSteps.map((step) => (
                    <li key={step.title} className="flex gap-3 text-[17px] leading-8 text-[#526174]">
                      <CheckCircle2 className="mt-1.5 h-5 w-5 shrink-0 text-[#0F766E]" aria-hidden="true" />
                      <span>
                        <strong className="text-[#0F1A2C]">{step.title}:</strong> {step.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-[24px] border border-[#DCEFE8] bg-[#F3FBF8] p-6">
                  <p className="text-base leading-7 text-[#0F1A2C]">
                    Before you head out tonight, open ChillPup’s <strong>Night Walk Confidence</strong> routine to set up a shorter, clear evening route that avoids pushing your dog past their limits.
                  </p>
                </div>
              </section>

              <section aria-labelledby="success">
                <h2 id="success" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Redefining a Successful Night Walk
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  Success isn&apos;t measured in miles. When a dog is hesitant, a win looks like:
                </p>
                <ul className="mt-5 space-y-3">
                  {wins.map((win) => (
                    <li key={win} className="flex gap-3 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0F766E]" aria-hidden="true" />
                      <span>{win}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  Choosing a short, safe option keeps the experience positive. If your dog is struggling with stepping out during the day as well, read our guide on{" "}
                  <a href="/blog/dog-suddenly-scared-to-go-outside/" className="font-semibold text-[#0F766E] hover:underline">
                    Why Is My Dog Suddenly Scared to Go Outside?
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
                  ChillPup routines provide structured owner-guided steps. They are not veterinary care and do not replace advice from your veterinarian or a qualified behavior professional.
                </p>
              </section>

              <section aria-labelledby="faq">
                <h2 id="faq" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Frequently Asked Questions
                </h2>
                <div className="mt-6 divide-y divide-slate-100 rounded-[24px] border border-slate-200 bg-white shadow-sm">
                  <FaqItem title="Why is my dog only scared to walk at night?">
                    Night changes the visual landscape and acoustics. Lower visibility turns normal objects into strange shapes, moving shadows appear from streetlights, and sudden noises feel much louder without daytime background noise.
                  </FaqItem>
                  <FaqItem title="Should I force my dog to keep walking if they freeze?">
                    No. Forcing or dragging a dog typically increases their hesitation. If your dog freezes, let them pause, observe from a distance, and calmly turn back toward home if they remain uncomfortable.
                  </FaqItem>
                  <FaqItem title="Could sudden night fear be a health problem?">
                    Yes. Changes in vision, sudden physical pain, or cognitive changes in older dogs can cause a dog to feel unsure in low light. Speak with your veterinarian to rule out medical issues first.
                  </FaqItem>
                  <FaqItem title="Is it okay to make night walks shorter?">
                    Yes. For a nervous dog, a calm two-minute outing can be more useful than a forced twenty-minute loop. The goal is to finish before your dog is overwhelmed, not to hit a normal distance at any cost.
                  </FaqItem>
                  <FaqItem title="What ChillPup routine should I use for night walk fear?">
                    Before your next evening outing, open <strong>Night Walk Confidence</strong> in <strong>ChillPup</strong> and choose a smaller first step: a familiar route, better lighting, and permission to turn back early.
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
                  Night Walk Confidence
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#526174]">
                  A short, owner-guided ChillPup routine for dogs who walk better during the day but hesitate after dark.
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
      <p className="mt-2 text-sm leading-6 text-[#526174]">{children}</p>
    </section>
  );
}
