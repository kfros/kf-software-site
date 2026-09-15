import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Footprints,
  ShieldAlert,
  Sparkles,
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
  title: "Dog Scared to Go Outside After Fireworks? What to Do First",
  description:
    "If your dog is scared to go outside after fireworks, learn when to focus on home recovery, when to call a vet, and how to restart with a tiny outdoor step.",
  alternates: {
    canonical: "https://kf-software.com/blog/dog-freezes-on-walks-after-fireworks/",
  },
  openGraph: {
    title: "Dog Scared to Go Outside After Fireworks? What to Do First",
    description:
      "A practical ChillPup guide for dogs who freeze at the door, turn back, or hesitate outside after fireworks.",
    url: "https://kf-software.com/blog/dog-freezes-on-walks-after-fireworks/",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Dog Scared to Go Outside After Fireworks? What to Do First",
    description:
      "If your dog is scared to go outside after fireworks, learn when to focus on home recovery, when to call a vet, and how to restart with a tiny outdoor step.",
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

const stageRows = [
  {
    state: "Fireworks or loud bangs are still happening",
    action: "Stay inside, use safe-space support.",
  },
  {
    state: "Noise ended but dog is still unsettled indoors",
    action: "Focus on quiet home recovery.",
  },
  {
    state: "Dog is calm indoors but refuses the door/outside",
    action: "Start Post-Fireworks Walk Rebuild.",
  },
  {
    state: "Dog refuses all outdoor situations for days or worsens",
    action: "Consider Outdoor Confidence Reset and professional help.",
  },
];

const vetSigns = [
  "collapse, breathing trouble, or severe distress;",
  "limping, pain, yelping, or signs of injury;",
  "vomiting, diarrhea, appetite changes, or unusual weakness;",
  "sudden confusion or disorientation, especially in an older dog;",
  "repeated unsuccessful potty attempts, straining, or inability to urinate;",
  "signs your dog may have bolted, fallen, or been injured during the noise event.",
];

const reasons = [
  {
    title: "The doorway may predict noise",
    text: "Your dog may now associate the act of stepping outside with sudden, unpredictable bangs.",
  },
  {
    title: "The usual route may feel different",
    text: "The exact path they usually enjoy may now predict potential danger to them.",
  },
  {
    title: "Night may be harder",
    text: "Evening and night walks are often harder because fireworks usually happen after dark.",
    href: "/blog/dog-suddenly-scared-of-night-walks/",
    linkLabel: "Dog Scared of Night Walks? Gentle Ways to Make Evening Walks Easier",
  },
  {
    title: "Open spaces can feel exposed",
    text: "Wide, open spaces like parks can suddenly feel exposed and unsafe compared to a narrow, covered porch.",
  },
  {
    title: "Leftover smells or debris can change the route",
    text: "Unusual smells, smoke residue, or physical debris from firework casings can make a familiar street feel entirely different.",
  },
  {
    title: "Your leash may be tighter than usual",
    text: "If you are anticipating trouble, a tight leash communicates your tension directly to your dog.",
  },
];

const avoidItems = [
  {
    title: "Do not force the usual route",
    text: "Forcing your dog to walk past the spot where they first heard a bang creates more resistance.",
  },
  {
    title: "Do not drag your dog outside",
    text: "Pulling a hesitant dog through the door makes the next attempt harder.",
  },
  {
    title: "Do not try to rebuild during active noise",
    text: "Trying to build confidence while fireworks are actively happening is counterproductive.",
  },
  {
    title: "Do not play firework sounds indoors",
    text: "Avoid sudden sound exposure or playing recorded bangs to get them used to it right after a scary event.",
  },
  {
    title: "Do not punish refusal",
    text: "Scolding or pushing your dog forward does not make the sidewalk feel safer.",
  },
  {
    title: "Do not crowd a hiding dog",
    text: "If your dog wants to stay in a closet or under the bed indoors, let them choose that safe option.",
  },
  {
    title: "Do not turn potty breaks into battles",
    text: "Avoid long, tense standoffs in the yard.",
  },
];

const tinySteps = [
  {
    title: "Wait for indoor calm",
    text: "Ensure your dog is eating, resting, and moving normally around the house before opening the door.",
  },
  {
    title: "Choose daylight",
    text: "If the scare happened at night, make your first few attempts during bright, quiet morning hours.",
  },
  {
    title: "Use a familiar exit",
    text: "Use the door that leads to the quietest, most sheltered patch of ground available.",
  },
  {
    title: "Keep it incredibly short",
    text: "Walk only to the doorway or the closest safe patch of grass, allow a brief sniff, and turn back.",
  },
  {
    title: "Keep the leash loose",
    text: "Avoid pulling or maintaining a tight grip. Let your dog move at a relaxed pace.",
  },
  {
    title: "Turn back early",
    text: "If your dog looks down the street and hesitates, do not push forward. Turn back toward the house calmly.",
  },
  {
    title: "Redefine success",
    text: "Mark a successful outing by a calm return inside, not by the distance covered.",
  },
  {
    title: "Try again later if appropriate",
    text: "If they refuse to leave the porch, go back inside and try another short attempt a few hours later.",
  },
];

const progressWins = [
  "Your dog approaches the front door without immediately running to hide.",
  "They step across the threshold briefly on a loose leash.",
  "They stop to sniff the ground near the entrance rather than scanning the sky.",
  "They take a quick potty break close to the building.",
  "They turn back toward the home smoothly without panicking or pulling you.",
  "They settle down and relax faster once they are back inside.",
];

const routineRows = [
  {
    situation: "Loud noise is happening right now",
    routine: "Thunder & Fireworks Safe Space",
    href: null,
  },
  {
    situation: "Noise ended, dog is still unsettled indoors",
    routine: "Post-Fireworks Recovery at Home",
    href: null,
  },
  {
    situation: "Dog is calm indoors but hesitant outside",
    routine: "Post-Fireworks Walk Rebuild",
    href: null,
  },
  {
    situation: "Dog is now broadly afraid of going outside",
    routine: "Outdoor Confidence Reset",
    href: "/blog/dog-suddenly-scared-to-go-outside/",
    linkLabel: "Why Is My Dog Suddenly Scared to Go Outside?",
  },
  {
    situation: "Dog only struggles with evening or night walks afterward",
    routine: "Night Walk Confidence",
    href: "/blog/dog-suddenly-scared-of-night-walks/",
    linkLabel: "Dog Scared of Night Walks? Gentle Ways to Make Evening Walks Easier",
  },
];

export default function PostFireworksWalkRebuildArticle() {
  const faqs = [
    {
      question: "Why is my dog scared to go outside after fireworks?",
      answer: "Loud, unpredictable bangs can make the next outdoor attempt feel unsafe to the dog. They may connect the doorway, street, or usual route with the place where the scary noise happened."
    },
    {
      question: "Should I force my dog outside to pee after fireworks?",
      answer: "No. Forcing a scared dog outside can make the next attempt harder. Use a quiet, sheltered spot close to the door and keep the attempt short. If your dog strains, cannot pee, or seems painful or unwell, contact your veterinarian."
    },
    {
      question: "What if my dog is still shaking indoors?",
      answer: "If your dog is still pacing, shaking, hiding, panting, or unable to settle indoors, wait before trying to rebuild the walk. Keep the environment quiet and let them use a safe resting place."
    },
    {
      question: "How long does it take for a dog to feel normal after fireworks?",
      answer: "Recovery timelines vary significantly for individual dogs. Some dogs settle by the next day. Others need more time and smaller steps. If the fear is severe, worsening, or not improving, speak with your veterinarian or a qualified behavior professional."
    },
    {
      question: "Should I play fireworks sounds to get them used to it?",
      answer: "No. Do not start sound exposure right after a scary event. Focus on calm recovery and very small, quiet outdoor attempts once your dog has settled indoors."
    },
    {
      question: "Which ChillPup routine should I use?",
      answer: "If your dog seems settled indoors but plants their feet at the door, use the Post-Fireworks Walk Rebuild routine to guide your first small outdoor steps."
    }
  ];

  return (
    <>
      <PageClarityTags siteSection="blog" product="chillpup" pageType="article" />
      <ArticleJsonLd
        title="Dog Scared to Go Outside After Fireworks? What to Do First"
        description="If your dog is scared to go outside after fireworks, learn when to focus on home recovery, when to call a vet, and how to restart with a tiny outdoor step."
        url="https://kf-software.com/blog/dog-freezes-on-walks-after-fireworks/"
        faqs={faqs}
      />
      <Header activeItem="Blog" navItems={navItems} />

      <main className="min-h-screen bg-gradient-to-b from-[#FAF6F0] via-[#FCFAF7] to-white text-[#526174]">
        <article>
          <section className="border-b border-slate-100/70 py-14 sm:py-18">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#0F766E] shadow-sm">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Fireworks Recovery Guide
              </div>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-[#0F1A2C] sm:text-5xl lg:text-6xl">
                Dog Scared to Go Outside After Fireworks? What to Do First
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#526174]">
                If your dog is scared to go outside after fireworks, do not start by dragging them through the usual walk. First, check whether the noise is fully over and whether your dog has settled indoors.
              </p>

              <ArticlePhoto
                src="/assets/door/chillpup-door-sitting.jpg"
                alt="A small dog sitting near a door before going outside"
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
                        Post-Fireworks Walk Rebuild
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
                  If your dog is still hiding, trembling, pacing, panting, or refusing normal contact indoors, focus on quiet recovery at home. Outdoor rebuilding can wait. If your dog is calm indoors but freezes at the door or turns back outside, make the first outdoor step much smaller: a doorway pause, a short sniff near the building, or a calm turn-back before they panic.
                </p>
                <p className="text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  For dogs who are settled indoors but hesitant outside after fireworks, ChillPup’s <strong>Post-Fireworks Walk Rebuild</strong> routine helps you plan a tiny first outdoor step without forcing the usual walk.
                </p>

                <div className="rounded-2xl border border-teal-100 bg-teal-50/40 p-5 text-sm leading-6 text-[#0F1A2C]">
                  <strong>Quick answer:</strong> If your dog is scared to go outside after fireworks, wait until the noise is over and your dog has settled indoors. Do not force the usual route. Start with a tiny daylight step near a familiar exit, keep the leash loose, and turn back before panic builds.
                </div>
              </div>
            </div>
          </section>

          <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,720px)_320px] lg:justify-center lg:gap-12 lg:px-8 lg:py-16">
            <div className="space-y-14 lg:space-y-16">
              <section aria-labelledby="stage">
                <h2 id="stage" className="text-3xl font-extrabold text-[#0F1A2C]">
                  First, Decide What Stage Your Dog Is In
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  Do not try to rebuild the walk during active fireworks or while your dog is still visibly unsettled indoors. Use this table to determine your first step:
                </p>

                <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead className="bg-slate-50 text-[#0F1A2C]">
                      <tr>
                        <th className="px-4 py-3 font-extrabold sm:px-6">What is happening now?</th>
                        <th className="px-4 py-3 font-extrabold sm:px-6">What to do first</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {stageRows.map((row) => (
                        <tr key={row.state}>
                          <td className="px-4 py-4 align-top text-[#526174] sm:px-6">{row.state}</td>
                          <td className="px-4 py-4 align-top font-semibold text-[#0F1A2C] sm:px-6">{row.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section aria-labelledby="vet-help">
                <div className="rounded-[28px] border border-amber-200/70 bg-[#FFFDF9] p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-800">
                      <ShieldAlert className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 id="vet-help" className="text-2xl font-extrabold text-[#0F1A2C]">
                        When to Call a Vet or Professional
                      </h2>
                      <p className="mt-3 leading-7 text-[#526174]">
                        Do not treat this as a walk-confidence issue if your dog seems painful, weak, sick, confused, injured, or unable to potty normally. Contact your veterinarian promptly if you notice:
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {vetSigns.map((sign) => (
                      <li key={sign} className="flex gap-3 text-sm leading-6 text-[#526174]">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 rounded-2xl border border-amber-200 bg-white p-4 text-sm leading-6 text-[#526174]">
                    If the fear is intense, getting worse, difficult to manage safely, or not improving with smaller attempts, contact a qualified behavior professional or veterinary behaviorist.
                  </p>
                </div>
              </section>

              <section aria-labelledby="why-fireworks">
                <h2 id="why-fireworks" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Why Fireworks Can Change the Next Walk
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  A single night of loud celebrations can change how your dog views their normal routine. Understanding the environmental changes makes it easier to adjust your expectations.
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:hidden">
                  {reasons.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
                      <h3 className="text-base font-extrabold text-[#0F1A2C]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#526174]">
                        {item.text}
                        {item.href && item.linkLabel ? (
                          <>
                            {" "}If your dog only freezes when the sun goes down, see our guide on{" "}
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
                  {reasons.map((item) => (
                    <div key={item.title} className="border-l border-slate-200 pl-5">
                      <h3 className="text-lg font-extrabold text-[#0F1A2C]">{item.title}</h3>
                      <p className="mt-2 text-[17px] leading-8 text-[#526174]">
                        {item.text}
                        {item.href && item.linkLabel ? (
                          <>
                            {" "}If your dog only freezes when the sun goes down, see our guide on{" "}
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

              <section aria-labelledby="what-not-to-do">
                <h2 id="what-not-to-do" className="text-3xl font-extrabold text-[#0F1A2C]">
                  What Not to Do After Fireworks
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

              <section aria-labelledby="first-attempt">
                <h2 id="first-attempt" className="text-3xl font-extrabold text-[#0F1A2C]">
                  The First Outdoor Attempt Should Be Tiny
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  When you are ready to try going outside again, reduce the scope of the walk to the absolute minimum.
                </p>
                <blockquote className="mt-6 rounded-[24px] border border-[#DCEFE8] bg-[#F3FBF8] p-6 text-base leading-7 text-[#0F1A2C]">
                  The goal is not to prove that outside is safe in one walk. The goal is to avoid making outside feel worse.
                </blockquote>

                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:hidden">
                  {tinySteps.map((step) => (
                    <div key={step.title} className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
                      <h3 className="text-base font-extrabold text-[#0F1A2C]">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#526174]">{step.text}</p>
                    </div>
                  ))}
                </div>

                <ul className="mt-6 hidden space-y-4 lg:block">
                  {tinySteps.map((step) => (
                    <li key={step.title} className="flex gap-3 text-[17px] leading-8 text-[#526174]">
                      <CheckCircle2 className="mt-1.5 h-5 w-5 shrink-0 text-[#0F766E]" aria-hidden="true" />
                      <span>
                        <strong className="text-[#0F1A2C]">{step.title}:</strong> {step.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <ArticlePhoto
                src="/assets/door/chillpup-door-looking-up.jpg"
                alt="A dog near the door looking up toward its owner"
                caption="After fireworks, start with a small, predictable step instead of forcing the usual walk."
                aspect="wide"
                className="my-8"
              />

              <section aria-labelledby="progress">
                <h2 id="progress" className="text-3xl font-extrabold text-[#0F1A2C]">
                  What Counts as Progress?
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  Rebuilding a routine after a loud event happens through small shifts in body language. Look for these subtle wins:
                </p>
                <ul className="mt-5 space-y-3">
                  {progressWins.map((win) => (
                    <li key={win} className="flex gap-3 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0F766E]" aria-hidden="true" />
                      <span>{win}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  If your dog is struggling to step outside regardless of the time of day, read our broader checklist on{" "}
                  <a href="/blog/dog-suddenly-scared-to-go-outside/" className="font-semibold text-[#0F766E] hover:underline">
                    Why Is My Dog Suddenly Scared to Go Outside?
                  </a>.
                </p>
              </section>

              <ArticlePhoto
                src="/assets/walk-day/chillpup-walk-day-sniffing.jpg"
                alt="A dog calmly sniffing grass during a short walk"
                caption="Letting the dog sniff can make the outside feel less pressured."
                aspect="wide"
                className="my-8"
              />

              <section id="chillpup-routine" aria-labelledby="routine-fit">
                <h2 id="routine-fit" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Which ChillPup Routine Fits This Moment?
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

                <div className="mt-8 rounded-[24px] border border-[#DCEFE8] bg-[#F3FBF8] p-6">
                  <p className="text-base leading-7 text-[#0F1A2C]">
                    If your dog is calm indoors but freezes at the door after fireworks, open ChillPup’s <strong>Post-Fireworks Walk Rebuild</strong> routine before the next attempt. Start with a smaller outdoor step instead of repeating the full walk.
                  </p>
                </div>
              </section>

              <section aria-labelledby="faq">
                <h2 id="faq" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Frequently Asked Questions
                </h2>
                <div className="mt-6 divide-y divide-slate-100 rounded-[24px] border border-slate-200 bg-white shadow-sm">
                  <FaqItem title="Why is my dog scared to go outside after fireworks?">
                    <p>Loud, unpredictable bangs can make the next outdoor attempt feel unsafe to the dog. They may connect the doorway, street, or usual route with the place where the scary noise happened.</p>
                  </FaqItem>

                  <FaqItem title="Should I force my dog outside to pee after fireworks?">
                    <p>No. Forcing a scared dog outside can make the next attempt harder. Use a quiet, sheltered spot close to the door and keep the attempt short. If your dog strains, cannot pee, or seems painful or unwell, contact your veterinarian.</p>
                  </FaqItem>

                  <FaqItem title="What if my dog is still shaking indoors?">
                    <p>If your dog is still pacing, shaking, hiding, panting, or unable to settle indoors, wait before trying to rebuild the walk. Keep the environment quiet and let them use a safe resting place.</p>
                  </FaqItem>

                  <FaqItem title="How long does it take for a dog to feel normal after fireworks?">
                    <p>Recovery timelines vary significantly for individual dogs. Some dogs settle by the next day. Others need more time and smaller steps. If the fear is severe, worsening, or not improving, speak with your veterinarian or a qualified behavior professional.</p>
                  </FaqItem>

                  <FaqItem title="Should I play fireworks sounds to get them used to it?">
                    <p>No. Do not start sound exposure right after a scary event. Focus on calm recovery and very small, quiet outdoor attempts once your dog has settled indoors.</p>
                  </FaqItem>

                  <FaqItem title="Which ChillPup routine should I use?">
                    <p>If your dog seems settled indoors but plants their feet at the door, use the <strong>Post-Fireworks Walk Rebuild</strong> routine to guide your first small outdoor steps.</p>
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
                  Post-Fireworks Walk Rebuild
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#526174]">
                  A short, owner-guided ChillPup routine for dogs who are settled indoors but hesitant outside after fireworks.
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
