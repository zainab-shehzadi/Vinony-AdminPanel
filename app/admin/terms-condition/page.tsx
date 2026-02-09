"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LAST_UPDATED = "Feb 09, 2026";
const COMPANY = "Vinony";
const SUPPORT_EMAIL = "support@vinony.ai";

const sections = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "eligibility", title: "Eligibility" },
  { id: "accounts", title: "Accounts & Security" },
  { id: "subscriptions", title: "Subscriptions, Credits & Billing" },
  { id: "acceptable-use", title: "Acceptable Use" },
  { id: "content", title: "User Content & AI Outputs" },
  { id: "availability", title: "Service Availability" },
  { id: "termination", title: "Termination" },
  { id: "disclaimers", title: "Disclaimers" },
  { id: "limitation", title: "Limitation of Liability" },
  { id: "changes", title: "Changes to Terms" },
  { id: "contact", title: "Contact" },
];
const COMPANY_NAME = "Vinony"; // change if needed

export default function TermsAndConditionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
          <section className="relative overflow-hidden rounded-2xl border bg-background ">
             <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
               <div
                 className="h-full w-full"
                 style={{
                   backgroundImage:
                     "linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)",
                   backgroundSize: "48px 48px",
                 }}
               />
             </div>
     
             <div className="relative px-5 py-10 sm:px-10 sm:py-12">
               <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                 <div className="space-y-2">
                   <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                     Terms & Condition
                   </h1>
                   <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                                 These terms govern your use of {COMPANY}. Please read carefully.

                   </p>
                 </div>
     
                 <div className="flex items-center gap-2">
                   <Badge variant="secondary" className="text-xs">
                     Last updated: {LAST_UPDATED}
                   </Badge>
                 </div>
               </div>
             </div>
           </section>

      {/* Layout */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Table of contents */}
        <aside className="lg:col-span-4">
          <Card className="lg:sticky lg:top-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">On this page</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition"
                >
                  {s.title}
                </a>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Content */}
        <main className="lg:col-span-8 space-y-6">
          <TermCondionCard id="acceptance" title="1) Acceptance of Terms">
            <p>
              By accessing or using {COMPANY} (“Service”), you agree to these Terms &
              Conditions (“Terms”). If you do not agree, you must not use the Service.
            </p>
          </TermCondionCard>

          <TermCondionCard id="eligibility" title="2) Eligibility">
            <p>
              You must be at least the minimum legal age in your jurisdiction to use the
              Service. If you are using the Service on behalf of an organization, you
              represent that you have authority to bind that organization to these Terms.
            </p>
          </TermCondionCard>

          <TermCondionCard id="accounts" title="3) Accounts & Security">
            <ul className="list-disc pl-5 space-y-2">
              <li>You are responsible for maintaining the confidentiality of your account.</li>
              <li>You agree to provide accurate information and keep it updated.</li>
              <li>
                Notify us immediately if you suspect unauthorized access to your account.
              </li>
            </ul>
          </TermCondionCard>

          <TermCondionCard id="subscriptions" title="4) Subscriptions, Credits & Billing">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Some features may require a paid subscription, credits, or usage-based fees.
              </li>
              <li>
                Payments are processed by third-party providers; we do not store full card
                details.
              </li>
              <li>
                Credit usage, plan limits, taxes, and renewals may vary by plan and may be
                updated from time to time.
              </li>
              <li>
                Unless required by law or stated in your plan, fees are non-refundable.
              </li>
            </ul>
          </TermCondionCard>

          <TermCondionCard id="acceptable-use" title="5) Acceptable Use">
            <p>You agree not to misuse the Service. This includes (but is not limited to):</p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>Violating any law or regulation.</li>
              <li>Attempting to gain unauthorized access to systems or data.</li>
              <li>Uploading malware, abusive content, or content that infringes rights.</li>
              <li>Overloading or disrupting the Service (DDoS, scraping beyond limits, etc.).</li>
            </ul>
          </TermCondionCard>

          <TermCondionCard id="content" title="6) User Content & AI Outputs">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                You retain ownership of content you submit (“User Content”) unless otherwise
                agreed.
              </li>
              <li>
                AI outputs may be inaccurate or incomplete; you are responsible for verifying
                results before relying on them.
              </li>
              <li>
                You are responsible for ensuring you have rights to upload and use any content
                you provide.
              </li>
            </ul>
          </TermCondionCard>

          <TermCondionCard id="availability" title="7) Service Availability">
            <p>
              We aim to provide a reliable service, but we do not guarantee uninterrupted
              availability. We may modify, suspend, or discontinue parts of the Service for
              maintenance, upgrades, or other reasons.
            </p>
          </TermCondionCard>

          <TermCondionCard id="termination" title="8) Termination">
            <p>
              We may suspend or terminate access if you violate these Terms or if required for
              security or legal reasons. You may stop using the Service at any time. Certain
              obligations (e.g., payment, liability limits) may survive termination.
            </p>
          </TermCondionCard>

          <TermCondionCard id="disclaimers" title="9) Disclaimers">
            <p>
              The Service is provided “as is” and “as available.” To the maximum extent
              permitted by law, we disclaim all warranties, including merchantability,
              fitness for a particular purpose, and non-infringement.
            </p>
          </TermCondionCard>

          <TermCondionCard id="limitation" title="10) Limitation of Liability">
            <p>
              To the maximum extent permitted by law, {COMPANY} will not be liable for
              indirect, incidental, special, consequential, or punitive damages, or any loss
              of profits or data, arising from your use of the Service.
            </p>
          </TermCondionCard>

          <TermCondionCard id="changes" title="11) Changes to Terms">
            <p>
              We may update these Terms from time to time. If changes are significant, we’ll
              provide notice in the app or via email. Your continued use of the Service after
              changes means you accept the updated Terms.
            </p>
          </TermCondionCard>

          <TermCondionCard id="contact" title="12) Contact">
            <p>If you have questions about these Terms, contact us:</p>
            <div className="mt-3 rounded-lg border p-4 text-sm">
              <p className="font-medium">{COMPANY} Support</p>
              <p className="text-muted-foreground">
                Email:{" "}
                <Link
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="underline underline-offset-4 text-secondary font-bold"
                >
                  {SUPPORT_EMAIL}
                </Link>
              </p>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              This Terms template is for UI purposes and should be reviewed by legal counsel.
            </p>
          </TermCondionCard>
        </main>
      </div>
    </div>
  );
}

function TermCondionCard({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card id={id} className="scroll-mt-24">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-sm max-w-none dark:prose-invert">
        {children}
      </CardContent>
    </Card>
  );
}
