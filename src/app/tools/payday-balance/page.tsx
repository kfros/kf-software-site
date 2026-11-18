import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PaydayBalanceCalculatorClient } from "./PaydayBalanceCalculatorClient";
import "./payday-calculator.css";

export const metadata: Metadata = {
  title: {
    absolute: "Payday Balance Calculator — Plan Bills Before Payday | KF Software",
  },
  description:
    "Estimate what you can move before payday after bills, planned spending and a buffer. Free browser calculator. No account or bank connection.",
  referrer: "no-referrer",
  alternates: {
    canonical: "https://kf-software.com/tools/payday-balance/",
  },
  openGraph: {
    title: "Payday Balance Calculator — Plan Bills Before Payday | KF Software",
    description:
      "Estimate what you can move before payday after bills, planned spending and a buffer. Free browser calculator. No account or bank connection.",
    url: "https://kf-software.com/tools/payday-balance/",
    type: "website",
    images: [
      {
        url: "https://kf-software.com/tools/payday-balance/og-payday-balance.png",
        width: 1200,
        height: 630,
        alt: "Payday Balance Calculator by KF Software",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PaydayBalancePage() {
  return (
    <>
      <Header activeItem="Payday calculator" />
      <main className="payday-calculator bg-canvas text-ink">
        <div className="container">
          <header className="page-header">
            <p className="eyebrow">KF Software · Free Browser Tool</p>
            <h1>Payday balance calculator</h1>
            <p className="lead">
              Estimate how much you can move out of one checking account before
              your next expected payday after covering unpaid bills, planned
              daily spending, and a buffer.
            </p>
          </header>

          <noscript>
            <div className="noscript-box" role="alert">
              Local calculation requires JavaScript. Your figures are processed
              in your browser and never sent to our servers. Enable JavaScript
              to use the interactive calculator below, or read the explanation
              and worked example further down this page.
            </div>
          </noscript>

          <PaydayBalanceCalculatorClient />

          <section className="card prose" aria-labelledby="guide-heading">
            <h2 id="guide-heading">How this payday balance calculator works</h2>
            <p>
              This tool helps you answer one practical question before payday:
              out of the balance currently sitting in your checking account, how
              much could you move to savings or another goal without shorting
              upcoming bills, everyday spending, or your safety buffer?
            </p>

            <h3>Worked fictional example</h3>
            <p>
              Suppose your current checking balance is{" "}
              <strong>$2,200.00</strong>, your next expected payday is in 4
              days, you have an unpaid <strong>$315.00</strong> utility bill due
              today and a <strong>$900.00</strong> rent payment due in 2 days,
              you plan <strong>$0.00</strong> in other spending, and you want to
              leave a <strong>$200.00</strong> buffer untouched.
            </p>
            <p>
              The calculator subtracts both unpaid bills ($315.00 + $900.00 =
              $1,215.00), other spending ($0.00), and your buffer ($200.00) from
              $2,200.00, leaving an estimated <strong>$785.00</strong> you could
              move. If you also want to explore a fixed interactive walkthrough,
              see the{" "}
              <a href="/research/cash-timing/">fictional cash-timing demo</a>.
            </p>

            <h3>
              Pending vs. already-deducted bills, overdue bills, and payday
              bills
            </h3>
            <ul>
              <li>
                <strong>Pending vs. already deducted:</strong> If a bill or card
                charge has already reduced the checking balance you entered,
                mark it as <em>already deducted</em> so it is not subtracted
                twice.
              </li>
              <li>
                <strong>Overdue bills:</strong> Any unpaid bill dated before
                today is still included until you pay or deduct it.
              </li>
              <li>
                <strong>Bills due on payday:</strong> Bills due on your payday
                itself are conservatively included, because an automatic debit
                may clear before your paycheck arrives.
              </li>
              <li>
                <strong>Bills after payday:</strong> Bills due after your next
                expected payday are excluded from this short-horizon calculation
                and shown separately.
              </li>
            </ul>

            <h3>Planned daily spending vs. buffer</h3>
            <p>
              <strong>Other spending until payday</strong> covers expected
              day-to-day costs like groceries, fuel, or transit that are not
              entered as separate bill rows. The{" "}
              <strong>amount to leave untouched</strong> is an extra cushion you
              choose to keep in the account. If the total exceeds your balance,
              the calculator shows $0.00 transferable and reports the shortfall
              against your plan separately.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
