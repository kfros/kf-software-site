import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Home,
  ShieldAlert,
  Sparkles,
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

export const metadata: Metadata = {
  title: "Dog Still Shaken After Fireworks? How to Help Them Recover at Home",
  description:
    "If your dog is still shaken after fireworks, learn when to call a vet, what not to do, and how to support quiet indoor recovery before rebuilding walks.",
  alternates: {
    canonical: "https://kf-software.com/blog/dog-still-shaken-after-fireworks/",
  },
  openGraph: {
    title: "Dog Still Shaken After Fireworks? How to Help Them Recover at Home",
    description:
      "A practical ChillPup guide for dogs who are still hiding, trembling, panting, or unsettled indoors after fireworks.",
    url: "https://kf-software.com/blog/dog-still-shaken-after-fireworks/",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Dog Still Shaken After Fireworks? How to Help Them Recover at Home",
    description:
      "If your dog is still shaken after fireworks, learn when to call a vet, what not to do, and how to support quiet indoor recovery before rebuilding walks.",
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
  "Collapse or sudden breathing trouble.",
  "Severe distress or frantic pacing that does not ease after the noise stops.",
  "Limping, stiffness, yelping when touched, or clear signs of physical injury.",
  "Vomiting, diarrhea, unusual weakness, or sudden refusal to eat.",
  "Confusion, staring at walls, or severe disorientation, especially in an older dog.",
  "Repeated unsuccessful potty attempts, straining, or a complete inability to urinate.",
  "Seizures or sudden, severe neurological symptoms.",
  "Any indication that the dog bolted, fell down stairs, or crashed into furniture during the fireworks.",
];

const indoorSigns = [
  "Hiding under furniture, behind a couch, or inside a closet.",
  "Trembling, shivering, or muscle twitching.",
  "Heavy panting or pacing from room to room even when the house is cool.",
  "Scanning windows, skylights, or exterior doors anxiously.",
  "Staying exceptionally close to you or refusing to leave your side.",
  "Refusing meals or turning down their favorite treats temporarily.",
  "Showing zero interest in normal play, toys, or typical family contact.",
  "Startling easily at minor everyday sounds, like a dropped spoon or a closing door.",
  "Having a hard time finding a comfortable position to rest or sleep.",
];

const avoidItems = [
  {
    title: "Do not drag them outside for a normal walk",
    text: "Pushing a dog out the door when they are still scanning the ceiling will only cause them to freeze on the sidewalk.",
  },
  {
    title: "Do not force interaction",
    text: "Do not drag your dog out from under the bed to comfort them or show them everything is fine. Let them step out on their own terms.",
  },
  {
    title: "Do not crowd a hiding dog",
    text: "Avoid letting family members or children swarm the dog’s chosen safe spot.",
  },
  {
    title: "Do not punish accidents or refusal",
    text: "If your dog has a potty accident indoors or refuses to move, scolding them will add further pressure.",
  },
  {
    title: "Do not start sound exposure",
    text: "This is not the moment to play recordings of firework sounds or thunder to get them used to it.",
  },
  {
    title: "Do not invite guests over",
    text: "Keep the household environment as quiet and low-key as possible. Avoid loud gatherings or busy renovations.",
  },
  {
    title: "Do not test them",
    text: "Do not drop objects or make sudden noises to see if your dog is over it yet.",
  },
  {
    title: "Do not turn recovery into obedience practice",
    text: "Avoid asking for complex tricks or commands. Let them simply rest.",
  },
];

const recoverySteps = [
  {
    title: "Keep the environment calm and predictable",
    text: "Leave internal doors open so they do not feel trapped, draw the blinds to block outside movement, and keep the lighting soft.",
  },
  {
    title: "Let your dog choose a familiar resting place",
    text: "If they want to sleep on a pile of laundry in the closet or stay under your desk, leave them there. A self-chosen safe option can be comforting.",
  },
  {
    title: "Reduce household noise",
    text: "Turn down the TV volume, speak in calm, normal tones, and avoid running loud appliances like vacuum cleaners or blenders.",
  },
  {
    title: "Offer water nearby",
    text: "Place a water bowl close to their resting spot so they can drink without needing to cross a busy room.",
  },
  {
    title: "Maintain normal, steady behavior",
    text: "Be a calm presence. You can sit near them and offer gentle companionship, but avoid frantic, high-pitched reassurance.",
  },
  {
    title: "Keep all exits secure",
    text: "Ensure windows are shut and doors are securely latched. A shaken dog may try to bolt if a sudden sound startles them again.",
  },
  {
    title: "Keep potty attempts short and close to home",
    text: "If they need to go out, take them directly to the closest safe patch of grass. If they do not pee within two minutes, calmly bring them back inside and try again later if appropriate.",
  },
  {
    title: "Track their progress",
    text: "Keep a simple note of when the noise ended, what signs your dog is showing, and how long it takes for them to settle down.",
  },
];

const readySigns = [
  "Resting and sleeping in their usual spots rather than hiding in tight spaces.",
  "Eating their meals or taking treats normally.",
  "Moving around the home freely without constantly scanning windows or doors.",
  "Responding naturally to their name, familiar cues, or casual contact.",
  "Approaching the door on their own without showing immediate signs of panic.",
];

const routineRows = [
  {
    situation: "Loud bangs are still happening right now",
    routine: "Thunder & Fireworks Safe Space",
    href: null,
  },
  {
    situation: "Noise ended but dog is still unsettled indoors",
    routine: "Post-Fireworks Recovery at Home",
    href: null,
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
  {
    situation: "You are preparing well before a future fireworks event",
    routine: "Fireworks Prep: Calm-Day Practice",
    href: null,
  },
];

const faqs = [
  {
    question: "Why is my dog still shaken after fireworks?",
    answer:
      "Loud, unpredictable bangs can leave a dog on alert even after the noise stops. The doorway, windows, evening sounds, and normal household movement may still feel harder for them until they settle again.",
  },
  {
    question: "Is it normal for a dog to hide after fireworks?",
    answer:
      "Yes. Hiding in a dark, enclosed space like a closet or under a bed is a normal protective instinct. Let them stay there without crowding them, while still checking for urgent signs such as injury, breathing trouble, collapse, inability to urinate, or severe distress.",
  },
  {
    question: "Should I force my dog to go outside after fireworks?",
    answer:
      "No. Forcing a dog outside before they have settled indoors usually increases their hesitation. Focus on indoor comfort first. If your dog seems otherwise well but needs a short potty trip, keep it close to the door and brief.",
  },
  {
    question: "What if my dog is still panting or trembling indoors?",
    answer:
      "If the panting or trembling is mild and gradually decreases as the house stays quiet, keep supporting them with a calm environment. If the shaking is severe, does not ease after the noise stops, or is accompanied by weakness, contact your veterinarian.",
  },
  {
    question: "How long does it take for a dog to recover after fireworks?",
    answer:
      "Recovery time varies for individual dogs. If the behavior is severe, worsening, unusual, or not improving, contact your veterinarian or a qualified behavior professional.",
  },
  {
    question: "Should I play fireworks sounds to help them get used to it?",
    answer:
      "No. Do not play recorded firework or thunder sounds immediately after a scary event. For long-term noise work, speak with a qualified behavior professional instead of experimenting after fireworks.",
  },
  {
    question: "Which ChillPup routine should I use after fireworks?",
    answer:
      "If the noise has ended but your dog is still pacing, hiding, or trembling inside the house, open the Post-Fireworks Recovery at Home routine. It provides an owner-guided framework to support them until they are ready to step outside again.",
  },
];

export default function PostFireworksRecoveryAtHomeArticle() {
  return (
    <>
      <PageClarityTags siteSection="blog" product="chillpup" pageType="article" />
      <ArticleJsonLd
        title="Dog Still Shaken After Fireworks? How to Help Them Recover at Home"
        description="If your dog is still shaken after fireworks, learn when to call a vet, what not to do, and how to support quiet indoor recovery before rebuilding walks."
        url="https://kf-software.com/blog/dog-still-shaken-after-fireworks/"
        faqs={faqs}
      />
      <Header activeItem="Blog" navItems={navItems} />

      <main className="min-h-screen bg-gradient-to-b from-[#FAF6F0] via-[#FCFAF7] to-white text-[#526174]">
        <article>
          <section className="border-b border-slate-100/70 py-14 sm:py-18">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#0F766E] shadow-sm">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Fireworks Home Recovery Guide
              </div>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-[#0F1A2C] sm:text-5xl lg:text-6xl">
                Dog Still Shaken After Fireworks? How to Help Them Recover at Home
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#526174]">
                If your dog is still shaken after fireworks, do not rush straight into the normal walk or a busy household routine. First, make sure the loud noise has fully ended and check whether your dog is showing signs that need veterinary attention.
              </p>

              <ArticlePhoto
                src="/assets/rest/chillpup-rest-02.jpeg"
                alt="A dog resting quietly at home"
                priority={true}
                variant="heroCompactWide"
                className="mt-6"
              />

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-[#DCEFE8] bg-white p-4 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E]">
                      <Home className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                        ChillPup Routine
                      </p>
                      <h3 className="text-base font-extrabold text-[#0F1A2C] mt-0.5">
                        Post-Fireworks Recovery at Home
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
                  If your dog is hiding, trembling, pacing, panting, refusing normal contact, or struggling to rest indoors, focus on quiet recovery at home. Keep the environment predictable, reduce pressure, and let them use a familiar safe resting place.
                </p>
                <p className="text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  If your dog seems otherwise well and starts to settle indoors, ChillPup’s <strong>Post-Fireworks Recovery at Home</strong> routine helps you choose a short, owner-guided recovery step before you try to rebuild outdoor walks.
                </p>

                <div className="rounded-2xl border border-teal-100 bg-teal-50/40 p-5 text-sm leading-6 text-[#0F1A2C]">
                  <strong>Quick answer:</strong> If your dog is still shaken after fireworks, first check for pain, injury, breathing trouble, collapse, repeated unsuccessful potty attempts, or severe distress. If no medical red flags are present, keep the environment quiet, let your dog rest in a familiar place, avoid forcing walks or interaction, and wait until they settle indoors before trying outdoor rebuilding.
                </div>
              </div>
            </div>
          </section>

          <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,720px)_320px] lg:justify-center lg:gap-12 lg:px-8 lg:py-16">
            <div className="space-y-14 lg:space-y-16">
              <section aria-labelledby="vet-check">
                <div className="rounded-[28px] border border-amber-200/70 bg-[#FFFDF9] p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-800">
                      <ShieldAlert className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 id="vet-check" className="text-2xl font-extrabold text-[#0F1A2C]">
                        First, Check Whether This Needs a Vet
                      </h2>
                      <p className="mt-3 leading-7 text-[#526174]">
                        Post-fireworks stress can overlap with physical issues. The loud noise may have caused a dog to bolt, fall, or injure themselves in the dark, or the stress itself could reveal an underlying health change.
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 rounded-2xl border border-amber-200 bg-white p-4 text-sm leading-6 text-[#526174]">
                    Do not treat this as a normal recovery issue if your dog seems painful, weak, injured, confused, unable to potty normally, or severely distressed.
                  </p>

                  <h3 className="mt-7 text-lg font-extrabold text-[#0F1A2C]">Urgent Veterinary Signs</h3>
                  <p className="mt-2 text-sm leading-6 text-[#526174]">
                    Contact your veterinarian right away if you notice any of these signs:
                  </p>
                  <ul className="mt-4 space-y-3">
                    {urgentSigns.map((sign) => (
                      <li key={sign} className="flex gap-3 text-sm leading-6 text-[#526174]">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section aria-labelledby="still-shaken">
                <h2 id="still-shaken" className="text-3xl font-extrabold text-[#0F1A2C]">
                  What “Still Shaken” Can Look Like Indoors
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  Some dogs remain unsettled for hours after a major noise event, and some need more time before they return to their usual routine. Some short-term changes are expected as their system winds down. Common indoor signs include:
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {indoorSigns.map((sign) => (
                    <li key={sign} className="flex gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 text-sm leading-6 text-[#526174] shadow-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0F766E]" aria-hidden="true" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  While these signs can be a normal part of the immediate aftermath, severe, worsening, or unusual symptoms that do not improve over time require a conversation with your veterinarian.
                </p>
              </section>

              <section aria-labelledby="what-not-to-do">
                <h2 id="what-not-to-do" className="text-3xl font-extrabold text-[#0F1A2C]">
                  What Not to Do Right After Fireworks
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  When a dog is still visibly unsettled inside the house, certain approaches can add pressure and make the next step harder.
                </p>
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

              <ArticlePhoto
                src="/assets/human-interaction/chillpup-human-petting-1.jpg"
                alt="A person gently petting a calm dog at home"
                caption="Stay close, calm, and predictable instead of forcing interaction."
                aspect="portrait"
                className="my-8"
              />

              <section aria-labelledby="quiet-recovery">
                <h2 id="quiet-recovery" className="text-3xl font-extrabold text-[#0F1A2C]">
                  How to Support Quiet Recovery at Home
                </h2>
                <blockquote className="mt-6 rounded-[24px] border border-[#DCEFE8] bg-[#F3FBF8] p-6 text-base leading-7 text-[#0F1A2C]">
                  The first goal is not a normal routine. The first goal is helping your dog settle indoors without adding pressure.
                </blockquote>
                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:hidden">
                  {recoverySteps.map((step) => (
                    <div key={step.title} className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
                      <h3 className="text-base font-extrabold text-[#0F1A2C]">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#526174]">{step.text}</p>
                    </div>
                  ))}
                </div>
                <ul className="mt-6 hidden space-y-4 lg:block">
                  {recoverySteps.map((step) => (
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
                src="/assets/rest/chillpup-rest-01.jpeg"
                alt="A dog resting in a calm indoor space"
                caption="Recovery can start with a quiet place and less pressure."
                aspect="wide"
                className="my-8"
              />

              <section aria-labelledby="outside-again">
                <h2 id="outside-again" className="text-3xl font-extrabold text-[#0F1A2C]">
                  When Is It Time to Try Outside Again?
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  Outdoor rebuilding should wait until your dog is calmer indoors. Do not look at the clock to decide when to walk; look at your dog’s actual body language inside the house.
                </p>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  Your dog may be ready for a tiny, low-pressure step outside once they are:
                </p>
                <ul className="mt-5 space-y-3">
                  {readySigns.map((sign) => (
                    <li key={sign} className="flex gap-3 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0F766E]" aria-hidden="true" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  If your dog settles indoors later but still freezes at the door or turns back outside, read our dedicated guide:{" "}
                  <a href="/blog/dog-freezes-on-walks-after-fireworks/" className="font-semibold text-[#0F766E] hover:underline">
                    Dog Scared to Go Outside After Fireworks? What to Do First
                  </a>.
                </p>
              </section>

              <section id="chillpup-routine" aria-labelledby="routine-fit">
                <h2 id="routine-fit" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Which ChillPup Routine Fits This Moment?
                </h2>
                <p className="mt-4 text-base leading-7 text-[#526174] lg:text-[17px] lg:leading-8">
                  Rebuilding structure depends entirely on what stage of the event you are currently navigating. Match your immediate situation to the correct path below:
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
                    If your dog is still unsettled indoors after fireworks and no medical red flags are present, open ChillPup’s <strong>Post-Fireworks Recovery at Home</strong> routine before trying to rebuild the normal walk.
                  </p>
                </div>
              </section>

              <section aria-labelledby="faq">
                <h2 id="faq" className="text-3xl font-extrabold text-[#0F1A2C]">
                  Frequently Asked Questions
                </h2>
                <div className="mt-6 divide-y divide-slate-100 rounded-[24px] border border-slate-200 bg-white shadow-sm">
                  <FaqItem title="Why is my dog still shaken after fireworks?">
                    <p>Loud, unpredictable bangs can leave a dog on alert even after the noise stops. The doorway, windows, evening sounds, and normal household movement may still feel harder for them until they settle again.</p>
                  </FaqItem>
                  <FaqItem title="Is it normal for a dog to hide after fireworks?">
                    <p>Yes. Hiding in a dark, enclosed space like a closet or under a bed is a normal protective instinct. It helps them feel secure while they process the lingering stress of the event. Let them stay there without crowding them, while still checking for urgent signs such as injury, breathing trouble, collapse, inability to urinate, or severe distress.</p>
                  </FaqItem>
                  <FaqItem title="Should I force my dog to go outside after fireworks?">
                    <p>No. Forcing a dog outside before they have settled indoors usually increases their hesitation. Focus on indoor comfort first. For advice on when it is safe to try a quick backyard trip, see <a href="/blog/dog-refuses-to-pee-outside-after-thunder-or-rain/" className="font-semibold text-[#0F766E] hover:underline">Dog Won’t Pee in the Rain? What’s Normal and When to Call a Vet</a>.</p>
                  </FaqItem>
                  <FaqItem title="What if my dog is still panting or trembling indoors?">
                    <p>If the panting or trembling is mild and gradually decreases as the house stays quiet, keep supporting them with a calm environment. However, if the shaking is severe, does not ease after the noise stops, or is accompanied by weakness, contact your veterinarian.</p>
                  </FaqItem>
                  <FaqItem title="How long does it take for a dog to recover after fireworks?">
                    <p>Recovery time varies for individual dogs. If the behavior is severe, worsening, unusual, or not improving, contact your veterinarian or a qualified behavior professional.</p>
                  </FaqItem>
                  <FaqItem title="Should I play fireworks sounds to help them get used to it?">
                    <p>No. Never play recorded firework or thunder sounds immediately after a scary event. Introducing those sounds when a dog is already shaken can increase their fear. Do not start sound exposure right after a scary event. For long-term noise work, speak with a qualified behavior professional instead of experimenting after fireworks.</p>
                  </FaqItem>
                  <FaqItem title="Which ChillPup routine should I use after fireworks?">
                    <p>If the noise has ended but your dog is still pacing, hiding, or trembling inside the house, open the <strong>Post-Fireworks Recovery at Home</strong> routine. It provides an owner-guided framework to support them safely until they are ready to step outside again.</p>
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
                  Post-Fireworks Recovery at Home
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#526174]">
                  A short, owner-guided ChillPup routine for dogs who are still unsettled indoors after fireworks.
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
