import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Compass,
  Footprints,
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
  title: "Why Is My Dog Suddenly Scared to Go Outside?",
  description:
    "If your dog suddenly refuses to go outside, learn what to check first, what not to do, and how to start with a smaller outdoor step.",
  alternates: {
    canonical: "https://kf-software.com/blog/dog-suddenly-scared-to-go-outside/",
  },
  openGraph: {
    title: "Why Is My Dog Suddenly Scared to Go Outside?",
    description:
      "A practical ChillPup guide for dogs who freeze at the door, refuse walks, or turn back from familiar outdoor places.",
    url: "https://kf-software.com/blog/dog-suddenly-scared-to-go-outside/",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Why Is My Dog Suddenly Scared to Go Outside?",
    description:
      "If your dog suddenly refuses to go outside, learn what to check first, what not to do, and how to start with a smaller outdoor step.",
  },
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "ChillPup", href: "/chillpup/" },
  { label: "Blog", href: "/blog/" },
  { label: "Research", href: "/research/social-agency-workflows/" },
  { label: "Support", href: "/support/" },
  { label: "About", href: "/about/" },
];

const urgentSigns = [
  "Your dog cannot urinate or strains without passing anything.",
  "They show sudden weakness, lethargy, collapse, or breathing trouble.",
  "They are vomiting, have severe diarrhea, or show signs of acute illness.",
  "They are in obvious severe distress, shaking uncontrollably, or panting heavily without physical exertion.",
];

const vetDiscussionSigns = [
  "The refusal started completely overnight without an obvious trigger.",
  "Your dog limps, stiffens, yelps, or actively resists moving their limbs.",
  "An older dog seems confused, disoriented, or unsure of where they are in familiar environments.",
  "Your dog has started having repeated potty accidents indoors for no clear reason.",
];

const avoidanceReasons = [
  {
    title: "A recent scary event",
    text: "A sudden car backfire, a loose dog charging the fence, or a loud construction bang can cause a dog to associate that specific street or exit with discomfort.",
  },
  {
    title: "Night-time changes",
    text: "Headlights, shifting shadows from streetlamps, or reduced visibility can turn a normal route into a struggle.",
    href: "/blog/dog-suddenly-scared-of-night-walks/",
    linkLabel: "Dog Scared of Night Walks? Gentle Ways to Make Evening Walks Easier",
  },
  {
    title: "Weather elements",
    text: "Blowing wind, heavy rain, cold pavement, or wet grass can make a dog completely skip their usual spots.",
    href: "/blog/dog-refuses-to-pee-outside-after-thunder-or-rain/",
    linkLabel: "Dog Refuses to Pee Outside After Thunder or Rain",
  },
  {
    title: "Sensory shifts in older dogs",
    text: "As sight or hearing declines, sudden changes in outdoor lighting or unexpected sounds from garbage trucks can cause them to freeze.",
  },
  {
    title: "Accumulated pressure",
    text: "If a dog hesitates once and is repeatedly forced or dragged along the same path, the tension on the leash makes them expect another difficult experience.",
  },
];

const avoidItems = [
  {
    title: "Do not drag or pull them forward",
    text: "Forcing a dog through fear teaches them that the door leads to a struggle, which worsens the refusal tomorrow.",
  },
  {
    title: "Do not punish or scold",
    text: "Saying no or showing frustration when they freeze does not make the sidewalk feel safer.",
  },
  {
    title: "Do not force the full walk",
    text: "Trying to complete a two-mile loop when your dog plants their feet at the driveway creates unnecessary conflict.",
  },
  {
    title: "Do not keep repeating the same failed route",
    text: "If your dog stops at the exact same corner every day, stop walking toward that corner for now.",
  },
  {
    title: "Do not ignore physical red flags",
    text: "Never assume a dog is just being stubborn if they show signs of pain or structural stiffness.",
  },
];

const smallerSteps = [
  {
    title: "Start at the doorway or driveway",
    text: "If your dog stops at the threshold, just stand there with a loose leash for two minutes. Let them look outside, then turn back inside calmly.",
  },
  {
    title: "Use the easiest familiar exit",
    text: "If the front door faces a busy street where a loud truck recently passed, try using a quiet side door or a back gate.",
  },
  {
    title: "Choose a calm time of day",
    text: "Schedule short steps outside during low-traffic hours when delivery trucks, school buses, and lawnmowers are absent.",
  },
  {
    title: "Keep the leash loose",
    text: "A tight leash signals to your dog that you are tense, which prompts them to scan the street for danger.",
  },
  {
    title: "Let them look and sniff",
    text: "If they want to stand still and watch a leaf blow or sniff a single patch of grass for three minutes, let them do it without rushing.",
  },
  {
    title: "Turn back before they panic",
    text: "If you notice their ears pin back or their tail tuck, turn around willingly before they pull you back toward the house.",
  },
  {
    title: "Track what changed",
    text: "Note down the exact spots where they hesitate, the time of day, and the weather so you can spot patterns.",
  },
];

const routineRows = [
  {
    situation: "Dog suddenly refuses outdoor walks in general",
    routine: "Outdoor Confidence Reset",
    href: null,
  },
  {
    situation: "Dog walks fine by day but freezes at night",
    routine: "Night Walk Confidence",
    href: "/blog/dog-suddenly-scared-of-night-walks/",
    linkLabel: "Dog Scared of Night Walks? Gentle Ways to Make Evening Walks Easier",
  },
  {
    situation: "Dog avoids potty in rain or wet weather",
    routine: "Rain / Weather Potty Confidence",
    href: "/blog/dog-refuses-to-pee-outside-after-thunder-or-rain/",
    linkLabel: "Dog Refuses to Pee Outside After Thunder or Rain",
  },
  {
    situation: "Dog is afraid to go outside after fireworks",
    routine: "Post-Fireworks Walk Rebuild",
    href: "/blog/dog-freezes-on-walks-after-fireworks/",
    linkLabel: "Dog Freezes on Walks After Fireworks",
  },
  {
    situation: "Loud noise is happening right now",
    routine: "Thunder & Fireworks Safe Space",
    href: null,
  },
  {
    situation: "Loud event ended; dog remains unsettled indoors",
    routine: "Post-Fireworks Recovery at Home",
    href: null,
  },
];

export default function OutdoorConfidenceResetArticle() {
  const faqs = [
    {
      question: "Why did my dog suddenly become scared to go outside?",
      answer: "Sudden changes are usually triggered by a recent negative experience, such as a loud noise or an encounter with a loose dog, sudden changes in health or vision, uncomfortable weather, or owner tension on the leash."
    },
    {
      question: "Should I force my dog to walk if they refuse?",
      answer: "No. Forcing or dragging your dog past their comfort zone typically increases their avoidance. It is much more effective to keep trips incredibly short and let them turn back before they get overwhelmed."
    },
    {
      question: "Could sudden outdoor fear be medical?",
      answer: "Yes. Conditions that cause physical pain, sudden vision loss, hearing changes, or cognitive changes in senior dogs can cause them to feel insecure outdoors. Have your veterinarian check them over first."
    },
    {
      question: "What if my dog only refuses at night?",
      answer: "This is common due to reduced visibility, moving shadows from streetlights, or pedestrians appearing suddenly. Stick to brightly lit, highly familiar paths and shorten the route."
    },
    {
      question: "What if this started after fireworks?",
      answer: "Loud, unpredictable sounds can make the next outdoor attempt feel unsafe to the dog. Focus on indoor comfort first, and keep your initial outdoor trips limited to very quick potty breaks close to the door using the Post-Fireworks Walk Rebuild routine."
    },
    {
      question: "Which ChillPup routine should I use?",
      answer: "If the refusal is general and happens during the day, start with the Outdoor Confidence Reset. If it is tied to specific triggers like storms, darkness, or fireworks, use the dedicated specialized routine listed in the routing table above."
    }
  ];

  return (
    <>
      <PageClarityTags siteSection="blog" product="chillpup" pageType="article" />
      <ArticleJsonLd
        title="Why Is My Dog Suddenly Scared to Go Outside?"
        description="If your dog suddenly refuses to go outside, learn what to check first, what not to do, and how to start with a smaller outdoor step."
        url="https://kf-software.com/blog/dog-suddenly-scared-to-go-outside/"
        faqs={faqs}
      />
      <Header activeItem="Blog" navItems={navItems} />

      <main className="min-h-screen bg-gradient-to-b from-[#FAF6F0] via-[#FCFAF7] to-white text-[#526174]">
        <article>
          <section className="border-b border-slate-100/70 py-14 sm:py-18">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#0F766E] shadow-sm">
                <Compass className="h-3.5 w-3.5" aria-hidden="true" />
                Walk Fear Pillar Guide
              </div>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-[#0F1A2C] sm:text-5xl lg:text-6xl">
                Why Is My Dog Suddenly Scared to Go Outside?
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#526174]">
                If your dog suddenly refuses to go outside, do not start by pulling harder or trying to finish the usual walk. First, check whether anything has changed: your dog’s health, the route, the weather, the time of day, recent loud noises, or a scary outdoor moment.
              </p>

              <ArticlePhoto
                src="/assets/door/chillpup-door-sitting.jpg"
                alt="A small dog sitting near the door on a leash before going outside"
                priority={true}
                variant="heroCompactPortrait"
                className="mt-6"
              />

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-[#DCEFE8] bg-white p-4 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E]">
                      <Footprints className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                        ChillPup Routine
                      </p>
                      <h3 className="text-base font-extrabold text-[#0F1A2C] mt-0.5">
                        Outdoor Confidence Reset
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
                  If your dog seems painful, weak, confused, disoriented, suddenly unable to potty, or severely distressed, contact your veterinarian before assuming this is a confidence issue.
                </p>
                <p className="text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  If your dog seems otherwise well but has started freezing at the door, planting their feet, or turning back from familiar places, start smaller. A short step outside, a familiar route, and an easy turn-back point are more useful than forcing the old routine.
                </p>
                <p className="text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  For dogs who seem otherwise well but suddenly struggle with going outside, ChillPup’s <strong>Outdoor Confidence Reset</strong> routine helps you choose a smaller, owner-guided first step instead of pushing through the usual walk.
                </p>

                <div className="rounded-2xl border border-teal-100 bg-teal-50/40 p-5 text-sm leading-6 text-[#0F1A2C]">
                  <strong>Quick answer:</strong> If your dog suddenly refuses to go outside, first check for pain, illness, unsafe route changes, recent loud noises, weather, and time-of-day triggers. If no medical red flags are present, start with a smaller outdoor step instead of forcing the usual walk.
                </div>
              </div>
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
                        First, Check for Health or Safety Changes
                      </h2>
                      <p className="mt-3 leading-7 text-[#526174]">
                        Do not treat this as an obedience problem if your dog seems painful, weak, sick, confused, or suddenly unable to pee or poop normally. Physical changes can make a dog feel vulnerable outside, causing them to suddenly avoid walks.
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 space-y-7">
                    <section>
                      <h3 className="text-lg font-extrabold text-[#0F1A2C]">Urgent Signs to Address Immediately</h3>
                      <p className="mt-2 text-sm leading-6 text-[#526174]">
                        Contact your veterinarian promptly if you notice any of these signs:
                      </p>
                      <ul className="mt-3 space-y-2">
                        {urgentSigns.map((sign) => (
                          <li key={sign} className="flex gap-3 text-sm leading-6 text-[#526174]">
                            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
                            <span>{sign}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-extrabold text-[#0F1A2C]">Signs to Discuss with Your Vet Before Using a Routine</h3>
                      <p className="mt-2 text-sm leading-6 text-[#526174]">
                        Schedule a veterinary visit to check for discomfort or sensory changes if:
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
                      <h3 className="text-lg font-extrabold text-[#0F1A2C]">Environmental Hazards</h3>
                      <p className="mt-2 text-sm leading-6 text-[#526174]">
                        Sometimes the issue isn&apos;t medical, but the route itself is genuinely unsafe. Check for immediate hazards like heavy construction noise, active thunderstorms, fireworks, loose neighborhood dogs, heavy traffic, or unsafe footing like ice or broken glass.
                      </p>
                    </section>
                  </div>
                </div>
              </section>

              <section aria-labelledby="why-outside">
                <h2 id="why-outside" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Why Dogs Suddenly Avoid Going Outside
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  When a dog stops at the doorway or hides when the leash appears, something in their environment has disrupted their sense of predictability.
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:hidden">
                  {avoidanceReasons.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
                      <h3 className="text-base font-extrabold text-[#0F1A2C]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#526174]">
                        {item.text}
                        {item.href && item.linkLabel ? (
                          <>
                            {" "}If this sounds like your dog, read our guide on{" "}
                            <a href={item.href} className="font-semibold text-[#0F766E] hover:underline">
                              {item.linkLabel}
                            </a>.
                          </>
                        ) : null}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 hidden space-y-5 lg:block">
                  {avoidanceReasons.map((item) => (
                    <div key={item.title} className="border-l border-slate-200 pl-5">
                      <h3 className="text-lg font-extrabold text-[#0F1A2C]">{item.title}</h3>
                      <p className="mt-2 text-[17px] leading-8 text-[#526174]">
                        {item.text}
                        {item.href && item.linkLabel ? (
                          <>
                            {" "}If this sounds like your dog, read our guide on{" "}
                            <a href={item.href} className="font-semibold text-[#0F766E] hover:underline">
                              {item.linkLabel}
                            </a>.
                          </>
                        ) : null}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <ArticlePhoto
                src="/assets/walk-day/chillpup-walk-day-sniffing.jpg"
                alt="A dog calmly sniffing grass during a short outdoor walk"
                caption="Short, familiar outdoor moments can be enough at first."
                aspect="wide"
                className="my-8"
              />

              <section aria-labelledby="what-not-to-do">
                <h2 id="what-not-to-do" className="text-3xl font-extrabold text-[#0F1A2C]">
                  What Not to Do
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

              <section aria-labelledby="start-smaller">
                <h2 id="start-smaller" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Start Smaller Than the Usual Walk
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  If your dog seems otherwise well but refuses their normal walk, you need to change your definition of success.
                </p>
                <blockquote className="mt-6 rounded-[24px] border border-[#DCEFE8] bg-[#F3FBF8] p-6 text-base leading-7 text-[#0F1A2C]">
                  The first goal is not a normal walk. The first goal is a clean, calm attempt that does not make tomorrow harder.
                </blockquote>

                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:hidden">
                  {smallerSteps.map((step) => (
                    <div key={step.title} className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
                      <h3 className="text-base font-extrabold text-[#0F1A2C]">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#526174]">{step.text}</p>
                    </div>
                  ))}
                </div>

                <ul className="mt-6 hidden space-y-4 lg:block">
                  {smallerSteps.map((step) => (
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
                    If your dog seems otherwise well but suddenly struggles with going outside, open ChillPup’s <strong>Outdoor Confidence Reset</strong> routine and choose a smaller first step before the next attempt.
                  </p>
                </div>
              </section>

              <ArticlePhoto
                src="/assets/walk-day/chillpup-walk-day-watching-up.jpg"
                alt="A dog looking up toward its owner during a walk"
                caption="A check-in moment can be more useful than pushing forward."
                aspect="portrait"
                className="my-8"
              />

              <section id="chillpup-routine" aria-labelledby="routine-fit">
                <h2 id="routine-fit" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Which ChillPup Routine Fits Your Situation?
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  If your dog seems otherwise well and no medical red flags are present, you can match their behavior to a specific plan.
                </p>

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
              </section>

              <section aria-labelledby="professional-help">
                <h2 id="professional-help" className="text-3xl font-extrabold text-[#0F1A2C]">
                  When to Get Professional Help
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  Contact your veterinarian first if you suspect pain, illness, vision changes, or another physical reason for the sudden outdoor refusal. If the fear is intense, getting worse, difficult to manage safely, or does not improve with shorter, low-pressure attempts, contact a qualified behavior professional or veterinary behaviorist.
                </p>
              </section>

              <section aria-labelledby="faq">
                <h2 id="faq" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Frequently Asked Questions
                </h2>
                <div className="mt-6 divide-y divide-slate-100 rounded-[24px] border border-slate-200 bg-white shadow-sm">
                  <FaqItem title="Why did my dog suddenly become scared to go outside?">
                    <p>Sudden changes are usually triggered by a recent negative experience, such as a loud noise or an encounter with a loose dog, sudden changes in health or vision, uncomfortable weather, or owner tension on the leash.</p>
                  </FaqItem>

                  <FaqItem title="Should I force my dog to walk if they refuse?">
                    <p>No. Forcing or dragging your dog past their comfort zone typically increases their avoidance. It is much more effective to keep trips incredibly short and let them turn back before they get overwhelmed.</p>
                  </FaqItem>

                  <FaqItem title="Could sudden outdoor fear be medical?">
                    <p>Yes. Conditions that cause physical pain, sudden vision loss, hearing changes, or cognitive changes in senior dogs can cause them to feel insecure outdoors. Have your veterinarian check them over first.</p>
                  </FaqItem>

                  <FaqItem title="What if my dog only refuses at night?">
                    <p>This is common due to reduced visibility, moving shadows from streetlights, or pedestrians appearing suddenly. Stick to brightly lit, highly familiar paths and shorten the route.</p>
                  </FaqItem>

                  <FaqItem title="What if this started after fireworks?">
                    <p>Loud, unpredictable sounds can make the next outdoor attempt feel unsafe to the dog. Focus on indoor comfort first, and keep your initial outdoor trips limited to very quick potty breaks close to the door using the <strong>Post-Fireworks Walk Rebuild</strong> routine.</p>
                  </FaqItem>

                  <FaqItem title="Which ChillPup routine should I use?">
                    <p>If the refusal is general and happens during the day, start with the <strong>Outdoor Confidence Reset</strong>. If it is tied to specific triggers like storms, darkness, or fireworks, use the dedicated specialized routine listed in the routing table above.</p>
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
                  Outdoor Confidence Reset
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#526174]">
                  A short, owner-guided ChillPup routine for dogs who seem otherwise well but suddenly struggle with going outside.
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
