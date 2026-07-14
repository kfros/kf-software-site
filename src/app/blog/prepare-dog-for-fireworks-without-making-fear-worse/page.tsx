import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Home,
  ShieldAlert,
  Sparkles,
  Volume2,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { GooglePlayBadge } from "@/components/GooglePlayBadge";
import { PageClarityTags } from "@/components/analytics/PageClarityTags";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { ArticlePhoto } from "@/components/chillpup/ArticlePhoto";
import { ContactModal } from "../../contact-modal";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "../../store-links";

const title = "How to Prepare Your Dog for Fireworks Without Making Fear Worse";
const description =
  "Prepare your dog for fireworks with calm-day planning, safe indoor setup, potty timing, and clear steps to avoid making fear worse.";
const url = "https://kf-software.com/blog/prepare-dog-for-fireworks-without-making-fear-worse/";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description:
      "A practical ChillPup guide for preparing before fireworks with a quiet home setup, low-pressure practice, and safe next steps.",
    url,
    type: "article",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "ChillPup", href: "/chillpup/" },
  { label: "Blog", href: "/blog/" },
  { label: "Support", href: "/support/" },
  { label: "About", href: "/about/" },
];

const extraHelpSigns = [
  "Extreme panic, frantic bolting, escaping the yard, or destructive chewing at doors and windows to get out.",
  "Severe physical distress, collapse, unmanageable shaking, or breathing trouble.",
  "An older dog experiencing sudden confusion, disorientation, or pacing that does not stop.",
  "Co-existing physical concerns like chronic pain, heart or respiratory issues, or recent major health changes.",
  "A repeated inability to potty for an extended period during or after a noise event.",
  "A fear reaction that is noticeably getting worse or more intense each year.",
  "Behavior indicating the dog might actively injure themselves trying to dig out of their crate or room.",
];

const setupSteps = [
  {
    title: "Choose an indoor area away from the elements",
    text: "Pick a central room, a basement, or a walk-in closet that sits away from windows and exterior doors to muffle outside noise.",
  },
  {
    title: "Let your dog guide the choice",
    text: "If your dog naturally tends to hide under your desk or behind the sofa when they are startled, try to build the safe zone around that preferred spot.",
  },
  {
    title: "Prepare the immediate setup",
    text: "Place comfortable bedding, a water bowl, and familiar items such as a blanket or toy in the space.",
  },
  {
    title: "Block visual triggers",
    text: "Close the curtains, drop the blinds, or cover glass doors to minimize sudden light flashes from firework explosions.",
  },
  {
    title: "Keep all exits secure",
    text: "Double-check that nearby windows are latched and exterior doors close firmly. A dog can easily slip through a loose screen if a sudden noise startles them.",
  },
  {
    title: "Avoid forced isolation",
    text: "Do not lock your dog inside a small crate or an unfamiliar room if being confined makes them whine or scratch at the door. Leave the area open so they can enter and leave willingly.",
  },
  {
    title: "Make the space accessible early",
    text: "Open the door to this space well before the evening festivities start so your dog can settle in before the first bang.",
  },
];

const outdoorSteps = [
  {
    title: "Adjust your walk schedule",
    text: "Take your main walks earlier in the day when the neighborhood is quiet and daylight is bright.",
  },
  {
    title: "Time your last potty break wisely",
    text: "Head outside for a short potty trip an hour or two before the expected start time of the fireworks.",
  },
  {
    title: "Avoid high-risk routes",
    text: "Stay clear of busy parks, open school fields, or areas where local events or neighborhood gatherings are scheduled to take place.",
  },
  {
    title: "Prioritize equipment safety",
    text: "Ensure collars and harnesses are fitted properly so your dog cannot back out of them if they get startled by an early firecracker.",
  },
  {
    title: "Do not force outdoor movement",
    text: "If the noise starts earlier than expected, do not drag your dog out to finish their walk. Bring them straight back inside.",
  },
  {
    title: "Keep necessary trips brief",
    text: "If your dog must go out after dark, keep the trip short and close to home.",
  },
];

const avoidItems = [
  {
    title: "Do not play fireworks recordings as a DIY test",
    text: "Blasting noise from your TV or phone right before the event can raise your dog’s stress levels prematurely.",
  },
  {
    title: "Do not use sudden sound exposure",
    text: "Avoid testing your dog’s reactions by dropping pans or popping bags near them.",
  },
  {
    title: "Do not take your dog outside to watch fireworks",
    text: "Never bring a hesitant dog to a community display or backyard show to try and show them it is safe.",
  },
  {
    title: "Do not force them to stay in a room they fear",
    text: "If your dog panics in the utility room, forcing them to remain there will not help them settle.",
  },
  {
    title: "Do not punish natural reactions",
    text: "Scolding your dog for hiding, trembling, barking at a bang, or having a potty accident indoors will only add fear to the situation.",
  },
  {
    title: "Do not host loud gatherings",
    text: "If your dog is sensitive to noise, avoid inviting large groups of guests over during a fireworks night.",
  },
  {
    title: "Do not assume past behavior guarantees the future",
    text: "Even if your dog was calm last year, check their body language carefully this year.",
  },
  {
    title: "Do not wait until your dog is already panicking to start a new plan",
    text: "Plan the quiet setup, potty timing, and indoor support before the first bang, not after your dog is already distressed.",
  },
];

const prepPlan = [
  {
    title: "Identify the resting zone",
    text: "Select the quietest room or corner in your home.",
  },
  {
    title: "Add comfort items",
    text: "Place fresh water, favorite blankets, and a few calm toys nearby.",
  },
  {
    title: "Practice stepping into the space",
    text: "Invite your dog into the area calmly when the neighborhood is completely silent.",
  },
  {
    title: "Keep the sessions brief",
    text: "Let them relax there for a few minutes while you sit nearby, then go back to your normal day.",
  },
  {
    title: "Maintain steady owner behavior",
    text: "Speak in a quiet tone, move at a natural pace, and avoid making the setup feel like an intense training challenge.",
  },
  {
    title: "Map out earlier routines",
    text: "Note down exactly what time you will feed meals and finish potty breaks before the fireworks day arrives.",
  },
  {
    title: "Establish your active plan",
    text: "Decide in advance which lights you will leave on, which curtains you will close, and where you will sit when the noise begins.",
  },
];

const afterRows = [
  {
    text: "If the noise has stopped completely but your dog remains tense, hides in the closet, or paces around the living room, see",
    href: "/blog/dog-still-shaken-after-fireworks/",
    linkLabel: "Dog Still Shaken After Fireworks? How to Help Them Recover at Home",
  },
  {
    text: "If your dog seems settled indoors but freezes the moment you open the front door, follow the steps in",
    href: "/blog/dog-freezes-on-walks-after-fireworks/",
    linkLabel: "Dog Scared to Go Outside After Fireworks? What to Do First",
  },
  {
    text: "If the event has caused your dog to refuse outdoor walks generally across different times of the day, refer to",
    href: "/blog/dog-suddenly-scared-to-go-outside/",
    linkLabel: "Why Is My Dog Suddenly Scared to Go Outside?",
  },
  {
    text: "If your dog handles daytime walks but struggles after dark, check out",
    href: "/blog/dog-suddenly-scared-of-night-walks/",
    linkLabel: "Dog Scared of Night Walks? Gentle Ways to Make Evening Walks Easier",
  },
];

const routineRows = [
  {
    situation: "You are preparing before a future fireworks event",
    routine: "Fireworks Prep: Calm-Day Practice",
    href: null,
  },
  {
    situation: "Loud bangs are happening right now",
    routine: "Thunder & Fireworks Safe Space",
    href: null,
  },
  {
    situation: "Noise ended but dog is still unsettled indoors",
    routine: "Post-Fireworks Recovery at Home",
    href: "/blog/dog-still-shaken-after-fireworks/",
    linkLabel: "Dog Still Shaken After Fireworks? How to Help Them Recover at Home",
  },
  {
    situation: "Dog is calm indoors but hesitant outside",
    routine: "Post-Fireworks Walk Rebuild",
    href: "/blog/dog-freezes-on-walks-after-fireworks/",
    linkLabel: "Dog Scared to Go Outside After Fireworks? What to Do First",
  },
  {
    situation: "Dog is broadly afraid of going outside generally later",
    routine: "Outdoor Confidence Reset",
    href: "/blog/dog-suddenly-scared-to-go-outside/",
    linkLabel: "Why Is My Dog Suddenly Scared to Go Outside?",
  },
];

const faqs = [
  {
    question: "When should I start preparing my dog for fireworks?",
    answer:
      "The best time to start is a few days or weeks before a major holiday like New Year’s Eve, July 4, Bonfire Night, Diwali, or local celebrations. Set up a quiet resting place and plan your potty schedule on a calm day so you are not rushing at the last minute.",
  },
  {
    question: "Should I play fireworks sounds before the event?",
    answer:
      "No. DIY sound exposure using recordings right before a major event can cause unnecessary stress. It is safer to focus on setting up a predictable, quiet indoor environment first.",
  },
  {
    question: "Should I take my dog outside to watch fireworks?",
    answer:
      "No. Forcing a dog to stand outside near loud explosions will likely increase their fear and could cause them to panic or try to slip out of their collar. Always keep a noise-sensitive dog safely indoors.",
  },
  {
    question: "What should I set up before fireworks start?",
    answer:
      "Choose a central room away from windows, bring in familiar blankets, leave a water bowl nearby, and draw curtains or blinds to block sudden light flashes.",
  },
  {
    question: "What if my dog panics even with preparation?",
    answer:
      "If your dog shows severe distress, tries to injure themselves, or attempts to destroy doors to escape, stop the routine. Contact your veterinarian or a qualified behavior professional to explore a safer plan for future events.",
  },
  {
    question: "What should I do after the fireworks end?",
    answer:
      "If your dog remains tense indoors, transition to the Post-Fireworks Recovery at Home routine. Do not force them outside for a normal walk until they are moving comfortably and resting normally inside the house.",
  },
  {
    question: "Which ChillPup routine should I use before fireworks?",
    answer:
      "Use the Fireworks Prep: Calm-Day Practice routine. It provides a simple, owner-guided way to set up your indoor space, plan walk timing, and map out a quiet routine before the first noises begin.",
  },
];

export default function FireworksPrepArticle() {
  return (
    <>
      <PageClarityTags siteSection="blog" product="chillpup" pageType="article" />
      <ArticleJsonLd title={title} description={description} url={url} faqs={faqs} />
      <Header activeItem="Blog" navItems={navItems} />

      <main className="min-h-screen bg-gradient-to-b from-[#FAF6F0] via-[#FCFAF7] to-white text-[#526174]">
        <article>
          <section className="border-b border-slate-100/70 py-14 sm:py-18">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#0F766E] shadow-sm">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Fireworks Calm-Day Prep Guide
              </div>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-[#0F1A2C] sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#526174]">
                If you want to prepare your dog for fireworks, do not wait until the first bang to start experimenting. The safest preparation happens on a calm day, when your dog is relaxed and the house is quiet.
              </p>

              <ArticlePhoto
                src="/assets/human-interaction/chillpup-human-feeding.jpg"
                alt="A dog calmly taking a treat from a person"
                priority={true}
                variant="heroCompactPortrait"
                fit="contain"
                aspect="aspect-[3/4]"
                className="mt-6"
              />

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-[#DCEFE8] bg-white p-4 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E]">
                      <Volume2 className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                        ChillPup Routine
                      </p>
                      <h3 className="text-base font-extrabold text-[#0F1A2C] mt-0.5">
                        Fireworks Prep: Calm-Day Practice
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
                  Start by planning where your dog can rest, how you will reduce pressure, and what you will do when the noise begins. Avoid last-minute sound exposure, forced walks, or testing whether your dog is over their fear.
                </p>
                <p className="text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  If your dog seems otherwise well and you are preparing before a predictable fireworks event, ChillPup’s <strong>Fireworks Prep: Calm-Day Practice</strong> routine helps you set up a short, owner-guided plan before the noisy day arrives.
                </p>

                <div className="rounded-2xl border border-teal-100 bg-teal-50/40 p-5 text-sm leading-6 text-[#0F1A2C]">
                  <strong>Quick answer:</strong> To prepare your dog for fireworks, use a calm day to set up a quiet resting place, practice short low-pressure routines, secure doors and windows, plan potty timing, and decide what you will do when noise starts. Do not play fireworks recordings, force exposure, or wait until your dog is already panicking to start a new plan.
                </div>
              </div>
            </div>
          </section>

          <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,720px)_320px] lg:justify-center lg:gap-12 lg:px-8 lg:py-16">
            <div className="space-y-14 lg:space-y-16">
              <section aria-labelledby="start-before">
                <h2 id="start-before" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Start Before the Fireworks, Not During Them
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  The middle of a fireworks event is not the time to start a new routine or try out a brand-new setup. Once loud bangs have started, your dog may already be unsettled, and introducing new steps under stress is unlikely to help.
                </p>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  Useful preparation happens on a calm day. Taking the time to build a predictable setup beforehand allows you to know exactly what to do before your own stress runs high.
                </p>
                <blockquote className="mt-6 rounded-[24px] border border-[#DCEFE8] bg-[#F3FBF8] p-6 text-base leading-7 text-[#0F1A2C]">
                  The goal is not to prove that fireworks are harmless. The goal is to make the noisy day less confusing and less pressured.
                </blockquote>
                <p className="mt-5 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  You are not trying to make your dog look forward to the noise; you are simply creating safe options and reducing environmental pressure so the evening feels more predictable and less pressured.
                </p>
              </section>

              <section aria-labelledby="extra-help">
                <div className="rounded-[28px] border border-amber-200/70 bg-[#FFFDF9] p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-800">
                      <ShieldAlert className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 id="extra-help" className="text-2xl font-extrabold text-[#0F1A2C]">
                        First, Check Whether Your Dog Needs Extra Help
                      </h2>
                      <p className="mt-3 leading-7 text-[#526174]">
                        Some dogs experience severe noise reactions that carry safety risks. These situations cannot be managed by a simple owner-guided routine alone.
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 rounded-2xl border border-amber-200 bg-white p-4 text-sm leading-6 text-[#526174]">
                    If your dog has severe reactions, a history of escape attempts, injury risk, sudden health changes, or distress that is hard to manage safely, speak with your veterinarian or a qualified behavior professional before relying on a simple home routine.
                  </p>

                  <h3 className="mt-7 text-lg font-extrabold text-[#0F1A2C]">Schedule a professional consultation if you have noticed:</h3>
                  <ul className="mt-4 space-y-3">
                    {extraHelpSigns.map((sign) => (
                      <li key={sign} className="flex gap-3 text-sm leading-6 text-[#526174]">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <ListSection
                id="resting-place"
                title="Set Up a Quiet Resting Place Before the Event"
                intro="A safe resting place should feel familiar, not like sudden confinement. Prepare this space a few days or weeks before the local celebrations begin."
                items={setupSteps}
              />

              <section aria-labelledby="potty-walks">
                <h2 id="potty-walks" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Plan Potty, Walks, and Outdoor Time
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  Managing outdoor transitions before the noise starts reduces the risk of your dog freezing on the sidewalk later in the evening.
                </p>
                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:hidden">
                  {outdoorSteps.map((step) => (
                    <div key={step.title} className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
                      <h3 className="text-base font-extrabold text-[#0F1A2C]">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#526174]">{step.text}</p>
                    </div>
                  ))}
                </div>
                <ul className="mt-6 hidden space-y-4 lg:block">
                  {outdoorSteps.map((step) => (
                    <li key={step.title} className="flex gap-3 text-[17px] leading-8 text-[#526174]">
                      <CheckCircle2 className="mt-1.5 h-5 w-5 shrink-0 text-[#0F766E]" aria-hidden="true" />
                      <span>
                        <strong className="text-[#0F1A2C]">{step.title}:</strong> {step.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  If your dog struggles with stepping onto wet pavement or refuses to leave the doorway after a bad weather experience, read our guide on{" "}
                  <a href="/blog/dog-refuses-to-pee-outside-after-thunder-or-rain/" className="font-semibold text-[#0F766E] hover:underline">
                    Dog Won’t Pee in the Rain? What’s Normal and When to Call a Vet
                  </a>.
                </p>
              </section>

              <ListSection
                id="what-not-to-do"
                title="What Not to Do When Preparing for Fireworks"
                intro="Well-meaning adjustments can sometimes increase your dog’s wariness. Avoid these common pitfalls on the days leading up to the event:"
                items={avoidItems}
              />

              <section aria-labelledby="calm-day-plan">
                <h2 id="calm-day-plan" className="text-3xl font-extrabold text-[#0F1A2C]">
                  A Simple Calm-Day Preparation Plan
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  Rehearsing a quiet indoor routine on a normal day gives your dog a familiar pattern to fall back on when the environment changes.
                </p>
                <ol className="mt-6 space-y-4">
                  {prepPlan.map((step, index) => (
                    <li key={step.title} className="flex gap-4 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-extrabold text-[#0F766E]">
                        {index + 1}
                      </span>
                      <span className="text-sm leading-6 text-[#526174] lg:text-base lg:leading-7">
                        <strong className="text-[#0F1A2C]">{step.title}:</strong> {step.text}
                      </span>
                    </li>
                  ))}
                </ol>
                <blockquote className="mt-6 rounded-[24px] border border-[#DCEFE8] bg-[#F3FBF8] p-6 text-base leading-7 text-[#0F1A2C]">
                  Practice should feel boring and easy. If your dog starts scanning, panting, hiding, or avoiding the area, make the step smaller or stop.
                </blockquote>
              </section>

              <ArticlePhoto
                src="/assets/human-interaction/chillpup-human-petting-2.jpg"
                alt="A dog receiving a small treat during calm practice"
                caption="Practice rewards on calm days, before the loud event starts."
                aspect="portrait"
                className="my-8"
              />

              <section aria-labelledby="safe-space-support">
                <h2 id="safe-space-support" className="text-3xl font-extrabold text-[#0F1A2C]">
                  When the Fireworks Start, Switch to Safe-Space Support
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  Once the fireworks begin, your preparation window is closed. Do not attempt to start a new practice routine or introduce unfamiliar steps during active noise.
                </p>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  Instead, transition to your planned resting area, keep the room quiet, and switch to active support. If your dog prefers to hide under a bed, leave them there and simply maintain a calm, steady presence in the household. During the noise, you can transition your focus to the <strong>Thunder & Fireworks Safe Space</strong> routine inside the app to help maintain a quiet indoor plan.
                </p>
              </section>

              <ArticlePhoto
                src="/assets/rest/chillpup-rest-02.jpeg"
                alt="A dog resting quietly at home"
                caption="Prepare the calm place before fireworks begin."
                aspect="wide"
                className="my-8"
              />

              <section aria-labelledby="after-fireworks">
                <h2 id="after-fireworks" className="text-3xl font-extrabold text-[#0F1A2C]">
                  After the Fireworks: What Comes Next?
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  Once the celebrations end, focus on a gradual return to your normal routine based on how your dog behaves inside the house.
                </p>
                <ul className="mt-5 space-y-4">
                  {afterRows.map((row) => (
                    <li key={row.href} className="flex gap-3 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0F766E]" aria-hidden="true" />
                      <span>
                        {row.text}{" "}
                        <a href={row.href} className="font-semibold text-[#0F766E] hover:underline">
                          {row.linkLabel}
                        </a>.
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section id="chillpup-routine" aria-labelledby="routine-fit">
                <h2 id="routine-fit" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Which ChillPup Routine Fits This Moment?
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  Rebuilding a calm routine depends entirely on where you are in relation to the noise event. Match your current situation below:
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
                <div className="mt-8 rounded-[24px] border border-[#DCEFE8] bg-[#F3FBF8] p-6">
                  <p className="text-base leading-7 text-[#0F1A2C]">
                    If you are preparing before a predictable fireworks event and no medical red flags are present, open ChillPup’s <strong>Fireworks Prep: Calm-Day Practice</strong> routine on a quiet day. Build the plan before the first bang, not during it.
                  </p>
                </div>
              </section>

              <section aria-labelledby="faq">
                <h2 id="faq" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Frequently Asked Questions
                </h2>
                <div className="mt-6 divide-y divide-slate-100 rounded-[24px] border border-slate-200 bg-white shadow-sm">
                  {faqs.map((faq) => (
                    <FaqItem key={faq.question} title={faq.question}>
                      <p>{faq.answer}</p>
                    </FaqItem>
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[28px] border border-[#DCEFE8] bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0F766E]">
                  Try the matching routine
                </p>
                <h2 className="mt-3 text-2xl font-extrabold text-[#0F1A2C]">
                  Fireworks Prep: Calm-Day Practice
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#526174]">
                  A short, owner-guided ChillPup routine for calm-day planning before predictable fireworks.
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
                  ChillPup is not a veterinary or diagnostic app. If your dog shows severe distress, injury risk, collapse, seizures, breathing trouble, or sudden major behavior changes, contact a veterinarian.
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

function ListSection({
  id,
  title,
  intro,
  items,
}: Readonly<{
  id: string;
  title: string;
  intro: string;
  items: ReadonlyArray<{ title: string; text: string }>;
}>) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-3xl font-extrabold text-[#0F1A2C]">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
        {intro}
      </p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:hidden">
        {items.map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
            <h3 className="text-base font-extrabold text-[#0F1A2C]">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#526174]">{item.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 hidden space-y-6 lg:block">
        {items.map((item) => (
          <section key={item.title} className="border-l border-slate-200 pl-5">
            <h3 className="text-lg font-extrabold text-[#0F1A2C]">{item.title}</h3>
            <p className="mt-2 text-[17px] leading-8 text-[#526174]">{item.text}</p>
          </section>
        ))}
      </div>
    </section>
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
